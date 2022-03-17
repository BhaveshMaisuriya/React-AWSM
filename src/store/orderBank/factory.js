import moment from 'moment'
import { get, groupBy, sortBy, uniq } from 'lodash'

export const TIME_FORMAT_SHORT = 'HH:mm'
export const DATE_FORMAT = 'YYYY-MM-DD'
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
  data,
  resourceId,
  rtHours,
  isBackground = false,
  renderBackground = true,
  date = new Date().format(DATE_FORMAT),
}) {
  const background = {
    startDate:
      renderBackground && rtHours.from.isValid()
        ? rtHours.from.format(DATE_TIME_FORMAT)
        : null,
    endDate:
      renderBackground && rtHours.to.isValid()
        ? rtHours.to.format(DATE_TIME_FORMAT)
        : null,
    color: EVENT_COLOR.RT_Availability,
  }

  if (isBackground)
    return {
      resourceId,
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
      supplement: {},
    }

  const {
    id,
    planned_load_time,
    planned_end_time,
    scheduled_status,
    soft_restriction,
    terminal,
    orderIndexes,
    etas,
    srs,
    hps,
    requestedDeliveryDates, // DATE_FORMAT
  } = data

  const timerange = ensureDateRangeNotExceedingADay({
    from: planned_load_time,
    to: planned_end_time,
    date,
  })

  const event = {
    id,
    resourceId: resourceId,
    startDate: timerange.from.format(DATE_TIME_FORMAT),
    endDate: timerange.to.format(DATE_TIME_FORMAT),
    eventType: scheduled_status,
    eventColor: EVENT_COLOR[scheduled_status],
    draggable: false,
    resizable: false,
    background,
    flags: {
      isBackground,
      hasSoftRestriction: soft_restriction ? true : false,
      highlightFor: '-',
    },
    supplement: {
      orderIndexes,
      terminal,
      etas,
      specialRequests: srs,
      highPriorities: hps,
      requestedDeliveryDates,
      resourceOrder: !data.shipment ? [{ DNNumber: data.dn_no }] : [],
    },
  }

  return event
}

export function factorizeGanttChartEventBars({
  orders,
  rtHours,
  resourceId,
  date = new Date().format(DATE_FORMAT),
}) {
  // make sure smaller start date goes first
  orders.sort(
    (a, b) => new Date(a.planned_load_time) - new Date(b.planned_load_time)
  )

  const events = []

  const routes = groupBy(orders, 'route_id')
  for (const id in routes) {
    const groupedOrders = routes[id]

    const event = factorizeGanttChartEventBar({
      data: {
        ...groupedOrders[0],
        id,
        orderIndexes: groupedOrders.map(o => o.id),
        etas: sortBy(uniq(groupedOrders.map(o => o.eta))).map(v =>
          moment.utc(v)
        ),
        requestedDeliveryDates: groupedOrders.map(o =>
          moment(o.requested_delivery_date, DATE_FORMAT, true)
        ),
        srs: groupedOrders.map(o => o.sr),
        hps: groupedOrders.map(o => o.hp),
      },
      resourceId,
      rtHours,
      isBackground: false,
      renderBackground: id === Object.keys(routes)[0],
      date,
    })

    events.push(event)
  }

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
  const rows = shipments.map(shipment => factorizeShipmentTableRow(shipment))

  return rows
}
