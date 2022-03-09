import {
  CANCEL_PAYMENT_IN_GANTT_CHART_FAIL,
  CANCEL_PAYMENT_IN_GANTT_CHART_SUCCESS,
  DELETE_ORDERBANK_DETAIL_FAIL,
  DELETE_ORDERBANK_DETAIL_SUCCESS,
  VIEW_ORDERBANK_DETAIL_FAIL,
  VIEW_ORDERBANK_DETAIL_SUCCESS,
  DESELECT_VEHICLE_RTS_SHIPMENT,
  DRAG_RTS_ORDER_BANK_TO_GANTT_CHART_SUCCESS,
  GET_ORDER_BANK_AUDITLOG_FAIL,
  GET_ORDER_BANK_AUDITLOG_SUCCESS,
  GET_ORDERBANK_FAIL,
  GET_ORDERBANK_SUCCESS,
  ADD_ORDERBANK_FAIL,
  ADD_ORDERBANK_SUCCESS,
  EDIT_ORDERBANK_FAIL,
  EDIT_ORDERBANK_CLEAR,
  EDIT_ORDERBANK_SUCCESS,
  GET_ORDERBANK_TABLE_INFORMATION_FAIL,
  GET_ORDERBANK_TABLE_INFORMATION_SUCCESS,
  GET_RTS_GANTT_CHART_DATA_FAIL,
  GET_RTS_GANTT_CHART_DATA_SUCCESS,
  GET_RTS_ORDER_BANK_TABLE_DATA_FAIL,
  GET_RTS_ORDER_BANK_TABLE_DATA_SUCCESS,
  GET_SHIPMENT_ORDER_BANK_TABLE_DATA_FAIL,
  GET_SHIPMENT_ORDER_BANK_TABLE_DATA_SUCCESS,
  PROCESS_PAYMENT_IN_GANTT_CHART_FAIL,
  PROCESS_PAYMENT_IN_GANTT_CHART_SUCCESS,
  REMOVE_ORDER_FROM_SHIPMENT_SUCCESS,
  REMOVE_ORDER_FROM_SHIPMENT_FAIL,
  REMOVE_SHIPMENT_FROM_EVENT_SUCCESS,
  SELECT_VEHICLE_RTS_SHIPMENT,
  SEND_DN_STATUS_REQUEST_SUCCESS,
  SEND_DN_STATUS_REQUEST_FAIL,
  SEND_ORDER_IN_GANTT_CHART_FAIL,
  SEND_ORDER_IN_GANTT_CHART_SUCCESS,
  UPDATE_ORDER_BANK_TABLE_DATA,
  UPDATE_ORDERBANK_TABLE_INFORMATION_FAIL,
  UPDATE_ORDERBANK_TABLE_INFORMATION_SUCCESS,
  REMOVE_EVENT_SUCCESS,
  REMOVE_EVENT_FAIL,
  // UPDATE_OB_EVENT_SUCCESS,
  // UPDATE_OB_EVENT_FAIL,
  GET_WEB_SOCKET_MESSAGE_SUCCESS,
  // GET_WEB_SOCKET_MESSAGE,
  GET_OB_RT_DETAILS_SUCCESS,
  // GET_OB_RT_DETAILS_FAIL,
  UPDATE_OB_RT_DETAILS_SUCCESS,
  UPDATE_OB_RT_DETAILS_FAIL,
  GET_CROSS_TERMINAL_SUCCESS,
  GET_CROSS_TERMINAL_FAIL,
  GET_DELETE_MULTIPLE_ORDER_SUCCESS,
  GET_DELETE_MULTIPLE_ORDER_FAIL,
  SEND_ORDER_BANK_DN_FAIL,
  SEND_ORDER_BANK_DN_SUCCESS,
  SEND_MULTIPLE_ORDER_BANK_DN_FAIL,
  SEND_MULTIPLE_ORDER_BANK_DN_SUCCESS,
  CLEAR_SCHEDULING_FAIL,
  CLEAR_SCHEDULING_SUCCESS,
  DRAG_RTS_ORDER_BANK_TO_GANTT_CHART_FAIL,
  CLEAR_GANTT_DATA,
  // GET_SHIPMENT_DETAIL_FAIL,
  GET_SHIPMENT_DETAIL_SUCCESS,
  CLEAR_RTS_ORDER_BANK_TABLE_DATA,
  DRAG_AND_DROP_SHIPMENT_AREA_SUCCESS,
  // GET_GANTT_EVENT_VALIDATION_SUCCESS,
  // GET_GANTT_EVENT_VALIDATION_FAIL,
  GET_SHIPMENT_DETAILS_ON_VEHICLE_SUCCESS,
  GET_SHIPMENT_DETAILS_ON_VEHICLE_FAIL,
  DRAG_ORDER_TO_SHIPMENT_SUCCESS,
  GET_OB_TOTAL_UNSCHEDULE_SUCCESS,
  // GET_OB_TOTAL_UNSCHEDULE_FAIL,
  SET_BRYNTUM_FILTER,
  UPDATE_SHIPMENT_SUCCESS,
  UPDATE_SHIPMENT_FAIL,
  DRAG_RTS_ORDER_BANK_TO_GANTT_CHART,
  DRAG_RTS_ORDER_BANK_TO_GANTT_CHART_CONFIRM_RESTRICTIONS,
} from './actionTypes'
import {
  ensureDateRangeNotExceedingADay,
  factorizeGanttChartEventBars,
  EVENT_COLOR,
  factorizeShipmentTableRows,
  factorizeGanttChartEventBar,
  DATE_TIME_FORMAT,
  factorizeShipmentTableRow,
} from './factory'
import { ToastSuccess, ToastError } from '../../helpers/swal'
import moment from 'moment'

