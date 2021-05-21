import {
  GET_TERMINAL,
  GET_TERMINAL_SUCCESS,
  GET_TERMINAL_FAIL,
  GET_TERMINAL_AUDITLOG,
  GET_TERMINAL_AUDITLOG_SUCCESS,
  GET_TERMINAL_AUDITLOG_FAIL,
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

export const getTerminal = params => ({
  type: GET_TERMINAL,
  params,
})

export const getTerminalSuccess = response => ({
  type: GET_TERMINAL_SUCCESS,
  payload: response,
})

export const getTerminalFail = error => ({
  type: GET_TERMINAL_FAIL,
  payload: error,
})

export const getTerminalAuditLog = () => ({
  type: GET_TERMINAL_AUDITLOG,
})

export const getTerminalAuditLogSuccess = response => ({
  type: GET_TERMINAL_AUDITLOG_SUCCESS,
  payload: response,
})

export const getTerminalAuditLogFail = error => ({
  type: GET_TERMINAL_AUDITLOG_FAIL,
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
  payload: error,
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
