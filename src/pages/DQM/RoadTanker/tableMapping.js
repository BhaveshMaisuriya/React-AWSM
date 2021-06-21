const tableColumns = [
  "vehicle",
  "owner",
  "status_sap",
  "product_type_awsm",
  "pump_type",
  "daily_available_hours",
  "capacity",
  "chartering_type",
  "remarks",
]

const tableMapping = {
  vehicle: {
    label: "VEHICLE",
    apiKey: "vehicle",
    columnSize: "cell-text",
    type: "link",
  },
  owner: {
    label: "OWNER",
    apiKey: "owner",
    columnSize: "cell-text-big",
  },
  capacity: {
    label: "RT CAPACITY",
    apiKey: "capacity",
    columnSize: "cell-text",
  },
  remarks: {
    label: "REMARKS",
    apiKey: "remarks",
    columnSize: "cell-text-big",
  },
  default_terminal: {
    label: "DEFAULT TERMINAL",
    apiKey: "default_terminal",
    columnSize: "cell-text",
  },
  shift_type: {
    label: "SHIFT TYPE",
    apiKey: "shift_type",
    columnSize: "cell-text",
  },
  daily_available_hours: {
    label: "DAILY AVAILABLE HOURS",
    apiKey: "daily_available_hours",
    columnSize: "cell-text",
  },
  status_sap: {
    label: "STATUS SAP",
    apiKey: "status_sap",
    columnSize: "cell-text",
  },
  status_awsm: {
    label: "STATUS AWSM",
    apiKey: "status_awsm",
    columnSize: "cell-text-big",
    type: "badge",
    getBadgeColor: value => {
      return value === "ACTIVE" ? "primary" : "secondary"
    },
  },
  product_type_sap: {
    label: "PRODUCT TYPE SAP",
    apiKey: "product_type_sap",
    columnSize: "cell-text",
  },
  product_type_awsm: {
    label: "PRODUCT TYPE AWSM",
    apiKey: "product_type_awsm",
    columnSize: "cell-text",
  },
  temporary_product_date_range: {
    label: "TEMPORARY PRODUCT DATE RANGE",
    apiKey: "temporary_product_date_range",
    columnSize: "cell-text-big",
  },
  pump_type: {
    label: "PUMP TYPE",
    apiKey: "pump_type",
    columnSize: "cell-text",
  },
  chartering_type: {
    label: "CHARTERING TYPE",
    apiKey: "chartering_type",
    columnSize: "cell-text",
  },
  customer_type: {
    label: "CUSTOMER TYPE",
    apiKey: "customer_type",
    columnSize: "cell-text",
  },
  restriction: {
    label: "RT RESTRICTION",
    apiKey: "restriction",
    columnSize: "cell-text-big",
  },
  restriction_code: {
    label: "RT RESTRICTION CODE",
    apiKey: "restriction_code",
    columnSize: "cell-text-big",
  },
  weight: {
    label: "RT WEIGHT",
    apiKey: "weight",
    columnSize: "cell-text",
  },
  legal_weight: {
    label: "RT LEGAL WEIGHT ALLOWED",
    apiKey: "legal_weight",
    columnSize: "cell-text",
  },
  compartment_no: {
    label: "NO OF COMPARTMENT",
    apiKey: "",
    columnSize: "cell-text",
  },
  compartment_max_vol: {
    label: "MAX VOLUME PER COMPARTMENT",
    apiKey: "",
    columnSize: "cell-text-big",
  },
  offloading_duration: {
    label: "OFFLOADING DURATION (MINS)",
    apiKey: "offloading_duration",
    columnSize: "cell-text",
  },
}
const tableInformationModalDummyData = {
  vehical_id: "RYD0287",
  vehical_owner: "Eshah Filling Station",
  status_in_sap: "Operational",
  rt_capacity: "Operational",
  remarks: "Shaziman only",
  availability: {
    default_terminal: "Lorem ipsum",
    shift_type: "double",
    daily_available_hours: "RYD0287",
    status_in_awsm: "active",
    date: "30/04/2021",
    date1: "07/05/2021",
    mobilized_terminal_name_1: "One",
  },
  specification: {
    product_type_in_sap: "Lorem ipsum",
    pump_type: "Lorem ipsum",
    product_type_in_ASWM: "Multiproduct",
    date: "06/05/2021",
    chartering_type: "Lorem ipsum",
    customer_type: "active",
    rt_restriction: "new restriction",
    restrict_code: "1001",
  },
  trailer: {
    rt_weight: "012345",
    legal_weight_allowed: "Lorem ipsum",
    no_of_comp: "012345",
    max_volume_per_comp: "Lorem_ipsum",
    prod_weight_hse_copmp: "012345",
    offloading_duration_mins: "Lorem ipsum",
  },
}

export { tableMapping, tableColumns, tableInformationModalDummyData }
