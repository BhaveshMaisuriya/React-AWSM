import { get } from 'lodash'
import moment from 'moment'

export const TIME_FORMAT_SHORT = 'HH:mm'
const DATE_FORMAT = 'YYYY-MM-DD'
const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm'
export const EVENT_COLOR = {
  Scheduled: '#84B0E9',
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
  includeGanttChartVisual = true,
}) {
  if (!from || !to) {
    const result = fillTime
      ? {
          from: moment(date, DATE_FORMAT, true).startOf('date').utc(),
          to: moment(date, DATE_FORMAT, true).endOf('date').utc(),
        }
      : { from: moment.invalid(), to: moment.invalid() }

    includeGanttChartVisual && (result.ganttChartVisual = { ...result })
    return
  }

  const targetDate = moment.utc(date, DATE_FORMAT, true)

  let start = moment.utc(from)
  start.dayOfYear() < targetDate.dayOfYear() &&
    (start = targetDate.clone().startOf('date'))

  let end = moment.utc(to)
  end.dayOfYear() > targetDate.dayOfYear() &&
    (end = targetDate.clone().endOf('date'))

  const result = {
    from: start,
    to: end,
  }

  if (includeGanttChartVisual) {
    result.ganttChartVisual = {
      from:
        start.minutes() < 30
          ? start.clone().startOf('hour')
          : start.clone().endOf('hour'),
      to:
        end.minutes() < 30
          ? end.clone().startOf('hour')
          : end.clone().endOf('hour'),
    }

    if (
      result.ganttChartVisual.from.hours() < 23 &&
      result.ganttChartVisual.from.minutes() === 59
    )
      // add 1 minute to make sure it bumps up to the next hour
      result.ganttChartVisual.from.add(1, 'minute')

    if (
      result.ganttChartVisual.to.hours() < 23 &&
      result.ganttChartVisual.to.minutes() === 59
    )
      // add 1 minute to make sure it bumps up to the next hour
      result.ganttChartVisual.to.add(1, 'minute')
  }

  return result
}

export function factorizeGanttChartEventBars(
  roadTankers,
  date = new Date().format(DATE_FORMAT)
) {
  let eventGanttChartList = []
  roadTankers.forEach(vehicle => {
    const rtHours = ensureDateRangeNotExceedingADay({
      from: vehicle.rt_avaiblity_hour_from,
      to: vehicle.rt_avaiblity_hour_to,
      date,
      fillTime: false,
      includeGanttChartVisual: true,
    })

    if (vehicle.order_banks && vehicle.order_banks.length) {
      vehicle.order_banks.forEach(orderBank => {
        const { planned_load_time, planned_end_time, scheduled_status } =
          orderBank

        const timerange = ensureDateRangeNotExceedingADay({
          from: planned_load_time,
          to: planned_end_time,
          date,
          includeGanttChartVisual: true,
        })

        const event = {
          id: orderBank.id,
          resourceId: vehicle.vehicle,
          startDate: timerange.ganttChartVisual.from.format(DATE_TIME_FORMAT),
          endDate: timerange.ganttChartVisual.to.format(DATE_TIME_FORMAT),
          time: { start: timerange.from, end: timerange.to },
          eventType: scheduled_status,
          eventColor: EVENT_COLOR[scheduled_status],
          draggable: true,
        }

        !orderBank.shipment &&
          (event.resourceOrder = [{ DNNumber: orderBank.dn_no }])

        orderBank.soft_restriction && (event.hasSoftRestriction = true)

        eventGanttChartList.push(event)

        // the RT Availability Hours background
        if (rtHours.from.isValid() && rtHours.to.isValid()) {
          const leftGap = timerange.ganttChartVisual.from.diff(
            rtHours.ganttChartVisual.from,
            'minute'
          )
          if (leftGap > 0) {
            const leftStop = rtHours.ganttChartVisual.from
              .clone()
              .add(leftGap, 'minute')
            eventGanttChartList.push({
              // id: `${orderBank.id}_lfill`,
              isBackground: true,
              resourceId: vehicle.id,
              startDate: rtHours.ganttChartVisual.from.format(DATE_TIME_FORMAT),
              endDate: leftStop.format(DATE_TIME_FORMAT),
              eventType: 'RT_Availability',
              eventColor: EVENT_COLOR.RT_Availability,
              draggable: false,
              resizable: false,
            })
          }

          const rightGap = rtHours.ganttChartVisual.to.diff(
            timerange.ganttChartVisual.to,
            'minute'
          )
          if (rightGap > 0) {
            const rightStart = rtHours.ganttChartVisual.to
              .clone()
              .subtract(rightGap, 'minute')
            eventGanttChartList.push({
              // id: `${orderBank.id}_rfill`,
              isBackground: true,
              resourceId: vehicle?.vehicle,
              startDate: rightStart.format(DATE_TIME_FORMAT),
              endDate: rtHours.ganttChartVisual.to.format(DATE_TIME_FORMAT),
              eventType: 'RT_Availability',
              eventColor: EVENT_COLOR.RT_Availability,
              draggable: false,
              resizable: false,
            })
          }
        }
      })
    } else if (rtHours.from.isValid() && rtHours.to.isValid()) {
      eventGanttChartList.push({
        // id: `${orderBank.id}_fill`,
        isBackground: true,
        resourceId: vehicle.vehicle,
        startDate: rtHours.from.format(DATE_TIME_FORMAT),
        endDate: rtHours.to.format(DATE_TIME_FORMAT),
        eventType: 'RT_Availability',
        eventColor: EVENT_COLOR.RT_Availability,
        draggable: false,
        resizable: false,
      })
    }
  })

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
