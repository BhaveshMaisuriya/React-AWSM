import { get } from 'lodash'
import moment from 'moment'

export const TIME_FORMAT_SHORT = 'HH:mm'
const DATE_FORMAT = 'YYYY-MM-DD'
export const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm'
export const EVENT_COLOR = {
  Scheduled: '#84B0E9',
  Unscheduled: 'green',
  PendingShipment: '#9F79B7',
  ShipmentCreated: '#615E9B',
  Cancellation: '#BDBDBD',
  BlockedDN: '#E45E5E',
  RT_Availability: '#dce5f0',
}

/*
 * This function will make sure 2 dates are within a day.
 * It will cutdown exceeded time from <param: to>
 * @param range - { from: <momentjs parsable>, to: <momentjs parsable> }
 * @param date string - default to today, format YYYY-MM-DD
 * @param fillTime boolean - set <from to 00:00:00> and <to to 23:59:59> if both of 'em are null or empty
 * @returns { from: <momentjs object>, to: <momentjs object> }
 */
export function ensureDateRangeNotExceedingADay({
  from,
  to,
  date = new Date().format(DATE_FORMAT),
  fillTime = true,
}) {
  if (!from || !to) {
    return fillTime
      ? {
          from: moment(date, DATE_FORMAT, true).startOf('date').utc(),
          to: moment(date, DATE_FORMAT, true).endOf('date').utc(),
        }
      : { from: moment.invalid(), to: moment.invalid() }
  }

  const targetDate = moment.utc(date, DATE_FORMAT, true)

  let start = moment.utc(from)
  start.dayOfYear() < targetDate.dayOfYear() &&
    (start = targetDate.clone().startOf('date'))

  let end = moment.utc(to)
  end.dayOfYear() > targetDate.dayOfYear() &&
    (end = targetDate.clone().endOf('date'))

  return {
    from: start,
    to: end,
  }
}

export function factorizeGanttChartEventBars(
  roadTankers,
  date = new Date().format(DATE_FORMAT)
) {
  const events = []

  roadTankers.forEach(vehicle => {
    const rtHours = ensureDateRangeNotExceedingADay({
      from: vehicle.rt_avaiblity_hour_from,
      to: vehicle.rt_avaiblity_hour_to,
      date,
      fillTime: false,
    })

    if (vehicle.order_banks && vehicle.order_banks.length) {
      vehicle.order_banks.forEach(ob => {
        const { planned_load_time, planned_end_time, scheduled_status } = ob

        const timerange = ensureDateRangeNotExceedingADay({
          from: planned_load_time,
          to: planned_end_time,
          date,
        })

        const event = {
          id: ob.id,
          resourceId: vehicle.id,
          startDate: timerange.from.format(DATE_TIME_FORMAT),
          endDate: timerange.to.format(DATE_TIME_FORMAT),
          eventType: scheduled_status,
          eventColor: EVENT_COLOR[scheduled_status],
          draggable: false,
          resizable: false,
          background: {
            startDate: rtHours.from.format(DATE_TIME_FORMAT),
            endDate: rtHours.to.format(DATE_TIME_FORMAT),
            color: EVENT_COLOR.RT_Availability,
          },
          flags: {
            isBackground: false,
            hasSoftRestriction : ob.soft_restriction ? true : false,
            eta: ob.eta ? moment.utc(ob.eta).format(TIME_FORMAT_SHORT) : '00:00',
            terminal: ob.terminal ?? 'M808'
          },
        }

        !ob.shipment && (event.resourceOrder = [{ DNNumber: ob.dn_no }])

        events.push(event)
      })
    } else
      events.push({
        resourceId: vehicle.id,
        startDate: rtHours.from.format(DATE_TIME_FORMAT),
        endDate: rtHours.to.format(DATE_TIME_FORMAT),
        eventType: 'RT_Availability',
        eventColor: EVENT_COLOR.RT_Availability,
        draggable: false,
        resizable: false,
        background: {
          startDate: rtHours.from.format(DATE_TIME_FORMAT),
          endDate: rtHours.to.format(DATE_TIME_FORMAT),
          color: EVENT_COLOR.RT_Availability,
        },
        flags: {
          isBackground: true,
        },
      })
  })

  return events
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
          cloud: get(
            order,
            'retail_storage_relation.retail_customer_relation.cloud',
            ''
          ),
          name: get(
            order,
            'retail_storage_relation.retail_customer_relation.ship_to_company',
            ''
          ),
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
