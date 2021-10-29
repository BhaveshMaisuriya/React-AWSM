import {
  CANCEL_PAYMENT_IN_GANTT_CHART_FAIL,
  CANCEL_PAYMENT_IN_GANTT_CHART_SUCCESS,
  DELETE_ORDERBANK_DETAIL_FAIL,
  DELETE_ORDERBANK_DETAIL_SUCCESS,
  DESELECT_VEHICLE_RTS_SHIPMENT,
  DRAG_RTS_ORDER_BANK_TO_GANTT_CHART_SUCCESS,
  GET_ORDER_BANK_AUDITLOG_FAIL,
  GET_ORDER_BANK_AUDITLOG_SUCCESS,
  GET_ORDERBANK_FAIL,
  GET_ORDERBANK_SUCCESS,
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
  REMOVE_SHIPMENT_FROM_EVENT_SUCCESS,
  SELECT_VEHICLE_RTS_SHIPMENT,
  SEND_DN_STATUS_REQUEST_SUCCESS,
  SEND_ORDER_IN_GANTT_CHART_FAIL,
  SEND_ORDER_IN_GANTT_CHART_SUCCESS,
  UPDATE_ORDER_BANK_TABLE_DATA,
  UPDATE_ORDERBANK_TABLE_INFORMATION_FAIL,
  UPDATE_ORDERBANK_TABLE_INFORMATION_SUCCESS,
  REMOVE_EVENT_SUCCESS,
  REMOVE_EVENT_FAIL,
  UPDATE_OB_EVENT_SUCCESS,
  UPDATE_OB_EVENT_FAIL,
} from "./actionTypes"
import {notify} from "../../helpers/notify"
import {ToastSuccess,ToastError} from "../../helpers/swal";

const initialState = {
  orderBankData: null,
  orderBankTableData: null,
  shipmentOrderBankTableData: null,
  error: null,
  currentOrderDetail: null,
  selectedVehicleShipment: null,
  updateSuccess: false,
  isSendRequestProcess: false,
  auditsCom: null,
  ganttChart: {
    table: [],
    event: []
  }
}

