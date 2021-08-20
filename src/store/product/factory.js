import { isEmpty, isNull } from "lodash"

const checkNullValue = (data, defaultValue) =>
  isNull(data) || isEmpty(data) ? defaultValue : data

const getValueFromObj = (dataObj, key, defaultVal) => {
  if (Object.prototype.hasOwnProperty.call(dataObj, key)) {
    let temp = ((key === 'status_sap' || key === 'status_awsm') && dataObj[key]) === null ? 'ACTIVE' : ((key === 'status_sap' || key === 'status_awsm') && dataObj[key] === 'x') ? 'DELETE' : checkNullValue(dataObj[key], defaultVal);
    return temp;
  } else return defaultVal
}

export default function factory(data) {
  let retailCustomerObj = {}
  const finalData = []
  data.data.list.forEach(d => {    
    const cloneobj = JSON.parse(JSON.stringify(retailCustomerObj))
    for (const fields in d) {      
      retailCustomerObj[`${fields}`] = getValueFromObj(d, fields, "-")
    }
    finalData.push(retailCustomerObj)
    retailCustomerObj = cloneobj
  })
  return {
    list: finalData,
    total_rows: getValueFromObj(data.data, "total_rows", "0"),
  }
}