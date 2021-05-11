import {
  GET_RETAIL_CUSTOMER,
  GET_RETAIL_CUSTOMER_SUCCESS,
  GET_RETAIL_CUSTOMER_FAIL,
  GET_RETAIL_AUDITLOG,
  GET_RETAIL_AUDITLOG_SUCCESS,
  GET_RETAIL_AUDITLOG_FAIL,
  GET_TABLE_INFORMATION,
  GET_TABLE_INFORMATION_FAIL,
  GET_TABLE_INFORMATION_SUCCESS,
  UPDATE_TABLE_INFORMATION,
  UPDATE_TABLE_INFORMATION_SUCCESS,
  UPDATE_TABLE_INFORMATION_FAIL,
  GET_RETAIL_FILTER,
  GET_RETAIL_FILTER_SUCCESS,
  GET_RETAIL_FILTER_FAIL,
} from "./actionTypes"

export const getRetailCustomer = params => ({
  type: GET_RETAIL_CUSTOMER,
  params,
})

export const getRetailCustomerSuccess = response => ({
  type: GET_RETAIL_CUSTOMER_SUCCESS,
  payload: response,
})

export const getRetailCustomerFail = error => ({
  type: GET_RETAIL_CUSTOMER_FAIL,
})

export const getRetailAuditLog = () => ({
  type: GET_RETAIL_AUDITLOG,
})

export const getRetailAuditLogSuccess = response => ({
  type: GET_RETAIL_AUDITLOG_SUCCESS,
  payload: response,
})

export const getRetailAuditLogFail = error => ({
  type: GET_RETAIL_AUDITLOG_FAIL,
  payload: error,
})

export const getTableInformation = () => ({
  type: GET_TABLE_INFORMATION,
})

export const getTableInformationSuccess = response => ({
  type: GET_TABLE_INFORMATION_SUCCESS,
  payload: response,
})

export const getTableInformationFail = error => ({
  type: GET_TABLE_INFORMATION_FAIL,
  payload: error,
})

export const updateTableInformation = event => ({
  type: UPDATE_TABLE_INFORMATION,
  payload: event,
})

export const updateTableInformationSuccess = event => ({
  type: UPDATE_TABLE_INFORMATION_SUCCESS,
  payload: event,
})

export const updateTableInformationFail = error => ({
  type: UPDATE_TABLE_INFORMATION_FAIL,
})

export const getRetailFilter = params => ({
  type: GET_RETAIL_FILTER,
  params,
})

export const getRetailFilterSuccess = response => ({
  type: GET_RETAIL_FILTER_SUCCESS,
  payload: response,
})

export const getRetailFilterFail = error => ({
  type: GET_RETAIL_FILTER_FAIL,
  payload: error,
})
