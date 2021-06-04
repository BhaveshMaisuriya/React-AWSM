import {
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

const initialState = {
  commercialCustomers: [],
  error: {},
  auditsCom: [],
  filterCom: [],
  currentCommercialDetail: null,
  updateSuccess: false,
  downloadCommercialCustomer: [],
}

const CommercialCustomer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COMMERCIAL_CUSTOMER_SUCCESS:
      return {
        ...state,
        commercialCustomers: action.payload,
      }
    case GET_COMMERCIAL_CUSTOMER_FAIL:
      return {
        ...state,
        commercialCustomers: action.payload,
      }
      
    case GET_DOWNLOAD_COMMERCIAL_CUSTOMER_SUCCESS:
      return {
        ...state,
        downloadCommercialCustomer: action.payload,
      }
    case GET_DOWNLOAD_COMMERCIAL_CUSTOMER_FAIL:
      return {
        ...state,
        downloadCommercialCustomer: action.payload,
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
      return  {
        ...state,
        currentCommercialDetail: action.payload
      }

    case GET_COMMERCIAL_TABLE_INFORMATION_FAIL:
      return {
        ...state,
        error: action.payload
      }

    case RESET_COMMERCIAL_TABLE_INFORMATION:
      return {
        ...state,
        currentCommercialDetail: null,
        error: null,
        updateSuccess: false,
      }
    case UPDATE_COMMERCIAL_TABLE_INFORMATION_SUCCESS:
      return {
        ...state,
        currentCommercialDetail: null,
        error: null,
        updateSuccess: true,
      }
    case UPDATE_COMMERCIAL_TABLE_INFORMATION_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    default:
      return state
  }
}

export default CommercialCustomer