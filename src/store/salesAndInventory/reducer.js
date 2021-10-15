import {
  GET_SALES_AND_INVENTORY_VARIANCE_CONTROL_FAILED,
  GET_SALES_AND_INVENTORY_VARIANCE_CONTROL_SUCCESS,
  GET_SALES_AND_INVENTORY_TANK_STATUS_SUCCESS,
  GET_SALES_AND_INVENTORY_TANK_STATUS_FAILED,
  GET_SALES_AND_INVENTORY_TANK_STATUS,
  UPDATE_SALES_AND_INVENTORY_TANK_STATUS,
  UPDATE_SALES_AND_INVENTORY_TANK_STATUS_SUCCESS,
  UPDATE_SALES_AND_INVENTORY_TANK_STATUS_FAILED,
  GET_SALES_AND_INVENTORY,
  GET_SALES_AND_INVENTORY_SUCCESS,
  GET_SALES_AND_INVENTORY_FAIL,
  GET_SALES_AND_INVENTORY_FILTER_FAIL,
  GET_SALES_AND_INVENTORY_FILTER_SUCCESS,
  GET_SALES_AUDITLOG_SUCCESS,
  GET_SALES_AUDITLOG_FAIL,
  GET_DOWNLOAD_SALES_SUCCESS,
  GET_DOWNLOAD_SALES_FAIL,
  GET_DETAIL_SALES_SUCCESS,
  GET_DETAIL_SALES_FAIL,
  UPDATE_SALES_AND_INVENTORY_VARIANCE_CONTROL_SUCCESS,
  UPDATE_SALES_AND_INVENTORY_VARIANCE_CONTROL_FAILED,
  UPDATE_SALES_AND_INVENTORY_DETAIL_SUCCESS,
  UPDATE_SALES_AND_INVENTORY_DETAIL_FAIL,
  OVERRIDE_STATUS_IN_ACTION_COLUMN_SUCCESS,
  OVERRIDE_STATUS_IN_ACTION_COLUMN_FAIL
} from "./actionTypes"
import { ToastSuccess, ToastError } from "../../helpers/swal"
import formatDateResponseList from "../../helpers/format-response-data/format-date-response.helper"

const initialState = {
  varianceControlData: null,
  varianceControlError: null,
  tankStatusData: null,
  tankStatusError: null,
  mainTableData: [],
  error: {},
  tableError: null,
  filter: {},
  tankStatusModalError: null,
  auditsCom: [],
  downloadtableData: null,
  currentSalesAndInventory: {},
  isUpdateSuccess: false,
  isLoading: false,
  overrideSuccess: null
}

