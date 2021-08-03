export const orderBank=[
  {priority:['hp','sr'],notes:'Shaziman only',name:'test1',cloud:'test',trip:'test',delivery_date:'test',product:'test',volume:'test',retain:'test',runout:'test',product_category:'1234',dn_status:['Send For DN'],split_id:'test',order_type:'test',ship_to:'test',accessibility:'test',remarks:'test',order_status:'scheduled'},
  {priority:[],notes:'Shaziman only',name:'test2',cloud:'test',trip:'test',delivery_date:'test',product:'test',volume:'test',retain:'test',runout:'test',product_category:'1234',dn_status:['Blocked DN'],split_id:'test',order_type:'test',ship_to:'test',accessibility:'test',remarks:'test',order_status:'unscheduled'},
  {priority:['sr'],notes:'',name:'test3',cloud:'test',trip:'test',delivery_date:'test',product:'test',volume:'test',retain:'test',runout:'test',product_category:'1234',dn_status:['Late Unblock'],split_id:'test',order_type:'test',ship_to:'test',accessibility:'test',remarks:'test',order_status:'unscheduled'},
  {priority:['hp'],notes:'',name:'test',cloud:'test',trip:'test',delivery_date:'test',product:'test',volume:'test',retain:'test',runout:'test',product_category:'1234',dn_status:['Clear DN'],split_id:'test',order_type:'test',ship_to:'test',accessibility:'test',remarks:'test',order_status:'scheduled'},
  {priority:['hp'],notes:'Shaziman only',name:'test',cloud:'test',trip:'test',delivery_date:'test',product:'test',volume:'test',retain:'test',runout:'test',product_category:'1234',dn_status:['Send For DN'],split_id:'test',order_type:'test',ship_to:'test',accessibility:'test',remarks:'test',order_status:'unscheduled'},
  {priority:['hp','sr'],notes:'',name:'test1',cloud:'test',trip:'test',delivery_date:'test',product:'test',volume:'test',retain:'test',runout:'test',product_category:'1234',dn_status:['Unblocked'],split_id:'test',order_type:'test',ship_to:'test',accessibility:'test',remarks:'test',order_status:'unscheduled'},
  {priority:['sr','hp'],notes:'',name:'test5',cloud:'test',trip:'test',delivery_date:'test',product:'test',volume:'test',retain:'test',runout:'test',product_category:'1234',dn_status:['Send For DN'],split_id:'test',order_type:'test',ship_to:'test',accessibility:'test',remarks:'test',order_status:'scheduled'},
]

export const ganttChartTableData =[
  {
    id: 1,
    vehicle: 'WA 5551V',
    pto: 'PTO',
    hours: '3.36',
    status: 'On 1',
    size: '21840',
    type: '1003',
    rate: '00',
    shift_list: [
      "On 1",
      "On 2",
      "on 3"
    ],
    shift: "On 1",
    cap: "21480",
    rtcode: "1003"
  },
  {
    id: 2,
    vehicle: 'WA 5552V',
    hours: '13.36',
    status: 'On 1',
    size: '21840',
    type: '1003',
    rate: '00',
    shift_list: [
      "On 1",
      "On 2",
      "on 3"
    ],
    shift: "On 1",
    cap: "21480",
    rtcode: "1003"
  },
  {
    id: 3,
    vehicle: 'WA 5553V',
    pto: 'PTO',
    hours: '13.36',
    status: 'On 1',
    size: '21840',
    type: '1003',
    rate: '00',
    shift_list: [
      "On 1",
      "On 2",
      "on 3"
    ],
    shift: "On 1",
    cap: "21480",
    rtcode: "1003"
  },
  {
    id: 4,
    vehicle: 'WA 5559V',
    pto: 'PTO',
    hours: '6',
    status: 'On 1',
    size: '21840',
    type: '1003',
    rate: '00',
    shift_list: [
      "On 1",
      "On 2",
      "on 4"
    ],
    shift: "On 1",
    cap: "21480",
    rtcode: "1003"
  },
  {
    id: 5,
    vehicle: 'WA 5559V',
    hours: '05',
    status: 'On 1',
    size: '21840',
    type: '1003',
    rate: '00',
    shift_list: [
      "On 1",
      "On 2",
      "on 3"
    ],
    shift: "On 1",
    cap: "21480",
    rtcode: "1003"
  },
  {
    id: 6,
    vehicle: 'WA 5559V',
    hours: '05',
    status: 'On 1',
    size: '21840',
    type: '1003',
    rate: '00',
    shift_list: [
      "On 1",
      "On 2",
      "on 3"
    ],
    shift: "On 1",
    cap: "21480",
    rtcode: "1003"
  },
  {
    id: 7,
    vehicle: 'WA 5559V',
    hours: '05',
    status: 'On 1',
    size: '21840',
    type: '1003',
    rate: '00',
    shift_list: [
      "On 1",
      "On 2",
      "on 3"
    ],
    shift: "On 1",
    cap: "21480",
    rtcode: "1003"
  }
]

