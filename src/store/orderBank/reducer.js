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
  DELETE_ORDERBANK_DETAIL_FAIL
} from "./actionTypes"

const initialState = {
  orderBankData: null,
  orderBankTableData: null,
  error: null,
  currentOrderDetail: null,
  updateSuccess: false,
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
    default:
      return state
  }
}

export default RTSOrderBank