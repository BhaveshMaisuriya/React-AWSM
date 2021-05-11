import DateHelper from '../../../lib/Core/helper/DateHelper.js';
import Drag from './Drag.js';
import SchedulerPro from '../../../lib/SchedulerPro/view/SchedulerPro.js';
import './SubtaskTab.js';
import '../../../lib/Scheduler/feature/Labels.js';

/**
 * Advanced SchedulerPro that has support of subtasks
 *
 * @extends SchedulerPro/view/SchedulerPro
 */
export default class SchedulerWithSubtasks extends SchedulerPro {

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
                        ${data.eventRecord.name ? `<div class="b-sch-event-title">${data.eventRecord.name}</div>` : ''}
                        ${data.startClockHtml}
                        ${data.endClockHtml}
                        ${data.eventRecord.subEvents ? '</br>' + data.eventRecord.subEvents.map(r => `
                        <h4 class="b-tooltip-subevent-title">${r.name}</h4>
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
            <div class="nested ${value.cls || ''}" data-id="${value.id}" style="transform: translate(${value.left}px, 0); width: ${value.width}px;">
                ${value.iconCls ? `<i class="b-icon ${value.iconCls}"></i>` : ''} ${value.name}
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
