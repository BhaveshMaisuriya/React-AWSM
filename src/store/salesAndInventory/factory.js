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
      finalData.push(mainTableObj)
      mainTableObj = cloneobj
    })
  }
  return {
    list: finalData,
    total_rows: getValueFromObj(data.data, "total_rows", "0"),
  }
}

export function formatResponseDataVarianceControl(obj, prefix, excludeFields,fullCapitalStation = ["lv1","lv2","tc"]) {
  const keyValuePairs = getKeyValuePairs(obj,prefix, excludeFields);
  const categories = Array.from(new Set(keyValuePairs.map(([key]) => key?.split("_")?.[0])));
  if (!categories || categories.length === 0 || categories.some((key) => !key)) {
    return null;
  }
  return mergeCategoryWithData(categories,keyValuePairs, fullCapitalStation)
}

function getKeyValuePairs(obj,prefix,excludeFields){
  return Object.entries(obj)
    .map(([key, value]) => {
      const formatKey = key.replace(prefix, "");
      return [formatKey, value]
    }).filter(([key]) => excludeFields.indexOf(key) === -1);
}

function mergeCategoryWithData(categories, keyValuePairs, fullCapitalStation = ["lv1","lv2","tc"]){
  return categories.reduce((initObj, category) => {
    initObj[category] = [];
    const dataInCategory = keyValuePairs.filter(([key]) => key.indexOf(category) !== -1);
    const stations = Array.from(new Set(dataInCategory.map(([key]) => key.split("_")[1])));
    stations.forEach((station) => {
      const variance_value = dataInCategory.find(([key]) => key.indexOf(`${station}_variance_value`) !== -1)?.[1]
      const variance_percentage = (dataInCategory.find(([key]) => key.indexOf(`${station}_percentage`) !== -1)?.[1]) * 100
      // response data is decimal like 0.3. must multiply 100 to show as percentage
      if (fullCapitalStation.indexOf(station) > -1){
        station = station.toUpperCase();
      }else{
        station = station.charAt(0).toUpperCase() + station.slice(1)
      }
      initObj[category].push({ station_tank_status: station, variance_value, variance_percentage })
    })
    return initObj;
  }, {})
}

/*
The backend response is in format:
{
    "vc_id": 3,
    "vc_sales_lv1_variance_value": 5000,
    "vc_sales_lv1_percentage": 0.3,
    "vc_sales_lv2_variance_value": 1500,
     ....
    "vc_inventory_normal_percentage": 0.3,
    "vc_inventory_tc_variance_value": 6000,
    "vc_inventory_tc_percentage": 0.3,
    "vc_created_at": "2021-09-13T04:21:21.000Z"
}

Now we must convert to the format :

sales: [
		{
			station_tank_status: "LV1",
			variance_value: "5000",
			variance_percentage: "30"
		},
		{
			station_tank_status: "LV2",
			variance_value: "1500",
			variance_percentage: "30"
		},
		...
	],
	inventory: [
		{
			station_tank_status: "LV1",
			variance_value: "3000",
			variance_percentage: "30"
		},
		{
			station_tank_status: "LV2",
			variance_value: "4500",
			variance_percentage: "30"
		},
	  ....
	]
* */