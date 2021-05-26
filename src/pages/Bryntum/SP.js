import { DateHelper, DragHelper, ObjectHelper, EventModel, SchedulerPro, EditorTab, Toast } from '../../../lib/sp/build/schedulerpro.module.js?447346';
import shared from '../../../lib/_scheduler/shared.module.js?447346';
/**
 * Extended Drag helper to manage subtasks
 *
 * @extends Core/helper/DragHelper
 */
class Drag extends DragHelper {

    static get defaultConfig() {
        return {
            // allow to move only by X axis
            mode            : 'translateX',
            // set class of target element that will be dragged
            targetSelector  : '.nested',
            // minX will applies in scope of parent container. We prevent moving nested event out of borders of parent container,
            // maxX will be applied later, it's dynamic and calculates depends on real container size
            minX            : 0,
            // enables ability to call event handlers using naming "onEventName" without need to subscribe
            callOnFunctions : true
        };
    }

    onDragStart({ context }) {
        const
            box       = context.element.getBoundingClientRect(),
            parentBox = context.element.closest('.b-sch-event').getBoundingClientRect();

        // Always constrain dragging to parent event bar
        this.maxX     = parentBox.width - box.width;
    }

    onDrop({ context }) {
        const
            me                   = this,
            { left, right, top } = context.element.getBoundingClientRect(),
            recordId             = context.element.dataset.id,
            scheduler            = me.scheduler,
            eventRecord          = scheduler.resolveEventRecord(context.grabbed.parentElement),
            // get rounded dates by drop coordinates
            startDate            = scheduler.getDateFromXY([left, top], 'round', false),
            endDate              = scheduler.getDateFromXY([right, top], 'round', false),
            currentNestedRecord  = eventRecord.subEvents.find(r => r.id == recordId),
            // apply changed dates to a copy of nested event to make validation
            nestedEventData      = { ...currentNestedRecord, startDate, endDate };

        if (eventRecord.isNestedEventValid(nestedEventData) === true &&
            // dates may be the same after rounding, in that case we do abort(), it will take care to animate it properly
            !DateHelper.isEqual(startDate, currentNestedRecord.startDate)
        ) {
            currentNestedRecord.startDate = startDate;
            currentNestedRecord.endDate   = endDate;
            // need to be repainted manually to adjust nested event element after snapping dates.
            scheduler.repaintEvent(eventRecord);
        }
        else {
            me.abort();
        }
    }
};

/* eslint-disable no-unused-vars */

/**
 * Advanced EventModel with support for nested events (subEvents) and validation for it
 *
 * @extends SchedulerPro/model/EventModel
 */
class ParentEvent extends EventModel {

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


/**
 * Advanced SchedulerPro that has support of subtasks
 *
 * @extends SchedulerPro/view/SchedulerPro
 */
class SchedulerWithSubtasks extends SchedulerPro {

    static get $name() {
        return 'SchedulerWithSubtasks';
    }

    static get type() {
        return 'schedulerwithsubtasks';
    }

    static get defaultConfig() {
        return {
            features : {
                labels : {
                    top : {
                        field : 'name'
                    }
                },
                taskEdit : {
                    editorConfig : {
                        width : '50em'
                    },
                    items : {
                        customTab : {
                            type   : 'subtasktab',
                            weight : 110
                        }
                    }
                },
                eventTooltip : {
                    template : data => `
                        ${data.eventRecord.name ? `<div className="b-sch-event-title">${data.eventRecord.name}</div>` : ''}
                        ${data.startClockHtml}
                        ${data.endClockHtml}
                        ${data.eventRecord.subEvents ? '</br>' + data.eventRecord.subEvents.map(r => `
                        <h4 className="b-tooltip-subevent-title">${r.name}</h4>
                        ${DateHelper.format(r.startDate, 'LT')} - ${DateHelper.format(r.endDate, 'LT')}
                    `).join('') : ''}
                    `
                },

                // We have complex content in the events which cannot be moved.
                stickyEvents : false,

                eventDrag : {
                    dragHelperConfig : {
                        // ignore nested event elements, it handled by own dragHelper
                        isElementDraggable : el => !el.classList.contains('nested')
                    }
                }
            }
        };
    }

    construct() {
        super.construct(...arguments);

        this.subEventDrag = new Drag({
            scheduler : this
        });
    }

    // eventBodyTemplate is used to render markup inside an event. It is populated using data from eventRenderer()
    eventBodyTemplate(values) {
        return values.map(value => value ? `
            <div className="nested ${value.cls || ''}" data-id="${value.id}" style="transform: translate(${value.left}px, 0); width: ${value.width}px;">
                ${value.iconCls ? `<i className="b-icon ${value.iconCls}"></i>` : ''} ${value.name}
            </div> ` : ''
        ).join('');
    }

    // eventRenderer is here used to translate the dates of nested events into pixels, passed on to the eventBodyTemplate
    eventRenderer({ eventRecord, renderData }) {
        return (eventRecord.subEvents || []).map(nestedEvent => {
            const nestedEventStart = this.getCoordinateFromDate(Math.max(nestedEvent.startDate, this.startDate));

            return nestedEventStart < 0 ? null : Object.assign({
                // getCoordinateFromDate gives us a px value in time axis, subtract events left from it to be within the event
                left  : Math.max(0, nestedEventStart - renderData.left),
                width : this.getCoordinateFromDate(nestedEvent.endDate) - this.getCoordinateFromDate(nestedEvent.startDate)
            }, nestedEvent);
        });
    }

