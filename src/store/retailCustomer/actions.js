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
  RESET_RETAIL_TABLE_INFORMATION,
  GET_RETAIL_FILTER,
  GET_RETAIL_FILTER_SUCCESS,
  GET_RETAIL_FILTER_FAIL,
  GET_DOWNLOAD_RETAIL_CUSTOMER,
  GET_DOWNLOAD_RETAIL_CUSTOMER_SUCCESS,
  GET_DOWNLOAD_RETAIL_CUSTOMER_FAIL,
  GET_UPLOAD_CSV,
  GET_UPLOAD_CSV_SUCCESS,
  GET_UPLOAD_CSV_FAIL, 
  SET_UPLOAD_CSV,
  SET_UPLOAD_CSV_SUCCESS,
  SET_UPLOAD_CSV_FAIL,
  GET_DOWNLOAD_CSV,
  GET_DOWNLOAD_CSV_SUCCESS,
  GET_DOWNLOAD_CSV_FAIL,    
} from "./actionTypes"

export const getRetailCustomer = params => ({
  type: GET_RETAIL_CUSTOMER,
  params,
})

export const getUploadCsv = params => ({
  type: GET_UPLOAD_CSV,
  params,
})

export const getUploadCsvSuccess = params => ({
  type: GET_UPLOAD_CSV_SUCCESS,
  params,
})

export const getUploadCsvFail = params => ({
  type: GET_UPLOAD_CSV_FAIL,
  params,
})

export const setUploadCsv = () => ({
  type: SET_UPLOAD_CSV,
})

export const setUploadCsvSuccess = params => ({
  type: SET_UPLOAD_CSV_SUCCESS,
  params,
})

export const getDownloadCsv = params => ({
  type: GET_DOWNLOAD_CSV,
  params,
})

export const getDownloadCsvSuccess = params => ({
  type: GET_DOWNLOAD_CSV_SUCCESS,
  params,
})

export const getDownloadCsvFail = params => ({
  type: GET_DOWNLOAD_CSV_FAIL,
  params,
})

export const getRetailCustomerSuccess = response => ({
  type: GET_RETAIL_CUSTOMER_SUCCESS,
  payload: response,
})

export const getRetailCustomerFail = error => ({
  type: GET_RETAIL_CUSTOMER_FAIL,
  payload: error,
})

export const getDownloadRetailCustomer = params => ({
  type: GET_DOWNLOAD_RETAIL_CUSTOMER,
  params,
})

export const getDownloadRetailCustomerSuccess = response => ({
  type: GET_DOWNLOAD_RETAIL_CUSTOMER_SUCCESS,
  payload: response,
})

export const getDownloadRetailCustomerFail = error => ({
  type: GET_DOWNLOAD_RETAIL_CUSTOMER_FAIL,
  payload: error,
})

export const getRetailAuditLog = (params) => ({
  type: GET_RETAIL_AUDITLOG,
  params,
})

export const getRetailAuditLogSuccess = response => ({
  type: GET_RETAIL_AUDITLOG_SUCCESS,
  payload: response,
})

export const getRetailAuditLogFail = error => ({
  type: GET_RETAIL_AUDITLOG_FAIL,
  payload: error,
})

export const getTableInformation = params => ({
  type: GET_TABLE_INFORMATION,
  params,
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

export const resetRetailTableInformation = () => ({
  type: RESET_RETAIL_TABLE_INFORMATION,
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