import { isNull } from "lodash"

const StringConstants = {
  daily: "daily",
  every: "every",
  range: "range",
}

const productArray = [
  // "code",
  // "name",
  "tank_capacity",
  "active_product",
  "ordering_category",
  "terminal",
  "distance",
  "duration",
  "remarks",
  "sales_category",
  "product_code_quota",
  "monthly_fixed_quota",
  "retail",
  "product_name",
  "product_code",
]

const dateArray = ["type", "days", "time_from", "time_to"]

const retailDetailsArray = [
  "ship_to_party",
  "site_id",
  "site_name",
  "ship_to_company",
  "sold_to_party",
  "sold_to_company",
  "status_sap",
  "status_awsm",
  "remarks",
  "setel_activation_status",
  "contact_last_updated",
  "sales_inventory_data_source",
  "road_tanker_requirement",
  "road_tanker_accessibility",
  "cluster",
  "alternate_cluster",
  "cloud",
  "border_station",
  "speed",
]

const addressArray = [
  "city",
  "state",
  "country",
  "postcode",
  "latitude",
  "longitude",
  "region_name",
  "region_group",
]

const personDetailsArray = ["name", "number", "email", "position"]

const checkDateInterval = obj => {
  let interval = "-"
  if (obj.type === StringConstants.range)
    interval = obj["date_from"]
      .toString()
      .concat(" to ", obj["date_to"].toString())
  else if (obj.type === StringConstants.every) interval = obj["days"]
  return interval
}

export const mergeFilterValues = (filterData, key) => {
  const filterObject = {}
  filterObject[key] = []
  for (const value of filterData) {
    if (value[key]) filterObject[key].push(value[key])
  }
  return filterObject
}

const checkNullValue = (data, defaultValue) =>
  isNull(data) ? defaultValue : data

const getValueFromObj = (dataObj, key, defaultVal) => {
  if (Object.prototype.hasOwnProperty.call(dataObj, key)) {
    return checkNullValue(dataObj[key], defaultVal)
  } else return defaultVal
}

const getAddressTableObj = (retailCustomerObj, data, key) => {
  const tempObj = retailCustomerObj
  if (Object.prototype.hasOwnProperty.call(data, key)) {
    addressArray.forEach(
      p => (tempObj[`${key}_${p}`] = getValueFromObj(data[key], p, "-"))
    )
    tempObj[`${key}_address_1`] =
      getValueFromObj(data[key], "address_1", "-") +
      getValueFromObj(data[key], "address_2", " ") +
      getValueFromObj(data[key], "address_3", " ")
  }
  return tempObj
}

const getDateObj = (retailCustomerObj, data, key) => {
  const tempObj = retailCustomerObj
  if (Object.prototype.hasOwnProperty.call(data, key) && !isNull(data[key])) {
    dateArray.forEach(
      p => (tempObj[`${key}_${p}`] = getValueFromObj(data[key], p, "-"))
    )
    tempObj[`${key}_value`] = checkDateInterval(data[key])
  }
  return tempObj
}

const getProductObj = (retailCustomerObj, data, key) => {
  const tempObj = retailCustomerObj
  if (Object.prototype.hasOwnProperty.call(data, key) && !isNull(data[key])) {
    productArray.forEach(
      p => (tempObj[`${key}_${p}`] = getValueFromObj(data[key], p, "-"))
    )
  }
  return tempObj
}

const getContactPersonObj = (retailCustomerObj, data, key) => {
  const tempObj = retailCustomerObj
  if (Object.prototype.hasOwnProperty.call(data, key) && !isNull(data[key])) {
    personDetailsArray.forEach(
      p => (tempObj[`${key}_${p}`] = getValueFromObj(data[key], p, "-"))
    )
  }
  return tempObj
}

export default function retailCustomerFactory(data) {
  let retailCustomerObj = {}
  const finalData = []
  data.list.forEach(d => {
    const cloneobj = JSON.parse(JSON.stringify(retailCustomerObj))
    retailDetailsArray.forEach(
      p => (retailCustomerObj[`${p}`] = getValueFromObj(d, p, "-"))
    )
    getAddressTableObj(retailCustomerObj, d, "address")
    getProductObj(retailCustomerObj, d, "storage_1")
    getProductObj(retailCustomerObj, d, "storage_2")
    getProductObj(retailCustomerObj, d, "storage_3")
    getProductObj(retailCustomerObj, d, "storage_4")
    getProductObj(retailCustomerObj, d, "storage_5")
    getProductObj(retailCustomerObj, d, "storage_6")
    getContactPersonObj(retailCustomerObj, d, "contact_1")
    getContactPersonObj(retailCustomerObj, d, "contact_2")
    getContactPersonObj(retailCustomerObj, d, "contact_3")
    getContactPersonObj(retailCustomerObj, d, "territory_manager")
    getContactPersonObj(retailCustomerObj, d, "retail_sales_manager")
    getDateObj(retailCustomerObj, d, "delivery_open_time_1")
    getDateObj(retailCustomerObj, d, "actual_open_time_1")
    getDateObj(retailCustomerObj, d, "actual_open_time_2")
    getDateObj(retailCustomerObj, d, "actual_open_time_3")
    getDateObj(retailCustomerObj, d, "no_delivery_interval_1")
    getDateObj(retailCustomerObj, d, "no_delivery_interval_2")
    getDateObj(retailCustomerObj, d, "no_delivery_interval_3")
    getDateObj(retailCustomerObj, d, "no_delivery_interval_4")
    getDateObj(retailCustomerObj, d, "no_delivery_interval_5")
    getDateObj(retailCustomerObj, d, "close_period_1")
    finalData.push(retailCustomerObj)
    retailCustomerObj = cloneobj
  })
  return {
    list: finalData,
    total_rows: getValueFromObj(data, "total_rows", "0"),
  }
}
