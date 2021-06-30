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
  GET_ORDERBANK_TABLE_INFORMATION_FAIL
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
