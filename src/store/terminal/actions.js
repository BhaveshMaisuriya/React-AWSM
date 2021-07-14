import {
  GET_TERMINAL,
  GET_TERMINAL_SUCCESS,
  GET_TERMINAL_FAIL,
  GET_TERMINAL_AUDITLOG,
  GET_TERMINAL_AUDITLOG_SUCCESS,
  GET_TERMINAL_AUDITLOG_FAIL,
  GET_TERMINAL_TABLE_INFORMATION,
  GET_TERMINAL_TABLE_INFORMATION_FAIL,
  GET_TERMINAL_TABLE_INFORMATION_SUCCESS,
  UPDATE_TERMINAL_TABLE_INFORMATION,
  UPDATE_TERMINAL_TABLE_INFORMATION_SUCCESS,
  UPDATE_TERMINAL_TABLE_INFORMATION_FAIL,
  GET_TERMINAL_FILTER,
  GET_TERMINAL_FILTER_SUCCESS,
  GET_TERMINAL_FILTER_FAIL,
  GET_DOWNLOAD_TERMINAL,
  GET_DOWNLOAD_TERMINAL_SUCCESS,
  GET_DOWNLOAD_TERMINAL_FAIL,
  RESET_CURRENT_TERMINAL_DETAIL
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

export const getDownloadTerminal = params => ({
  type: GET_DOWNLOAD_TERMINAL,
  params,
})

export const getDownloadTerminalSuccess = response => ({
  type: GET_DOWNLOAD_TERMINAL_SUCCESS,
  payload: response,
})

export const getDownloadTerminalFail = error => ({
  type: GET_DOWNLOAD_TERMINAL_FAIL,
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

export const getTableInformation = (code) => ({
  type: GET_TERMINAL_TABLE_INFORMATION,
  code,
})

export const getTableInformationSuccess = response => ({
  type: GET_TERMINAL_TABLE_INFORMATION_SUCCESS,
  payload: response,
})

export const getTableInformationFail = error => ({
  type: GET_TERMINAL_TABLE_INFORMATION_FAIL,
  payload: error,
})

export const updateTableInformation = event => ({
  type: UPDATE_TERMINAL_TABLE_INFORMATION,
  payload: event,
})

export const updateTableInformationSuccess = event => ({
  type: UPDATE_TERMINAL_TABLE_INFORMATION_SUCCESS,
  payload: event,
})

export const updateTableInformationFail = error => ({
  type: UPDATE_TERMINAL_TABLE_INFORMATION_FAIL,
  payload: error,
})

export const getTerminalFilter = params => ({
  type: GET_TERMINAL_FILTER,
  params,
})

export const getTerminalFilterSuccess = response => ({
  type: GET_TERMINAL_FILTER_SUCCESS,
  payload: response,
})

export const getTerminalFilterFail = error => ({
  type: GET_TERMINAL_FILTER_FAIL,
  payload: error,
})

export const resetCurrentTerminalDetail = () => ({
  type: RESET_CURRENT_TERMINAL_DETAIL,
})
