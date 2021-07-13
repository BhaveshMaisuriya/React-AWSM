import {
  GET_RETAIL_CUSTOMER_FAIL,
  GET_RETAIL_CUSTOMER_SUCCESS,
  GET_RETAIL_CUSTOMER,
  GET_RETAIL_AUDITLOG_SUCCESS,
  GET_RETAIL_AUDITLOG_FAIL,
  GET_TABLE_INFORMATION_FAIL,
  GET_TABLE_INFORMATION_SUCCESS,
  UPDATE_TABLE_INFORMATION_SUCCESS,
  UPDATE_TABLE_INFORMATION_FAIL,
  RESET_RETAIL_TABLE_INFORMATION,
  GET_RETAIL_FILTER_SUCCESS,
  GET_RETAIL_FILTER_FAIL,
  GET_DOWNLOAD_RETAIL_CUSTOMER_SUCCESS,
  GET_DOWNLOAD_RETAIL_CUSTOMER_FAIL,
} from "./actionTypes"

const initialState = {
  retailCustomers: [],
  error: {},
  audits: [],
  address: [],
  filter: [],
  currentRetailDetail: null,
  updateSuccess: null,
  downloadretailCustomers: [],
  isLoading: false,
}
import { notify } from "../../helpers/notify"

const RetailCustomer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RETAIL_CUSTOMER:
      return {
        ...state,
        isLoading: true,
      }
    case GET_RETAIL_CUSTOMER_SUCCESS:
      return {
        ...state,
        retailCustomers: action.payload,
        isLoading: false,
      }

    case GET_RETAIL_CUSTOMER_FAIL:
      return {
        ...state,
        retailCustomers: action.payload,
        isLoading: false,
      }

    case GET_DOWNLOAD_RETAIL_CUSTOMER_SUCCESS:
      return {
        ...state,
        downloadretailCustomers: action.payload,
      }

    case GET_DOWNLOAD_RETAIL_CUSTOMER_FAIL:
      return {
        ...state,
        downloadretailCustomers: action.payload,
      }

    case GET_RETAIL_AUDITLOG_SUCCESS:
      return {
        ...state,
        audits: action.payload,
      }

    case GET_RETAIL_AUDITLOG_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_TABLE_INFORMATION_SUCCESS:
      return {
        ...state,
        currentRetailDetail: action.payload,
        updateSuccess: null,
      }

    case GET_TABLE_INFORMATION_FAIL:
      return {
        ...state,
        error: action.payload,
        updateSuccess: null,
      }

    case RESET_RETAIL_TABLE_INFORMATION:
      return {
        ...state,
        currentRetailDetail: null,
        error: null,
        updateSuccess: null,
      }

    case UPDATE_TABLE_INFORMATION_SUCCESS: {
      notify.success("Record Successfully Updated")
      return {
        ...state,
        updateSuccess: true,
      }
    }

    case UPDATE_TABLE_INFORMATION_FAIL: {
      notify.error(action.payload)
      return {
        ...state,
        error: action.payload,
        updateSuccess: false,
      }
    }

    case GET_RETAIL_FILTER_SUCCESS:
      return {
        ...state,
        filter: action.payload,
      }

    case GET_RETAIL_FILTER_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    case GET_RETAIL_FILTER_SUCCESS:
      return {
        ...state,
        filter: action.payload,
      }

    case GET_RETAIL_FILTER_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default RetailCustomer
