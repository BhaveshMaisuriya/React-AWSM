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
  GET_UPLOAD_CSV_SUCCESS,
  GET_UPLOAD_CSV_FAIL,  
  SET_UPLOAD_CSV_SUCCESS,
  GET_DOWNLOAD_CSV_SUCCESS,
  GET_DOWNLOAD_CSV_FAIL,    
} from "./actionTypes"
const initialState = {
  retailCustomers: [],
  error: {},
  tableError: null,
  audits: [],
  address: [],
  filter: [],
  currentRetailDetail: null,
  updateSuccess: null,
  updateAlert: null,
  downloadretailCustomers: null,
  isLoading: false,
  uploadCsv: null,
  downloadCsv: null,
}
import { ToastSuccess, ToastError } from "../../helpers/swal"
import formatDateResponseList from "../../helpers/format-response-data/format-date-response.helper"

const RetailCustomer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RETAIL_CUSTOMER:
      return {
        ...state,
        isLoading: true,
      }
    case GET_RETAIL_CUSTOMER_SUCCESS:
      const list = action.payload?.list;
      if (list && list.length > 0){
        /*
          all response date field are in format "YYYY-MM-DD" , "single YYYY-MM-DD", "from
          YYYY-MM-DD to YYYY-MM-DD. Must be format to "DD-MM-YYYY"
        */
        const formattedList = formatDateResponseList(list);
        action.payload = {...action.payload,list:formattedList}
      }
      return {
        ...state,
        retailCustomers: action.payload,
        tableError: null,
        isLoading: false,
      }

    case GET_RETAIL_CUSTOMER_FAIL:
      return {
        ...state,
        tableError: action.payload,
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
        downloadretailCustomers: null,
      }
      
    case GET_UPLOAD_CSV_SUCCESS:
      return {
        ...state,
        uploadCsv: action.params,
      }

    case GET_UPLOAD_CSV_FAIL:
      return {
        ...state,
        uploadCsv: action.payload,
      }

    case SET_UPLOAD_CSV_SUCCESS:
      return {
        ...state,
        uploadCsv: null,
        downloadCsv: null,
      }
 
    case GET_DOWNLOAD_CSV_SUCCESS:
      return {
        ...state,
        downloadCsv: action.params,
      }

    case GET_DOWNLOAD_CSV_FAIL:
      return {
        ...state,
        downloadCsv: action.payload,
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
        currentRetailDetail: action.payload?.response,
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
      ToastSuccess.fire()
      return {
        ...state,
        updateSuccess: true,
      }
    }

    case UPDATE_TABLE_INFORMATION_FAIL: {
      ToastError.fire()
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