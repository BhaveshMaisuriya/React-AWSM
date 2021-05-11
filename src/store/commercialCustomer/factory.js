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

const checkNullValue = (data, defaultValue) =>
  data === null ? defaultValue : data

const getValueFromObj = (dataObj, key, defaultVal) => {
  if (Object.prototype.hasOwnProperty.call(dataObj, key)) {
    // console.log(dataObj[key], checkNullValue(dataObj[key], defaultVal))
    return checkNullValue(dataObj[key], defaultVal)
  } else return defaultVal
}

const getAddressTableObj = (retailCustomerObj, data, key) => {
  const tempObj = retailCustomerObj
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

const getProductObj = (retailCustomerObj, data, key) => {
  const tempObj = retailCustomerObj
  if (Object.prototype.hasOwnProperty.call(data, key)) {
    productArray.forEach(
      p => (tempObj[`${key}_${p}`] = getValueFromObj(data[key], p, "-"))
    )
  }
  return tempObj
}

const getContactPersonObj = (retailCustomerObj, data, key) => {
  const tempObj = retailCustomerObj
  if (Object.prototype.hasOwnProperty.call(data, key)) {
    contactPersonArray.forEach(
      p => (tempObj[`${key}_${p}`] = getValueFromObj(data[key], p, "-"))
    )
  }
  return tempObj
}

const getRetailCustomerObj = () => {
  const retailCustomerObj = {
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
  return retailCustomerObj
}

export default function retailCustomerFactory(data) {
  let retailCustomerObj = getRetailCustomerObj()
  const finalData = []
  data.list.forEach(d => {
    const cloneobj = JSON.parse(JSON.stringify(retailCustomerObj))
    retailCustomerObj.site_name = getValueFromObj(d, "site_name", "-")
    retailCustomerObj.ship_to_party = getValueFromObj(d, "ship_to_party", "-")
    retailCustomerObj.site_id = getValueFromObj(d, "site_id", "-")
    retailCustomerObj.ship_to_company = getValueFromObj(
      d,
      "ship_to_company",
      "-"
    )
    retailCustomerObj.station_status_sap = getValueFromObj(
      d,
      "station_status_sap",
      "-"
    )
    retailCustomerObj.station_status_awsm = getValueFromObj(
      d,
      "station_status_awsm",
      "-"
    )
    retailCustomerObj.remarks = getValueFromObj(d, "remarks", "-")
    retailCustomerObj.setel_activation_status = getValueFromObj(
      d,
      "setel_activation_status",
      "-"
    )
    retailCustomerObj.territory_manager_name = getValueFromObj(
      d,
      "territory_manager_name",
      "-"
    )
    retailCustomerObj.territory_manager_number = getValueFromObj(
      d,
      "territory_manager_number",
      "-"
    )
    retailCustomerObj.territory_manager_email = getValueFromObj(
      d,
      "territory_manager_email",
      "-"
    )
    retailCustomerObj.retail_sales_manager_name = getValueFromObj(
      d,
      "retail_sales_manager_name",
      "-"
    )
    retailCustomerObj.retail_sales_manager_number = getValueFromObj(
      d,
      "retail_sales_manager_number",
      "-"
    )
    retailCustomerObj.retail_sales_manager_email = getValueFromObj(
      d,
      "retail_sales_manager_email",
      "-"
    )
    retailCustomerObj.contact_last_updated = getValueFromObj(
      d,
      "contact_last_updated",
      "-"
    )
    retailCustomerObj.road_tanker_requirement = getValueFromObj(
      d,
      "road_tanker_requirement",
      "-"
    )
    retailCustomerObj.sales_inventory_data_source = getValueFromObj(
      d,
      "sales_inventory_data_source",
      "-"
    )
    retailCustomerObj.end_of_day = getValueFromObj(d, "end_of_day", "-")
    retailCustomerObj.road_tanker_accessibility = getValueFromObj(
      d,
      "road_tanker_accessibility",
      "-"
    )
    retailCustomerObj.sold_to_party = getValueFromObj(d, "sold_to_party", "-")
    retailCustomerObj.sold_to_company = getValueFromObj(
      d,
      "sold_to_company",
      "-"
    )
    retailCustomerObj.station_cluster = getValueFromObj(
      d,
      "station_cluster",
      "-"
    )
    retailCustomerObj.alternate_cluster = getValueFromObj(
      d,
      "alternate_cluster",
      "-"
    )
    retailCustomerObj.cloud = getValueFromObj(d, "cloud", "-")
    retailCustomerObj.border_station = getValueFromObj(d, "border_station", "-")
    retailCustomerObj.distance_from_terminal = getValueFromObj(
      d,
      "distance_from_terminal",
      "-"
    )
    retailCustomerObj.speed = getValueFromObj(d, "speed", "-")
    getAddressTableObj(retailCustomerObj, d, "address_table")
    getProductObj(retailCustomerObj, d, "product_1")
    getProductObj(retailCustomerObj, d, "product_2")
    getProductObj(retailCustomerObj, d, "product_3")
    getProductObj(retailCustomerObj, d, "product_4")
    getProductObj(retailCustomerObj, d, "product_5")
    getProductObj(retailCustomerObj, d, "product_6")
    getContactPersonObj(retailCustomerObj, d, "contact_person1")
    getContactPersonObj(retailCustomerObj, d, "contact_person2")
    getContactPersonObj(retailCustomerObj, d, "contact_person3")
    finalData.push(retailCustomerObj)
    retailCustomerObj = cloneobj
  })
  return {
    list: finalData,
    totalRows: getValueFromObj(data, "total_rows", "0"),
  }
}
