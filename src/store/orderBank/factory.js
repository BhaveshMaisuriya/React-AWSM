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
          from: moment.utc(date, DATE_FORMAT, true).startOf('date'),
          to: moment.utc(date, DATE_FORMAT, true).endOf('date'),
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

export function factorizeGanttChartEventBar({
  order,
  vehicleId,
  rtHours,
  isBackground = false,
  date = new Date().format(DATE_FORMAT),
}) {
  const background = {
    startDate: rtHours.from.isValid()
      ? rtHours.from.format(DATE_TIME_FORMAT)
      : null,
    endDate: rtHours.to.isValid() ? rtHours.to.format(DATE_TIME_FORMAT) : null,
    color: EVENT_COLOR.RT_Availability,
  }

  if (isBackground)
    return {
      resourceId: vehicleId,
      startDate: background.startDate,
      endDate: background.endDate,
      eventType: 'RT_Availability',
      eventColor: EVENT_COLOR.RT_Availability,
      draggable: false,
      resizable: false,
      background,
      flags: {
        isBackground,
      },
    }

  const { planned_load_time, planned_end_time, scheduled_status } = order

  const timerange = ensureDateRangeNotExceedingADay({
    from: planned_load_time,
    to: planned_end_time,
    date,
  })

  const event = {
    id: order.id,
    resourceId: vehicleId,
    startDate: timerange.from.format(DATE_TIME_FORMAT),
    endDate: timerange.to.format(DATE_TIME_FORMAT),
    eventType: scheduled_status,
    eventColor: EVENT_COLOR[scheduled_status],
    draggable: false,
    resizable: false,
    background,
    flags: {
      isBackground,
      hasSoftRestriction: order.soft_restriction ? true : false,
      eta: order.eta
        ? moment.utc(order.eta).format(TIME_FORMAT_SHORT)
        : '00:00',
      terminal: order.terminal ?? 'M808',
    },
  }

  !order.shipment && (event.resourceOrder = [{ DNNumber: order.dn_no }])

  return event
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
      vehicle.order_banks.forEach(order =>
        events.push(
          factorizeGanttChartEventBar({
            order,
            vehicleId: vehicle.id,
            rtHours,
            isBackground: false,
            date,
          })
        )
      )
    } else
      events.push(
        factorizeGanttChartEventBar({
          vehicleId: vehicle.id,
          rtHours,
          isBackground: true,
          date,
        })
      )
  })

  return events
}

export function factorizeShipmentTableRow(shipment) {
  // I only rewrite to get a better codebase, no logic changes
  const orders = []
  if (shipment.order_banks && shipment.order_banks.length)
    shipment.order_banks.forEach(order => {
      const event = {
        id: order.id,
        volume: order.volume,
        delivery_date: order.requested_delivery_date,
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

  return {
    id: shipment.shipment,
    orders,
  }
}

export function factorizeShipmentTableRows(shipments) {
  const rows = []

  shipments.map(shipment => factorizeShipmentTableRow(shipment))

  return rows
}
