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
  hours: {
    label: "hours",
    columnSize: "cell-text",
  },
  status: {
    label: "status",
    columnSize: "cell-text",
  },
  size: {
    label: "size",
    columnSize: "cell-text",
  },
  type: {
    label: "type",
    columnSize: "cell-text",
  },
}

const ganttChartTableData = [
  {
    vehicle: 'WA 5559V',
    pto: 'PTO',
    hours: '13.36',
    status: 'On 1',
    size: '21840',
    type: '1003'
  },
  {
    vehicle: 'WA 5559V',
    hours: '13.36',
    status: 'On 1',
    size: '21840',
    type: '1003'
  },
  {
    vehicle: 'WA 5559V',
    pto: 'PTO',
    hours: '13.36',
    status: 'On 1',
    size: '21840',
    type: '1003'
  },
  {
    vehicle: 'WA 5559V',
    pto: 'PTO',
    hours: '13.36',
    status: 'On 1',
    size: '21840',
    type: '1003'
  },
  {
    vehicle: 'WA 5559V',
    hours: '13.36',
    status: 'On 1',
    size: '21840',
    type: '1003'
  }
]

export { tableMapping, tableColumns, ganttChartTableColumns, ganttChartTableMapping, ganttChartTableData }
