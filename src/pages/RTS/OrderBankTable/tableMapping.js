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

const shipmentTableColumns = [
  "no.",
  "station",
  "order 1",
  "order 2",
  "order 3",
  "order 4",
  "order 5",
]

const shipmentTableData = [
  {
    'no': 1,
    station: {
    'id': 36114489,
    'name': 'maju gas trending',
    'load_time': '09:00',
    'loading_time': 1,
    'duration': '3',
    'eta': '13:00',
    },
    order1: {
      'product': 'Primax 97 Premium',
      'volume': '546OL',
      'station_cat': 'LV1',
      'DN': 1234,
    },
    order2:null,
    order3:null,
    order4:null,
    order5:null,
  },
  {
    'no': 2,
    station: {
    'id': 3611464,
    'name': 'one sh trending',
    'load_time': '14:00',
    'loading_time': 3,
    'duration': '3',
    'eta': '17:00',
    },
    order1: {
      'product': 'Primax 97 Premium',
      'volume': '546OL',
      'station_cat': 'LV1',
      'DN': 1234,
    },
    order2:null,
    order3:null,
    order4:null,
    order5:null,
  },
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
    type: "list"
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

export { tableMapping, tableColumns, ganttChartTableColumns, ganttChartTableMapping, shipmentTableColumns, shipmentTableData}
