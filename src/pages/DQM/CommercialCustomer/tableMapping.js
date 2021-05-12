const tableColumns = [
  "ship_to_party",
  "ship_to_company",
  // "site_name",
  // "site_id",
  "region_group",
  "state",
  "station_cluster",
  "station_status_awsm",
  // "station_sales",
  "road_tanker_accessibility",
  "remarks",
  // "station_status_sap",
]

const tableMapping = {
  ship_to_party: {
    label: "SHIP TO PARTY",
    apiKey: "ship_to_party",
    columnSize: 2,
  },
  ship_to_company: {
    label: "SHIP TO COMPANY",
    apiKey: "ship_to_company",
    columnSize: 2,
  },
  station_status_sap: {
    label: "STATION STATUS SAP",
    apiKey: "station_status_sap",
    columnSize: 2,
  },
  station_status_awsm: {
    label: "STATION STATUS AWSM",
    apiKey: "station_status_awsm",
    columnSize: 2,
  },
  remarks: {
    label: "REMARKS",
    apiKey: "remarks",
    columnSize: 2,
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
    coluumnSize: 2,
  },
  setel_activation_status: {
    label: "SETEL ACTIVATION STATUS",
    apiKey: "setel_activation_status",
    columnSize: 2,
  },
  territory_manager_name: {
    label: "TERRITORY MANAGER NAME",
    apiKey: "territory_manager_name",
    columnSize: 2,
  },
  territory_manager_number: {
    label: "TERRITORY MANAGER NUMBER",
    apiKey: "territory_manager_number",
    columnSize: 2,
  },
  territory_manager_email: {
    label: "TERRITORY MANAGER EMAIL",
    apiKey: "territory_manager_email",
    columnSize: 2,
  },
  retail_sales_manager_name: {
    label: "RETAIL SALES MANAGER NAME",
    apiKey: "retail_sales_manager_name",
    columnSize: 2,
  },
  retail_sales_manager_number: {
    label: "RETAIL SALES MANAGER NUMBER",
    apiKey: "retail_sales_manager_number",
    columnSize: 2,
  },
  retail_sales_manager_email: {
    label: "RETAIL SALES MANAGER EMAIL",
    apiKey: "retail_sales_manager_email",
    columnSize: 2,
  },
  contact_last_updated: {
    label: "CONTACT LAST UPDATED",
    apiKey: "contact_last_updated",
    columnSize: 2,
  },
  sales_inventory_data_source: {
    label: "SALES INVENTORY DATA SOURCE",
    apiKey: "sales_inventory_data_source",
    columnSize: 2,
  },
  end_of_day: {
    label: "END OF DAY",
    apiKey: "end_of_day",
    columnSize: 2,
  },
  road_tanker_requirement: {
    label: "ROAD TANKER REQUIREMENT",
    apiKey: "road_tanker_requirement",
    columnSize: 2,
  },
  road_tanker_accessibility: {
    label: "ROAD TANKER ACCESSIBILITY",
    apiKey: "road_tanker_accessibility",
    columnSize: 2,
  },
  sold_to_party: {
    label: "SOLD TO PARTY",
    apiKey: "sold_to_party",
    columnSize: 2,
  },
  sold_to_company: {
    label: "SOLD TO COMPANY",
    apiKey: "sold_to_company",
    columnSize: 2,
  },
  station_cluster: {
    label: "STATION CLUSTER",
    apiKey: "station_cluster",
    columnSize: 2,
  },
  alternate_cluster: {
    label: "ALTERNATE CLUSTER",
    apiKey: "alternate_cluster",
    columnSize: 2,
  },
  cloud: {
    label: "CLOUD",
    apiKey: "cloud",
    columnSize: 2,
  },
  distance_from_terminal: {
    label: "DISTANCE FROM TERMINAL",
    apiKey: "distance_from_terminal",
    columnSize: 2,
  },
  speed: {
    label: "SPEED",
    apiKey: "speed",
    columnSize: 2,
  },
  pump_type: {
    label: "PUMP TYPE",
    apiKey: "pump_type",
    columnSize: 2,
  },
  delivery_open_time: {
    label: "DELIVERY OPEN TIME",
    apiKey: "delivery_open_time",
    columnSize: 2,
  },
  actual_open_1: {
    label: "ACTUAL OPEN 1",
    apiKey: "actual_open_1",
    columnSize: 2,
  },
  actual_open_2: {
    label: "ACTUAL OPEN 2",
    apiKey: "actual_open_2",
    columnSize: 2,
  },
  actual_open_3: {
    label: "ACTUAL OPEN 3",
    apiKey: "actual_open_3",
    columnSize: 2,
  },
  no_delivery_interval_1: {
    label: "NO DELIVERY INTERVAL 1",
    apiKey: "no_delivery_interval_1",
    columnSize: 2,
  },
  no_delivery_interval_2: {
    label: "NO DELIVERY INTERVAL 2",
    apiKey: "no_delivery_interval_2",
    columnSize: 2,
  },
  no_delivery_interval_3: {
    label: "NO DELIVERY INTERVAL 3",
    apiKey: "no_delivery_interval_3",
    columnSize: 2,
  },
  no_delivery_interval_4: {
    label: "NO DELIVERY INTERVAL 4",
    apiKey: "no_delivery_interval_4",
    columnSize: 2,
  },
  no_delivery_interval_5: {
    label: "NO DELIVERY INTERVAL 5",
    apiKey: "no_delivery_interval_5",
    columnSize: 2,
  },
  created_at: {
    label: "CREATED AT",
    apiKey: "created_at",
    columnSize: 2,
  },
  updated_at: {
    label: "UPDATED AT",
    apiKey: "updated_at",
    columnSize: 2,
  },
}

export { tableMapping, tableColumns }