    doDestroy() {
        this.subEventDrag.destroy();

        super.doDestroy();
    }
}

// Register this widget type with its Factory
SchedulerWithSubtasks.initClass();


/**
 * Extra Tab for TaskEditor to manage subtasks
 *
 * @extends SchedulerPro/widget/taskeditor/EditorTab
 */
class SubtaskTab extends EditorTab {

    static get $name() {
        return 'SubtaskTab';
    }

    static get type() {
        return 'subtasktab';
    }

    static get defaultConfig() {
        return {
            title            : 'Subtasks',
            cls              : 'b-tab-subtasks',
            autoUpdateRecord : false,
            layoutStyle      : {
                flexFlow : 'column nowrap'
            },
            namedItems : {
                subEvents : {
                    type  : 'grid',
                    name  : 'subEvents',
                    flex  : '1 1 auto',
                    width : '100%',
                    store : {
                        sorters : [{ field : 'startDate', ascending : true }]
                    },
                    columns : [
                        { field : 'name', text : 'Name', flex : 1 },
                        {
                            field  : 'startDate',
                            text   : 'Start date',
                            flex   : 1,
                            type   : 'date',
                            format : 'YYYY-MM-DD hh:mm A',
                            editor : {
                                type      : 'datetimefield',
                                timeField : {
                                    stepTriggers : false
                                },
                                dateField : {
                                    stepTriggers : false
                                }
                            },
                            finalizeCellEdit : 'up.validateNestedEvent'
                        },
                        {
                            field  : 'endDate',
                            text   : 'End date',
                            flex   : 1,
                            type   : 'date',
                            format : 'YYYY-MM-DD hh:mm A',
                            editor : {
                                type      : 'datetimefield',
                                timeField : {
                                    stepTriggers : false
                                },
                                dateField : {
                                    stepTriggers : false
                                }
                            },
                            finalizeCellEdit : 'up.validateNestedEvent'
                        }
                    ]
                },
                toolbar : {
                    type       : 'toolbar',
                    flex       : '0 0 auto',
                    cls        : 'b-compact-bbar',
                    namedItems : {
                        add : {
                            type    : 'button',
                            cls     : 'b-add-button b-green',
                            icon    : 'b-icon b-icon-add',
                            tooltip : 'Add new subtask',
                            onClick : 'up.onAddClick'
                        },
                        remove : {
                            type    : 'button',
                            cls     : 'b-remove-button b-red',
                            icon    : 'b-icon b-icon-trash',
                            tooltip : 'Delete selected subtask',
                            onClick : 'up.onDeleteClick'
                        }
                    },
                    items : {
                        add    : true,
                        remove : true
                    }
                }
            },
            items : {
                subEvents : true,
                toolbar   : true
            }
        };
    }

    construct() {
        const me = this;

        super.construct(...arguments);

        me.grid = me.widgetMap.subEvents;

        // make a copy of data to avoid collisions
        me.grid.store.on('change', () => me.record.subEvents = ObjectHelper.clone(me.grid.data.map(r => r.data)));
    }

    onAddClick() {
        const
            eventRecord = this.record,
            timeSlot    = eventRecord.findEarliestUnallocatedTimeSlot();

        if (!timeSlot) {
            Toast.show('No unallocated time slot could be found in the main event');
            return;
        }

        const
            { startDate, endDate } = timeSlot,
            added                  = this.grid.store.add({
                name      : 'New subtask',
                startDate : startDate,
                endDate   : endDate
            });

        this.grid.startEditing(added[0]);
    }

    onDeleteClick() {
        const selectedRecord = this.grid.selectedRecord;

        this.grid.features.cellEdit.cancelEditing(true);
        selectedRecord && this.grid.store.remove(selectedRecord);
    }

    validateNestedEvent({ record, value, inputField }) {
        return this.record.isNestedEventValid({ ...record.data, [inputField.name] : value });
    }

    set record(record) {
        super.record = record;

        if (record) {
            this.grid.store.loadData(record.subEvents || []);
        }
        else {
            // make sure cellEditor is hidden to prevent show it up on taskEdit reopen
            this.grid.features.cellEdit.finishEditing();
        }
    }

    get record() {
        return super.record;
    }
}

// Register this widget type with its Factory
SubtaskTab.initClass();

new SchedulerWithSubtasks({
    appendTo          : 'container',
    minHeight         : '20em',
    resourceImagePath : '../_shared/images/users/',

    startDate  : new Date(2018, 8, 24, 7),
    endDate    : new Date(2018, 8, 24, 21),
    viewPreset : 'hourAndDay',
    rowHeight  : 90,
    barMargin  : 10,
    columns    : [
        { type : 'resourceInfo', text : 'Name', field : 'name', width : 130 },
        { type : 'rating', text : 'Speaker rating', field : 'rating' }
    ],

    project : {
        autoLoad  : true,
        transport : {
            load : {
                url : 'data/data.json'
            }
        },
        eventModelClass : ParentEvent
    }
});
