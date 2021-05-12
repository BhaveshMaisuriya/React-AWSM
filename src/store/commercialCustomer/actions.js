import {
  GET_COMMERCIAL_CUSTOMER,
  GET_COMMERCIAL_CUSTOMER_SUCCESS,
  GET_COMMERCIAL_CUSTOMER_FAIL,
  GET_COMMERCIAL_AUDITLOG,
  GET_COMMERCIAL_AUDITLOG_SUCCESS,
  GET_COMMERCIAL_AUDITLOG_FAIL,
  GET_COMMERCIAL_FILTER,
  GET_COMMERCIAL_FILTER_SUCCESS,
  GET_COMMERCIAL_FILTER_FAIL
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
