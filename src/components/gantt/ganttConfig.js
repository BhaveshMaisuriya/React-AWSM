/**
 *- Gantt configuration
 */
/*
import { ProjectModel } from 'bryntum-gantt';
import Task from './Task';
import './StatusColumn';

const ganttConfig = {

    project : new ProjectModel({
        // Let the Project know we want to use our own Task model with custom fields / methods
        taskModelClass : Task,
        // autoLoad        : true,
        transport       : {
            load : {
                url : 'data/launch-saas.json'
            }
        }
    }),

    dependencyIdField : 'sequenceNumber',

    startDate                : '2019-01-12',
    endDate                  : '2019-03-24',
    resourceImageFolderPath  : 'users/',
    columns                  : [
        { type : 'wbs' },
        { type : 'name', width : 250 },
        // { type : 'product' },
        // { type : 'duration' },
        // { type : 'resourceassignment', width : 120, showAvatars : true },
        // { type : 'percentdone', showCircle : true, width : 70 },
        // {
        //     type  : 'predecessor',
        //     width : 112
        // },
        // {
        //     type  : 'successor',
        //     width : 112
        // },
        // { type : 'schedulingmodecolumn' },
        // { type : 'calendar' },
        // { type : 'constrainttype' },
        // { type : 'constraintdate' },
        // { type : 'statuscolumn' },
        // {
        //     type  : 'date',
        //     text  : 'Deadline',
        //     field : 'deadline'
        // },
        // { type : 'addnew' }
    ],

    subGridConfigs : {
        locked : {
            flex : 3
        },
        normal : {
            flex : 4
        }
    },

    columnLines : false,

    features : {
        rollups : {
            disabled : true
        },
        baselines : {
            disabled : true
        },
        progressLine : {
            disabled   : true,
            statusDate : new Date(2019, 0, 25)
        },
        taskMenu : {
            // Our items is merged with the provided defaultItems
            // So we add the provided convertToMilestone option.
            items : {
                convertToMilestone : true
            },
            processItems({ taskRecord, items }) {
                if (taskRecord.isMilestone) {
                    items.convertToMilestone = false;
                }
            }
        },
        filter         : true,
        dependencyEdit : true,
        timeRanges     : {
            showCurrentTimeLine : true
        },
        labels : {
            left : {
                field  : 'name',
                editor : {
                    type : 'textfield'
                }
            }
        }
    }

} // eo ganttConfig

export default ganttConfig;

// eof
*/