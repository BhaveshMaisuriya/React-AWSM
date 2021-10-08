import {
  GET_DQM_EXCEL_DOWNLOAD_SUCCESS, GET_DQM_EXCEL_DOWNLOAD,
  GET_DQM_EXCEL_DOWNLOAD_FAIL, GET_DQM_EXCEL_DOWNLOAD_CLEAR,
} from "./actionTypes"
const initialState = {
  excelDownload: null,
  downloadFail: false,
}
import { ToastError } from "../../helpers/swal"

const DQMCommon = (state = initialState, action) => {
  switch (action.type) {

    case GET_DQM_EXCEL_DOWNLOAD:
      return {
        downloadFail: false
      }

    case GET_DQM_EXCEL_DOWNLOAD_SUCCESS:
      return {
        ...state,
        excelDownload: action.payload,
      }

    case GET_DQM_EXCEL_DOWNLOAD_FAIL:
      ToastError.fire({ title: "Download Unsuccessful!"})
      return {
        ...state,
        excelDownload: null,
        downloadFail: true,
      }

    case GET_DQM_EXCEL_DOWNLOAD_CLEAR:
      return {
        ...state,
        excelDownload: null,
      }

    default:
      return state
  }
}

export default DQMCommon