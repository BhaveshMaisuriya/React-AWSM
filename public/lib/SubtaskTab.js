import ObjectHelper from '../../../lib/Core/helper/ObjectHelper.js';
import EditorTab from '../../../lib/SchedulerPro/widget/taskeditor/EditorTab.js';
import Toast from '../../../lib/Core/widget/Toast.js';
import '../../../lib/Grid/column/DateColumn.js';
import '../../../lib/Core/widget/DateTimeField.js';
import '../../../lib/Grid/view/Grid.js';

/**
 * Extra Tab for TaskEditor to manage subtasks
 *
 * @extends SchedulerPro/widget/taskeditor/EditorTab
 */
export default class SubtaskTab extends EditorTab {

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
