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

const ganttChartTableColumns = ["vehicle", "shift", "rate", "cap", "rtcode"]

const ganttChartTableDefaultColumns = {
  vehicle: {
    label: "VEHICLE ID",
    columnSize: "cell-text",
  },
  rate: {
    label: "RATE(%)",
    columnSize: "cell-text",
  },
  // shift: {
  //   label: "SHIFT",
  //   columnSize: "cell-text",
  //   type: "list"
  // },
  status: {
    label: "STATUS",
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
  },
}


const ganttChartTableMapping = {
  vehicle: {
    label: "VEHICLE ID",
    columnSize: "cell-text",
    key:"frozen"
  },
  rate: {
    label: "RATE(%)",
    columnSize: "cell-text",
  },
  shift: {
    label: "SHIFT",
    columnSize: "cell-text",
    type: "list",
  },
  cap: {
    label: "CAP(L)",
    columnSize: "cell-text",
  },
  rtcode: {
    label: "RT CODE",
    columnSize: "cell-text",
  },
  name: {
    label: "NAME",
    columnSize: "cell-text",
  },
  status: {
    label: "STATUS",
    columnSize: "cell-text",
  },
  hours: {
    label: "HOURS",
    columnSize: "cell-text",
  },
  product: {
    label: "PRODUCT",
    columnSize: "cell-text",
  },
  pump: {
    label: "PUMP",
    columnSize: "cell-text",
  },
  no_of_com: {
    label: "NO. OF COM",
    label_short: "NO. OF...",
    columnSize: "cell-text",
  },
  max_weight: {
    label: "MAX WEIGHT",
    label_short: "MAX W...",
    columnSize: "cell-text",
  },
  cust_type: {
    label: "CUST TYPE",
    label_short: "CUST T...",
    columnSize: "cell-text",
  },
  type: {
    label: "TYPE",
    columnSize: "cell-text",
  },
  remarks: {
    label: "REMARKS",
    columnSize: "cell-text",
  },
}

export { tableMapping, tableColumns, ganttChartTableColumns,ganttChartTableDefaultColumns ,ganttChartTableMapping,shipmentTableColumns }
