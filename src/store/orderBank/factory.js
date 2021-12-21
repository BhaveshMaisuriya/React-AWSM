import { isUndefined, get } from "lodash"
import { format, parse } from "date-fns"

export default function orderBankFactory(data, orderid) {
  const finalData = []
  if (!isUndefined(data)) {
    data.map(item => {
      if (orderid === item.shipNo) {
        finalData.push(item)
      }
    })
  }
  return finalData
}

const TIME_FORMAT = "HH:mm:ss"
const DATE_TIME_FORMAT = "yyyy-MM-dd HH:mm"
const EVENT_COLOR = {
  Scheduled: "#84B0E9",
  PendingShipment: "#9F79B7",
  ShipmentCreated: "#615E9B",
  Cancellation: "#BDBDBD",
  BlockedDN: "#E45E5E",
}

export function eventGanttChartFactory(roadTankerList) {
  let eventGanttChartList = []
  if (roadTankerList.length > 0) {
    roadTankerList.forEach(vehicle => {
      vehicle?.order_banks?.forEach(orderBank => {
        const { planned_load_time, planned_end_time, shift_date, dn_status } = orderBank;
        const event = {
          id: orderBank?.id,
          resourceId: vehicle?.vehicle,
          startDate: planned_load_time ? format(parse(planned_load_time, TIME_FORMAT, new Date(shift_date)), DATE_TIME_FORMAT) :  format(parse("00:00:00", TIME_FORMAT, new Date(shift_date)), DATE_TIME_FORMAT),
          endDate: planned_end_time ? format(parse(planned_end_time, TIME_FORMAT, new Date(shift_date)), DATE_TIME_FORMAT) : format(parse("23:59:59", TIME_FORMAT, new Date(shift_date)), DATE_TIME_FORMAT),
          eventType: orderBank?.dn_status,
          eventColor: EVENT_COLOR[dn_status],
          draggable: true,
        }
        eventGanttChartList.push(event)
      })
    })
  }
  return eventGanttChartList
}

export function shipmentFactory(shipments) {
  let shipmentList = []
  if (shipments.length > 0) {
    shipments.forEach(shipment => {
      let orders = []
      shipment?.order_banks?.forEach(order => {
        const event = {
          volume: order?.volume,
          delivery_date: order?.requested_delivery_date,
          cloud: get(order, "retail_storage_relation.retail_customer_relation.cloud", ""),
          name: get(order, "retail_storage_relation.retail_customer_relation.ship_to_company", ""),
          ship_to: get(order, "retail_storage_relation.retail", ""),
          product: get(order, "retail_storage_relation.product", "")
        }
        orders.push(event)
      })
      const shipmentItem = {
        id: shipment?.shipment,
        orders,
      }
      shipmentList.push(shipmentItem)
    })
  }
  return shipmentList
}
