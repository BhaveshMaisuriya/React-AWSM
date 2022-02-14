import { get } from 'lodash'
import moment from 'moment'
import { format, parse } from 'date-fns'

const TIME_FORMAT = 'HH:mm:ss'
const DATE_TIME_FORMAT = 'yyyy-MM-dd HH:mm'
export const EVENT_COLOR = {
  Scheduled: '#84B0E9',
  PendingShipment: '#9F79B7',
  ShipmentCreated: '#615E9B',
  Cancellation: '#BDBDBD',
  BlockedDN: '#E45E5E',
  RT_Availability: '#dce5f0',
}

export function eventGanttChartFactory(roadTankerList) {
  let eventGanttChartList = []
  if (roadTankerList.length > 0) {
    roadTankerList.forEach(vehicle => {
      const rtHours = {
        from: vehicle.rt_avaiblity_hour_from ? new Date(vehicle.rt_avaiblity_hour_from) : null,
        to: vehicle.rt_avaiblity_hour_to ? new Date(vehicle.rt_avaiblity_hour_to) : null,
      }

      if (vehicle.order_banks && vehicle.order_banks.length) {
        vehicle.order_banks.forEach(orderBank => {
          const { planned_load_time, planned_end_time, shift_date, scheduled_status } = orderBank

          const timerange = {
            start: planned_load_time
              ? new Date(planned_load_time)
              : parse('00:00:00', TIME_FORMAT, new Date(shift_date)),
            end: planned_end_time
              ? new Date(planned_end_time)
              : parse('23:59:59', TIME_FORMAT, new Date(shift_date)),
          }

          const event = {
            id: orderBank?.id,
            resourceId: vehicle?.vehicle,
            startDate: format(timerange.start, DATE_TIME_FORMAT),
            endDate: format(timerange.end, DATE_TIME_FORMAT),
            eventType: scheduled_status,
            eventColor: EVENT_COLOR[scheduled_status],
            draggable: true,
          }

          if (!orderBank.shipment) event.resourceOrder = [{ DNNumber: orderBank.dn_no }]
          eventGanttChartList.push(event)

          // the RT Availability Hours background
          if (rtHours.from && rtHours.to) {
            const leftGap = moment(timerange.start).diff(moment(rtHours.from), 'minutes')
            if (leftGap > 0) {
              const leftStop = moment(rtHours.from).add(leftGap, 'minute')
              eventGanttChartList.push({
                isBackground: true,
                resourceId: vehicle?.vehicle,
                startDate: format(rtHours.from, DATE_TIME_FORMAT),
                endDate: format(leftStop.toDate(), DATE_TIME_FORMAT),
                eventType: 'RT_Availability',
                eventColor: EVENT_COLOR.RT_Availability,
                draggable: false,
                resizable: false,
              })
            }

            const rightGap = moment(rtHours.to).diff(moment(timerange.end), 'minutes')
            if (rightGap > 0) {
              const rightStart = moment(rtHours.to).subtract(rightGap, 'minutes')
              eventGanttChartList.push({
                isBackground: true,
                resourceId: vehicle?.vehicle,
                startDate: format(rightStart.toDate(), DATE_TIME_FORMAT),
                endDate: format(rtHours.to, DATE_TIME_FORMAT),
                eventType: 'RT_Availability',
                eventColor: EVENT_COLOR.RT_Availability,
                draggable: false,
                resizable: false,
              })
            }
          }
        })
      } else if (rtHours.from && rtHours.to) {
        eventGanttChartList.push({
          isBackground: true,
          resourceId: vehicle?.vehicle,
          startDate: format(rtHours.from, DATE_TIME_FORMAT),
          endDate: format(rtHours.to, DATE_TIME_FORMAT),
          eventType: 'RT_Availability',
          eventColor: EVENT_COLOR.RT_Availability,
          draggable: false,
          resizable: false,
        })
      }
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
          id: order?.id,
          volume: order?.volume,
          delivery_date: order?.requested_delivery_date,
          cloud: get(order, 'retail_storage_relation.retail_customer_relation.cloud', ''),
          name: get(order, 'retail_storage_relation.retail_customer_relation.ship_to_company', ''),
          ship_to: get(order, 'retail_storage_relation.retail', ''),
          product: get(order, 'retail_storage_relation.product', ''),
          isChecked: false,
          isOnRemove: false,
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
