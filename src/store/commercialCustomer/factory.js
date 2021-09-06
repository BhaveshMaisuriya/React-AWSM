import { isNull, isUndefined } from "lodash"

const checkNullValue = (data, defaultValue) =>
  (isNull(data) || data === '' || data === ' ') ? defaultValue : data

const getValueFromObj = (dataObj, key, defaultVal) => {
  if (Object.prototype.hasOwnProperty.call(dataObj, key)) {
    return checkNullValue(dataObj[key], defaultVal)
  } else return defaultVal
}

export default function retailCustomerFactory(data) {
  let retailCustomerObj = {}
  const finalData = []
  if (!isUndefined(data.data.list)) {
    data.data.list.forEach(d => {
      const cloneobj = JSON.parse(JSON.stringify(retailCustomerObj))
      for (const fields in d)
        retailCustomerObj[`${fields}`] = getValueFromObj(d, fields, "-")
      retailCustomerObj["address_1"] =
        getValueFromObj(d, "address_1", "-") +
        getValueFromObj(d, "address_2", " ") +
        getValueFromObj(d, "address_3", " ")
      finalData.push(retailCustomerObj)
      retailCustomerObj = cloneobj
    })
  }
  return {
    list: finalData,
    total_rows: getValueFromObj(data.data, "total_rows", "0"),
  }
}