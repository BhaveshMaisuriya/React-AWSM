/* eslint-disable no-unused-vars */
import ObjectHelper from '../../../lib/Core/helper/ObjectHelper.js';
import DateHelper from '../../../lib/Core/helper/DateHelper.js';
import EventModel from '../../../lib/SchedulerPro/model/EventModel.js';

/**
 * Advanced EventModel with support for nested events (subEvents) and validation for it
 *
 * @extends SchedulerPro/model/EventModel
 */
export default class ParentEvent extends EventModel {

    static get fields() {
        return [
            {
                name    : 'subEvents',
                // subEvents contains an array of objects, we override isEqual with 'true' flag for deep comparison
                isEqual : (oldValue, value) => ObjectHelper.isEqual(oldValue, value, true),
                // Model do not support nested field types for now, take care to Date formatting manually
                convert : subEvents => {
                    return subEvents?.length ? subEvents.map(subEvent => {
                        subEvent.startDate = DateHelper.parse(subEvent.startDate);
                        subEvent.endDate = DateHelper.parse(subEvent.endDate);
                        return subEvent;
                    }) : [];
                }
            }
        ];
    }

    afterChange(toSet, wasSet, silent, fromRelationUpdate, skipAccessors) {
        const me = this;

        // silent is set by engine when normalizing, we can ignore that phase here
        if (toSet && !silent) {
            // if startDate of main event has been changed, all nested dates should be adjusted
            if ('startDate' in toSet) {
                const offset = DateHelper.diff(toSet.startDate.oldValue, toSet.startDate.value);
                // eslint-disable-next-line no-unused-expressions
                me.subEvents?.forEach(nestedEvent => {
                    nestedEvent.startDate = DateHelper.add(nestedEvent.startDate, offset);
                    nestedEvent.endDate = DateHelper.add(nestedEvent.endDate, offset);
                });
            }
            if (me.endDate && me.subEvents) {
                const endDate = me.endDate;
                // remove all nested events which doesn't fit into main event bounds
                me.subEvents = me.subEvents.filter(nestedEvent => {
                    nestedEvent.endDate = DateHelper.min(endDate, nestedEvent.endDate);

                    return nestedEvent.startDate < endDate;
                });
            }
        }

        super.afterChange(toSet, wasSet, silent, fromRelationUpdate, skipAccessors);
    }

    // check if all nested events has no intersections and fit into main event
    isNestedEventValid(nestedEvent) {
        const
            nestedStartDate = nestedEvent.startDate,
            nestedEndDate   = nestedEvent.endDate;

        let message = '';
        // eslint-disable-next-line no-unused-expressions
        this.subEvents?.forEach(record => {
            if (nestedEvent.id === record.id) {
                return;
            }
            if (DateHelper.intersectSpans(nestedStartDate, nestedEndDate, record.startDate, record.endDate)) {
                message = 'Sub events should not intersect';
            }
        });

        return !message.length || message;
    }

    isValid() {
        const { startDate, endDate } = this;
        let isValid                  = !startDate || !endDate || endDate - startDate >= 0;

        if (isValid) {
            isValid = !this.subEvents?.some(nestedEvent => this.isNestedEventValid(nestedEvent) !== true);
        }

        return isValid;
    }

    // go through all sub events and try to find the first available space that may be used to add a new sub event
    findEarliestUnallocatedTimeSlot() {
        const me = this;
        
        let startDate = me.startDate,
            // use 1 hour duration by default
            endDate   = DateHelper.add(startDate, 3600000);

        // subEvents should be sorted by startDate to make sure we will not pass any free space
        me.subEvents.sort((r1, r2) => r1.startDate - r2.startDate);

        me.subEvents.forEach(nestedEvent => {
            const
                nestedStartDate = nestedEvent.startDate,
                nestedEndDate   = nestedEvent.endDate;

            // if intercepting with startDate, use endDate of nested event
            if (nestedStartDate.getTime() === startDate.getTime() ||
                nestedStartDate < startDate &&
                    nestedEndDate > startDate
            ) {
                startDate = nestedEndDate;
                endDate   = DateHelper.add(startDate, 3600000);
            }
            else if (nestedStartDate < endDate) {
                endDate = nestedStartDate;
            }
            else if (me.endDate < endDate) {
                endDate = me.endDate;
            }
            if (startDate >= me.endDate) {
                startDate = endDate = me.endDate;
            }
            else if (endDate >= me.endDate) {
                endDate = me.endDate;
            }
        });

        // no free space found
        if (startDate.getTime() === endDate.getTime()) {
            return null;
        }

        return { startDate, endDate };
    }
}