const initialState = {
  orderBankData: null,
  orderBankTableData: [],
  orderBankTableFilters: {},
  orderBankTableSummary: [],
  shipmentOrderBankTableData: null,
  error: null,
  currentOrderDetail: null,
  selectedVehicleShipment: null,
  updateSuccess: false,
  isSendRequestProcess: false,
  auditsCom: null,
  ganttChart: {
    table: [],
    events: [],
    selectedFilters: {},
    terminal: {
      shiftDate: null,
      operatingTime: {
        from: null,
        to: null,
      },
    },
    scheduling: {
      orderIndexes: [],
      constraints: [],
      requiresConfirmation: false,
    },
  },
  orderBankRTDetails: null,
  crossTerminalDetails: null,
  socketData: [],
  totalRow: 0,
  totalOrderUnschedule: 0,
  multipleorder: null,
  sendDn: null,
  editorderBankData: null,
  ganttChartTableData: [],
  ganttChartOrderDrag: [],
  ganttChartTableFilter: {},
  totalRow_ganttChart: 0,
  shipmentDropData: [],
  sendMultipleDn: null,
  clearScheduling: null,
  ganttEventValidation: null,
  shipmentDetailsOnVehicle: [],
}

const RTSOrderBank = (state = initialState, action) => {
  switch (action.type) {
    case GET_RTS_ORDER_BANK_TABLE_DATA_SUCCESS:
      const { data, scrolling } = action.payload
      const { list, total_rows, filter, summary } = data

      if (
        (state.orderBankTableData !== null ||
          state.orderBankTableData?.length) &&
        scrolling
      ) {
        return {
          ...state,
          orderBankTableData: [...state.orderBankTableData, ...list],
          orderBankTableFilters: filter,
          totalRow: total_rows,
          orderBankTableSummary: summary,
        }
      }
      return {
        ...state,
        orderBankTableData: list,
        orderBankTableFilters: filter,
        totalRow: total_rows,
        orderBankTableSummary: summary,
      }
    case GET_RTS_ORDER_BANK_TABLE_DATA_FAIL:
      return {
        ...state,
        orderBankTableData: null,
        error: action.payload,
        totalRow: '0',
        orderBankTableSummary: null,
      }
    case GET_SHIPMENT_ORDER_BANK_TABLE_DATA_SUCCESS:
      return {
        ...state,
        shipmentOrderBankTableData: action.payload,
        error: null,
      }
    case GET_SHIPMENT_ORDER_BANK_TABLE_DATA_FAIL:
      return {
        ...state,
        shipmentOrderBankTableData: null,
        error: action.payload,
      }
    case GET_ORDERBANK_SUCCESS:
      return {
        ...state,
        orderBankData: action.payload,
      }
    case GET_ORDERBANK_FAIL:
      return {
        ...state,
        orderBankData: action.payload,
      }
    case ADD_ORDERBANK_SUCCESS:
      return {
        ...state,
        addorderBankData: action.payload,
      }
    case ADD_ORDERBANK_FAIL:
      return {
        ...state,
        addorderBankData: action.payload,
      }
    case GET_CROSS_TERMINAL_SUCCESS:
      return {
        ...state,
        crossTerminalDetails: action.params,
      }
    case GET_CROSS_TERMINAL_FAIL:
      return {
        ...state,
        crossTerminalDetails: action.params,
      }
    case EDIT_ORDERBANK_SUCCESS:
      return {
        ...state,
      }
    case EDIT_ORDERBANK_FAIL:
      return {
        ...state,
      }
    case EDIT_ORDERBANK_CLEAR:
      return {
        ...state,
        editorderBankData: null,
      }
    case GET_ORDERBANK_TABLE_INFORMATION_SUCCESS:
      return {
        ...state,
        currentOrderDetail: action.payload,
      }

    case GET_ORDERBANK_TABLE_INFORMATION_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    case GET_DELETE_MULTIPLE_ORDER_SUCCESS:
      // notify.success("Records Successfully Deleted")
      // ToastSuccess.fire({ title: "Records Successfully Deleted" })
      const { order_banks } = action.payload
      const newOrderBankTableData = state.orderBankTableData.filter(
        item => !order_banks.includes(item.id)
      )
      return {
        ...state,
        orderBankTableData: newOrderBankTableData,
        multipleorder: action.payload,
      }

    case GET_DELETE_MULTIPLE_ORDER_FAIL:
      return {
        ...state,
        multipleorder: action.payload,
      }
    case UPDATE_ORDERBANK_TABLE_INFORMATION_SUCCESS: {
      // notify.success("Record Successfully Updated")
      // ToastSuccess.fire({ title: "Record Successfully Updated" })
      return {
        ...state,
        currentOrderDetail: null,
        error: null,
        updateSuccess: true,
      }
    }
    case UPDATE_ORDERBANK_TABLE_INFORMATION_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    case UPDATE_ORDER_BANK_TABLE_DATA:
      return {
        ...state,
        orderBankTableData: action.payload,
      }
    case DELETE_ORDERBANK_DETAIL_SUCCESS: {
      // notify.success("Order has been successfully deleted")
      // ToastSuccess.fire({ title: "Order has been successfully deleted" })
      return {
        ...state,
        currentOrderDetail: null,
        deleteresponse: action.payload,
        deleteSuccess: true,
      }
    }
    case DELETE_ORDERBANK_DETAIL_FAIL:
      return {
        ...state,
        deleteresponse: action.payload,
        deleteSuccess: false,
      }
    case VIEW_ORDERBANK_DETAIL_SUCCESS: {
      return {
        ...state,
        editorderBankData: action.payload,
      }
    }
    case VIEW_ORDERBANK_DETAIL_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    case SEND_DN_STATUS_REQUEST_SUCCESS:
      return {
        ...state,
        sendDn: action.payload,
      }
    case SEND_DN_STATUS_REQUEST_FAIL:
      return {
        ...state,
        sendDn: action.payload,
      }

    case GET_ORDER_BANK_AUDITLOG_SUCCESS:
      return {
        ...state,
        auditsCom: action.payload,
      }

    case GET_ORDER_BANK_AUDITLOG_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case PROCESS_PAYMENT_IN_GANTT_CHART_SUCCESS: {
      // HACK: US 258072 - GanttChart Create-Shipment
      ToastSuccess.fire({
        title: 'A shipment has been successfully created in SAP',
      })

      const events = [...state.ganttChart.events]

      const { id, scheduled_status } = action.payload
      const eventData = events.find(s => s.id === id)
      eventData.eventType = scheduled_status
      eventData.eventColor = EVENT_COLOR[scheduled_status]

      state.ganttChart.events = events

      return { ...state }
    }
    case PROCESS_PAYMENT_IN_GANTT_CHART_FAIL: {
      ToastError.fire({ title: 'A shipment has been fail created in SAP' })
      return {
        ...state,
        error: action.payload,
      }
    }
    case CANCEL_PAYMENT_IN_GANTT_CHART_SUCCESS: {
      // HACK: US 258067 - GanttChart Cancel-Shipment
      ToastSuccess.fire({
        title: 'A shipment has been successfully cancelled from schedule',
      })

      const events = [...state.ganttChart.events]

      const { id, scheduled_status } = action.payload
      const event = events.find(s => s.id === id)
      event.eventType = scheduled_status
      event.eventColor = EVENT_COLOR[scheduled_status]

      state.ganttChart.events = events

      return { ...state }
    }
    case CANCEL_PAYMENT_IN_GANTT_CHART_FAIL: {
      ToastError.fire({ title: 'A shipment has been fail cancelled in SAP' })
      return {
        ...state,
        error: action.payload,
      }
    }
    case SEND_ORDER_IN_GANTT_CHART_SUCCESS: {
      ToastSuccess.fire({
        title: 'A shipment has been successfully sent for DN Creation',
      })

      const records = action.payload // array of Order records

      const events = [...state.ganttChart.events]
      records.forEach(o => {
        const existingEvent = events.find(s => s.id === o.id)

        if (existingEvent) existingEvent.resourceOrder[0].DNNumber = o.dn_no
      })

      state.ganttChart.events = events

      return { ...state }
    }
    case SEND_ORDER_IN_GANTT_CHART_FAIL:
      ToastError.fire({
        title: 'A shipment has been fail to sent for DN Creation',
      })
      return {
        ...state,
        error: action.payload,
      }
    case GET_RTS_GANTT_CHART_DATA_SUCCESS: {
      // HACK: GanttChart Data
      const { data, scrolling, page, shiftDate } = action.payload
      const {
        list,
        total_rows,
        filter,
        terminal_operating_time_from,
        terminal_operating_time_to,
      } = data

      const ganttChart = { ...state.ganttChart }
      ganttChart.terminal.shiftDate = shiftDate

      // triangle indicators for GanttChart's headers
      if (terminal_operating_time_from && terminal_operating_time_to) {
        const { from, to } = ensureDateRangeNotExceedingADay({
          from: terminal_operating_time_from,
          to: terminal_operating_time_to,
          date: shiftDate,
        })

        ganttChart.terminal.operatingTime.from = from
        ganttChart.terminal.operatingTime.to = to
      }

      // filters for the table on left-hand-side
      if (!Object.keys(state.ganttChart.selectedFilters).length) {
        const selectedFilters = {}
        state.ganttChart.selectedFilters = Object.keys(filter).forEach(k => {
          selectedFilters[k] = []
        })

        ganttChart.selectedFilters = selectedFilters
      }

      // add id to mapping with event
      const vehicles = list.map(vehicle => ({
        ...vehicle,
        id: vehicle.vehicle,
      }))

      const newEvents = factorizeGanttChartEventBars(vehicles, shiftDate)

      if (state.ganttChartTableData.length !== 0 && scrolling && page > 0) {
        ganttChart.events = [...ganttChart.events, ...newEvents]

        return {
          ...state,
          ganttChart,
          ganttChartTableData: [...state.ganttChartTableData, ...vehicles],
          totalRow_ganttChart: total_rows,
        }
      }

      ganttChart.events = newEvents
      return {
        ...state,
        ganttChart,
        ganttChartTableData: vehicles,
        totalRow_ganttChart: total_rows,
        ganttChartTableFilter: filter,
      }
    }
    case GET_RTS_GANTT_CHART_DATA_FAIL:
      return {
        ...state,
        ganttChart: {
          ...state.ganttChart,
          table: [],
          events: [],
        },
        error: action.payload,
      }

    case CLEAR_GANTT_DATA: {
      return {
        ...state,
        ganttChart: {
          events: [],
          table: [],
          selectedFilters: {},
          terminal: {
            operatingTime: {
              from: null,
              to: null,
            },
          },
        },
        ganttChartTableData: [],
      }
    }
    case SET_BRYNTUM_FILTER: {
      // str, []
      const { key, values } = action.payload

      const ganttChart = { ...state.ganttChart }
      ganttChart.selectedFilters[key] = values

      return { ...state, ganttChart }
    }
    case CLEAR_RTS_ORDER_BANK_TABLE_DATA: {
      return {
        ...state,
        orderBankTableData: [],
      }
    }

    case SELECT_VEHICLE_RTS_SHIPMENT: {
      const { vehicle, resourceId } = action
      return {
        ...state,
        selectedVehicleShipment: {
          vehicle,
          resourceId,
        },
      }
    }

    case DESELECT_VEHICLE_RTS_SHIPMENT: {
      return {
        ...state,
        selectedVehicleShipment: null,
      }
    }

    case DRAG_RTS_ORDER_BANK_TO_GANTT_CHART: {
      return { ...state }
    }

    case DRAG_RTS_ORDER_BANK_TO_GANTT_CHART_SUCCESS: {
      // consult <file saga.js>, <func onDragOrderBankToGanttChart>
      const { orders, constraints, requiresConfirmation, vehicle } =
        action.payload

      if (!constraints) {
        ToastSuccess.fire({ title: 'Orderbank has been successfully updated' })

        const {
          terminal: { shiftDate },
        } = state.ganttChart

        let events = [...state.ganttChart.events]
        // find rtHours by taking them from one of the Event that has the same resourceId
        // always return array with at least 1 element
        let eventsWithinResource = events.filter(
          item => item.resourceId === vehicle
        )

        // copy background from existing event
        const { startDate, endDate } = eventsWithinResource[0].background
        const rtHours = {
          from: moment.utc(startDate, DATE_TIME_FORMAT, true),
          to: moment.utc(endDate, DATE_TIME_FORMAT, true),
        }

        // GROUPBY route_id
        // if they were processed correctly, they all have same route_id
        const route = orders[0].route_id
        const orderIndexes = orders.map(o => o.id)
        eventsWithinResource.push(
          factorizeGanttChartEventBar({
            // any Order should already contains sufficient data I need
            data: { ...orders[0], id: route, orderIndexes },
            resourceId: vehicle.id,
            rtHours,
            isBackground: false,
            date: shiftDate,
          })
        )

        // remove the default background, consult <factory.js> ;)
        eventsWithinResource = eventsWithinResource.filter(
          s => !s.flags.isBackground
        )

        // purges all old events, updates the new ones
        events = [
          ...events.filter(s => s.resourceId !== vehicle),
          ...eventsWithinResource,
        ]

        state.ganttChart.events = events
        state.ganttChart.scheduling = {
          orderIndexes: [],
          constraints: [],
          requiresConfirmation: false,
        }

        return { ...state }
      }

      // preseve all state here, I will use it later in
      // <saga.js onDragOrderBankToGanttChartConfirm>
      state.ganttChart.scheduling = {
        orderIndexes: orders,
        constraints,
        requiresConfirmation,
      }

      return { ...state }
    }

    case DRAG_RTS_ORDER_BANK_TO_GANTT_CHART_CONFIRM_RESTRICTIONS: {
      // trigger to empty the constraints, so popup will close ;)
      state.ganttChart.scheduling = {
        ...state.ganttChart.scheduling,
        constraints: [],
      }

      return { ...state }
    }

    case DRAG_RTS_ORDER_BANK_TO_GANTT_CHART_FAIL: {
      ToastError.fire({ title: 'Orderbank has been failed to update' })
      return { ...state }
    }

    case REMOVE_ORDER_FROM_SHIPMENT_SUCCESS: {
      const { orderId, shipmentId } = action.params
      // remove from shipment
      const shipment = state.shipmentDropData.find(
        item => item.id === shipmentId
      )
      let removedOrders = shipment.orders.find(item => item.id === orderId)
      removedOrders.isChecked = false // clear checked
      shipment.orders = shipment.orders.filter(item => item.id !== orderId)
      //let newShipmentDropData = [...state.shipmentDropData, {...shipment}]
      let newShipmentDropData = [...state.shipmentDropData]
      // add to order bank table
      //state.orderBankTableData.push(removedOrders)

      if (newShipmentDropData.length)
        ToastSuccess.fire({
          titleText: 'Order has been successfully removed from a shipment',
        })
      else
        ToastSuccess.fire({
          titleText: 'A shipment has ben successfully cancelled from schedule',
        })

      return {
        ...state,
        shipmentDropData: newShipmentDropData,
        // orderBankTableData: [...state.orderBankTableData],
      }
    }
    case REMOVE_ORDER_FROM_SHIPMENT_FAIL: {
      ToastError.fire({})

      return { ...state }
    }
    case REMOVE_SHIPMENT_FROM_EVENT_SUCCESS: {
      const { shipmentId } = action.payload
      let removedShipment = state.shipmentDropData.find(
        item => item.id === shipmentId
      )
      let newShipmentDropData = state.shipmentDropData.filter(
        item => item.id !== shipmentId
      )

      // state.orderBankTableData = state.orderBankTableData.concat(
      //   removedShipment.orders.map(item => {
      //     item.isChecked = false
      //     return item
      //   })
      // )
      ToastSuccess.fire({
        titleText: 'A shipment has ben successfully cancelled from schedule',
      })
      return {
        ...state,
        shipmentDropData: newShipmentDropData,
      }
    }
    case REMOVE_EVENT_SUCCESS: {
      ToastSuccess.fire()

      const { id } = action.params
      state.ganttChart.events = [...state.ganttChart.events].filter(
        item => item.id !== id
      )

      return { ...state }
    }
    case REMOVE_EVENT_FAIL: {
      ToastError.fire()
      return {
        ...state,
      }
    }

    // case UPDATE_OB_EVENT_SUCCESS: {
    //   const { id } = action.params
    //   const event = state.ganttChart.events.filter(item => item.id !== id)
    //   if (event) {
    //     state.ganttChart.events = [...event, action.params]
    //   }
    //   return {
    //     ...state,
    //     ganttChart: {
    //       ...state.ganttChart,
    //       event: [...state.ganttChart.events],
    //     },
    //     ganttEventValidation: null,
    //   }
    // }
    // case UPDATE_OB_EVENT_FAIL: {
    //   return {
    //     ...state,
    //     ganttEventValidation: null,
    //   }
    // }
    case GET_WEB_SOCKET_MESSAGE_SUCCESS: {
      if (state.socketData.length === 0) {
        return {
          ...state,
          socketData: action.payload.list,
          totalRow: action.payload.total_rows,
        }
      }
      return {
        ...state,
        socketData: [...state.socketData, ...action.payload.list],
        totalRow: action.payload.total_rows,
      }
    }
    case GET_OB_RT_DETAILS_SUCCESS: {
      if (action.payload?.status === 'Double') action.payload.status = 'On'
      return {
        ...state,
        orderBankRTDetails: action.payload,
      }
    }
    // case GET_OB_RT_DETAILS_FAIL: {
    //   return {
    //     ...state,
    //   }
    // }
    case UPDATE_OB_RT_DETAILS_SUCCESS: {
      ToastSuccess.fire({
        title: 'Road Tanker detail has been successfully updated',
      })
      return {
        ...state,
        // orderBankRTDetails: action.params,
      }
    }
    case UPDATE_OB_RT_DETAILS_FAIL: {
      ToastError.fire()
      return {
        ...state,
      }
    }
    case SEND_MULTIPLE_ORDER_BANK_DN_FAIL: {
      return {
        ...state,
        sendMultipleDn: action.payload,
      }
    }
    case SEND_MULTIPLE_ORDER_BANK_DN_SUCCESS: {
      return {
        ...state,
        sendMultipleDn: action.payload,
      }
    }
    case CLEAR_SCHEDULING_FAIL: {
      // ToastError.fire({ title: 'Send DN failed!' })
      return {
        ...state,
        clearScheduling: 'error',
      }
    }
    case CLEAR_SCHEDULING_SUCCESS: {
      // ToastSuccess.fire({ title: 'Orders have been successfully sent for DN creation' })
      return {
        ...state,
        clearScheduling: action.payload,
      }
    }
    case SEND_ORDER_BANK_DN_FAIL: {
      ToastError.fire({ title: 'Send DN failed!' })
      return {
        ...state,
      }
    }
    case SEND_ORDER_BANK_DN_SUCCESS: {
      ToastSuccess.fire({
        title: 'Orders have been successfully sent for DN creation',
      })
      return {
        ...state,
      }
    }
    case GET_SHIPMENT_DETAIL_SUCCESS: {
      return {
        ...state,
        shipmentDropData: factorizeShipmentTableRows(action.payload),
      }
    }
    case DRAG_AND_DROP_SHIPMENT_AREA_SUCCESS: {
      return {
        ...state,
        shipmentDropData: action.payload,
      }
    }
    // case GET_GANTT_EVENT_VALIDATION_SUCCESS: {
    //   return {
    //     ...state,
    //     ganttEventValidation: action.payload,
    //   }
    // }
    // case GET_GANTT_EVENT_VALIDATION_FAIL: {
    //   return {
    //     ...state,
    //     ganttEventValidation: action.payload,
    //   }
    // }

    case GET_SHIPMENT_DETAILS_ON_VEHICLE_SUCCESS: {
      return {
        ...state,
        shipmentDetailsOnVehicle: action.payload,
      }
    }
    case GET_SHIPMENT_DETAILS_ON_VEHICLE_FAIL: {
      return {
        ...state,
        shipmentDetailsOnVehicle: action.payload,
      }
    }
    case DRAG_ORDER_TO_SHIPMENT_SUCCESS: {
      // I only rewrite to get a better codebase, no logic changes
      state.shipmentDropData = [
        ...state.shipmentDropData,
        // single new Shipment Table Row
        factorizeShipmentTableRow({
          shipment: Math.floor(Math.random() * 100000),
          order_banks: action.payload,
        }),
      ]

      return { ...state }
    }
    case GET_OB_TOTAL_UNSCHEDULE_SUCCESS: {
      return {
        ...state,
        totalOrderUnschedule: action.payload.total ?? 0,
      }
    }
    // case GET_OB_TOTAL_UNSCHEDULE_FAIL: {
    //   return {
    //     ...state,
    //   }
    // }
    case UPDATE_SHIPMENT_SUCCESS: {
      ToastSuccess.fire()
      // console.log(action.payload)
      return {
        ...state,
      }
    }
    case UPDATE_SHIPMENT_FAIL: {
      ToastError.fire()
      return {
        ...state,
      }
    }
    default:
      return state
  }
}

export default RTSOrderBank
