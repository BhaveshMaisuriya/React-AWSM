import {
  GET_COMMERCIAL_CUSTOMER,
  GET_COMMERCIAL_CUSTOMER_SUCCESS,
  GET_COMMERCIAL_CUSTOMER_FAIL,
  GET_COMMERCIAL_AUDITLOG,
  GET_COMMERCIAL_AUDITLOG_SUCCESS,
  GET_COMMERCIAL_AUDITLOG_FAIL,
  GET_COMMERCIAL_FILTER,
  GET_COMMERCIAL_FILTER_SUCCESS,
  GET_COMMERCIAL_FILTER_FAIL,
  GET_COMMERCIAL_TABLE_INFORMATION,
  GET_COMMERCIAL_TABLE_INFORMATION_FAIL,
  GET_COMMERCIAL_TABLE_INFORMATION_SUCCESS,
  UPDATE_COMMERCIAL_TABLE_INFORMATION,
  UPDATE_COMMERCIAL_TABLE_INFORMATION_SUCCESS,
  UPDATE_COMMERCIAL_TABLE_INFORMATION_FAIL,
  RESET_COMMERCIAL_TABLE_INFORMATION,
} from "./actionTypes"

export const getCommercialCustomer = params => ({
  type: GET_COMMERCIAL_CUSTOMER,
  params,
})

export const getCommercialCustomerSuccess = response => ({
  type: GET_COMMERCIAL_CUSTOMER_SUCCESS,
  payload: response,
})

export const getCommercialCustomerFail = error => ({
  type: GET_COMMERCIAL_CUSTOMER_FAIL,
})

export const getCommercialAuditLog = () => ({
  type: GET_COMMERCIAL_AUDITLOG,
})

export const getCommercialAuditLogSuccess = response => ({
  type: GET_COMMERCIAL_AUDITLOG_SUCCESS,
  payload: response,
})

export const getCommercialAuditLogFail = error => ({
  type: GET_COMMERCIAL_AUDITLOG_FAIL,
  payload: error,
})

export const getCommercialFilter = params => ({
  type: GET_COMMERCIAL_FILTER,
  params,
})

export const getCommercialFilterSuccess = response => ({
  type: GET_COMMERCIAL_FILTER_SUCCESS,
  payload: response,
})

export const getCommercialFilterFail = error => ({
  type: GET_COMMERCIAL_FILTER_FAIL,
})

export const getCommercialTableInformation = (params) => {
  return {
    type: GET_COMMERCIAL_TABLE_INFORMATION,
    params
  }
}

export const getCommercialTableInformationSuccess = response => ({
  type: GET_COMMERCIAL_TABLE_INFORMATION_SUCCESS,
  payload: response,
})

export const getCommercialTableInformationFail = error => ({
  type: GET_COMMERCIAL_TABLE_INFORMATION_FAIL,
  payload: error,
})

export const updateCommercialTableInformation = data => ({
  type: UPDATE_COMMERCIAL_TABLE_INFORMATION,
  data,
})

export const updateCommercialTableInformationSuccess = event => ({
  type: UPDATE_COMMERCIAL_TABLE_INFORMATION_SUCCESS,
  payload: event,
})

export const updateCommercialTableInformationFail = error => ({
  type: UPDATE_COMMERCIAL_TABLE_INFORMATION_FAIL,
  payload: error
})

export const resetCommercialTableInformation = () => ({
  type: RESET_COMMERCIAL_TABLE_INFORMATION,
})
