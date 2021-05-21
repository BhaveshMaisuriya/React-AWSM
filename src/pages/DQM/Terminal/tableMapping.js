const tableColumns = [
  "ship_to_party",
  "ship_to_company",
  "site_name",
  "site_id",
  "region_group",
  "state",
  "station_cluster",
  "station_status_awsm",
  "product_1_station_sales_category",
  "road_tanker_accessibility",
  "remarks",
]

const tableMapping = {
  ship_to_party: {
    label: "SHIP TO PARTY",
    apiKey: "ship_to_party",
    columnSize: 1,
  },
  ship_to_company: {
    label: "SHIP TO COMPANY",
    apiKey: "ship_to_company",
    columnSize: 2,
  },
  site_id: {
    label: "SITE ID",
    apiKey: "site_id",
    columnSize: 1,
  },
  site_name: {
    label: "SITE NAME",
    apiKey: "site_name",
    columnSize: 2,
  },
  station_cluster: {
    label: "CLUSTER",
    apiKey: "station_cluster",
    columnSize: 1,
  },
  station_status_sap: {
    label: "STATION STATUS IN SAP",
    apiKey: "station_status_sap",
    columnSize: 1,
  },
  station_status_awsm: {
    label: "STATION STATUS IN AWSM",
    apiKey: "station_status_awsm",
    columnSize: 1,
  },
  city: {
    label: "CITY",
    apiKey: "address_table.city",
    columnSize: 2,
  },
  state: {
    label: "STATE",
    apiKey: "address_table.state",
    columnSize: 2,
  },
  country: {
    label: "COUNTRY",
    apiKey: "address_table.country",
    columnSize: 2,
  },
  postcode: {
    label: "POSTCODE",
    apiKey: "address_table.postcode",
    columnSize: 2,
  },
  latitude: {
    label: "LATITUDE",
    apiKey: "address_table.latitude",
    columnSize: 2,
  },
  longitude: {
    label: "LONGITUDE",
    apiKey: "address_table.longitude",
    columnSize: 2,
  },
  region_group: {
    label: "REGION",
    apiKey: "address_table.region_group",
    columnSize: 1,
  },
  address: {
    label: "ADDRESS",
    apiKey: "address_table.address_1",
    columnSize: 2,
  },
  remarks: {
    label: "REMARKS",
    apiKey: "remarks",
    columnSize: 2,
  },
  territory_manager_name: {
    label: "TERRITORY MANAGER (FUEL)",
    apiKey: "territory_manager_name",
    columnSize: 2,
  },
  territory_manager_name: {
    label: "TERRITORY MANAGER (FUEL)",
    apiKey: "territory_manager_name",
    columnSize: 2,
  },
  territory_manager_number: {
    label: "TERRITORY MANAGER NUMBER",
    apiKey: "territory_manager_number",
    columnSize: 2,
  },
  retail_sales_manager_name: {
    label: "RETAIL SALES MANAGER",
    apiKey: "retail_sales_manager_name",
    columnSize: 2,
  },
  retail_sales_manager_number: {
    label: "RETAIL SALES MANAGER NUMBER",
    apiKey: "retail_sales_manager_number",
    columnSize: 1,
  },
  retail_sales_manager_email: {
    label: "RETAIL SALES MANAGER EMAIL",
    apiKey: "retail_sales_manager_email",
    columnSize: 2,
  },
  contact_last_updated: {
    label: "CONTACT LAST UPDATE",
    apiKey: "contact_last_updated",
    columnSize: 2,
  },
  sales_inventory_data_source: {
    label: "SALES AND INVENTORY DATA SOURCE",
    apiKey: "sales_inventory_data_source",
    columnSize: 1,
  },
  end_of_day: {
    label: "END OF DAY",
    apiKey: "end_of_day",
    columnSize: 1,
  },
  road_tanker_requirement: {
    label: "ROAD TANKER REQUIREMENT",
    apiKey: "road_tanker_requirement",
    columnSize: 2,
  },
  road_tanker_accessibility: {
    label: "ROAD TANKER ACCESSIBILITY",
    apiKey: "road_tanker_accessibility",
    columnSize: 1,
  },
  sold_to_party: {
    label: "SOLD TO PARTY",
    apiKey: "sold_to_party",
    columnSize: 1,
  },
  sold_to_company: {
    label: "SOLD TO COMPANY",
    apiKey: "sold_to_company",
    columnSize: 1,
  },
  alternate_cluster: {
    label: "ALTERNATE CLUSTER",
    apiKey: "alternate_cluster",
    columnSize: 1,
  },
  cloud: {
    label: "CLOUD",
    apiKey: "cloud",
    columnSize: 1,
  },
  border_station: {
    label: "BORDER STATION",
    apiKey: "border_station",
    columnSize: 1,
  },
  distance_from_terminal: {
    label: "DISTANCE FROM TERMINAL",
    apiKey: "distance_from_terminal",
    columnSize: 1,
  },
  speed: {
    label: "SPEED",
    apiKey: "speed",
    columnSize: 1,
  },
  delivery_open_time: {
    label: "DELIVERY OPEN TIME",
    apiKey: "delivery_open_time",
    columnSize: 2,
  },
  contact_person1_contact_person_name: {
    label: "CONTACT PERSON 1 EMAIL",
    apiKey: "contact_person1.contact_person_name",
    columnSize: 1,
  },
  contact_person1_contact_person_number: {
    label: "CONTACT PERSON 1 NAME",
    apiKey: "contact_person1.contact_person_number",
    columnSize: 1,
  },
  contact_person1_contact_person_email: {
    label: "CONTACT PERSON 1 EMAIL",
    apiKey: "contact_person1.contact_person_email",
    columnSize: 1,
  },
  contact_person1_contact_person_position: {
    label: "CONTACT PERSON 1 POSITION",
    apiKey: "contact_person1.contact_person_position",
    columnSize: 1,
  },
  contact_person2_contact_person_name: {
    label: "CONTACT PERSON 2 NAME",
    apiKey: "contact_person2.contact_person_name",
    columnSize: 1,
  },
  contact_person2_contact_person_number: {
    label: "CONTACT PERSON 2 NUMBER",
    apiKey: "contact_person2.contact_person_number",
    columnSize: 1,
  },
  contact_person2_contact_person_email: {
    label: "CONTACT PERSON 2 EMAIL",
    apiKey: "contact_person2.contact_person_email",
    columnSize: 1,
  },
  contact_person2_contact_person_position: {
    label: "CONTACT PERSON 2 POSITION",
    apiKey: "contact_person2.contact_person_position",
    columnSize: 1,
  },
  contact_person3_contact_person_name: {
    label: "CONTACT PERSON 3 NAME",
    apiKey: "contact_person3.contact_person_name",
    columnSize: 1,
  },
  contact_person3_contact_person_number: {
    label: "CONTACT PERSON 3 NUMBER",
    apiKey: "contact_person3.contact_person_number",
    columnSize: 1,
  },
  contact_person3_contact_person_email: {
    label: "CONTACT PERSON 3 EMAIL",
    apiKey: "contact_person3.contact_person_email",
    columnSize: 1,
  },
  contact_person3_contact_person_position: {
    label: "CONTACT PERSON 3 POSITION",
    apiKey: "contact_person3.contact_person_position",
    columnSize: 1,
  },
  product_1_product_code: {
    label: "PRODUCT 1 CODE",
    apiKey: "product_1.product_code",
    columnSize: 1,
  },
  product_1_product_name: {
    label: "PRODUCT 1 NAME",
    apiKey: "product_1.product_name",
    columnSize: 2,
  },
  product_1_tank_capacity: {
    label: "PRODUCT 1 TANK CAPACITY",
    apiKey: "product_1.tank_capacity",
    columnSize: 1,
  },
  product_1_active_product: {
    label: "PRODUCT 1 STATUS",
    apiKey: "product_1.active_product",
    columnSize: 1,
  },
  product_1_ordering_category: {
    label: "PRODUCT 1 ORDERING CATEGORY",
    apiKey: "product_1.ordering_category",
    columnSize: 1,
  },
  product_1_terminal: {
    label: "PRODUCT 1 TERMINAL",
    apiKey: "product_1.terminal",
    columnSize: 2,
  },
  product_1_distance: {
    label: "PRODUCT 1 DISTANCE FROM TERMINAL(KM)",
    apiKey: "product_1.distance",
    columnSize: 1,
  },
  product_1_duration: {
    label: "PRODUCT 1 DURATION FROM TERMINAL(HRS)",
    apiKey: "product_1.duration",
    columnSize: 1,
  },
  product_1_remarks: {
    label: "PRODUCT 1 REMARKS",
    apiKey: "product_1.remarks",
    columnSize: 2,
  },
  product_1_station_sales_category: {
    label: "PRODUCT 1 SALES CATEGORY",
    apiKey: "product_1.station_sales_category",
    columnSize: 1,
  },
  product_1_product_code_quota: {
    label: "PRODUCT 1 MONTHLY FIXED QUOTA",
    apiKey: "product_1.product_code_quota",
    columnSize: 1,
  },
  product_2_product_code: {
    label: "PRODUCT 2 CODE",
    apiKey: "product_2.product_code",
    columnSize: 1,
  },
  product_2_product_name: {
    label: "PRODUCT 2 NAME",
    apiKey: "product_2.product_name",
    columnSize: 2,
  },
  product_2_tank_capacity: {
    label: "PRODUCT 2 TANK CAPACITY",
    apiKey: "product_2.tank_capacity",
    columnSize: 1,
  },
  product_2_active_product: {
    label: "PRODUCT 2 STATUS",
    apiKey: "product_2.active_product",
    columnSize: 1,
  },
  product_2_ordering_category: {
    label: "PRODUCT 2 ORDERING CATEGORY",
    apiKey: "product_2.ordering_category",
    columnSize: 1,
  },
  product_2_terminal: {
    label: "PRODUCT 2 TERMINAL",
    apiKey: "product_2.terminal",
    columnSize: 2,
  },
  product_2_distance: {
    label: "PRODUCT 2 DISTANCE FROM TERMINAL(KM)",
    apiKey: "product_2.distance",
    columnSize: 1,
  },
  product_2_duration: {
    label: "PRODUCT 2 DURATION FROM TERMINAL(HRS)",
    apiKey: "product_2.duration",
    columnSize: 1,
  },
  product_2_remarks: {
    label: "PRODUCT 2 REMARKS",
    apiKey: "product_2.remarks",
    columnSize: 2,
  },
  product_2_station_sales_category: {
    label: "PRODUCT 2 SALES CATEGORY",
    apiKey: "product_2.station_sales_category",
    columnSize: 1,
  },
  product_2_product_code_quota: {
    label: "PRODUCT 2 MONTHLY FIXED QUOTA",
    apiKey: "product_2.product_code_quota",
    columnSize: 1,
  },
  product_3_product_code: {
    label: "PRODUCT 3 CODE",
    apiKey: "product_3.product_code",
    columnSize: 1,
  },
  product_3_product_name: {
    label: "PRODUCT 3 NAME",
    apiKey: "product_3.product_name",
    columnSize: 2,
  },
  product_3_tank_capacity: {
    label: "PRODUCT 3 TANK CAPACITY",
    apiKey: "product_3.tank_capacity",
    columnSize: 1,
  },
  product_3_active_product: {
    label: "PRODUCT 3 STATUS",
    apiKey: "product_3.active_product",
    columnSize: 1,
  },
  product_3_ordering_category: {
    label: "PRODUCT 3 ORDERING CATEGORY",
    apiKey: "product_3.ordering_category",
    columnSize: 1,
  },
  product_3_terminal: {
    label: "PRODUCT 3 TERMINAL",
    apiKey: "product_3.terminal",
    columnSize: 2,
  },
  product_3_distance: {
    label: "PRODUCT 3 DISTANCE FROM TERMINAL(KM)",
    apiKey: "product_3.distance",
    columnSize: 1,
  },
  product_3_duration: {
    label: "PRODUCT 3 DURATION FROM TERMINAL(HRS)",
    apiKey: "product_3.duration",
    columnSize: 1,
  },
  product_3_remarks: {
    label: "PRODUCT 3 REMARKS",
    apiKey: "product_3.remarks",
    columnSize: 2,
  },
  product_3_station_sales_category: {
    label: "PRODUCT 3 SALES CATEGORY",
    apiKey: "product_3.station_sales_category",
    columnSize: 1,
  },
  product_3_product_code_quota: {
    label: "PRODUCT 3 MONTHLY FIXED QUOTA",
    apiKey: "product_3.product_code_quota",
    columnSize: 1,
  },
  product_4_product_code: {
    label: "PRODUCT 4 CODE",
    apiKey: "product_4.product_code",
    columnSize: 1,
  },
  product_4_product_name: {
    label: "PRODUCT 4 NAME",
    apiKey: "product_4.product_name",
    columnSize: 2,
  },
  product_4_tank_capacity: {
    label: "PRODUCT 4 TANK CAPACITY",
    apiKey: "product_4.tank_capacity",
    columnSize: 1,
  },
  product_4_active_product: {
    label: "PRODUCT 4 STATUS",
    apiKey: "product_4.active_product",
    columnSize: 1,
  },
  product_4_ordering_category: {
    label: "PRODUCT 4 ORDERING CATEGORY",
    apiKey: "product_4.ordering_category",
    columnSize: 1,
  },
  product_4_terminal: {
    label: "PRODUCT 4 TERMINAL",
    apiKey: "product_4.terminal",
    columnSize: 2,
  },
  product_4_distance: {
    label: "PRODUCT 4 DISTANCE FROM TERMINAL(KM)",
    apiKey: "product_4.distance",
    columnSize: 1,
  },
  product_4_duration: {
    label: "PRODUCT 4 DURATION FROM TERMINAL(HRS)",
    apiKey: "product_4.duration",
    columnSize: 1,
  },
  product_4_remarks: {
    label: "PRODUCT 4 REMARKS",
    apiKey: "product_4.remarks",
    columnSize: 2,
  },
  product_4_station_sales_category: {
    label: "PRODUCT 4 SALES CATEGORY",
    apiKey: "product_4.station_sales_category",
    columnSize: 1,
  },
  product_4_product_code_quota: {
    label: "PRODUCT 4 MONTHLY FIXED QUOTA",
    apiKey: "product_4.product_code_quota",
    columnSize: 1,
  },
  product_5_product_code: {
    label: "PRODUCT 5 CODE",
    apiKey: "product_5.product_code",
    columnSize: 1,
  },
  product_5_product_name: {
    label: "PRODUCT 5 NAME",
    apiKey: "product_5.product_name",
    columnSize: 2,
  },
  product_5_tank_capacity: {
    label: "PRODUCT 5 TANK CAPACITY",
    apiKey: "product_5.tank_capacity",
    columnSize: 1,
  },
  product_5_active_product: {
    label: "PRODUCT 5 STATUS",
    apiKey: "product_5.active_product",
    columnSize: 1,
  },
  product_5_ordering_category: {
    label: "PRODUCT 5 ORDERING CATEGORY",
    apiKey: "product_5.ordering_category",
    columnSize: 1,
  },
  product_5_terminal: {
    label: "PRODUCT 5 TERMINAL",
    apiKey: "product_5.terminal",
    columnSize: 2,
  },
  product_5_distance: {
    label: "PRODUCT 5 DISTANCE FROM TERMINAL(KM)",
    apiKey: "product_5.distance",
    columnSize: 1,
  },
  product_5_duration: {
    label: "PRODUCT 5 DURATION FROM TERMINAL(HRS)",
    apiKey: "product_5.duration",
    columnSize: 1,
  },
  product_5_remarks: {
    label: "PRODUCT 5 REMARKS",
    apiKey: "product_5.remarks",
    columnSize: 2,
  },
  product_5_station_sales_category: {
    label: "PRODUCT 5 SALES CATEGORY",
    apiKey: "product_5.station_sales_category",
    columnSize: 1,
  },
  product_5_product_code_quota: {
    label: "PRODUCT 5 MONTHLY FIXED QUOTA",
    apiKey: "product_5.product_code_quota",
    columnSize: 1,
  },
  product_6_product_code: {
    label: "PRODUCT 6 CODE",
    apiKey: "product_6.product_code",
    columnSize: 1,
  },
  product_6_product_name: {
    label: "PRODUCT 6 NAME",
    apiKey: "product_6.product_name",
    columnSize: 2,
  },
  product_6_tank_capacity: {
    label: "PRODUCT 6 TANK CAPACITY",
    apiKey: "product_6.tank_capacity",
    columnSize: 1,
  },
  product_6_active_product: {
    label: "PRODUCT 6 STATUS",
    apiKey: "product_6.active_product",
    columnSize: 1,
  },
  product_6_ordering_category: {
    label: "PRODUCT 6 ORDERING CATEGORY",
    apiKey: "product_6.ordering_category",
    columnSize: 1,
  },
  product_6_terminal: {
    label: "PRODUCT 6 TERMINAL",
    apiKey: "product_6.terminal",
    columnSize: 2,
  },
  product_6_distance: {
    label: "PRODUCT 6 DISTANCE FROM TERMINAL(KM)",
    apiKey: "product_6.distance",
    columnSize: 1,
  },
  product_6_duration: {
    label: "PRODUCT 6 DURATION FROM TERMINAL(HRS)",
    apiKey: "product_6.duration",
    columnSize: 1,
  },
  product_6_remarks: {
    label: "PRODUCT 6 REMARKS",
    apiKey: "product_6.remarks",
    columnSize: 2,
  },
  product_6_station_sales_category: {
    label: "PRODUCT 6 SALES CATEGORY",
    apiKey: "product_6.station_sales_category",
    columnSize: 1,
  },
  product_6_product_code_quota: {
    label: "PRODUCT 6 MONTHLY FIXED QUOTA",
    apiKey: "product_6.product_code_quota",
    columnSize: 1,
  },
  delivery_open_time_date_type: {
    label: "DELIVERY OPEN TYPE",
    apiKey: "delivery_open_time_date.type",
    columnSize: 1,
  },
  delivery_open_time_date_allowed_time_from: {
    label: "DELIVERY OPEN TIME FROM",
    apiKey: "delivery_open_time_date.allowed_time_from",
    columnSize: 1,
  },
  delivery_open_time_date_allowed_time_to: {
    label: "DELIVERY OPEN TIME TO",
    apiKey: "delivery_open_time_date.allowed_time_to",
    columnSize: 1,
  },
  delivery_open_time_date_allowed_days: {
    label: "DELIVERY OPEN ALLOWED DAYS",
    apiKey: "delivery_open_time_date.allowed_days",
    columnSize: 2,
  },
  delivery_open_time_date_allowed_dates: {
    label: "DELIVERY OPEN ALLOWED DATES",
    apiKey: "delivery_open_time_date.allowed_dates",
    columnSize: 1,
  },
  delivery_open_time_date_allowed_date_from: {
    label: "DELIVERY OPEN ALLOWED DATE FROM",
    apiKey: "delivery_open_time_date.allowed_date_from",
    columnSize: 1,
  },
  delivery_open_time_date_allowed_date_to: {
    label: "DELIVERY OPEN DATE ALLOWED DATE TO",
    apiKey: "delivery_open_time_date.allowed_date_to",
    columnSize: 1,
  },
  actual_open_1_date_type: {
    label: "ACTUAL OPEN TYPE 1",
    apiKey: "actual_open_1_date.type",
    columnSize: 1,
  },
  actual_open_1_date_allowed_time_from: {
    label: "ACTUAL OPEN TIME FROM 1",
    apiKey: "actual_open_1_date.allowed_time_from",
    columnSize: 1,
  },
  actual_open_1_date_allowed_time_to: {
    label: "ACTUAL OPEN TIME TO 1",
    apiKey: "actual_open_1_date.allowed_time_to",
    columnSize: 1,
  },
  actual_open_1_date_allowed_days: {
    label: "ACTUAL OPEN ALLOWED DAYS 1",
    apiKey: "actual_open_1_date.allowed_days",
    columnSize: 2,
  },
  actual_open_1_date_allowed_dates: {
    label: "ACTUAL OPEN ALLOWED DATES 1",
    apiKey: "actual_open_1_date.allowed_dates",
    columnSize: 1,
  },
  actual_open_1_date_allowed_date_from: {
    label: "ACTUAL OPEN ALLOWED DATE FROM 1",
    apiKey: "actual_open_1_date.allowed_date_from",
    columnSize: 1,
  },
  actual_open_1_date_allowed_date_to: {
    label: "ACTUAL OPEN DATE ALLOWED DATE TO 1",
    apiKey: "actual_open_1_date.allowed_date_to",
    columnSize: 1,
  },
  actual_open_2_date_type: {
    label: "ACTUAL OPEN TYPE 2",
    apiKey: "actual_open_2_date.type",
    columnSize: 1,
  },
  actual_open_2_date_allowed_time_from: {
    label: "ACTUAL OPEN TIME FROM 2",
    apiKey: "actual_open_2_date.allowed_time_from",
    columnSize: 1,
  },
  actual_open_2_date_allowed_time_to: {
    label: "ACTUAL OPEN TIME TO 2",
    apiKey: "actual_open_2_date.allowed_time_to",
    columnSize: 1,
  },
  actual_open_2_date_allowed_days: {
    label: "ACTUAL OPEN ALLOWED DAYS 2",
    apiKey: "actual_open_2_date.allowed_days",
    columnSize: 2,
  },
  actual_open_2_date_allowed_dates: {
    label: "ACTUAL OPEN ALLOWED DATES 2",
    apiKey: "actual_open_2_date.allowed_dates",
    columnSize: 1,
  },
  actual_open_2_date_allowed_date_from: {
    label: "ACTUAL OPEN ALLOWED DATE FROM 2",
    apiKey: "actual_open_2_date.allowed_date_from",
    columnSize: 1,
  },
  actual_open_2_date_allowed_date_to: {
    label: "ACTUAL OPEN DATE ALLOWED DATE TO 2",
    apiKey: "actual_open_2_date.allowed_date_to",
    columnSize: 1,
  },
  actual_open_3_date_type: {
    label: "ACTUAL OPEN TYPE 3",
    apiKey: "actual_open_3_date.type",
    columnSize: 1,
  },
  actual_open_3_date_allowed_time_from: {
    label: "ACTUAL OPEN TIME FROM 3",
    apiKey: "actual_open_3_date.allowed_time_from",
    columnSize: 1,
  },
  actual_open_3_date_allowed_time_to: {
    label: "ACTUAL OPEN TIME TO 3",
    apiKey: "actual_open_3_date.allowed_time_to",
    columnSize: 1,
  },
  actual_open_3_date_allowed_days: {
    label: "ACTUAL OPEN ALLOWED DAYS 3",
    apiKey: "actual_open_3_date.allowed_days",
    columnSize: 2,
  },
  actual_open_3_date_allowed_dates: {
    label: "ACTUAL OPEN ALLOWED DATES 3",
    apiKey: "actual_open_3_date.allowed_dates",
    columnSize: 1,
  },
  actual_open_3_date_allowed_date_from: {
    label: "ACTUAL OPEN ALLOWED DATE FROM 3",
    apiKey: "actual_open_3_date.allowed_date_from",
    columnSize: 1,
  },
  actual_open_3_date_allowed_date_to: {
    label: "ACTUAL OPEN DATE ALLOWED DATE TO 3",
    apiKey: "actual_open_3_date.allowed_date_to",
    columnSize: 1,
  },
  no_delivery_interval_1_date_type: {
    label: "NO DELIVERY INTERVAL TYPE 1",
    apiKey: "no_delivery_interval_1_date.type",
    columnSize: 1,
  },
  no_delivery_interval_1_date_allowed_time_from: {
    label: "NO DELIVERY INTERVAL TIME FROM 1",
    apiKey: "no_delivery_interval_1_date.allowed_time_from",
    columnSize: 1,
  },
  no_delivery_interval_1_date_allowed_time_to: {
    label: "NO DELIVERY INTERVAL TIME TO 1",
    apiKey: "no_delivery_interval_1_date.allowed_time_to",
    columnSize: 1,
  },
  no_delivery_interval_1_date_allowed_days: {
    label: "NO DELIVERY INTERVAL DAYS 1",
    apiKey: "no_delivery_interval_1_date.allowed_days",
    columnSize: 2,
  },
  no_delivery_interval_1_date_allowed_dates: {
    label: "NO DELIVERY INTERVAL DATES 1",
    apiKey: "no_delivery_interval_1_date.allowed_dates",
    columnSize: 1,
  },
  no_delivery_interval_1_date_allowed_date_from: {
    label: "NO DELIVERY INTERVAL DATE FROM 1",
    apiKey: "no_delivery_interval_1_date.allowed_date_from",
    columnSize: 1,
  },
  no_delivery_interval_1_date_allowed_date_to: {
    label: "NO DELIVERY INTERVAL DATE TO 1",
    apiKey: "no_delivery_interval_1_date.allowed_date_to",
    columnSize: 1,
  },
  no_delivery_interval_2_date_type: {
    label: "NO DELIVERY INTERVAL TYPE 2",
    apiKey: "no_delivery_interval_2_date.type",
    columnSize: 1,
  },
  no_delivery_interval_2_date_allowed_time_from: {
    label: "NO DELIVERY INTERVAL TIME FROM 2",
    apiKey: "no_delivery_interval_2_date.allowed_time_from",
    columnSize: 1,
  },
  no_delivery_interval_2_date_allowed_time_to: {
    label: "NO DELIVERY INTERVAL TIME TO 2",
    apiKey: "no_delivery_interval_2_date.allowed_time_to",
    columnSize: 1,
  },
  no_delivery_interval_2_date_allowed_days: {
    label: "NO DELIVERY INTERVAL DAYS 2",
    apiKey: "no_delivery_interval_2_date.allowed_days",
    columnSize: 2,
  },
  no_delivery_interval_2_date_allowed_dates: {
    label: "NO DELIVERY INTERVAL DATES 2",
    apiKey: "no_delivery_interval_2_date.allowed_dates",
    columnSize: 1,
  },
  no_delivery_interval_2_date_allowed_date_from: {
    label: "NO DELIVERY INTERVAL DATE FROM 2",
    apiKey: "no_delivery_interval_2_date.allowed_date_from",
    columnSize: 1,
  },
  no_delivery_interval_2_date_allowed_date_to: {
    label: "NO DELIVERY INTERVAL DATE TO 2",
    apiKey: "no_delivery_interval_2_date.allowed_date_to",
    columnSize: 1,
  },
  no_delivery_interval_3_date_type: {
    label: "NO DELIVERY INTERVAL TYPE 3",
    apiKey: "no_delivery_interval_3_date.type",
    columnSize: 1,
  },
  no_delivery_interval_3_date_allowed_time_from: {
    label: "NO DELIVERY INTERVAL TIME FROM 3",
    apiKey: "no_delivery_interval_3_date.allowed_time_from",
    columnSize: 1,
  },
  no_delivery_interval_3_date_allowed_time_to: {
    label: "NO DELIVERY INTERVAL TIME TO 3",
    apiKey: "no_delivery_interval_3_date.allowed_time_to",
    columnSize: 1,
  },
  no_delivery_interval_3_date_allowed_days: {
    label: "NO DELIVERY INTERVAL DAYS 3",
    apiKey: "no_delivery_interval_3_date.allowed_days",
    columnSize: 2,
  },
  no_delivery_interval_3_date_allowed_dates: {
    label: "NO DELIVERY INTERVAL DATES 3",
    apiKey: "no_delivery_interval_3_date.allowed_dates",
    columnSize: 1,
  },
  no_delivery_interval_3_date_allowed_date_from: {
    label: "NO DELIVERY INTERVAL DATE FROM 3",
    apiKey: "no_delivery_interval_3_date.allowed_date_from",
    columnSize: 1,
  },
  no_delivery_interval_3_date_allowed_date_to: {
    label: "NO DELIVERY INTERVAL DATE TO 3",
    apiKey: "no_delivery_interval_3_date.allowed_date_to",
    columnSize: 1,
  },
  no_delivery_interval_4_date_type: {
    label: "NO DELIVERY INTERVAL TYPE 4",
    apiKey: "no_delivery_interval_4_date.type",
    columnSize: 1,
  },
  no_delivery_interval_4_date_allowed_time_from: {
    label: "NO DELIVERY INTERVAL TIME FROM 4",
    apiKey: "no_delivery_interval_4_date.allowed_time_from",
    columnSize: 1,
  },
  no_delivery_interval_4_date_allowed_time_to: {
    label: "NO DELIVERY INTERVAL TIME TO 4",
    apiKey: "no_delivery_interval_4_date.allowed_time_to",
    columnSize: 1,
  },
  no_delivery_interval_4_date_allowed_days: {
    label: "NO DELIVERY INTERVAL DAYS 4",
    apiKey: "no_delivery_interval_4_date.allowed_days",
    columnSize: 2,
  },
  no_delivery_interval_4_date_allowed_dates: {
    label: "NO DELIVERY INTERVAL DATES 4",
    apiKey: "no_delivery_interval_4_date.allowed_dates",
    columnSize: 1,
  },
  no_delivery_interval_4_date_allowed_date_from: {
    label: "NO DELIVERY INTERVAL DATE FROM 4",
    apiKey: "no_delivery_interval_4_date.allowed_date_from",
    columnSize: 1,
  },
  no_delivery_interval_4_date_allowed_date_to: {
    label: "NO DELIVERY INTERVAL DATE TO 4",
    apiKey: "no_delivery_interval_4_date.allowed_date_to",
    columnSize: 1,
  },
  no_delivery_interval_5_date_type: {
    label: "NO DELIVERY INTERVAL TYPE 5",
    apiKey: "no_delivery_interval_5_date.type",
    columnSize: 1,
  },
  no_delivery_interval_5_date_allowed_time_from: {
    label: "NO DELIVERY INTERVAL TIME FROM 5",
    apiKey: "no_delivery_interval_5_date.allowed_time_from",
    columnSize: 1,
  },
  no_delivery_interval_5_date_allowed_time_to: {
    label: "NO DELIVERY INTERVAL TIME TO 5",
    apiKey: "no_delivery_interval_5_date.allowed_time_to",
    columnSize: 1,
  },
  no_delivery_interval_5_date_allowed_days: {
    label: "NO DELIVERY INTERVAL DAYS 5",
    apiKey: "no_delivery_interval_5_date.allowed_days",
    columnSize: 2,
  },
  no_delivery_interval_5_date_allowed_dates: {
    label: "NO DELIVERY INTERVAL DATES 5",
    apiKey: "no_delivery_interval_5_date.allowed_dates",
    columnSize: 1,
  },
  no_delivery_interval_5_date_allowed_date_from: {
    label: "NO DELIVERY INTERVAL DATE FROM 5",
    apiKey: "no_delivery_interval_5_date.allowed_date_from",
    columnSize: 1,
  },
  no_delivery_interval_5_date_allowed_date_to: {
    label: "NO DELIVERY INTERVAL DATE TO 5",
    apiKey: "no_delivery_interval_5_date.allowed_date_to",
    columnSize: 1,
  },
  station_close_period_date_type: {
    label: "STATION CLOSE PERIOD TYPE",
    apiKey: "station_close_period_date.type",
    columnSize: 1,
  },
  station_close_period_date_allowed_time_from: {
    label: "STATION CLOSE PERIOD TIME FROM",
    apiKey: "station_close_period_date.allowed_time_from",
    columnSize: 1,
  },
  station_close_period_date_allowed_time_to: {
    label: "STATION CLOSE PERIOD TIME TO",
    apiKey: "station_close_period_date.allowed_time_to",
    columnSize: 1,
  },
  station_close_period_date_allowed_days: {
    label: "STATION CLOSE PERIOD DAYS",
    apiKey: "station_close_period_date.allowed_days",
    columnSize: 2,
  },
  station_close_period_date_allowed_dates: {
    label: "STATION CLOSE PERIOD DATES",
    apiKey: "station_close_period_date.allowed_dates",
    columnSize: 1,
  },
  station_close_period_date_allowed_date_from: {
    label: "STATION CLOSE PERIOD FROM",
    apiKey: "station_close_period_date.allowed_date_from",
    columnSize: 1,
  },
  station_close_period_date_allowed_date_to: {
    label: "STATION CLOSE PERIOD TO",
    apiKey: "station_close_period_date.allowed_date_to",
    columnSize: 1,
  },
}

export { tableMapping, tableColumns }
