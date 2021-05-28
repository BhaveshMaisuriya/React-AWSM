const productArray = [
  "product_code",
  "product_name",
  "tank_capacity",
  "active_product",
  "ordering_category",
  "terminal",
  "distance",
  "duration",
  "remarks",
  "station_sales_category",
  "product_code_quota",
]

const contactPersonArray = [
  "contact_person_name",
  "contact_person_number",
  "contact_person_email",
  "contact_person_position",
]

export const mergeFilterValues = (filterData, key) => {
  const filterObject = {}
  filterObject[key] = []
  for (const value of filterData) {
    if (value[key]) filterObject[key].push(value[key])
  }
  return filterObject
}

export const DownloadData = (allDownloadData) => {
  return allDownloadData
}

const checkNullValue = (data, defaultValue) =>
  data === null ? defaultValue : data

const getValueFromObj = (dataObj, key, defaultVal) => {
  if (Object.prototype.hasOwnProperty.call(dataObj, key)) {
    return checkNullValue(dataObj[key], defaultVal)
  } else return defaultVal
}

const getAddressTableObj = (CustomerObj, data, key) => {
  const tempObj = CustomerObj
  if (Object.prototype.hasOwnProperty.call(data, key)) {
    tempObj.city = getValueFromObj(data, "city", "-")
    tempObj.state = getValueFromObj(data, "state", "-")
    tempObj.country = getValueFromObj(data, "country", "-")
    tempObj.postcode = getValueFromObj(data, "postcode", "-")
    tempObj.latitude = getValueFromObj(data, "latitude", "-")
    tempObj.longitude = getValueFromObj(data, "longitude", "-")
    tempObj.region_group = getValueFromObj(data, "region_group", "-")
    tempObj.address =
      getValueFromObj(data, "address_1", "-") +
      getValueFromObj(data, "address_2", " ") +
      getValueFromObj(data, "address_3", " ")
  }
  return tempObj
}

const getDateObj = (CustomerObj, data, key) => {
  const tempObj = CustomerObj
  if (Object.prototype.hasOwnProperty.call(data, key) && data[key] !== null) {
    productArray.forEach(
      p => (tempObj[`${key}_${p}`] = getValueFromObj(data[key], p, "-"))
    )
  }
  return tempObj
}

const getProductObj = (CustomerObj, data, key) => {
  const tempObj = CustomerObj
  if (Object.prototype.hasOwnProperty.call(data, key) && data[key] !== null) {
    productArray.forEach(
      p => (tempObj[`${key}_${p}`] = getValueFromObj(data[key], p, "-"))
    )
  }
  return tempObj
}

const getContactPersonObj = (CustomerObj, data, key) => {
  const tempObj = CustomerObj
  if (Object.prototype.hasOwnProperty.call(data, key) && data[key] !== null) {
    contactPersonArray.forEach(
      p => (tempObj[`${key}_${p}`] = getValueFromObj(data[key], p, "-"))
    )
  }
  return tempObj
}

const getCustomerObj = () => {
  const CustomerObj = {
    site_name: "-",
    ship_to_party: 0,
    site_id: "-",
    ship_to_company: "-",
    station_status_sap: "-",
    station_status_awsm: "-",
    remarks: "-",
    setel_activation_status: "-",
    territory_manager_name: "-",
    territory_manager_number: "-",
    territory_manager_email: "-",
    retail_sales_manager_name: "-",
    retail_sales_manager_number: "-",
    retail_sales_manager_email: "-",
    contact_last_updated: "-",
    sales_inventory_data_source: "-",
    end_of_day: 0,
    road_tanker_requirement: "-",
    road_tanker_accessibility: 0,
    sold_to_party: "-",
    sold_to_company: "-",
    station_cluster: "-",
    alternate_cluster: "-",
    cloud: "-",
    border_station: "-",
    distance_from_terminal: "-",
    speed: "-",
  }
  return CustomerObj
}

