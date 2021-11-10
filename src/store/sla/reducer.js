import {
  GET_SLA_ITEMS_SUCCESS,
  GET_SLA_ITEMS_FAIL,
  GET_SLA_AUDITLOG_SUCCESS,
  GET_SLA_AUDITLOG_FAIL,
  UPDATE_SLA_DETAIL_FAIL,
  UPDATE_SLA_DETAIL_SUCCESS,
  CREATE_SLA_SECTION_SUCCESS,
  CREATE_SLA_SECTION_FAIL,
  UPDATE_SLA_SECTION_SUCCESS,
  UPDATE_SLA_SECTION_FAIL,
  DELETE_SLA_SECTION_SUCCESS,
  DELETE_SLA_SECTION_FAIL,
  UPDATE_SECTION_TAB_SUCCESS,
  DELETE_SLA_RECORD_SUCCESS,
  DELETE_SLA_RECORD_FAIL,
  CREATE_SLA_RECORD_SUCCESS,
  CREATE_SLA_RECORD_FAIL,
  GET_SLA_ATTACHMENTS_SUCCESS,
  GET_SLA_ATTACHMENTS_FAIL,
  GET_SLA_PDFS_SUCCESS,
  GET_SLA_PDFS_FAIL,  
  GET_SLA_PDF_DOWNLOAD_SUCCESS,
  GET_SLA_PDF_DOWNLOAD_FAIL, 
  GET_SLA_RENAME_PDF_SUCCESS,
  GET_SLA_RENAME_PDF_FAIL,
  GET_SLA_DELETE_PDF_SUCCESS,
  GET_SLA_DELETE_PDF_FAIL,
  GET_UPLOAD_DMR_SUCCESS,
  GET_UPLOAD_DMR_FAIL,  
  SET_UPLOAD_DMR_SUCCESS
} from "./actionTypes"

const initialState = {
  data: {},
  error: null,
  slaAuditLog: [],
  updateStatus: null,
  slaAttachments: null,
  slaPdfs: null,
  slaPdfDownload: null,
  slaRenamePdf: null,
  slaDeletePdf: null,
  uploadDMR: null,
  uploadDMRError: null
}
import { ToastSuccess, ToastError } from "../../helpers/swal"

function sortSLA(data) {
  const sortedData = { ...data }
  Object.keys(data).forEach(e => {
    sortedData[e] =
      data[e]?.sort?.((a, b) => {
        const _a = a.title?.toLowerCase().trim()
        const _b = b.title?.toLowerCase().trim()
        if (!_a) return 1
        if (!_b) return -1
        if (_a > _b) {
          return 1
        } else if (_a < _b) {
          return -1
        }
        return 0
      }) ?? sortedData[e]
  })
  return sortedData
}

