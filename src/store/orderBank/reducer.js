import {
  GET_RTS_ORDER_BANK_TABLE_DATA_SUCCESS,
  GET_RTS_ORDER_BANK_TABLE_DATA_FAIL,
  GET_ORDERBANK_FAIL,
  GET_ORDERBANK_SUCCESS,
  GET_ORDERBANK_TABLE_INFORMATION_SUCCESS,
  GET_ORDERBANK_TABLE_INFORMATION_FAIL,
  UPDATE_ORDERBANK_TABLE_INFORMATION_SUCCESS,
  UPDATE_ORDERBANK_TABLE_INFORMATION_FAIL,
  UPDATE_ORDER_BANK_TABLE_DATA,
  DELETE_ORDERBANK_DETAIL_SUCCESS,
  DELETE_ORDERBANK_DETAIL_FAIL,
  SEND_DN_STATUS_REQUEST_SUCCESS,
  GET_ORDER_BANK_AUDITLOG_SUCCESS,
  GET_ORDER_BANK_AUDITLOG_FAIL,
  PROCESS_PAYMENT_IN_GANTT_CHART_FAIL,
  PROCESS_PAYMENT_IN_GANTT_CHART_SUCCESS,
  CANCEL_PAYMENT_IN_GANTT_CHART_SUCCESS,
  CANCEL_PAYMENT_IN_GANTT_CHART_FAIL,
  SEND_ORDER_IN_GANTT_CHART_SUCCESS,
  SEND_ORDER_IN_GANTT_CHART_FAIL,
  GET_RTS_GANTT_CHART_DATA_SUCCESS,
  GET_RTS_GANTT_CHART_DATA_FAIL,

} from "./actionTypes"

const initialState = {
  orderBankData: null,
  orderBankTableData: null,
  error: null,
  currentOrderDetail: null,
  updateSuccess: false,
  isSendRequestProcess: false,
  auditsCom: null,
  ganttChart: {
    table: [],
    event: [],
  }
}

import { notify } from "../../helpers/notify"

const RTSOrderBank = (state = initialState, action) => {
  switch (action.type) {
    case GET_RTS_ORDER_BANK_TABLE_DATA_SUCCESS:
      return {
        ...state,
        orderBankTableData: action.payload,
        error: null,
      }
    case GET_RTS_ORDER_BANK_TABLE_DATA_FAIL:
      return {
        ...state,
        orderBankTableData: null,
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
    case UPDATE_ORDERBANK_TABLE_INFORMATION_SUCCESS: {
      notify.success("Record Successfully Updated")
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
      notify.success("Record Successfully Deleted")
      return {
        ...state,
        currentOrderDetail: null,
        error: null,
        updateSuccess: true,
      }
    }
    case DELETE_ORDERBANK_DETAIL_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    case SEND_DN_STATUS_REQUEST_SUCCESS:
      notify.success("An order has been successfully sent for DN Creation")
      return {
        ...state
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
      notify.success("A shipment has been successfully created in SAP")
      return {
        ...state,
        isSendRequestProcess : state.isSendRequestProcess+1
      }

    case PROCESS_PAYMENT_IN_GANTT_CHART_FAIL:
      notify.error("A shipment has been fail created in SAP")
      return {
        ...state,
        error: action.payload,
        isSendRequestProcess : state.isSendRequestProcess+1
      }
    case CANCEL_PAYMENT_IN_GANTT_CHART_SUCCESS:
      notify.success("A shipment has been successfully cancelled from schedule")
      return {
        ...state,
      }
    case CANCEL_PAYMENT_IN_GANTT_CHART_FAIL:
      notify.error("A shipment has been fail cancelled in SAP")
      return {
        ...state,
        error: action.payload,
      }
    case SEND_ORDER_IN_GANTT_CHART_SUCCESS:
      notify.success("A shipment has been successfully sent for Creation")
      return {
        ...state,
      }
    case SEND_ORDER_IN_GANTT_CHART_FAIL:
      notify.error("A shipment has been fail to sent for Creation")
      return {
        ...state,
        error: action.payload,
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
          event: [],
        },
        error: action.payload
      }
    }
    default:
      return state
  }
}

export default RTSOrderBank
