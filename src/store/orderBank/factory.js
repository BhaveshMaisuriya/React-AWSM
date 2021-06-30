import { isNull, isUndefined } from "lodash"

const checkNullValue = (data, defaultValue) =>
  isNull(data) ? defaultValue : data

const getValueFromObj = (dataObj, key, defaultVal) => {
  if (Object.prototype.hasOwnProperty.call(dataObj, key)) {
    return checkNullValue(dataObj[key], defaultVal)
  } else return defaultVal
}

export default function orderBankFactory(data, orderid) {
  const finalData = []
  if (!isUndefined(data)) {
    data.map((item, index)=>{
      if(orderid === item.shipNo){
        finalData.push(item);
      }
    })
  }
  return finalData;
}