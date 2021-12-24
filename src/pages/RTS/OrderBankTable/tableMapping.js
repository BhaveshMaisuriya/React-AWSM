const tableColumns = [
  "priority",
  "notes",
  "retail_storage_relation.retail",
  "retail_storage_relation.retail_customer_relation.ship_to_company",
  "retail_storage_relation.retail_customer_relation.cloud",
  "trip_no",
  "requested_delivery_date",
  "retail_storage_relation.product_relation_name",
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
  requested_delivery_date: {
    label: "Delivery Date",
    columnSize: "cell-text",
  },
  "retail_storage_relation.product_relation_name": {
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
  "retail_storage_relation.monthly_fixed_quota": {
    label: "Monthly Fixed Quota",
    columnSize: "cell-text",
  },
  "retail_storage_relation.retail_customer_relation.road_tanker_requirement": {
    label: "RT Req",
    columnSize: "cell-text",
  },
  "retail_storage_relation.duration": {
    label: "Duration (Hrs)",
    columnSize: "cell-text",
  },
  "retail_storage_relation.distance": {
    label: "Distance (KM)",
    columnSize: "cell-text",
  },
  "retail_storage_relation.retail_customer_relation.address_relation.address_1": {
    label: "Delivery Address",
    columnSize: "cell-text",
  },
  "retail_storage_relation.retail_customer_relation.address_relation.city": {
    label: "City",
    columnSize: "cell-text",
  },
  "retail_storage_relation.retail_customer_relation.address_relation.postcode": {
    label: "Postcode",
    columnSize: "cell-text",
  },
  "retail_storage_relation.retail_customer_relation.address_relation.state": {
    label: "State",
    columnSize: "cell-text",
  },
  "retail_storage_relation.retail_customer_relation.address_relation.latitude": {
    label: "Latitude",
    columnSize: "cell-text",
  },
  "retail_storage_relation.retail_customer_relation.address_relation.longitude": {
    label: "Longitude",
    columnSize: "cell-text",
  },
  "retail_storage_relation.retail_customer_relation.address_relation.country": {
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
  "retail_storage_relation.retail_customer_relation.contact1_relation.name": {
    label: "Contact Name 1",
    columnSize: "cell-text",
  },
  "retail_storage_relation.retail_customer_relation.contact1_relation.number": {
    label: "Contact Number 1",
    columnSize: "cell-text",
  },
  "retail_storage_relation.retail_customer_relation.contact2_relation.name": {
    label: "Contact Name 2",
    columnSize: "cell-text",
  },
  "retail_storage_relation.retail_customer_relation.contact2_relation.number": {
    label: "Contact Number 2",
    columnSize: "cell-text",
  },
  "retail_storage_relation.retail_customer_relation.contact3_relation.name": {
    label: "Contact Name 3",
    columnSize: "cell-text",
  },
  "retail_storage_relation.retail_customer_relation.contact3_relation.number": {
    label: "Contact Number 3",
    columnSize: "cell-text",
  },
  "retail_storage_relation.retail_customer_relation.territory_manager_relation.name": {
    label: "TM Name",
    columnSize: "cell-text",
  },
  "retail_storage_relation.retail_customer_relation.territory_manager_relation.number": {
    label: "TM Number",
    columnSize: "cell-text",
  },
  "retail_storage_relation.retail_customer_relation.retail_sales_manager_relation.name": {
    label: "RS Name",
    columnSize: "cell-text",
  },
  "retail_storage_relation.retail_customer_relation.retail_sales_manager_relation.number": {
    label: "RS Number",
    columnSize: "cell-text",
  },
  "retail_storage_relation.retail_customer_relation.delivery_open_time.time_from": {
    label: "Delivery Open Time From",
    columnSize: "cell-text",
  },
  "retail_storage_relation.retail_customer_relation.delivery_open_time.time_to": {
    label: "Delivery Open Time To",
    columnSize: "cell-text",
  },
  "retail_storage_relation.retail_customer_relation.actual_open_time_1.days": {
    label: "Open Time 1 Day",
    columnSize: "cell-text",
  },
  "retail_storage_relation.retail_customer_relation.actual_open_time_1.time_from": {
    label: "Open Time 1 From",
    columnSize: "cell-text",
  },
  "retail_storage_relation.retail_customer_relation.actual_open_time_1.time_to": {
    label: "Open Time 1 To",
    columnSize: "cell-text",
  },
  "retail_storage_relation.retail_customer_relation.actual_open_time_2.days": {
    label: "Open Time 2 Day",
    columnSize: "cell-text",
  },
  "retail_storage_relation.retail_customer_relation.actual_open_time_2.time_from": {
    label: "Open Time 2 From",
    columnSize: "cell-text",
  },
  "retail_storage_relation.retail_customer_relation.actual_open_time_2.time_to": {
    label: "Open Time 2 To",
    columnSize: "cell-text",
  },
  "retail_storage_relation.retail_customer_relation.actual_open_time_3.days": {
    label: "Open Time 3 Day",
    columnSize: "cell-text",
  },
  "retail_storage_relation.retail_customer_relation.actual_open_time_3.time_from": {
    label: "Open Time 3 From",
    columnSize: "cell-text",
  },
  "retail_storage_relation.retail_customer_relation.actual_open_time_3.time_to": {
    label: "Open Time 3 To",
    columnSize: "cell-text",
  },
  "retail_storage_relation.retail_customer_relation.no_delivery_interval_1.days": {
    label: "No Del Interval 1",
    columnSize: "cell-text",
  },
  "retail_storage_relation.retail_customer_relation.no_delivery_interval_1.time_from": {
    label: "No Del Interval 1 From",
    columnSize: "cell-text",
  },
  "retail_storage_relation.retail_customer_relation.no_delivery_interval_1.time_to": {
    label: "No Del Interval 1 To",
    columnSize: "cell-text",
  },
  "retail_storage_relation.retail_customer_relation.no_delivery_interval_2.days": {
    label: "No Del Interval 2",
    columnSize: "cell-text",
  },
  "retail_storage_relation.retail_customer_relation.no_delivery_interval_2.time_from": {
    label: "No Del Interval 2 From",
    columnSize: "cell-text",
  },
  "retail_storage_relation.retail_customer_relation.no_delivery_interval_2.time_to": {
    label: "No Del Interval 2 To",
    columnSize: "cell-text",
  },
  "retail_storage_relation.retail_customer_relation.no_delivery_interval_3.days": {
    label: "No Del Interval 3",
    columnSize: "cell-text",
  },
  "retail_storage_relation.retail_customer_relation.no_delivery_interval_3.time_from": {
    label: "No Del Interval 3 From",
    columnSize: "cell-text",
  },
  "retail_storage_relation.retail_customer_relation.no_delivery_interval_3.time_to": {
    label: "No Del Interval 3 To",
    columnSize: "cell-text",
  },
  "retail_storage_relation.retail_customer_relation.no_delivery_interval_4.days": {
    label: "No Del Interval 4",
    columnSize: "cell-text",
  },
  "retail_storage_relation.retail_customer_relation.no_delivery_interval_4.time_from": {
    label: "No Del Interval 4 From",
    columnSize: "cell-text",
  },
  "retail_storage_relation.retail_customer_relation.no_delivery_interval_4.time_to": {
    label: "No Del Interval 4 To",
    columnSize: "cell-text",
  },
  "retail_storage_relation.retail_customer_relation.no_delivery_interval_5.days": {
    label: "No Del Interval 5",
    columnSize: "cell-text",
  },
  "retail_storage_relation.retail_customer_relation.no_delivery_interval_5.time_from": {
    label: "No Del Interval 5 From",
    columnSize: "cell-text",
  },
  "retail_storage_relation.retail_customer_relation.no_delivery_interval_5.time_to": {
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
  "cap",
  "rt_availability_status",
  "utilization_rate",
  "restriction_code",
]

const ganttChartTableDefaultColumns = {
  vehicle: {
    label: "VEHICLE ID",
    columnSize: "cell-text",
  },
  cap: {
    label: "Cap (L)",
    columnSize: "cell-text",
  },
  rt_availability_status: {
    label: "Status",
    columnSize: "cell-text",
  },
  utilization_rate: {
    label: "Util (%)",
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
  cap: {
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
  rt_availability_status: {
    label: "Status",
    columnSize: "cell-text",
    type: "list",
  },
  shift_type: {
    label: "Shift",
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
  max_volume: {
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