const SLA = (state = initialState, action) => {
  switch (action.type) {
    case GET_SLA_ITEMS_SUCCESS:
      return {
        ...state,
        data: sortSLA(action.payload),
      }

    case GET_SLA_ITEMS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_SLA_ATTACHMENTS_SUCCESS:
      return {
        ...state,
        slaAttachments: action.params,
      }

    case GET_SLA_ATTACHMENTS_FAIL:
      return {
        ...state,
        slaAttachments: action.payload,
      } 
    case GET_SLA_PDFS_SUCCESS:
      return {
        ...state,
        slaPdfs: action.params,
      }

    case GET_SLA_PDFS_FAIL:
      return {
        ...state,
        error: action.payload,
      } 

      case GET_UPLOAD_DMR_SUCCESS: {
        return {
          ...state,
          uploadDMR: action.params,
          uploadDMRError: null,
        }
      }
  
      case GET_UPLOAD_DMR_FAIL: {
        return {
          ...state,
          uploadDMR: null,
          uploadDMRError: action.payload,
        }
      }
  
      case SET_UPLOAD_DMR_SUCCESS:
        return {
          ...state,
          uploadDMR: null,
          uploadDMRError: null,
        }
      
    case GET_SLA_PDF_DOWNLOAD_SUCCESS:
      return {
        ...state,
        slaPdfDownload: action.params,
      }

    case GET_SLA_PDF_DOWNLOAD_FAIL:
      return {
        ...state,
        error: action.payload,
      }  
      
    case GET_SLA_RENAME_PDF_SUCCESS:
      return {
        ...state,
        slaRenamePdf: action.params,
      }

    case GET_SLA_RENAME_PDF_FAIL:
      return {
        ...state,
        error: action.payload,
      } 

    case GET_SLA_DELETE_PDF_SUCCESS:
      return {
        ...state,
        slaDeletePdf: action.params,
      }

    case GET_SLA_DELETE_PDF_FAIL:
      return {
        ...state,
        error: action.payload,
      }  

    case GET_SLA_AUDITLOG_SUCCESS:
      return {
        ...state,
        slaAuditLog: action.payload,
      }

    case GET_SLA_AUDITLOG_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case UPDATE_SLA_DETAIL_SUCCESS: {
      const { payload } = action
      ToastSuccess.fire({
        title: `${payload.category.toUpperCase()} Item Updated!`,
      })
      const newData = { ...state.data }
      newData[payload.category] = payload.data
      return {
        ...state,
        data: sortSLA(newData),
      }
    }

    case UPDATE_SLA_DETAIL_FAIL:
      ToastError.fire()
      return {
        ...state,
        error: action.payload,
      }

    case UPDATE_SLA_SECTION_SUCCESS: {
      if (action.payload.action && action.payload.action.startsWith("note")) {
        const noteAction = action.payload.action.split("-")[1]
        ToastSuccess.fire({ title: `Notes at ${action.payload.title}, ${action.payload.category?.toUpperCase()} is ${noteAction}` })
      } else {
        ToastSuccess.fire({ title: "SLA Section Updated!" })
      }
      const newData = { ...state.data }
      newData[action.payload.category] = action.payload.data
      return {
        ...state,
        data: sortSLA(newData),
      }
    }

    case UPDATE_SLA_SECTION_FAIL: {
      ToastError.fire()
      return state
    }

    case CREATE_SLA_SECTION_SUCCESS: {
      ToastSuccess.fire({
        title: `${
          action.payload.title
        } has successfully added in ${action.payload.category.toUpperCase()}`,
      })
      const newData = { ...state.data }
      newData[action.payload.category] = action.payload.data
      return {
        ...state,
        data: sortSLA(newData),
      }
    }

    case CREATE_SLA_SECTION_FAIL: {
      ToastError.fire()
      return state
    }

    case DELETE_SLA_SECTION_SUCCESS:
      ToastSuccess.fire({
        title: `${
          action.payload.title
        } has successfully deleted in ${action.payload.category.toUpperCase()}`,
      })
      const newData = { ...state.data }
      newData[action.payload.category] = action.payload.data
      return {
        ...state,
        data: sortSLA(newData),
      }

    case DELETE_SLA_SECTION_FAIL: {
      ToastError.fire()
      return state
    }

    case DELETE_SLA_RECORD_SUCCESS: {
      ToastSuccess.fire({
        title: `Data in ${
          action.payload.title
        }, ${action.payload.category.toUpperCase()} has been successfully deleted`,
      })
      const newData = { ...state.data }
      newData[action.payload.category] = action.payload.data
      return {
        ...state,
        data: sortSLA(newData),
      }
    }

    case DELETE_SLA_RECORD_FAIL: {
      ToastError.fire()
      return state
    }

    case UPDATE_SECTION_TAB_SUCCESS:
      ToastSuccess.fire({
        title: "New section has successfully updated in Internal",
      })
      return {
        ...state,
      }

    case CREATE_SLA_RECORD_SUCCESS: {
      const { payload } = action
      ToastSuccess.fire({
        title: `New row has successfully added in ${
          payload.tabName
        }, ${payload.category.toUpperCase()}`,
      })
      const newData = { ...state.data }
      newData[payload.category] = payload.data
      return {
        ...state,
        data: sortSLA(newData),
      }
    }

    default:
      return state
  }
}

export default SLA