  import {
    GET_SLA_ITEMS,
    GET_SLA_ITEMS_SUCCESS,
    GET_SLA_ITEMS_FAIL,
    GET_SLA_AUDITLOG,
    GET_SLA_AUDITLOG_SUCCESS,
    GET_SLA_AUDITLOG_FAIL,
    UPDATE_SLA_DETAIL,
    UPDATE_SLA_DETAIL_FAIL,
    UPDATE_SLA_DETAIL_SUCCESS
  } from "./actionTypes"
  
  export const getSLAItems = params => ({
    type: GET_SLA_ITEMS,
    params,
  })
  
  export const getSlaItemsSuccess = response => ({
    type: GET_SLA_ITEMS_SUCCESS,
    payload: response,
  })
  
  export const getSlaItemsFail = error => ({
    type: GET_SLA_ITEMS_FAIL,
    payload: error
  })
  
  export const getSLAAuditLog = () => ({
    type: GET_SLA_AUDITLOG,
  })
  
  export const getSlaAuditLogSuccess = response => ({
    type: GET_SLA_AUDITLOG_SUCCESS,
    payload: response,
  })
  
  export const getSlaAuditLogFail = error => ({
    type: GET_SLA_AUDITLOG_FAIL,
    payload: error,
  })
  
  
  export const updateSLAItem = params => ({
    type: UPDATE_SLA_DETAIL,
    params,
  })
  
  export const updateSlaDetailSuccess = response => ({
    type: UPDATE_SLA_DETAIL_SUCCESS,
    payload: response,
  })
  
  export const updateSlaDetailFail = error => ({
    type: UPDATE_SLA_DETAIL_FAIL,
    payload: error
  })