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
  UPDATE_OB_EVENT_SUCCESS,
  UPDATE_OB_EVENT_FAIL,
  GET_WEB_SOCKET_MESSAGE_SUCCESS,
  GET_WEB_SOCKET_MESSAGE,
  GET_OB_RT_DETAILS_SUCCESS,
  GET_OB_RT_DETAILS_FAIL,
  UPDATE_OB_RT_DETAILS_SUCCESS,
  UPDATE_OB_RT_DETAILS_FAIL,
  GET_CROSS_TERMINAL_SUCCESS,
  GET_CROSS_TERMINAL_FAIL,
  GET_DELETE_MULTIPLE_ORDER_SUCCESS,
  GET_DELETE_MULTIPLE_ORDER_FAIL,
  SEND_ORDER_BANK_DN_FAIL,
  SEND_ORDER_BANK_DN_SUCCESS,
  DRAG_RTS_ORDER_BANK_TO_GANTT_CHART_FAIL,
  CLEAR_GANTT_DATA,
  GET_SHIPMENT_DETAIL_FAIL,
  GET_SHIPMENT_DETAIL_SUCCESS,
  CLEAR_RTS_ORDER_BANK_TABLE_DATA,
  DRAG_AND_DROP_SHIPMENT_AREA_SUCCESS,
  GET_GANTT_EVENT_VALIDATION_SUCCESS,
  GET_GANTT_EVENT_VALIDATION_FAIL,
  GET_SHIPMENT_DETAILS_ON_VEHICLE_SUCCESS,
  GET_SHIPMENT_DETAILS_ON_VEHICLE_FAIL,
  DRAG_ORDER_TO_SHIPMENT_SUCCESS,
  GET_OB_TOTAL_UNSCHEDULE_SUCCESS,
  GET_OB_TOTAL_UNSCHEDULE_FAIL,
  SET_BRYNTUM_FILTER,
} from './actionTypes'
import { eventGanttChartFactory, shipmentFactory } from './factory'
import { ToastSuccess, ToastError } from '../../helpers/swal'

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
    event: [],
    selectedFilters: {},
  },
  orderBankRTDetails: null,
  crossTerminalDetails: null,
  socketData: [],
  totalRow: 0,
  totalOrderUnschedule: 0,
  multipleorder: null,
  viewData: null,
  sendDn: null,
  editorderBankData: null,
  ganttChartTableData: [],
  ganttChartOrderDrag: [],
  ganttChartTableFilter: {},
  isDragging: false,
  totalRow_ganttChart: 0,
  ganttChartEventData: [],
  dropOderSuccess: true,
  shipmentDropData: [],
  sendMultipleDn: null,
  ganttEventValidation: null,
  shipmentDetailsOnVehicle: [],
}

