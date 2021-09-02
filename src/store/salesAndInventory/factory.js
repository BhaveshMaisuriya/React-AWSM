import { isNull, isUndefined } from "lodash"

export const mergeFilterValues = (filterData, key) => {
  const filterObject = {}
  filterObject[key] = []
  for (const value of filterData) {
    if (value[key]) filterObject[key].push(value[key])
  }
  return filterObject
}

export const DownloadData = allDownloadData => {
  return allDownloadData
}

const checkNullValue = (data, defaultValue) =>
(isNull(data) || data === '' || data === ' ') ? defaultValue : data

const getValueFromObj = (dataObj, key, defaultVal) => {
  if (Object.prototype.hasOwnProperty.call(dataObj, key)) {
    return checkNullValue(dataObj[key], defaultVal)
  } else return defaultVal
}

export default function factory(data) {
  let mainTableObj = {}
  const finalData = []
  if (!isUndefined(data.data.list)) {
    data.data.list.forEach(d => {
      const cloneobj = JSON.parse(JSON.stringify(mainTableObj))
      for (const fields in d)
        mainTableObj[`${fields}`] = getValueFromObj(d, fields, "-")
      mainTableObj["address_1"] =
        getValueFromObj(d, "address_1", "-") +
        getValueFromObj(d, "address_2", " ") +
        getValueFromObj(d, "address_3", " ")

      mainTableObj["record_id"] = "mock_record_id"
      finalData.push(mainTableObj)
      mainTableObj = cloneobj
    })
  }
  return {
    list: finalData,
    total_rows: getValueFromObj(data.data, "total_rows", "0"),
  }
}
