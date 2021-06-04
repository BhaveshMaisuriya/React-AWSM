const tableColumns = [
  "code",
  "name",
  "state",
  "region_group",
  "status_awsm",
  "terminal_operating_days_1_value",
  "no_delivery_interval_1_time_from",
  "no_delivery_interval_1_time_to",
  "loading_bay_no",
  "turnaround_time",
  "remarks",
]

const tableMapping = {
  code: {
    label: "TERMINAL CODE",
    columnSize: 1,
  },
  name: {
    label: "TERMINAL NAME",
    columnSize: 2,
  },
  remarks: {
    label: "REMARKS",
    columnSize: 2,
  },
  address_1: {
    label: "ADDRESS",
    columnSize: 2,
  },
  city: {
    label: "CITY",
    columnSize: 2,
  },
  state: {
    label: "STATE",
    columnSize: 2,
  },
  region_group: {
    label: "REGION",
    columnSize: 1,
  },
  country: {
    label: "COUNTRY",
    columnSize: 1,
  },
  latitude: {
    label: "LATITUDE",
    columnSize: 1,
  },
  longitude: {
    label: "LONGITUDE",
    columnSize: 1,
  },
  supervisor_name: {
    label: "SUPERVISOR CONTACT NAME",
    columnSize: 2,
  },
  supervisor_number: {
    label: "SUPERVISOR CONTACT NUMBER",
    columnSize: 1,
  },
  supervisor_email: {
    label: "SUPERVISOR EMAIL",
    columnSize: 2,
  },
  superintendant_name: {
    label: "SUPERINTENDANT CONTACT NAME",
    columnSize: 2,
  },
  superintendant_number: {
    label: "SUPERINTENDANT CONTACT NUMBER",
    columnSize: 1,
  },
  superintendant_email: {
    label: "SUPERINTENDANT EMAIL",
    columnSize: 2,
  },
  status_awsm: {
    label: "TERMINAL STATUS IN AWSM",
    columnSize: 1,
    type: "badge",
    getBadgeColor: value => {
      return value === "ACTIVE" ? "primary" : "secondary"
    },
  },
  inactive_date_range_1_value: {
    label: "INACTIVE DATE RANGE",
    columnSize: 2,
  },
  terminal_operating_days_1_value: {
    label: "TERMINAL OPERATING DAYS",
    columnSize: 2,
  },
  terminal_operation_hours_1_time_from: {
    label: "TERMINAL OPERATING HOURS FROM",
    columnSize: 1,
  },
  terminal_operation_hours_1_time_to: {
    label: "TERMINAL OPERATING HOURS TO",
    columnSize: 1,
  },
  no_delivery_interval_1_value: {
    label: "NO DELIVERY INTERVAL 1",
    columnSize: 2,
  },
  no_delivery_interval_1_time_from: {
    label: "NO DELIVERY INTERVAL TIME FROM 1",
    columnSize: 1,
  },
  no_delivery_interval_1_time_to: {
    label: "NO DELIVERY INTERVAL TIME TO 1",
    columnSize: 1,
  },
  no_delivery_interval_2_value: {
    label: "NO DELIVERY INTERVAL 2",
    columnSize: 2,
  },
  no_delivery_interval_2_time_from: {
    label: "NO DELIVERY INTERVAL TIME FROM 2",
    columnSize: 1,
  },
  no_delivery_interval_2_time_to: {
    label: "NO DELIVERY INTERVAL TIME TO 2",
    columnSize: 1,
  },
  no_delivery_interval_3_value: {
    label: "NO DELIVERY INTERVAL 3",
    columnSize: 2,
  },
  no_delivery_interval_3_time_from: {
    label: "NO DELIVERY INTERVAL TIME FROM 3",
    columnSize: 1,
  },
  no_delivery_interval_3_time_to: {
    label: "NO DELIVERY INTERVAL TIME TO 3",
    columnSize: 1,
  },
  no_delivery_interval_4_value: {
    label: "NO DELIVERY INTERVAL 4",
    columnSize: 2,
  },
  no_delivery_interval_4_time_from: {
    label: "NO DELIVERY INTERVAL TIME FROM 4",
    columnSize: 1,
  },
  no_delivery_interval_4_time_to: {
    label: "NO DELIVERY INTERVAL TIME TO 4",
    columnSize: 1,
  },
  loading_bay_no: {
    label: "NO OF LOADING BAY",
    columnSize: 1,
  },
  max_volume_threshold: {
    label: "MAX VOLUME THRESHOLD",
    columnSize: 1,
  },
  loading_time: {
    label: "LOADING TIME",
    columnSize: 1,
  },
  turnaround_time: {
    label: "TURNAROUND TIME",
    columnSize: 1,
  },
}

export { tableMapping, tableColumns }
