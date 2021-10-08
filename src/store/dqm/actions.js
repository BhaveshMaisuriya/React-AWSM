import {
  GET_DQM_EXCEL_DOWNLOAD,
  GET_DQM_EXCEL_DOWNLOAD_SUCCESS,
  GET_DQM_EXCEL_DOWNLOAD_FAIL, GET_DQM_EXCEL_DOWNLOAD_CLEAR
} from "./actionTypes"

export const getDQMExcelDownload = params => ({
  type: GET_DQM_EXCEL_DOWNLOAD,
  params,
})

export const getDQMExcelDownloadSuccess = response => ({
  type: GET_DQM_EXCEL_DOWNLOAD_SUCCESS,
  payload: response,
})

export const getDQMExcelDownloadFail = error => ({
  type: GET_DQM_EXCEL_DOWNLOAD_FAIL,
  payload: error,
})

export const getDQMExcelDownloadClear = () => ({
  type: GET_DQM_EXCEL_DOWNLOAD_CLEAR
})
