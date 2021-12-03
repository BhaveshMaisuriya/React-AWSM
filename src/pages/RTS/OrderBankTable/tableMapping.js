const tableColumns = [
  "priority",
  "notes",
  "retail_storage_relation.retail",
  "retail_storage_relation.retail_customer_relation.ship_to_company",
  "retail_storage_relation.retail_customer_relation.cloud",
  "trip",
  "dn_date",
  "retail_storage_relation.product",
  "volume",
  "retain",
  "runout",
  "retail_storage_relation.sales_category",
  "dn_status",
  "split_id",
  "order_type",
  "retail_storage_relation.retail_customer_relation.road_tanker_accessibility",
  "order_remarks",
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
  "retail_storage_relation.retail": {
    label: "Ship To",
    columnSize: "cell-text",
  },
  "retail_storage_relation.retail_customer_relation.ship_to_company": {
    label: "Name",
    columnSize: "cell-text",
  },
  "retail_storage_relation.retail_customer_relation.cloud": {
    label: "Cloud",
    columnSize: "cell-text",
  },
  trip_no: {
    label: "Trip No.",
    columnSize: "cell-text",
  },
  dn_date: {
    label: "DN Date",
    columnSize: "cell-text",
  },
  "retail_storage_relation.product": {
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
  "retail_storage_relation.sales_category": {
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
  "retail_storage_relation.retail_customer_relation.road_tanker_accessibility": {
    label: "Accessibility",
    columnSize: "cell-text",
  },
  order_remarks: {
    label: "Order Remarks",
    columnSize: "cell-text",
  },
  shift_date: {
    label: "Shift Date",
    columnSize: "cell-text",
  },
  sr: {
    label: "SR",
    columnSize: "cell-text",
  },
  "retail_storage_relation.retail_customer_relation.site_id": {
    label: "Site ID",
    columnSize: "cell-text",
  },
  "retail_storage_relation.retail_customer_relation.site_name": {
    label: "Site Name",
    columnSize: "cell-text",
  },
  "retail_storage_relation.product": {
    label: "Product Code",
    columnSize: "cell-text",
  },
  dn_no: {
    label: "DN No",
    columnSize: "cell-text",
  },
  dn_created_at: {
    label: "DN Time Creation ",
    columnSize: "cell-text",
  },
  dn_created_by: {
    label: "DN Created By",
    columnSize: "cell-text",
  },
  customer_type: {
    label: "Customer Type",
    columnSize: "cell-text",
  },
  order_id: {
    label: "Order ID",
    columnSize: "cell-text",
  },
  requested_delivery_date: {
    label: "Requested Delivery date",
    columnSize: "cell-text",
  },
  multi_load_id: {
    label: "Multiload ID ",
    columnSize: "cell-text",
  },
  multi_prod_id: {
    label: "Multiprod ID ",
    columnSize: "cell-text",
  },
  route_id: {
    label: "Route ID",
    columnSize: "cell-text",
  },
  vehicle: {
    label: "Vehicle ",
    columnSize: "cell-text",
  },
  shipment: {
    label: "Shipment",
    columnSize: "cell-text",
  },
  shipment_date: {
    label: "Shipment Date",
    columnSize: "cell-text",
  },
  planned_load_time: {
    label: "Planned Load time",
    columnSize: "cell-text",
  },
  eta: {
    label: "ETA",
    columnSize: "cell-text",
  },
  opening_stock_days: {
    label: "Opening Stock days",
    columnSize: "cell-text",
  },
  closing_stock_days: {
    label: "Closing Stock days",
    columnSize: "cell-text",
  },
  current_stock_days: {
    label: "Current Stock days",
    columnSize: "cell-text",
  },
  ullage: {
    label: "Ullage (L)",
    columnSize: "cell-text",
  },
  out_of_stock: {
    label: "Out Of Stock",
    columnSize: "cell-text",
  },
  max_stock_days: {
    label: "Max Stock days",
    columnSize: "cell-text",
  },
  "retail_storage_relation.monthly_fixed_quota": {
    label: "Monthly Fixed Quota",
    columnSize: "cell-text",
  },
  "retail_storage_relation.retail_customer_relation.road_tanker_requirement": {
    label: "RT Req",
    columnSize: "cell-text",
  },
  duration: {
    label: "Duration (Hrs)",
    columnSize: "cell-text",
  },
  distance: {
    label: "Distance (KM)",
    columnSize: "cell-text",
  },
  delivery_address: {
    label: "Delivery Address",
    columnSize: "cell-text",
  },
  city: {
    label: "City",
    columnSize: "cell-text",
  },
  postcode: {
    label: "Postcode",
    columnSize: "cell-text",
  },
  state: {
    label: "State",
    columnSize: "cell-text",
  },
  latitude: {
    label: "Latitude",
    columnSize: "cell-text",
  },
  longitude: {
    label: "Longitude",
    columnSize: "cell-text",
  },
  country: {
    label: "Country",
    columnSize: "cell-text",
  },
  "retail_storage_relation.retail_customer_relation.cluster": {
    label: "Cluster ",
    columnSize: "cell-text",
  },
  "retail_storage_relation.retail_customer_relation.alternative_cluster": {
    label: "Alt cluster",
    columnSize: "cell-text",
  },
  "retail_storage_relation.retail_customer_relation.border_station": {
    label: "Border Station",
    columnSize: "cell-text",
  },
  contact_name_1: {
    label: "Contact Name 1",
    columnSize: "cell-text",
  },
  contact_number_1: {
    label: "Contact Number 1",
    columnSize: "cell-text",
  },
  contact_name_2: {
    label: "Contact Name 2",
    columnSize: "cell-text",
  },
  contact_number_2: {
    label: "Contact Number 2",
    columnSize: "cell-text",
  },
  contact_name_3: {
    label: "Contact Name 3",
    columnSize: "cell-text",
  },
  contact_number_3: {
    label: "Contact Number 3",
    columnSize: "cell-text",
  },
  tm_name: {
    label: "TM Name",
    columnSize: "cell-text",
  },
  tm_number: {
    label: "TM Number",
    columnSize: "cell-text",
  },
  rs_name: {
    label: "RS Name",
    columnSize: "cell-text",
  },
  rs_number: {
    label: "RS Number",
    columnSize: "cell-text",
  },
  delivery_open_time_From: {
    label: "Delivery Open Time From",
    columnSize: "cell-text",
  },
  delivery_open_time_To: {
    label: "Delivery Open Time To",
    columnSize: "cell-text",
  },
  open_time_1_day: {
    label: "Open Time 1 Day",
    columnSize: "cell-text",
  },
  open_time_1_from: {
    label: "Open Time 1 From",
    columnSize: "cell-text",
  },
  open_time_1_to: {
    label: "Open Time 1 To",
    columnSize: "cell-text",
  },
  open_time_2_day: {
    label: "Open Time 2 Day",
    columnSize: "cell-text",
  },
  open_time_2_from: {
    label: "Open Time 2 From",
    columnSize: "cell-text",
  },
  open_time_2_to: {
    label: "Open Time 2 To",
    columnSize: "cell-text",
  },
  open_time_3_day: {
    label: "Open Time 3 Day",
    columnSize: "cell-text",
  },
  open_time_3_from: {
    label: "Open Time 3 From",
    columnSize: "cell-text",
  },
  open_time_3_to: {
    label: "Open Time 3 To",
    columnSize: "cell-text",
  },
  no_del_interval_1: {
    label: "No Del Interval 1",
    columnSize: "cell-text",
  },
  no_del_interval_1_from: {
    label: "No Del Interval 1 From",
    columnSize: "cell-text",
  },
  no_del_interval_1_to: {
    label: "No Del Interval 1 To",
    columnSize: "cell-text",
  },
  no_del_interval_2: {
    label: "No Del Interval 2",
    columnSize: "cell-text",
  },
  no_del_interval_2_from: {
    label: "No Del Interval 2 From",
    columnSize: "cell-text",
  },
  no_del_interval_2_to: {
    label: "No Del Interval 2 To",
    columnSize: "cell-text",
  },
  no_del_interval_3: {
    label: "No Del Interval 3",
    columnSize: "cell-text",
  },
  no_del_interval_3_from: {
    label: "No Del Interval 3 From",
    columnSize: "cell-text",
  },
  no_del_interval_3_to: {
    label: "No Del Interval 3 To",
    columnSize: "cell-text",
  },
  no_del_interval_4: {
    label: "No Del Interval 4",
    columnSize: "cell-text",
  },
  no_del_interval_4_from: {
    label: "No Del Interval 4 From",
    columnSize: "cell-text",
  },
  no_del_interval_4_to: {
    label: "No Del Interval 4 To",
    columnSize: "cell-text",
  },
  no_del_interval_5: {
    label: "No Del Interval 5",
    columnSize: "cell-text",
  },
  no_del_interval_5_from: {
    label: "No Del Interval 5 From",
    columnSize: "cell-text",
  },
  no_del_interval_5_to: {
    label: "No Del Interval 5 To",
    columnSize: "cell-text",
  },
  remarks: {
    label: "Remarks",
    columnSize: "cell-text",
  },
  sales_order_no: {
    label: "Sales Order No",
    columnSize: "cell-text",
  },
  my_remark_1: {
    label: "My Remark 1",
    columnSize: "cell-text",
  },
  my_remark_2: {
    label: "My Remark 2",
    columnSize: "cell-text",
  },
  my_remark_3: {
    label: "My Remark 3",
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
  shift: {
    label: "SHIFT",
    columnSize: "cell-text",
    type: "list",
  },
  // status: {
  //   label: "STATUS",
  //   columnSize: "cell-text",
  //   type: "list"

  // },
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
    label: "VEHICLE",
    columnSize: "cell-text",
    key: "frozen",
  },
  rate: {
    label: "RATE (%)",
    columnSize: "cell-text",
  },
  shift: {
    label: "SHIFT",
    columnSize: "cell-text",
    type: "list",
  },
  cap: {
    label: "CAP (L)",
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

export {
  tableMapping,
  tableColumns,
  ganttChartTableColumns,
  ganttChartTableDefaultColumns,
  ganttChartTableMapping,
  shipmentTableColumns,
}