const RTSOrderBank = (state = initialState, action) => {
  switch (action.type) {
    case GET_RTS_ORDER_BANK_TABLE_DATA_SUCCESS:
      const { data, scrolling } = action.payload
      const { list, total_rows, filter, summary } = data
      if (state.orderBankTableData.length !== 0 && scrolling) {
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
    // return {
    //   ...state,
    //   orderBankTableData: action.payload,
    //   error: null
    // }
    case GET_RTS_ORDER_BANK_TABLE_DATA_FAIL:
      return {
        ...state,
        orderBankTableData: null,
        error: action.payload,
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
        editorderBankData: action.payload,
      }
    case EDIT_ORDERBANK_FAIL:
      return {
        ...state,
        editorderBankData: action.payload,
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
        viewData: action.payload,
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
        sendDn: 'success',
      }
    case SEND_DN_STATUS_REQUEST_FAIL:
      return {
        ...state,
        sendDn: 'error',
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

    case PROCESS_PAYMENT_IN_GANTT_CHART_SUCCESS:
      ToastSuccess.fire({ title: 'A shipment has been successfully created in SAP' })
      return {
        ...state,
        isSendRequestProcess: state.isSendRequestProcess + 1,
      }

    case PROCESS_PAYMENT_IN_GANTT_CHART_FAIL:
      ToastError.fire({ title: 'A shipment has been fail created in SAP' })
      return {
        ...state,
        error: action.payload,
        isSendRequestProcess: state.isSendRequestProcess + 1,
      }
    case CANCEL_PAYMENT_IN_GANTT_CHART_SUCCESS:
      ToastSuccess.fire({ title: 'A shipment has been successfully cancelled from schedule' })
      return {
        ...state,
        isSendRequestProcess: state.isSendRequestProcess + 1,
      }
    case CANCEL_PAYMENT_IN_GANTT_CHART_FAIL:
      ToastError.fire({ title: 'A shipment has been fail cancelled in SAP' })
      return {
        ...state,
        error: action.payload,
      }
    case SEND_ORDER_IN_GANTT_CHART_SUCCESS:
      ToastSuccess.fire({ title: 'A shipment has been successfully sent for DN Creation' })

      const records = action.payload // array of Order records

      const eventData = state.ganttChartEventData
      records.forEach(o => {
        const existingEventData = eventData.find(s => s.id === o.id)

        if (existingEventData) existingEventData.resourceOrder[0].DNNumber = o.dn_no
      })

      return {
        ...state,
        ganttChartEventData: eventData,
      }
    case SEND_ORDER_IN_GANTT_CHART_FAIL:
      ToastError.fire({ title: 'A shipment has been fail to sent for DN Creation' })
      return {
        ...state,
        error: action.payload,
      }
    case GET_RTS_GANTT_CHART_DATA_SUCCESS: {
      const { data, scrolling, page } = action.payload
      const { list, total_rows, filter } = data

      const ganttChart = { ...state.ganttChart }

      if (!Object.keys(state.ganttChart.selectedFilters).length) {
        const selectedFilters = {}
        state.ganttChart.selectedFilters = Object.keys(filter).forEach(k => {
          selectedFilters[k] = []
        })

        ganttChart.selectedFilters = selectedFilters
      }

      // add id to mapping with event
      const newList = list?.map(vehicle => ({ ...vehicle, id: vehicle?.vehicle }))

      if (state.ganttChartTableData.length !== 0 && scrolling && page > 0) {
        return {
          ...state,
          ganttChartTableData: [...state.ganttChartTableData, ...newList],
          ganttChartEventData: [...state.ganttChartEventData, ...eventGanttChartFactory(newList)],
          totalRow_ganttChart: total_rows,
        }
      }
      return {
        ...state,
        ganttChartTableData: newList,
        ganttChartEventData: eventGanttChartFactory(newList),
        totalRow_ganttChart: total_rows,
        ganttChartTableFilter: filter,
        dropOderSuccess: false,
        ganttChart,
      }
    }
    case GET_RTS_GANTT_CHART_DATA_FAIL: {
      return {
        ...state,
        ganttChart: {
          table: [],
          event: [],
        },
        error: action.payload,
      }
    }
    case CLEAR_GANTT_DATA: {
      return {
        ...state,
        ganttChartTableData: [],
        ganttChartEventData: [],
        dropOderSuccess: false,
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
        dropOderSuccess: false,
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

    case DRAG_RTS_ORDER_BANK_TO_GANTT_CHART_SUCCESS: {
      ToastSuccess.fire({ title: 'Orderbank has been successfully updated' })
      return {
        ...state,
        ganttChartOrderDrag: action.payload,
        isDragging: !state.isDragging,
        dropOderSuccess: true,
      }
    }
    case DRAG_RTS_ORDER_BANK_TO_GANTT_CHART_FAIL: {
      ToastError.fire({ title: 'Orderbank has been failed to update' })
      return {
        ...state,
        ganttChartOrderDrag: [],
        isDragging: !state.isDragging,
        dropOderSuccess: false,
      }
    }
    case REMOVE_ORDER_FROM_SHIPMENT_SUCCESS: {
      const { orderId, shipmentId } = action.params
      // remove from shipment
      const shipment = state.shipmentDropData.find(item => item.id === shipmentId)
      let removedOrders = shipment.orders.find(item => item.id === orderId)
      removedOrders.isChecked = false // clear checked
      shipment.orders = shipment.orders.filter(item => item.id !== orderId)
      //let newShipmentDropData = [...state.shipmentDropData, {...shipment}]
      let newShipmentDropData = [...state.shipmentDropData]
      // add to order bank table
      //state.orderBankTableData.push(removedOrders)

      if (newShipmentDropData.length)
        ToastSuccess.fire({ titleText: 'Order has been successfully removed from a shipment' })
      else
        ToastSuccess.fire({ titleText: 'A shipment has ben successfully cancelled from schedule' })

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
      const { shipmentId } = action.params
      let removedShipment = state.shipmentDropData.find(item => item.id === shipmentId)
      let newShipmentDropData = state.shipmentDropData.filter(item => item.id !== shipmentId)

      // state.orderBankTableData = state.orderBankTableData.concat(
      //   removedShipment.orders.map(item => {
      //     item.isChecked = false
      //     return item
      //   })
      // )
      ToastSuccess.fire({ titleText: 'A shipment has ben successfully cancelled from schedule' })
      return {
        ...state,
        shipmentDropData: newShipmentDropData,
      }
    }
    case REMOVE_EVENT_SUCCESS: {
      const { id } = action.params
      const event = state.ganttChart.event.filter(item => item.id !== id)
      if (event) {
        state.ganttChart.event = [...event]
      }
      ToastSuccess.fire()

      return {
        ...state,
      }
    }
    case REMOVE_EVENT_FAIL: {
      ToastError.fire()
      return {
        ...state,
      }
    }

    case UPDATE_OB_EVENT_SUCCESS: {
      const { id } = action.params
      const event = state.ganttChart.event.filter(item => item.id !== id)
      if (event) {
        state.ganttChart.event = [...event, action.params]
      }
      return {
        ...state,
        ganttChart: {
          ...state.ganttChart,
          event: [...state.ganttChart.event],
        },
        ganttEventValidation: null,
      }
    }
    case UPDATE_OB_EVENT_FAIL: {
      return {
        ...state,
        ganttEventValidation: null,
      }
    }
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
      ToastSuccess.fire({ title: 'Road Tanker detail has been successfully updated' })
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
    case SEND_ORDER_BANK_DN_FAIL: {
      // ToastError.fire({ title: 'Send DN failed!' })
      return {
        ...state,
        sendMultipleDn: 'error'
      }
    }
    case SEND_ORDER_BANK_DN_SUCCESS: {
      // ToastSuccess.fire({ title: 'Orders have been successfully sent for DN creation' })
      return {
        ...state,
        sendMultipleDn: 'success'
      }
    }
    case GET_SHIPMENT_DETAIL_SUCCESS: {
      return {
        ...state,
        shipmentDropData: shipmentFactory(action.payload),
      }
    }
    case DRAG_AND_DROP_SHIPMENT_AREA_SUCCESS: {
      return {
        ...state,
        shipmentDropData: action.payload,
      }
    }
    case GET_GANTT_EVENT_VALIDATION_SUCCESS: {
      return {
        ...state,
        ganttEventValidation: action.payload,
      }
    }
    case GET_GANTT_EVENT_VALIDATION_FAIL: {
      return {
        ...state,
        ganttEventValidation: action.payload,
      }
    }

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
      let newShipment = []
      let newShipmentItem = {
        shipment: Math.floor(Math.random() * 100000),
        order_banks: [...action.payload],
      }
      newShipment.push(newShipmentItem)
      return {
        ...state,
        shipmentDropData: [...state.shipmentDropData, shipmentFactory(newShipment)[0]],
      }
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

    default:
      return state
  }
}

export default RTSOrderBank
