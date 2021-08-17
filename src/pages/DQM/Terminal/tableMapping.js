import { tagColors } from "../Common/helper"

const tableColumns = [
  "code",
  "name",
  "state",
  "region_group",
  "status_awsm",
  "terminal_operating_days_1_value",
  "terminal_operation_hours_1_time_from",
  "terminal_operation_hours_1_time_to",
  "loading_bay_no",
  "loading_time",
  "turnaround_time",
  "remarks",
]

const tableMapping = {
  code: {
    label: "TERMINAL CODE",
    columnSize: "cell-text",
    type: "link",
    key: "frozen",
  },
  name: {
    label: "TERMINAL NAME",
    columnSize: "cell-text-big",
  },
  address_1: {
    label: "ADDRESS",
    columnSize: "cell-text-big",
  },
  city: {
    label: "CITY",
    columnSize: "cell-text-big",
  },
  state: {
    label: "STATE",
    columnSize: "cell-text-big",
  },
  region_group: {
    label: "REGION",
    columnSize: "cell-text",
  },
  country: {
    label: "COUNTRY",
    columnSize: "cell-text",
  },
  latitude: {
    label: "LATITUDE",
    columnSize: "cell-text",
  },
  longitude: {
    label: "LONGITUDE",
    columnSize: "cell-text",
  },
  supervisor_name: {
    label: "SUPERVISOR CONTACT NAME",
    columnSize: "cell-text-big",
  },
  supervisor_number: {
    label: "SUPERVISOR CONTACT NUMBER",
    columnSize: "cell-text",
  },
  supervisor_email: {
    label: "SUPERVISOR EMAIL",
    columnSize: "cell-text-big",
  },
  superintendant_name: {
    label: "SUPERINTENDANT CONTACT NAME",
    columnSize: "cell-text-big",
  },
  superintendant_number: {
    label: "SUPERINTENDANT CONTACT NUMBER",
    columnSize: "cell-text",
  },
  superintendant_email: {
    label: "SUPERINTENDANT EMAIL",
    columnSize: "cell-text-big",
  },
  status_awsm: {
    label: "STATUS IN AWSM",
    columnSize: "cell-text",
    type: "badge",
    getBadgeColor: value => {
      return tagColors[`${value.toUpperCase()}`] || "secondary"
    },
  },
  inactive_date_range_1_value: {
    label: "INACTIVE DATE RANGE",
    columnSize: "cell-text-big",
  },
  terminal_operating_days_1_value: {
    label: "OPERATING DAYS",
    columnSize: "cell-text-big",
  },
  terminal_operation_hours_1_time_from: {
    label: "OPERATING HOURS FROM",
    columnSize: "cell-text",
  },
  terminal_operation_hours_1_time_to: {
    label: "OPERATING HOURS TO",
    columnSize: "cell-text",
  },
  no_delivery_interval_1_value: {
    label: "NO DELIVERY INTERVAL 1",
    columnSize: "cell-text-big",
  },
  no_delivery_interval_1_time_from: {
    label: "NO DELIVERY INTERVAL TIME FROM 1",
    columnSize: "cell-text",
  },
  no_delivery_interval_1_time_to: {
    label: "NO DELIVERY INTERVAL TIME TO 1",
    columnSize: "cell-text",
  },
  no_delivery_interval_2_value: {
    label: "NO DELIVERY INTERVAL 2",
    columnSize: "cell-text-big",
  },
  no_delivery_interval_2_time_from: {
    label: "NO DELIVERY INTERVAL TIME FROM 2",
    columnSize: "cell-text",
  },
  no_delivery_interval_2_time_to: {
    label: "NO DELIVERY INTERVAL TIME TO 2",
    columnSize: "cell-text",
  },
  no_delivery_interval_3_value: {
    label: "NO DELIVERY INTERVAL 3",
    columnSize: "cell-text-big",
  },
  no_delivery_interval_3_time_from: {
    label: "NO DELIVERY INTERVAL TIME FROM 3",
    columnSize: "cell-text",
  },
  no_delivery_interval_3_time_to: {
    label: "NO DELIVERY INTERVAL TIME TO 3",
    columnSize: "cell-text",
  },
  no_delivery_interval_4_value: {
    label: "NO DELIVERY INTERVAL 4",
    columnSize: "cell-text-big",
  },
  no_delivery_interval_4_time_from: {
    label: "NO DELIVERY INTERVAL TIME FROM 4",
    columnSize: "cell-text",
  },
  no_delivery_interval_4_time_to: {
    label: "NO DELIVERY INTERVAL TIME TO 4",
    columnSize: "cell-text",
  },
  loading_bay_no: {
    label: "NO OF LOADING BAY",
    columnSize: "cell-text",
  },
  max_volume_threshold: {
    label: "MAX VOLUME THRESHOLD",
    columnSize: "cell-text",
  },
  loading_time: {
    label: "LOADING TIME",
    columnSize: "cell-text",
  },
  turnaround_time: {
    label: "TURNAROUND TIME",
    columnSize: "cell-text",
  },
  remarks: {
    label: "REMARKS",
    columnSize: "cell-text-big",
  },
  postcode: {
    label: "POSTCODE",
    columnSize: "cell-text",
  },
}

export { tableMapping, tableColumns }
