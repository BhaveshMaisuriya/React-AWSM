import { isNull, isUndefined } from "lodash"
import { format, parse } from "date-fns"

const checkNullValue = (data, defaultValue) =>
(isNull(data) || data === '' || data === ' ') ? defaultValue : data

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

const TIME_FORMAT = "HH:mm:ss"
const DATE_TIME_FORMAT = "yyyy-MM-dd HH:mm"
const EVENT_COLOR = {
  "Scheduled": "#84B0E9",
  "PendingShipment": "#9F79B7",
  "ShipmentCreated": "#615E9B",
  "Cancellation": "#BDBDBD",
  "BlockedDN": "#E45E5E"
}
const RAND_COLOR = ["#84B0E9", "#9F79B7", "#615E9B", "#BDBDBD", "#E45E5E"]

export function eventGanttChartFactory(roadTankerList) {
  let eventGanttChartList = []
  if (roadTankerList.length > 0) {
    roadTankerList.forEach(vehicle => {
      vehicle?.order_banks?.forEach(orderBank => {
        const { planned_load_time, eta, shift_date } = orderBank;
        const event = {
          id: orderBank?.id,
          resourceId: vehicle?.vehicle,
          startDate: planned_load_time ? format(parse(planned_load_time, TIME_FORMAT, new Date(shift_date)), DATE_TIME_FORMAT) : "",
          endDate: eta ? format(parse(eta, TIME_FORMAT, new Date(shift_date)), DATE_TIME_FORMAT) : "",
          eventType: orderBank?.dn_status,
          eventColor: RAND_COLOR[Math.floor(Math.random() * 5)],
        }
        eventGanttChartList.push(event)
      })
    })
  }
  return eventGanttChartList;
}