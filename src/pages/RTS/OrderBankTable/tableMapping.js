const tableColumns = [
  "priority",
  "notes",
  "format_ship_to",
  "format_name",
  "format_cloud",
  "trip_no",
  "requested_delivery_date",
  "format_product",
  "volume",
  "retain",
  "runout",
  "format_product_category",
  "dn_status",
  "split_id",
  "order_type",
  "format_accessibility",
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
  format_ship_to: {
    label: "Ship To",
    columnSize: "cell-text",
  },
  format_name: {
    label: "Name",
    columnSize: "cell-text",
    type: "company_name"
  },
  format_cloud: {
    label: "Cloud",
    columnSize: "cell-text",
  },
  trip_no: {
    label: "Trip No.",
    columnSize: "cell-text",
  },
  requested_delivery_date: {
    label: "Delivery Date",
    columnSize: "cell-text",
  },
  format_product: {
    label: "Product",
    columnSize: "cell-text",
  },
  dn_date: {
    label: "DN Date",
    columnSize: "cell-text",
    type: "date",
  },
  volume: {
    label: "Volume (L)",
    columnSize: "cell-text",
  },
  retain: {
    label: "Retain",
    columnSize: "cell-text",
    type: "date",
  },
  runout: {
    label: "Runout",
    columnSize: "cell-text",
    type: "date",
  },
  format_product_category: {
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
  format_accessibility: {
    label: "Accessibility",
    columnSize: "cell-text",
  },
  order_remarks: {
    label: "Order Remarks",
    columnSize: "cell-text",
    type: "order_remarks"
  },
  shift_date: {
    label: "Shift Date",
    columnSize: "cell-text",
  },
  sr: {
    label: "SR",
    columnSize: "cell-text",
  },
  format_site_id: {
    label: "Site ID",
    columnSize: "cell-text",
  },
  format_site_name: {
    label: "Site Name",
    columnSize: "cell-text",
  },
  format_product_code: {
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
  id: {
    label: "Order ID",
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
  format_monthly_fixed_quota: {
    label: "Monthly Fixed Quota",
    columnSize: "cell-text",
  },
  format_rt_req: {
    label: "RT Req",
    columnSize: "cell-text",
  },
  format_duration: {
    label: "Duration (Hrs)",
    columnSize: "cell-text",
  },
  format_distance: {
    label: "Distance (KM)",
    columnSize: "cell-text",
  },
  format_delivery_address: {
    label: "Delivery Address",
    columnSize: "cell-text",
  },
  format_city: {
    label: "City",
    columnSize: "cell-text",
  },
  format_postcode: {
    label: "Postcode",
    columnSize: "cell-text",
  },
  format_state: {
    label: "State",
    columnSize: "cell-text",
  },
  format_latitude: {
    label: "Latitude",
    columnSize: "cell-text",
  },
  format_longitude: {
    label: "Longitude",
    columnSize: "cell-text",
  },
  format_country: {
    label: "Country",
    columnSize: "cell-text",
  },
  format_cluster: {
    label: "Cluster ",
    columnSize: "cell-text",
  },
  format_alt_cluster: {
    label: "Alt cluster",
    columnSize: "cell-text",
  },
  format_border_station: {
    label: "Border Station",
    columnSize: "cell-text",
  },
  format_contact_name_1: {
    label: "Contact Name 1",
    columnSize: "cell-text",
  },
  format_contact_number_1: {
    label: "Contact Number 1",
    columnSize: "cell-text",
  },
  format_contact_name_2: {
    label: "Contact Name 2",
    columnSize: "cell-text",
  },
  format_contact_number_2: {
    label: "Contact Number 2",
    columnSize: "cell-text",
  },
  format_contact_name_3: {
    label: "Contact Name 3",
    columnSize: "cell-text",
  },
  format_contact_number_3: {
    label: "Contact Number 3",
    columnSize: "cell-text",
  },
  format_tm_name: {
    label: "TM Name",
    columnSize: "cell-text",
  },
  format_tm_number: {
    label: "TM Number",
    columnSize: "cell-text",
  },
  format_rs_name: {
    label: "RS Name",
    columnSize: "cell-text",
  },
  format_rs_number: {
    label: "RS Number",
    columnSize: "cell-text",
  },
  format_delivery_open_time_from: {
    label: "Delivery Open Time From",
    columnSize: "cell-text",
  },
  format_delivery_open_time_to: {
    label: "Delivery Open Time To",
    columnSize: "cell-text",
  },
  format_open_time_1_day: {
    label: "Open Time 1 Day",
    columnSize: "cell-text",
  },
  format_open_time_1_from: {
    label: "Open Time 1 From",
    columnSize: "cell-text",
  },
  format_open_time_1_to: {
    label: "Open Time 1 To",
    columnSize: "cell-text",
  },
  format_open_time_2_day: {
    label: "Open Time 2 Day",
    columnSize: "cell-text",
  },
  format_open_time_2_from: {
    label: "Open Time 2 From",
    columnSize: "cell-text",
  },
  format_open_time_2_to: {
    label: "Open Time 2 To",
    columnSize: "cell-text",
  },
  format_open_time_3_day: {
    label: "Open Time 3 Day",
    columnSize: "cell-text",
  },
  format_open_time_3_from: {
    label: "Open Time 3 From",
    columnSize: "cell-text",
  },
  format_open_time_3_to: {
    label: "Open Time 3 To",
    columnSize: "cell-text",
  },
  format_no_del_interval_1: {
    label: "No Del Interval 1",
    columnSize: "cell-text",
  },
  format_no_del_interval_1_from: {
    label: "No Del Interval 1 From",
    columnSize: "cell-text",
  },
  format_no_del_interval_1_to: {
    label: "No Del Interval 1 To",
    columnSize: "cell-text",
  },
  format_no_del_interval_2: {
    label: "No Del Interval 2",
    columnSize: "cell-text",
  },
  format_no_del_interval_2_from: {
    label: "No Del Interval 2 From",
    columnSize: "cell-text",
  },
  format_no_del_interval_2_to: {
    label: "No Del Interval 2 To",
    columnSize: "cell-text",
  },
  format_no_del_interval_3: {
    label: "No Del Interval 3",
    columnSize: "cell-text",
  },
  format_no_del_interval_3_from: {
    label: "No Del Interval 3 From",
    columnSize: "cell-text",
  },
  format_no_del_interval_3_to: {
    label: "No Del Interval 3 To",
    columnSize: "cell-text",
  },
  format_no_del_interval_4: {
    label: "No Del Interval 4",
    columnSize: "cell-text",
  },
  format_no_del_interval_4_from: {
    label: "No Del Interval 4 From",
    columnSize: "cell-text",
  },
  format_no_del_interval_4_to: {
    label: "No Del Interval 4 To",
    columnSize: "cell-text",
  },
  format_no_del_interval_5: {
    label: "No Del Interval 5",
    columnSize: "cell-text",
  },
  format_no_del_interval_5_from: {
    label: "No Del Interval 5 From",
    columnSize: "cell-text",
  },
  format_no_del_interval_5_to: {
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

const ganttChartTableColumns = [
  "vehicle",
  "max_volume",
  "status",
  "utilization_rate",
  "restriction_code",
]

const ganttChartTableDefaultColumns = {
  vehicle: {
    label: "VEHICLE ID",
    columnSize: "cell-text",
  },
  utilization_rate: {
    label: "Util (%)",
    columnSize: "cell-text",
  },
  status: {
    label: "Status",
    columnSize: "cell-text"
  },
  max_volume: {
    label: "Cap (L)",
    columnSize: "cell-text",
  },
  restriction_code: {
    label: "RT Code",
    columnSize: "cell-text",
  },
}

const ganttChartTableMapping = {
  vehicle: {
    label: "Vehicle",
    columnSize: "cell-text",
    key: "frozen",
  },
  max_volume: {
    label: "Cap (L)",
    columnSize: "cell-text",
  },
  owner: {
    label: "Name",
    columnSize: "cell-text",
  },
  chartering_type: {
    label: "Type",
    columnSize: "cell-text",
  },
  shift_type: {
    label: "Shift",
    columnSize: "cell-text",
    type: "list",
  },
  status: {
    label: "Status",
    columnSize: "cell-text",
  },
  pump_type: {
    label: "Pump",
    columnSize: "cell-text",
  },
  daily_available_hours: {
    label: "Hours",
    columnSize: "cell-text",
  },
  utilization_rate: {
    label: "Util (%)",
    columnSize: "cell-text",
  },
  product_type_sap: {
    label: "Product",
    columnSize: "cell-text",
  },
  cap: {
    label: "Capacity",
    columnSize: "cell-text",
  },
  compartment_no: {
    label: "No. of Comp",
    columnSize: "cell-text",
    label_short: "NO. OF...",
  },
  max_weight: {
    label: "Max Weight",
    columnSize: "cell-text",
    label_short: "MAX W...",
  },
  max_weight: {
    label: "Max Weight",
    columnSize: "cell-text",
  },
  customer_type: {
    label: "Cust Type",
    columnSize: "cell-text",
    label_short: "CUST T...",
  },
  restriction_code: {
    label: "RT Code",
    columnSize: "cell-text",
  },
  remarks: {
    label: "Remarks",
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