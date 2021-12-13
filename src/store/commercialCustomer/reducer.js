import {
  GET_COMMERCIAL_CUSTOMER,
  GET_COMMERCIAL_CUSTOMER_FAIL,
  GET_COMMERCIAL_CUSTOMER_SUCCESS,
  GET_DOWNLOAD_COMMERCIAL_CUSTOMER_FAIL,
  GET_DOWNLOAD_COMMERCIAL_CUSTOMER_SUCCESS,
  GET_COMMERCIAL_AUDITLOG_SUCCESS,
  GET_COMMERCIAL_AUDITLOG_FAIL,
  GET_COMMERCIAL_FILTER_SUCCESS,
  GET_COMMERCIAL_FILTER_FAIL,
  GET_COMMERCIAL_TABLE_INFORMATION_SUCCESS,
  GET_COMMERCIAL_TABLE_INFORMATION_FAIL,
  RESET_COMMERCIAL_TABLE_INFORMATION,
  UPDATE_COMMERCIAL_TABLE_INFORMATION_SUCCESS,
  UPDATE_COMMERCIAL_TABLE_INFORMATION_FAIL,
} from "./actionTypes"

import { ToastSuccess, ToastError } from "../../helpers/swal"
import formatDateResponseList from "../../helpers/format-response-data/format-date-response.helper"
const initialState = {
  commercialCustomers: [],
  error: {},
  tableError: null,
  auditsCom: [],
  filterCom: [],
  currentCommercialDetail: null,
  updateSuccess: null,
  downloadCommercialCustomer: null,
  isLoading: false,
}

const CommercialCustomer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COMMERCIAL_CUSTOMER:
      return {
        ...state,
        isLoading: true,
      }
    case GET_COMMERCIAL_CUSTOMER_SUCCESS:
      const list = action.payload?.list
      if (list && list.length > 0) {
        action.payload = { ...action.payload, list: formatDateResponseList(list) }
      }
      return {
        ...state,
        commercialCustomers: action.payload,
        tableError: null,
        isLoading: false,
      }
    case GET_COMMERCIAL_CUSTOMER_FAIL:
      return {
        ...state,
        tableError: action.payload,
        isLoading: false,
      }

    case GET_DOWNLOAD_COMMERCIAL_CUSTOMER_SUCCESS:
      return {
        ...state,
        downloadCommercialCustomer: action.payload,
      }
    case GET_DOWNLOAD_COMMERCIAL_CUSTOMER_FAIL:
      return {
        ...state,
        downloadCommercialCustomer: null,
      }

    case GET_COMMERCIAL_AUDITLOG_SUCCESS:
      return {
        ...state,
        auditsCom: action.payload,
      }

    case GET_COMMERCIAL_AUDITLOG_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_COMMERCIAL_FILTER_SUCCESS:
      return {
        ...state,
        filterCom: action.payload,
      }

    case GET_COMMERCIAL_FILTER_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_COMMERCIAL_TABLE_INFORMATION_SUCCESS:
      return {
        ...state,
        currentCommercialDetail: action.payload,
        updateSuccess: null,
      }

    case GET_COMMERCIAL_TABLE_INFORMATION_FAIL:
      return {
        ...state,
        error: action.payload,
        updateSuccess: null,
      }

    case RESET_COMMERCIAL_TABLE_INFORMATION:
      return {
        ...state,
        currentCommercialDetail: null,
        error: null,
        updateSuccess: null,
      }

    case UPDATE_COMMERCIAL_TABLE_INFORMATION_SUCCESS: {
      ToastSuccess.fire()
      return {
        ...state,
        currentCommercialDetail: null,
        error: null,
        updateSuccess: true,
      }
    }

    case UPDATE_COMMERCIAL_TABLE_INFORMATION_FAIL: {
      ToastError.fire()
      return {
        ...state,
        error: action.payload,
        updateSuccess: false,
      }
    }

    default:
      return state
  }
}

export default CommercialCustomer
