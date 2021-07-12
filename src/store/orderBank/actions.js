import {
  GET_RTS_ORDER_BANK_TABLE_DATA_FAIL,
  GET_RTS_ORDER_BANK_TABLE_DATA_SUCCESS,
  GET_RTS_ORDER_BANK_TABLE_DATA,
  GET_ORDERBANK,
  GET_ORDERBANK_SUCCESS,
  GET_ORDERBANK_FAIL,
  UPDATE_ORDERBANK_TABLE_INFORMATION,
  UPDATE_ORDERBANK_TABLE_INFORMATION_SUCCESS,
  UPDATE_ORDERBANK_TABLE_INFORMATION_FAIL,
  GET_ORDERBANK_TABLE_INFORMATION,
  GET_ORDERBANK_TABLE_INFORMATION_SUCCESS,
  GET_ORDERBANK_TABLE_INFORMATION_FAIL,
  REFRESH_ORDER_BANK_DN,
  REFRESH_ORDER_BANK_SUCCESS,
  REFRESH_ORDER_BANK_DN_FAIL,
  SEND_ORDER_BANK_DN,
  SEND_ORDER_BANK_DN_SUCCESS,
  SEND_ORDER_BANK_DN_FAIL,
  UPDATE_ORDER_BANK_TABLE_DATA,
  DELETE_ORDERBANK_DETAIL,
  DELETE_ORDERBANK_DETAIL_SUCCESS,
  DELETE_ORDERBANK_DETAIL_FAIL,
  SEND_DN_STATUS_REQUEST,
  SEND_DN_STATUS_REQUEST_SUCCESS,
  SEND_DN_STATUS_REQUEST_FAIL
} from "./actionTypes"

export const getRTSOrderBankTableData = (params) => ({
  type: GET_RTS_ORDER_BANK_TABLE_DATA,
  params,
})

export const getRTSOrderBankTableDataSuccess = (response) => ({
  type: GET_RTS_ORDER_BANK_TABLE_DATA_SUCCESS,
  payload: response,
})

export const getRTSOrderBankTableDataFail = (error) => ({
  type: GET_RTS_ORDER_BANK_TABLE_DATA_FAIL,
  payload: error,
})

export const getOrderBank = params => ({
  type: GET_ORDERBANK,
  params,
})

export const getOrderBankSuccess = response => ({
  type: GET_ORDERBANK_SUCCESS,
  payload: response,
})

export const getOrderBankFail = error => ({
  type: GET_ORDERBANK_FAIL,
  payload: error,
})

export const getOrderBankDetail = (params) => {
  return {
    type: GET_ORDERBANK_TABLE_INFORMATION,
    params
  }
}

export const getOrderBankDetailSuccess = response => ({
  type: GET_ORDERBANK_TABLE_INFORMATION_SUCCESS,
  payload: response,
})

export const getOrderBankDetailFail = error => ({
  type: GET_ORDERBANK_TABLE_INFORMATION_FAIL,
  payload: error,
})

export const updateOrderbankTableInformation = data => ({
  type: UPDATE_ORDERBANK_TABLE_INFORMATION,
  data,
})

export const updateOrderbankTableInformationSuccess = event => ({
  type: UPDATE_ORDERBANK_TABLE_INFORMATION_SUCCESS,
  payload: event,
})

export const updateOrderbankTableInformationFail = error => ({
  type: UPDATE_ORDERBANK_TABLE_INFORMATION_FAIL,
  payload: error
})

export const refreshOderBankDN = (params) => ({
  type: REFRESH_ORDER_BANK_DN,
  params,
})

export const refreshOderBankDNSuccess = (response) => ({
  type: REFRESH_ORDER_BANK_SUCCESS,
  payload: response,
})


export const refreshOderBankDNFail = (error) => ({
  type: REFRESH_ORDER_BANK_DN_FAIL,
  payload: error,
})

export const sendOrderBankDN = (params) => ({
  type: SEND_ORDER_BANK_DN,
  params,
})

export const sendOrderBankDNSuccess = (response) => ({
  type: SEND_ORDER_BANK_DN_SUCCESS,
  payload: response,
})

export const sendOrderBankDNFail = (error) => ({
  type: SEND_ORDER_BANK_DN_FAIL,
  payload: error,
})

export const updateOrderBankTableData = (payload) => ({
  type: UPDATE_ORDER_BANK_TABLE_DATA,
  payload,
})

export const deleteOrderBankDetail = data => ({
  type: DELETE_ORDERBANK_DETAIL,
  data,
})

export const deleteOrderBankDetailSuccess = event => ({
  type: DELETE_ORDERBANK_DETAIL_SUCCESS,
  payload: event,
})

export const deleteOrderBankDetailFail = error => ({
  type: DELETE_ORDERBANK_DETAIL_FAIL,
  payload: error
})

export const sendDNStatusRequest = params => ({
  type: SEND_DN_STATUS_REQUEST,
  params,
})

export const sendDNStatusRequestSuccess = event => ({
  type: SEND_DN_STATUS_REQUEST_SUCCESS,
  payload: event,
})

export const sendDNStatusRequestFail = error => ({
  type: SEND_DN_STATUS_REQUEST_FAIL,
  payload: error
})