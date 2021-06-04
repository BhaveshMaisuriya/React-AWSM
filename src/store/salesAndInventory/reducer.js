import {
  GET_SALES_AND_INVENTORY_VARIANCE_CONTROL_FAILED,
  GET_SALES_AND_INVENTORY_VARIANCE_CONTROL_SUCCESS,
  GET_SALES_AND_INVENTORY_TANK_STATUS_MODAL_SUCCESS,
  GET_SALES_AND_INVENTORY_TANK_STATUS_MODAL_FAILED,
  GET_SALES_AUDITLOG_SUCCESS,
  GET_SALES_AUDITLOG_FAIL,
  GET_DOWNLOAD_SALES_SUCCESS,
  GET_DOWNLOAD_SALES_FAIL
} from "./actionTypes"

const initialState = {
  varianceControlData: null,
  varianceControlError: null,
  tankStatusModalError:null,
  auditsCom: [],
  downloadtableData: [],
}

const SaleAndInventory = (state = initialState, action) => {
  switch (action.type) {
    case GET_SALES_AND_INVENTORY_VARIANCE_CONTROL_SUCCESS:
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
    case GET_SALES_AND_INVENTORY_TANK_STATUS_MODAL_SUCCESS:
      return {
        ...state,
      }
    case GET_SALES_AND_INVENTORY_TANK_STATUS_MODAL_FAILED:
      return {
        ...state,
        tankStatusModalError:action.payload,
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
        error: action.payload,
      }      
    default:
      return state
  }
}

export default SaleAndInventory
