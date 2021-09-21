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
    label: "Priority",
    columnSize: "cell-text",
    extraText: "(with SR Remarks)",
    type: "priority_type",
  },
  notes: {
    label: "notes",
    columnSize: "cell-text",
    key: "frozen",
  },
  ship_to: {
    label: "Ship To",
    columnSize: "cell-text",
  },
  name: {
    label: "Name",
    columnSize: "cell-text",
  },
  cloud: {
    label: "Cloud",
    columnSize: "cell-text",
  },
  trip: {
    label: "Trip",
    columnSize: "cell-text",
  },
  delivery_date: {
    label: "Delivery date",
    columnSize: "cell-text",
  },
  product: {
    label: "Product",
    columnSize: "cell-text",
  },
  volume: {
    label: "Volume (L)",
    columnSize: "cell-text",
  },
  retain: {
    label: "Retain",
    columnSize: "cell-text",
  },
  runout: {
    label: "Runout",
    columnSize: "cell-text",
  },
  product_category: {
    label: "Product Category",
    columnSize: "cell-text",
  },
  dn_status: {
    label: "DN Status",
    columnSize: "cell-text",
    type: "dn_status",
  },
  split_id: {
    label: "Split ID",
    columnSize: "cell-text",
  },
  order_type: {
    label: "Order Type",
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