const RTSOrderBank = (state = initialState, action) => {
  switch (action.type) {
    case GET_RTS_ORDER_BANK_TABLE_DATA_SUCCESS:
      return {
        ...state,
        orderBankTableData: action.payload,
        error: null
      }
    case GET_RTS_ORDER_BANK_TABLE_DATA_FAIL:
      return {
        ...state,
        orderBankTableData: null,
        error: action.payload
      }
    case GET_SHIPMENT_ORDER_BANK_TABLE_DATA_SUCCESS:
      return {
        ...state,
        shipmentOrderBankTableData: action.payload,
        error: null
      }
    case GET_SHIPMENT_ORDER_BANK_TABLE_DATA_FAIL:
      return {
        ...state,
        shipmentOrderBankTableData: null,
        error: action.payload
      }
    case GET_ORDERBANK_SUCCESS:
      return {
        ...state,
        orderBankData: action.payload
      }
    case GET_ORDERBANK_FAIL:
      return {
        ...state,
        orderBankData: action.payload
      }
    case GET_ORDERBANK_TABLE_INFORMATION_SUCCESS:
      return {
        ...state,
        currentOrderDetail: action.payload
      }

    case GET_ORDERBANK_TABLE_INFORMATION_FAIL:
      return {
        ...state,
        error: action.payload
      }
    case UPDATE_ORDERBANK_TABLE_INFORMATION_SUCCESS: {
      notify.success("Record Successfully Updated")
      return {
        ...state,
        currentOrderDetail: null,
        error: null,
        updateSuccess: true
      }
    }
    case UPDATE_ORDERBANK_TABLE_INFORMATION_FAIL:
      return {
        ...state,
        error: action.payload
      }
    case UPDATE_ORDER_BANK_TABLE_DATA:
      return {
        ...state,
        orderBankTableData: action.payload
      }
    case DELETE_ORDERBANK_DETAIL_SUCCESS: {
      notify.success("Record Successfully Deleted")
      return {
        ...state,
        currentOrderDetail: null,
        error: null,
        updateSuccess: true
      }
    }
    case DELETE_ORDERBANK_DETAIL_FAIL:
      return {
        ...state,
        error: action.payload
      }
    case SEND_DN_STATUS_REQUEST_SUCCESS:
      notify.success("An order has been successfully sent for DN Creation")
      return {
        ...state
      }
    case GET_ORDER_BANK_AUDITLOG_SUCCESS:
      return {
        ...state,
        auditsCom: action.payload
      }

    case GET_ORDER_BANK_AUDITLOG_FAIL:
      return {
        ...state,
        error: action.payload
      }

    case PROCESS_PAYMENT_IN_GANTT_CHART_SUCCESS:
      notify.success("A shipment has been successfully created in SAP")
      return {
        ...state,
        isSendRequestProcess: state.isSendRequestProcess + 1
      }

    case PROCESS_PAYMENT_IN_GANTT_CHART_FAIL:
      notify.error("A shipment has been fail created in SAP")
      return {
        ...state,
        error: action.payload,
        isSendRequestProcess: state.isSendRequestProcess + 1
      }
    case CANCEL_PAYMENT_IN_GANTT_CHART_SUCCESS:
      notify.success("A shipment has been successfully cancelled from schedule")
      return {
        ...state,
        isSendRequestProcess: state.isSendRequestProcess + 1
      }
    case CANCEL_PAYMENT_IN_GANTT_CHART_FAIL:
      notify.error("A shipment has been fail cancelled in SAP")
      return {
        ...state,
        error: action.payload
      }
    case SEND_ORDER_IN_GANTT_CHART_SUCCESS:
      notify.success("A shipment has been successfully sent for Creation")
      return {
        ...state
      }
    case SEND_ORDER_IN_GANTT_CHART_FAIL:
      notify.error("A shipment has been fail to sent for Creation")
      return {
        ...state,
        error: action.payload
      }
    case GET_RTS_GANTT_CHART_DATA_SUCCESS: {
      return {
        ...state,
        ganttChart: action.payload
      }
    }
    case GET_RTS_GANTT_CHART_DATA_FAIL: {
      return {
        ...state,
        ganttChart: {
          table: [],
          event: []
        },
        error: action.payload
      }
    }

    case SELECT_VEHICLE_RTS_SHIPMENT: {
      const {vehicle, resourceId} = action
      return {
        ...state,
        selectedVehicleShipment: {
          vehicle,
          resourceId
        }
      }
    }


    case DESELECT_VEHICLE_RTS_SHIPMENT: {
      return {
        ...state,
        selectedVehicleShipment: null
      }
    }

    case DRAG_RTS_ORDER_BANK_TO_GANTT_CHART_SUCCESS: {
      if (!state.selectedVehicleShipment || !state.selectedVehicleShipment?.resourceId) return state
      const newOrderBankTableData = state.orderBankTableData && [...state.orderBankTableData].filter((record) => !record.isChecked)
      const {resourceId} = state.selectedVehicleShipment
      const resourceEventIndex = state.ganttChart.event &&
        state.ganttChart.event.length > 0 &&
        state.ganttChart.event.findIndex(({resourceId: id}) => id === resourceId)
      if (resourceEventIndex < 0) return state
      if (!state.ganttChart.event[resourceEventIndex].shipments) {
        state.ganttChart.event[resourceEventIndex].shipments = []
        state.ganttChart.event[resourceEventIndex].shipments.push({id: Math.random(), orders: action.dropData})
      } else {
        state.ganttChart.event[resourceEventIndex].shipments.push({id: Math.random(), orders: action.dropData})
      }
      return {
        ...state,
        orderBankTableData: newOrderBankTableData ? newOrderBankTableData : state.orderBankTableData,
        ganttChart: {
          ...state.ganttChart,
          event: [...state.ganttChart.event]
        }
      }
    }
    case REMOVE_ORDER_FROM_SHIPMENT_SUCCESS: {
      // debugger
      const {orderId, shipmentId, resourceId, eventId} = action.params

      const event = state.ganttChart.event.find(item => item.id === eventId)
      if (event) {
        // remove from shipment
        const shipment = event.shipments.find(item => item.id === shipmentId)
        let removedOrders = shipment.orders.find(item => item.id === orderId)
        removedOrders.isChecked = false // clear checked

        shipment.orders = shipment.orders.filter(item => item.id !== orderId)

        // add to order bank table
        state.orderBankTableData.push(removedOrders)
      }
      ToastSuccess.fire()

      return {
        ...state,
        orderBankTableData: [...state.orderBankTableData],
        ganttChart: {
          ...state.ganttChart,
          event: [...state.ganttChart.event]
        }
      }
    }
    case REMOVE_SHIPMENT_FROM_EVENT_SUCCESS: {
      const {eventId, shipmentId} = action.params
      const event = state.ganttChart.event.find(item => item.id === eventId)
      if (event) {
        let removedShipment = event.shipments.find(item => item.id === shipmentId)
        event.shipments = event.shipments.filter(item => item.id !== shipmentId)

        state.orderBankTableData = state.orderBankTableData.concat(removedShipment.orders.map(item => {
          item.isChecked = false
          return item
        }))
      }
      ToastSuccess.fire()

      return {
        ...state,
        orderBankTableData: [...state.orderBankTableData],
        ganttChart: {
          ...state.ganttChart,
          event: [...state.ganttChart.event]
        }
      }
    }
    case REMOVE_EVENT_SUCCESS: {
      const { id } = action.params
      const event = state.ganttChart.event.filter(item => item.id !== id)
      if(event){
          state.ganttChart.event = [...event]
      }
      ToastSuccess.fire()

      return {
        ...state,
        orderBankTableData: [...state.orderBankTableData],
        ganttChart: {
          ...state.ganttChart,
          event: [...state.ganttChart.event],
          table: [...state.ganttChart.table]
        }
      }
    }
    case REMOVE_EVENT_FAIL: {
      ToastError.fire()
      return {
        ...state,
      }
    }

    case UPDATE_OB_EVENT_SUCCESS: {
      const {id} = action.params
      const event = state.ganttChart.event.filter(item => item.id !== id)
      if(event){
        state.ganttChart.event = [...event, action.params]
      }
      return {
        ...state,
        ganttChart: {
          ...state.ganttChart,
          event: [...state.ganttChart.event],
        }
      }
    }
    case UPDATE_OB_EVENT_FAIL: {
      return {
        ...state,
      }
    }
    default:
      return state
  }
}

export default RTSOrderBank