export const ganttChartTableEvents = [
  { id : 1, resourceId : 1, name : 'RT13098 Drag true', startDate : '2021-07-23 00:00', endDate : '2021-07-23 12:00', eventColor: '#84B0E9', eventType: 'Scheduled',highlight:true,eventFilter:"high", status:'not yet to be created',resourceOrder:[{DNNumber:1},{DNNumber:1}]},
  { id : 2, resourceId : 3, name : 'RT11940 Drag true', startDate : '2021-07-23 12:00', endDate : '2021-07-23 14:59', eventColor: 'green', eventType: 'RT Availability',highlight:true,eventFilter:"future",status:'not yet to be created',resourceOrder:[{DNNumber:1},{test:0}] },
  { id : 3, resourceId : 2, name : 'RT11940 Drag true', startDate : '2021-07-23 00:00', endDate : '2021-07-23 09:00', eventColor: '#9F79B7', eventType: 'Pending Shipment',highlight:true,eventFilter:"backlog",status:'created' },
  { id : 4, resourceId : 5, name : 'RT11940 Drag true', startDate : '2021-07-23 00:00', endDate : '2021-07-23 09:00', eventColor: '#615E9B', eventType: 'Shipment Created',highlight:true ,eventFilter:"request"},
  { id : 5, resourceId : 4, name : 'RT09567 Drag false', startDate : '2021-07-23 22:00', endDate : '2021-07-23 23:59:00', draggable : false, eventColor: '#BDBDBD', eventType : 'Cancellation',highlight:true,eventFilter:"request" },
  { id : 6, resourceId : 7, name : 'RT09567 Drag false', startDate : '2021-07-23 00:00', endDate : '2021-07-23 09:00', draggable : false, eventColor : '#E45E5E', eventType : 'Blocked DN',highlight:true,eventFilter:"backlog" },
  { id : 7, resourceId : 6, name : 'RT09567 Drag false', startDate : '2021-07-23 05:00', endDate : '2021-07-23 09:00', draggable : false, eventColor : '#FECE66', eventType : 'Soft Overrule',highlight:true,eventFilter:"high" },
  { id : 8, resourceId : 1, name : 'RT09567 Drag false', startDate : '2021-07-23 12:00', endDate : '2021-07-23 22:00', draggable : false, eventColor : '#FECE66', eventType : 'Soft Overrule',highlight:true,eventFilter:"high" },
  { id : 9, resourceId : 2, name : 'RT09567 Drag false', startDate : '2021-07-23 10:00', endDate : '2021-07-23 22:00', draggable : false, eventColor : '#84B0E9', eventType : 'Scheduled',highlight:true,eventFilter:"request" },
  { id : 10, resourceId : 4, name : 'RT09567 Drag false', startDate : '2021-07-23 11:00', endDate : '2021-07-23 22:00', draggable : false, eventColor : '#84B0E9', eventType : 'Scheduled',highlight:true,eventFilter:"backlog" },
  { id : 11, resourceId : 3, name : 'RT09567 Drag false', startDate : '2021-07-23 9:00', endDate : '2021-07-23 22:00', draggable : false, eventColor : '#84B0E9', eventType : 'Scheduled',highlight:true,eventFilter:"future" },
  { id : 12, resourceId : 3, name : 'RT09567 Drag false', startDate : '2021-07-23 0:00', endDate : '2021-07-23 8:00', draggable : false, eventColor : '#84B0E9', eventType : 'Scheduled',highlight:true,eventFilter:"request" },
]
