import {
  GET_RETAIL_CUSTOMER,
  GET_RETAIL_CUSTOMER_SUCCESS,
  GET_RETAIL_CUSTOMER_FAIL,
  GET_COMMERCIAL_AUDITLOG,
  GET_COMMERCIAL_AUDITLOG_SUCCESS,
  GET_COMMERCIAL_AUDITLOG_FAIL,
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
