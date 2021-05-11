import DateHelper from '../../../lib/Core/helper/DateHelper.js';
import DragHelper from '../../../lib/Core/helper/DragHelper.js';

/**
 * Extended Drag helper to manage subtasks
 *
 * @extends Core/helper/DragHelper
 */
export default class Drag extends DragHelper {

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
