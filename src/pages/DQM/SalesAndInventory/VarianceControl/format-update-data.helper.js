export function formatUpdateVarianceControlUploadData(object) {
  const keyValuePairs = Object.entries(object)
  if (!keyValuePairs.every(([_, value]) => Array.isArray(value))) {
    const invalidFields = keyValuePairs.filter(([_, value]) => !Array.isArray(value)).map(([key]) => key)
    console.error(invalidFields.join(",") + " not array type: format-update-data.helpers.js -" +
      " line 5")
    return null
  }
  const result = keyValuePairs.reduce((initObj, [key, value]) => {
    return { ...initObj, ...formatArrayToObj(key, value) }
  }, {})
  let invalidKeys = Object.entries(result).filter(([_, value]) => Number.isNaN(value))
  if (invalidKeys.length !== 0) {
    console.error(`
        ${invalidKeys.map(([key]) => key).join(",")}: Not number values : format-update-data.helpers.js - line 14
    `)
    return null
  }
  return result
}

function formatArrayToObj(prefix, array) {
  return array.reduce((initObj, item) => {
    const { station_tank_status, variance_value, variance_percentage } = item
    const prefixKey = `${prefix}_${station_tank_status.toLowerCase()}`
    const valueKey = `${prefixKey}_variance_value`
    const percentKey = `${prefixKey}_percentage`
    initObj[valueKey] = Number(variance_value)
    initObj[percentKey] = Number(variance_percentage)/100 // data must be decimal like 0.3. must
    // divide from percentage to decimal
    return initObj
  }, {})
}

/*
@params prefix ,for example: "inventory"
@params array:, for example: [
  {
    	{
			station_tank_status: "LV1",
			variance_value: "3000",
			variance_percentage: "30"
		},
		{
			station_tank_status: "LV2",
			variance_value: "4500",
			variance_percentage: "30"
		}
  }
 ]
 @output : {
  inventory_lv1_variance_value: 2,
	inventory_lv1_percentage: 2,
	inventory_lv2_variance_value: 2,
	inventory_lv2_percentage: 2,
 }
 */