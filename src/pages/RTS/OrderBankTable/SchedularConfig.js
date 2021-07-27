/**
 * Bryntum Scheduler configuration
 */
 import { Scheduler, StringHelper } from '@bryntum/schedulerpro/schedulerpro.umd';
import { ganttChartTableMapping } from './tableMapping';

//  const chartColumns = () => {
//      let temp = [];
//     for (const tableMap of Object.keys(ganttChartTableMapping)) {
//         temp.push({
//             text: ganttChartTableMapping[tableMap].label,
//             field: tableMap,
//             width: 'auto'
//         })
//     }
//     return temp;
//  }

//  export { chartColumns }

 const schedulerConfig = {
     eventColor: null,
     timeRangesFeature: {
         narrowThreshold: 10
     },
     autoHeight : true,
     rowHeight  : 40,
     barMargin  : 1,
 
     startDate: new Date(2017, 1, 7, 0),
     endDate: new Date(2017, 1, 7, 24),
 
     viewPreset: 'hourAndDay',
     useInitialAnimation: 'slide-from-left',
 
     zoomKeepsOriginalTimespan: false,
    //  resourceImagePath: 'users/',
 
     // initially loads resources and events
     crudManager: {
         autoLoad: true,
         transport: {
             load: {
                 url: 'data/data1.json'
             }
         }
     },
 
    //  columns: [],

     columns: [
         { type: 'vehicle', text: 'Vehicle', field: 'vehicle'},
         { type: 'hours', text: 'Hours', field: 'hours'},
         { type: 'status', text: 'Status', field: 'status'},
         { type: 'size', text: 'Size', field: 'size'},
         { type: 'type', text: 'Type', field: 'type'},
     ]
 };
 
 export { schedulerConfig };
 