const SaleAndInventory = (state = initialState, action) => {
  switch (action.type) {
    case GET_SALES_AND_INVENTORY:
      return {
        ...state,
        isLoading: true,
      }
    case GET_SALES_AND_INVENTORY_VARIANCE_CONTROL_SUCCESS:
      // ToastSuccess.fire()
      return {
        ...state,
        varianceControlData: action.payload,
        varianceControlError: null,
      }
    case GET_SALES_AND_INVENTORY_VARIANCE_CONTROL_FAILED:
      return {
        ...state,
        varianceControlError: action.payload,
        varianceControlData: null,
      }
    case GET_SALES_AND_INVENTORY_TANK_STATUS:
      return {
        ...state,
      }
    case GET_SALES_AND_INVENTORY_TANK_STATUS_SUCCESS:
      return {
        ...state,
        tankStatusData:action.payload,
      }
    case GET_SALES_AND_INVENTORY_TANK_STATUS_FAILED:
      return {
        ...state,
        tankStatusModalError: action.payload,
      }
    case GET_SALES_AND_INVENTORY_SUCCESS:
      const list = action.payload?.list;
      if(list && list.length > 0){
        action.payload = {...action.payload,list: formatDateResponseList(list)}
      }
      return {
        ...state,
        mainTableData: action.payload,
        tableError: null,
        isLoading: false,
        isUpdateSuccess: null,
      }
    case GET_SALES_AND_INVENTORY_FAIL:
      return {
        ...state,
        tableError: action.payload,
        isLoading: false,
      }
    case GET_SALES_AND_INVENTORY_FILTER_SUCCESS:
      return {
        ...state,
        filter: action.payload,
      }
    case GET_SALES_AND_INVENTORY_FILTER_FAIL:
      return {
        ...state,
        filter: action.payload,
      }
    case GET_SALES_AUDITLOG_SUCCESS:
      return {
        ...state,
        auditsCom: action.payload,
      }
    case GET_SALES_AUDITLOG_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    case GET_DOWNLOAD_SALES_SUCCESS:
      return {
        ...state,
        downloadtableData: action.payload,
      }
    case GET_DOWNLOAD_SALES_FAIL:
      return {
        ...state,
        downloadtableData: null,
      }
    case GET_DETAIL_SALES_SUCCESS:
      return {
        ...state,
        currentSalesAndInventory: action.payload,
      }
    case GET_DETAIL_SALES_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    case UPDATE_SALES_AND_INVENTORY_VARIANCE_CONTROL_SUCCESS:
      ToastSuccess.fire()
      return {
        ...state,
        varianceControlData: action.payload,
        varianceControlError: null,
      }
    case UPDATE_SALES_AND_INVENTORY_VARIANCE_CONTROL_FAILED:
      ToastError.fire()
      return {
        ...state,
        varianceControlData: null,
        varianceControlError: action.payload,
      }
    case UPDATE_SALES_AND_INVENTORY_TANK_STATUS:
      return {
        ...state,
      }
    case UPDATE_SALES_AND_INVENTORY_TANK_STATUS_SUCCESS:
      ToastSuccess.fire()
      return {
        ...state,
        tankStatusData: action.payload,
        tankStatusError: null,
      }
    case UPDATE_SALES_AND_INVENTORY_TANK_STATUS_FAILED:
      ToastError.fire()
      return {
        ...state,
        tankStatusData: null,
        tankStatusError: action.payload,
      }

    case UPDATE_SALES_AND_INVENTORY_DETAIL_SUCCESS:
      /*payload is all information from record. So we must filter which columns are in view and
       update the view for optimistic. The real data must be get all again but the request time
       is too long so we must show the changes first in the view */
       const currentTableColumns = Object.keys(state.mainTableData.list[0]);
       let newList = [...state.mainTableData.list]
       if(action.payload?.data){
         const {trans_id} = action.payload?.data
         const columnsInDetail = findMatchedColumns(action.payload?.data?.details,currentTableColumns)
         const columnsInSales = findMatchedColumns(action.payload?.data?.sales,currentTableColumns)
         const columnsInInventory = findMatchedColumns(action.payload?.data?.inventory,currentTableColumns)
         // For the information from delivery Tab, need example data in List to filter
         const updatedRecordRow = {...columnsInDetail,...columnsInSales,...columnsInInventory, trans_id}
         const updatedIndex = newList.findIndex((row)=> row.trans_id === trans_id);
         if(updatedIndex !== -1){
           newList[updatedIndex] = updatedRecordRow
         }
       }
       ToastSuccess.fire()
       return {
         ...state,
         mainTableData: {...state.mainTableData,list:newList},
         isUpdateSuccess: {success:true}, // for each update return a new success object
       }
 
     case UPDATE_SALES_AND_INVENTORY_DETAIL_FAIL:
       ToastError.fire()
       return {
         ...state,
         error: action.payload,
       }

    case OVERRIDE_STATUS_IN_ACTION_COLUMN_SUCCESS: {
      ToastSuccess.fire()
      return {
        ...state,
        isUpdateSuccess: {
          success: true
        },
      }
    }

    case OVERRIDE_STATUS_IN_ACTION_COLUMN_FAIL: {
      ToastError.fire()
      return {
        ...state,
        isUpdateSuccess: {
          success: false
        },
        error: action.payload,
      }
    }
     default:
       return state
   }
 }
 
 export default SaleAndInventory
 
 function findMatchedColumns(object,columns){
   return Object.keys(object).reduce((result,key)=>{
     if(columns.indexOf(key) !==-1){
       result[key] = object[key]
     }
     return result
   },{})
 }
 