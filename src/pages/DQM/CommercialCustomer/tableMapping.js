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
  region_group: {
    label: "REGION",
    apiKey: "region_group",
    columnSize: 1,
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
  state: {
    label: "STATE",
    apiKey: "address_table.state",
    columnSize: 2,
  },
  // ordering_category: {
  //   label: "ORDERING CATEGORY",
  //   apiKey: "ordering_category",
  // },
  road_tanker_accessibility: {
    label: "ROAD TANKER ACCESSIBILITY",
    apiKey: "road_tanker_accessibility",
    columnSize: 1,
  },
  remarks: {
    label: "REMARKS",
    apiKey: "remarks",
    columnSize: 2,
  },
}

export { tableMapping, tableColumns }