export default function retailCustomerFactory(data) {
  let CustomerObj = getCustomerObj()
  const finalData = []
  data.list.forEach(d => {
    const cloneobj = JSON.parse(JSON.stringify(CustomerObj))
    CustomerObj.site_name = getValueFromObj(d, "site_name", "-")
    CustomerObj.ship_to_party = getValueFromObj(d, "ship_to_party", "-")
    CustomerObj.site_id = getValueFromObj(d, "site_id", "-")
    CustomerObj.ship_to_company = getValueFromObj(d, "ship_to_company", "-")
    CustomerObj.station_status_sap = getValueFromObj(
      d,
      "station_status_sap",
      "-"
    )
    CustomerObj.station_status_awsm = getValueFromObj(
      d,
      "station_status_awsm",
      "-"
    )
    CustomerObj.remarks = getValueFromObj(d, "remarks", "-")
    CustomerObj.setel_activation_status = getValueFromObj(
      d,
      "setel_activation_status",
      "-"
    )
    CustomerObj.territory_manager_name = getValueFromObj(
      d,
      "territory_manager_name",
      "-"
    )
    CustomerObj.territory_manager_number = getValueFromObj(
      d,
      "territory_manager_number",
      "-"
    )
    CustomerObj.territory_manager_email = getValueFromObj(
      d,
      "territory_manager_email",
      "-"
    )
    CustomerObj.retail_sales_manager_name = getValueFromObj(
      d,
      "retail_sales_manager_name",
      "-"
    )
    CustomerObj.retail_sales_manager_number = getValueFromObj(
      d,
      "retail_sales_manager_number",
      "-"
    )
    CustomerObj.retail_sales_manager_email = getValueFromObj(
      d,
      "retail_sales_manager_email",
      "-"
    )
    CustomerObj.contact_last_updated = getValueFromObj(
      d,
      "contact_last_updated",
      "-"
    )
    CustomerObj.road_tanker_requirement = getValueFromObj(
      d,
      "road_tanker_requirement",
      "-"
    )
    CustomerObj.sales_inventory_data_source = getValueFromObj(
      d,
      "sales_inventory_data_source",
      "-"
    )
    CustomerObj.end_of_day = getValueFromObj(d, "end_of_day", "-")
    CustomerObj.road_tanker_accessibility = getValueFromObj(
      d,
      "road_tanker_accessibility",
      "-"
    )
    CustomerObj.sold_to_party = getValueFromObj(d, "sold_to_party", "-")
    CustomerObj.sold_to_company = getValueFromObj(d, "sold_to_company", "-")
    CustomerObj.station_cluster = getValueFromObj(d, "station_cluster", "-")
    CustomerObj.alternate_cluster = getValueFromObj(d, "alternate_cluster", "-")
    CustomerObj.cloud = getValueFromObj(d, "cloud", "-")
    CustomerObj.border_station = getValueFromObj(d, "border_station", "-")
    CustomerObj.distance_from_terminal = getValueFromObj(
      d,
      "distance_from_terminal",
      "-"
    )
    CustomerObj.speed = getValueFromObj(d, "speed", "-")
    CustomerObj.speed = getValueFromObj(d, "pump_type", "-")
    getAddressTableObj(CustomerObj, d, "address_table")
    getProductObj(CustomerObj, d, "product_1")
    getProductObj(CustomerObj, d, "product_2")
    getProductObj(CustomerObj, d, "product_3")
    getProductObj(CustomerObj, d, "product_4")
    getProductObj(CustomerObj, d, "product_5")
    getProductObj(CustomerObj, d, "product_6")
    getProductObj(CustomerObj, d, "product_7")
    getProductObj(CustomerObj, d, "product_8")
    getProductObj(CustomerObj, d, "product_9")
    getProductObj(CustomerObj, d, "product_10")
    getContactPersonObj(CustomerObj, d, "contact_person1")
    getContactPersonObj(CustomerObj, d, "contact_person2")
    getContactPersonObj(CustomerObj, d, "contact_person3")
    getDateObj(CustomerObj, d, "delivery_open_time_date")
    getDateObj(CustomerObj, d, "actual_open_1_date")
    getDateObj(CustomerObj, d, "actual_open_2_date")
    getDateObj(CustomerObj, d, "actual_open_3_date")
    getDateObj(CustomerObj, d, "no_delivery_interval_1_date")
    getDateObj(CustomerObj, d, "no_delivery_interval_2_date")
    getDateObj(CustomerObj, d, "no_delivery_interval_3_date")
    getDateObj(CustomerObj, d, "no_delivery_interval_4_date")
    getDateObj(CustomerObj, d, "no_delivery_interval_5_date")
    finalData.push(CustomerObj)
    CustomerObj = cloneobj
  })
  return {
    list: finalData,
    total_rows: getValueFromObj(data, "total_rows", "0"),
  }
}
