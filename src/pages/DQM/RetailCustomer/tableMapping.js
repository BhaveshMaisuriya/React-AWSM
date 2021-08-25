const tableColumns = [
  "ship_to_party",
  "ship_to_company",
  "site_name",
  "site_id",
  "region_group",
  "cluster",
  "status_awsm",
  "ordering_category_primax_95",
  "road_tanker_accessibility",
  "remarks",
]

const tableMapping = {
  ship_to_party: {
    label: "SHIP TO PARTY",
    apiKey: "ship_to_party",
    columnSize: "cell-text",
    type: "link",
    key: "frozen",
  },
  ship_to_company: {
    label: "SHIP TO COMPANY",
    apiKey: "ship_to_company",
    columnSize: "cell-text-big",
  },
  status_sap: {
    label: "STATUS IN SAP",
    apiKey: "status_sap",
    columnSize: "cell-text",
  },
  sold_to_party: {
    label: "SOLD TO PARTY",
    apiKey: "sold_to_party",
    columnSize: "cell-text",
  },
  sold_to_company: {
    label: "SOLD TO COMPANY",
    apiKey: "sold_to_company",
    columnSize: "cell-text-big",
  },
  site_name: {
    label: "SITE NAME",
    apiKey: "site_name",
    columnSize: "cell-text-big",
  },
  site_id: {
    label: "SITE ID",
    apiKey: "site_id",
    columnSize: "cell-text",
  },
  address_1: {
    label: "ADDRESS",
    apiKey: "address.address_1",
    columnSize: "cell-text-big",
  },
  city: {
    label: "CITY",
    apiKey: "address.city",
    columnSize: "cell-text-big",
  },
  state: {
    label: "STATE",
    apiKey: "address.state",
    columnSize: "cell-text-big",
  },
  postcode: {
    label: "POSTCODE",
    apiKey: "address.postcode",
    columnSize: "cell-text",
  },
  country: {
    label: "COUNTRY",
    apiKey: "address.country",
    columnSize: "cell-text",
  },
  region_group: {
    label: "REGION",
    apiKey: "address.region_group",
    columnSize: "cell-text",
  },
  latitude: {
    label: "LATITUDE",
    apiKey: "address.latitude",
    columnSize: "cell-text",
  },
  longitude: {
    label: "LONGITUDE",
    apiKey: "address.longitude",
    columnSize: "cell-text",
  },
  cluster: {
    label: "CLUSTER",
    apiKey: "cluster",
    columnSize: "cell-text",
  },
  alternative_cluster: {
    label: "ALTERNATIVE CLUSTER",
    apiKey: "alternate_cluster",
    columnSize: "cell-text",
  },
  cloud: {
    label: "CLOUD",
    apiKey: "cloud",
    columnSize: "cell-text",
  },
  border_station: {
    label: "BORDER STATION",
    apiKey: "border_station",
    columnSize: "cell-text",
  },
  speed: {
    label: "SPEED (KM/Hr)",
    apiKey: "speed",
    columnSize: "cell-text",
  },
  contact_1_name: {
    label: "CONTACT PERSON 1 NAME",
    apiKey: "contact_1.name",
    columnSize: "cell-text-big",
  },
  contact_1_number: {
    label: "CONTACT PERSON 1 NUMBER",
    apiKey: "contact_1.number",
    columnSize: "cell-text",
  },
  contact_1_email: {
    label: "CONTACT PERSON 1 EMAIL",
    apiKey: "contact_1.email",
    columnSize: "cell-text-big",
  },
  contact_1_position: {
    label: "CONTACT PERSON 1 POSITION",
    apiKey: "contact_1.position",
    columnSize: "cell-text-big",
  },
  contact_2_name: {
    label: "CONTACT PERSON 2 NAME",
    apiKey: "contact_2.name",
    columnSize: "cell-text-big",
  },
  contact_2_number: {
    label: "CONTACT PERSON 2 NUMBER",
    apiKey: "contact_2.number",
    columnSize: "cell-text",
  },
  contact_2_email: {
    label: "CONTACT PERSON 2 EMAIL",
    apiKey: "contact_2.email",
    columnSize: "cell-text-big",
  },
  contact_2_position: {
    label: "CONTACT PERSON 2 POSITION",
    apiKey: "contact_2.position",
    columnSize: "cell-text-big",
  },
  contact_3_name: {
    label: "CONTACT PERSON 3 NAME",
    apiKey: "contact_3.name",
    columnSize: "cell-text-big",
  },
  contact_3_number: {
    label: "CONTACT PERSON 3 NUMBER",
    apiKey: "contact_3.number",
    columnSize: "cell-text",
  },
  contact_3_email: {
    label: "CONTACT PERSON 3 EMAIL",
    apiKey: "contact_3.email",
    columnSize: "cell-text-big",
  },
  contact_3_position: {
    label: "CONTACT PERSON 3 POSITION",
    apiKey: "contact_3.position",
    columnSize: "cell-text-big",
  },
  territory_manager_name: {
    label: "TERRITORY MANAGER (FUEL)",
    apiKey: "territory_manager.name",
    columnSize: "cell-text-big",
  },
  territory_manager_number: {
    label: "TERRITORY MANAGER NUMBER",
    apiKey: "territory_manager.number",
    columnSize: "cell-text",
  },
  territory_manager_email: {
    label: "TERRITORY MANAGER EMAIL",
    apiKey: "territory_manager.email",
    columnSize: "cell-text-big",
  },
  retail_sales_manager_name: {
    label: "RETAIL SALES MANAGER",
    apiKey: "retail_sales_manager.name",
    columnSize: "cell-text-big",
  },
  retail_sales_manager_number: {
    label: "RETAIL SALES MANAGER NUMBER",
    apiKey: "retail_sales_manager.number",
    columnSize: "cell-text",
  },
  retail_sales_manager_email: {
    label: "RETAIL SALES MANAGER EMAIL",
    apiKey: "retail_sales_manager.email",
    columnSize: "cell-text-big",
  },
  contact_last_updated: {
    label: "CONTACT LAST UPDATE",
    apiKey: "contact_last_updated",
    columnSize: "cell-text-big",
  },
  status_awsm: {
    label: "STATUS IN AWSM",
    apiKey: "status_awsm",
    columnSize: "cell-text",
  },
  close_period_date_from: {
    label: "CLOSE PERIOD FROM DATE",
    columnSize: "cell-text-big",
  },
  close_period_date_to: {
    label: "CLOSE PERIOD TO DATE",
    columnSize: "cell-text-big",
  },
  close_period_time_from: {
    label: "CLOSE PERIOD FROM TIME",
    apiKey: "close_period_1.time_from",
    columnSize: "cell-text-big",
  },
  close_period_time_to: {
    label: "CLOSE PERIOD TO TIME",
    apiKey: "close_period_1.time_to",
    columnSize: "cell-text-big",
  },
  sales_inventory_data_source: {
    label: "SALES AND INVENTORY DATA SOURCE",
    apiKey: "sales_inventory_data_source",
    columnSize: "cell-text-big",
  },
  end_of_day_value: {
    label: "END OF DAY",
    apiKey: "end_of_day",
    columnSize: "cell-text",
  },
  storage_1_code: {
    label: "PRODUCT 1 CODE",
    apiKey: "storage_1.product_code",
    columnSize: "cell-text",
  },
  storage_1_name: {
    label: "PRODUCT 1 NAME",
    apiKey: "storage_1.product_name",
    columnSize: "cell-text-big",
  },
  storage_1_tank_capacity: {
    label: "PRODUCT 1 TANK CAPACITY",
    apiKey: "storage_1.tank_capacity",
    columnSize: "cell-text",
  },
  storage_1_active_product: {
    label: "PRODUCT 1 STATUS",
    apiKey: "storage_1.active_product",
    columnSize: "cell-text",
  },
  storage_1_ordering_category: {
    label: "PRODUCT 1 ORDERING CATEGORY",
    apiKey: "storage_1.ordering_category",
    columnSize: "cell-text",
  },
  storage_1_terminal: {
    label: "PRODUCT 1 TERMINAL",
    apiKey: "storage_1.terminal",
    columnSize: "cell-text-big",
  },
  storage_1_distance: {
    label: "PRODUCT 1 DISTANCE FROM TERMINAL(KM)",
    apiKey: "storage_1.distance",
    columnSize: "cell-text",
  },
  storage_1_duration: {
    label: "PRODUCT 1 DURATION FROM TERMINAL(HRS)",
    apiKey: "storage_1.duration",
    columnSize: "cell-text",
  },
  storage_1_sales_category: {
    label: "PRODUCT 1 SALES CATEGORY",
    apiKey: "storage_1.station_sales_category",
    columnSize: "cell-text",
  },
  storage_1_monthly_fixed_quota: {
    label: "PRODUCT 1 MONTHLY FIXED QUOTA",
    apiKey: "storage_1.product_code_quota",
    columnSize: "cell-text",
  },
  storage_1_remarks: {
    label: "PRODUCT 1 REMARKS",
    apiKey: "storage_1.remarks",
    columnSize: "cell-text-big",
  },
  storage_2_code: {
    label: "PRODUCT 2 CODE",
    apiKey: "storage_2.product_code",
    columnSize: "cell-text",
  },
  storage_2_name: {
    label: "PRODUCT 2 NAME",
    apiKey: "storage_2.product_name",
    columnSize: "cell-text-big",
  },
  storage_2_tank_capacity: {
    label: "PRODUCT 2 TANK CAPACITY",
    apiKey: "storage_2.tank_capacity",
    columnSize: "cell-text",
  },
  storage_2_active_product: {
    label: "PRODUCT 2 STATUS",
    apiKey: "storage_2.active_product",
    columnSize: "cell-text",
  },
  storage_2_ordering_category: {
    label: "PRODUCT 2 ORDERING CATEGORY",
    apiKey: "storage_2.ordering_category",
    columnSize: "cell-text",
  },
  storage_2_terminal: {
    label: "PRODUCT 2 TERMINAL",
    apiKey: "storage_2.terminal",
    columnSize: "cell-text-big",
  },
  storage_2_distance: {
    label: "PRODUCT 2 DISTANCE FROM TERMINAL(KM)",
    apiKey: "storage_2.distance",
    columnSize: "cell-text",
  },
  storage_2_duration: {
    label: "PRODUCT 2 DURATION FROM TERMINAL(HRS)",
    apiKey: "storage_2.duration",
    columnSize: "cell-text",
  },
  storage_2_sales_category: {
    label: "PRODUCT 2 SALES CATEGORY",
    apiKey: "storage_2.station_sales_category",
    columnSize: "cell-text",
  },
  storage_2_monthly_fixed_quota: {
    label: "PRODUCT 2 MONTHLY FIXED QUOTA",
    apiKey: "storage_2.product_code_quota",
    columnSize: "cell-text",
  },
  storage_2_remarks: {
    label: "PRODUCT 2 REMARKS",
    apiKey: "storage_2.remarks",
    columnSize: "cell-text-big",
  },
  storage_3_code: {
    label: "PRODUCT 3 CODE",
    apiKey: "storage_3.product_code",
    columnSize: "cell-text",
  },
  storage_3_name: {
    label: "PRODUCT 3 NAME",
    apiKey: "storage_3.product_name",
    columnSize: "cell-text-big",
  },
  storage_3_tank_capacity: {
    label: "PRODUCT 3 TANK CAPACITY",
    apiKey: "storage_3.tank_capacity",
    columnSize: "cell-text",
  },
  storage_3_active_product: {
    label: "PRODUCT 3 STATUS",
    apiKey: "storage_3.active_product",
    columnSize: "cell-text",
  },
  storage_3_ordering_category: {
    label: "PRODUCT 3 ORDERING CATEGORY",
    apiKey: "storage_3.ordering_category",
    columnSize: "cell-text",
  },
  storage_3_terminal: {
    label: "PRODUCT 3 TERMINAL",
    apiKey: "storage_3.terminal",
    columnSize: "cell-text-big",
  },
  storage_3_distance: {
    label: "PRODUCT 3 DISTANCE FROM TERMINAL(KM)",
    apiKey: "storage_3.distance",
    columnSize: "cell-text",
  },
  storage_3_duration: {
    label: "PRODUCT 3 DURATION FROM TERMINAL(HRS)",
    apiKey: "storage_3.duration",
    columnSize: "cell-text",
  },
  storage_3_sales_category: {
    label: "PRODUCT 3 SALES CATEGORY",
    apiKey: "storage_3.station_sales_category",
    columnSize: "cell-text",
  },
  storage_3_monthly_fixed_quota: {
    label: "PRODUCT 3 MONTHLY FIXED QUOTA",
    apiKey: "storage_3.product_code_quota",
    columnSize: "cell-text",
  },
  storage_3_remarks: {
    label: "PRODUCT 3 REMARKS",
    apiKey: "storage_3.remarks",
    columnSize: "cell-text-big",
  },
  storage_4_code: {
    label: "PRODUCT 4 CODE",
    apiKey: "storage_4.product_code",
    columnSize: "cell-text",
  },
  storage_4_name: {
    label: "PRODUCT 4 NAME",
    apiKey: "storage_4.product_name",
    columnSize: "cell-text-big",
  },
  storage_4_tank_capacity: {
    label: "PRODUCT 4 TANK CAPACITY",
    apiKey: "storage_4.tank_capacity",
    columnSize: "cell-text",
  },
  storage_4_active_product: {
    label: "PRODUCT 4 STATUS",
    apiKey: "storage_4.active_product",
    columnSize: "cell-text",
  },
  storage_4_ordering_category: {
    label: "PRODUCT 4 ORDERING CATEGORY",
    apiKey: "storage_4.ordering_category",
    columnSize: "cell-text",
  },
  storage_4_terminal: {
    label: "PRODUCT 4 TERMINAL",
    apiKey: "storage_4.terminal",
    columnSize: "cell-text-big",
  },
  storage_4_distance: {
    label: "PRODUCT 4 DISTANCE FROM TERMINAL(KM)",
    apiKey: "storage_4.distance",
    columnSize: "cell-text",
  },
  storage_4_duration: {
    label: "PRODUCT 4 DURATION FROM TERMINAL(HRS)",
    apiKey: "storage_4.duration",
    columnSize: "cell-text",
  },
  storage_4_sales_category: {
    label: "PRODUCT 4 SALES CATEGORY",
    apiKey: "storage_4.station_sales_category",
    columnSize: "cell-text",
  },
  storage_4_monthly_fixed_quota: {
    label: "PRODUCT 4 MONTHLY FIXED QUOTA",
    apiKey: "storage_4.product_code_quota",
    columnSize: "cell-text",
  },
  storage_4_remarks: {
    label: "PRODUCT 4 REMARKS",
    apiKey: "storage_4.remarks",
    columnSize: "cell-text-big",
  },
  storage_5_code: {
    label: "PRODUCT 5 CODE",
    apiKey: "storage_5.product_code",
    columnSize: "cell-text",
  },
  storage_5_name: {
    label: "PRODUCT 5 NAME",
    apiKey: "storage_5.product_name",
    columnSize: "cell-text-big",
  },
  storage_5_tank_capacity: {
    label: "PRODUCT 5 TANK CAPACITY",
    apiKey: "storage_5.tank_capacity",
    columnSize: "cell-text",
  },
  storage_5_active_product: {
    label: "PRODUCT 5 STATUS",
    apiKey: "storage_5.active_product",
    columnSize: "cell-text",
  },
  storage_5_ordering_category: {
    label: "PRODUCT 5 ORDERING CATEGORY",
    apiKey: "storage_5.ordering_category",
    columnSize: "cell-text",
  },
  storage_5_terminal: {
    label: "PRODUCT 5 TERMINAL",
    apiKey: "storage_5.terminal",
    columnSize: "cell-text-big",
  },
  storage_5_distance: {
    label: "PRODUCT 5 DISTANCE FROM TERMINAL(KM)",
    apiKey: "storage_5.distance",
    columnSize: "cell-text",
  },
  storage_5_duration: {
    label: "PRODUCT 5 DURATION FROM TERMINAL(HRS)",
    apiKey: "storage_5.duration",
    columnSize: "cell-text",
  },
  storage_5_sales_category: {
    label: "PRODUCT 5 SALES CATEGORY",
    apiKey: "storage_5.station_sales_category",
    columnSize: "cell-text",
  },
  storage_5_monthly_fixed_quota: {
    label: "PRODUCT 5 MONTHLY FIXED QUOTA",
    apiKey: "storage_5.product_code_quota",
    columnSize: "cell-text",
  },
  storage_5_remarks: {
    label: "PRODUCT 5 REMARKS",
    apiKey: "storage_5.remarks",
    columnSize: "cell-text-big",
  },
  storage_6_code: {
    label: "PRODUCT 6 CODE",
    apiKey: "storage_6.product_code",
    columnSize: "cell-text",
  },
  storage_6_name: {
    label: "PRODUCT 6 NAME",
    apiKey: "storage_6.product_name",
    columnSize: "cell-text-big",
  },
  storage_6_tank_capacity: {
    label: "PRODUCT 6 TANK CAPACITY",
    apiKey: "storage_6.tank_capacity",
    columnSize: "cell-text",
  },
  storage_6_active_product: {
    label: "PRODUCT 6 STATUS",
    apiKey: "storage_6.active_product",
    columnSize: "cell-text",
  },
  storage_6_ordering_category: {
    label: "PRODUCT 6 ORDERING CATEGORY",
    apiKey: "storage_6.ordering_category",
    columnSize: "cell-text",
  },
  storage_6_terminal: {
    label: "PRODUCT 6 TERMINAL",
    apiKey: "storage_6.terminal",
    columnSize: "cell-text-big",
  },
  storage_6_distance: {
    label: "PRODUCT 6 DISTANCE FROM TERMINAL(KM)",
    apiKey: "storage_6.distance",
    columnSize: "cell-text",
  },
  storage_6_duration: {
    label: "PRODUCT 6 DURATION FROM TERMINAL(HRS)",
    apiKey: "storage_6.duration",
    columnSize: "cell-text",
  },
  storage_6_sales_category: {
    label: "PRODUCT 6 SALES CATEGORY",
    apiKey: "storage_6.station_sales_category",
    columnSize: "cell-text",
  },
  storage_6_monthly_fixed_quota: {
    label: "PRODUCT 6 MONTHLY FIXED QUOTA",
    apiKey: "storage_6.product_code_quota",
    columnSize: "cell-text",
  },
  storage_6_remarks: {
    label: "PRODUCT 6 REMARKS",
    apiKey: "storage_6.remarks",
    columnSize: "cell-text-big",
  },
  road_tanker_requirement: {
    label: "ROAD TANKER REQUIREMENT",
    apiKey: "road_tanker_requirement",
    columnSize: "cell-text-big",
  },
  ordering_category_primax_95: {
    label: "ORDERING CATEGORY OF PRIMAX 95",
    apiKey: "ordering_category_primax_95",
    columnSize: "cell-text",
  },
  road_tanker_accessibility: {
    label: "ROAD TANKER ACCESSIBILITY",
    apiKey: "road_tanker_accessibility",
    columnSize: "cell-text",
  },
  remarks: {
    label: "REMARKS",
    apiKey: "remarks",
    columnSize: "cell-text-big",
  },
  // delivery_open_time_1_value: {
  //   label: "DELIVERY OPEN DAY 1",
  //   apiKey: "delivery_open_time_1.days",
  //   columnSize: "cell-text-big",
  // },
  delivery_open_time_from: {
    label: "DELIVERY OPEN TIME FROM",
    apiKey: "delivery_open_time_1.time_from",
    columnSize: "cell-text",
  },
  delivery_open_time_to: {
    label: "DELIVERY OPEN TIME TO",
    apiKey: "delivery_open_time_1.time_to",
    columnSize: "cell-text",
  },
  actual_open_time_1_value: {
    label: "ACTUAL OPEN DAY 1",
    apiKey: "actual_open_time_1.days",
    columnSize: "cell-text-big",
  },
  actual_open_time_1_time_from: {
    label: "ACTUAL OPEN TIME FROM 1",
    apiKey: "actual_open_time_1.time_from",
    columnSize: "cell-text",
  },
  actual_open_time_1_time_to: {
    label: "ACTUAL OPEN TIME TO 1",
    apiKey: "actual_open_time_1.time_to",
    columnSize: "cell-text",
  },
  actual_open_time_2_value: {
    label: "ACTUAL OPEN DAY 2",
    apiKey: "actual_open_time_2.days",
    columnSize: "cell-text-big",
  },
  actual_open_time_2_time_from: {
    label: "ACTUAL OPEN TIME FROM 2",
    apiKey: "actual_open_time_2.time_from",
    columnSize: "cell-text",
  },
  actual_open_time_2_time_to: {
    label: "ACTUAL OPEN TIME TO 2",
    apiKey: "actual_open_time_2.time_to",
    columnSize: "cell-text",
  },
  actual_open_time_3_value: {
    label: "ACTUAL OPEN DAY 3",
    apiKey: "actual_open_time_3.days",
    columnSize: "cell-text-big",
  },
  actual_open_time_3_time_from: {
    label: "ACTUAL OPEN TIME FROM 3",
    apiKey: "actual_open_time_3.time_from",
    columnSize: "cell-text",
  },
  actual_open_time_3_time_to: {
    label: "ACTUAL OPEN TIME TO 3",
    apiKey: "actual_open_time_3.time_to",
    columnSize: "cell-text",
  },
  no_delivery_interval_1_value: {
    label: "NO DELIVERY INTERVAL 1 DAY",
    apiKey: "no_delivery_interval_1.value",
    columnSize: "cell-text-big",
  },
  no_delivery_interval_1_time_from: {
    label: "NO DELIVERY INTERVAL TIME FROM 1",
    apiKey: "no_delivery_interval_1.time_from",
    columnSize: "cell-text",
  },
  no_delivery_interval_1_time_to: {
    label: "NO DELIVERY INTERVAL TIME TO 1",
    apiKey: "no_delivery_interval_1.time_to",
    columnSize: "cell-text",
  },
  no_delivery_interval_2_value: {
    label: "NO DELIVERY INTERVAL DAY 2",
    apiKey: "no_delivery_interval_2.value",
    columnSize: "cell-text-big",
  },
  no_delivery_interval_2_time_from: {
    label: "NO DELIVERY INTERVAL TIME FROM 2",
    apiKey: "no_delivery_interval_2.time_from",
    columnSize: "cell-text",
  },
  no_delivery_interval_2_time_to: {
    label: "NO DELIVERY INTERVAL TIME TO 2",
    apiKey: "no_delivery_interval_2.time_to",
    columnSize: "cell-text",
  },
  no_delivery_interval_3_value: {
    label: "NO DELIVERY INTERVAL DAY 3",
    apiKey: "no_delivery_interval_3.value",
    columnSize: "cell-text-big",
  },
  no_delivery_interval_3_time_from: {
    label: "NO DELIVERY INTERVAL TIME FROM 3",
    apiKey: "no_delivery_interval_3.time_from",
    columnSize: "cell-text",
  },
  no_delivery_interval_3_time_to: {
    label: "NO DELIVERY INTERVAL TIME TO 3",
    apiKey: "no_delivery_interval_3.time_to",
    columnSize: "cell-text",
  },
  no_delivery_interval_4_value: {
    label: "NO DELIVERY INTERVAL DAY 4",
    apiKey: "no_delivery_interval_4.value",
    columnSize: "cell-text-big",
  },
  no_delivery_interval_4_time_from: {
    label: "NO DELIVERY INTERVAL TIME FROM 4",
    apiKey: "no_delivery_interval_4.time_from",
    columnSize: "cell-text",
  },
  no_delivery_interval_4_time_to: {
    label: "NO DELIVERY INTERVAL TIME TO 4",
    apiKey: "no_delivery_interval_4.time_to",
    columnSize: "cell-text",
  },
  no_delivery_interval_5_value: {
    label: "NO DELIVERY INTERVAL DAY 5",
    apiKey: "no_delivery_interval_5.value",
    columnSize: "cell-text-big",
  },
  no_delivery_interval_5_time_from: {
    label: "NO DELIVERY INTERVAL TIME FROM 5",
    apiKey: "no_delivery_interval_5.time_from",
    columnSize: "cell-text",
  },
  no_delivery_interval_5_time_to: {
    label: "NO DELIVERY INTERVAL TIME TO 5",
    apiKey: "no_delivery_interval_5.time_to",
    columnSize: "cell-text",
  },
}

export { tableMapping, tableColumns }
