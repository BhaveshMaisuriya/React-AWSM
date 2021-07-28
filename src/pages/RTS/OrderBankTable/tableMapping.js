const tableColumns = [
  "priority",
  "notes",
  "ship_to",
  "name",
  "cloud",
  "trip",
  "delivery_date",
  "product",
  "volume",
  "retain",
  "runout",
  "product_category",
  "dn_status",
  "split_id",
  "order_type",
  "accessibility",
  "remarks",
]

const tableMapping = {
  priority: {
    label: "priority",
    columnSize: "cell-text",
    type: "priority_type",
  },
  notes: {
    label: "",
    columnSize: "cell-text",
  },
  name: {
    label: "name",
    columnSize: "cell-text",
  },
  cloud: {
    label: "cloud",
    columnSize: "cell-text",
  },
  trip: {
    label: "trip",
    columnSize: "cell-text",
  },
  delivery_date: {
    label: "delivery date",
    columnSize: "cell-text",
  },
  product: {
    label: "product",
    columnSize: "cell-text",
  },
  volume: {
    label: "volume (i)",
    columnSize: "cell-text",
  },
  retain: {
    label: "retain",
    columnSize: "cell-text",
  },
  runout: {
    label: "runout",
    columnSize: "cell-text",
  },
  product_category: {
    label: "product category",
    columnSize: "cell-text",
  },
  dn_status: {
    label: "dn status",
    columnSize: "cell-text",
    type: "dn_status",
  },
  split_id: {
    label: "split id",
    columnSize: "cell-text",
  },
  order_type: {
    label: "order type",
    columnSize: "cell-text",
  },
  ship_to: {
    label: "ship to",
    columnSize: "cell-text",
  },
  accessibility: {
    label: "Accessibility",
    columnSize: "cell-text",
  },
  remarks: {
    label: "Remarks",
    columnSize: "cell-text",
  },
}

const ganttChartTableColumns = ["vehicle", "hours", "status", "size", "type"]

const ganttChartTableMapping = {
  vehicle: {
    label: "vehicle",
    columnSize: "cell-text",
  },
  rate: {
    label: "RATE(%)",
    columnSize: "cell-text",
  },
  shift: {
    label: "SHIFT",
    columnSize: "cell-text",
  },
  cap: {
    label: "CAP(L)",
    columnSize: "cell-text",
  },
  rtcode: {
    label: "RT CODE",
    columnSize: "cell-text",
  }
}

const ganttChartTableData =[
  {
    id: 1,
    vehicle: 'WA 5559V',
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
    vehicle: 'WA 5559V',
    hours: '5',
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
    vehicle: 'WA 5559V',
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
      "on 3"
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

const ganttChartTableEvents = [
  { id : 1, resourceId : 1, name : 'RT13098 Drag true', startDate : '2021-07-23 00:00', endDate : '2021-07-23 12:00', eventColor: '#84B0E9', eventType: 'Scheduled'},
  { id : 2, resourceId : 3, name : 'RT11940 Drag true', startDate : '2021-07-23 12:00', endDate : '2021-07-23 14:59', eventColor: '#DBE5F0', eventType: 'RT Availability' },
  { id : 3, resourceId : 2, name : 'RT11940 Drag true', startDate : '2021-07-23 00:00', endDate : '2021-07-23 09:00', eventColor: '#9F79B7', eventType: 'Pending Shipment' },
  { id : 4, resourceId : 5, name : 'RT11940 Drag true', startDate : '2021-07-23 00:00', endDate : '2021-07-23 09:00', eventColor: '#615E9B', eventType: 'Shipment Created' },
  { id : 5, resourceId : 4, name : 'RT09567 Drag false', startDate : '2021-07-23 22:00', endDate : '2021-07-23 23:59:00', draggable : false, eventColor: '#BDBDBD', eventType : 'Cancellation' },
  { id : 6, resourceId : 7, name : 'RT09567 Drag false', startDate : '2021-07-23 00:00', endDate : '2021-07-23 09:00', draggable : false, eventColor : '#E45E5E', eventType : 'Blocked DN' },
  { id : 7, resourceId : 6, name : 'RT09567 Drag false', startDate : '2021-07-23 05:00', endDate : '2021-07-23 09:00', draggable : false, eventColor : '#FECE66', eventType : 'Soft Overrule' },
]

export { tableMapping, tableColumns, ganttChartTableColumns, ganttChartTableMapping, ganttChartTableData, ganttChartTableEvents }
