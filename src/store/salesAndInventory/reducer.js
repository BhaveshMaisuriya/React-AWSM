import {
  GET_SALES_AND_INVENTORY_VARIANCE_CONTROL_FAILED,
  GET_SALES_AND_INVENTORY_VARIANCE_CONTROL_SUCCESS,
  GET_SALES_AND_INVENTORY_TANK_STATUS_MODAL_SUCCESS,
  GET_SALES_AND_INVENTORY_TANK_STATUS_MODAL_FAILED,
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
  OVERRIDE_STATUS_IN_ACTION_COLUMN
} from "./actionTypes"

const initialState = {
  varianceControlData: null,
  varianceControlError: null,
  mainTableData: [],
  filter: {},
  tankStatusModalError: null,
  auditsCom: [],
  downloadtableData: [],
  currentSalesAndInventory: {}
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
        tankStatusModalError: action.payload,
      }
    case GET_SALES_AND_INVENTORY_SUCCESS:
      return {
        ...state,
        mainTableData: action.payload,
      }
    case GET_SALES_AND_INVENTORY_FAIL:
      return {
        ...state,
        mainTableData: action.payload,
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
        error: action.payload,
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
      return {
        ...state,
        varianceControlData: action.payload,
        varianceControlError: null,
      }
    case UPDATE_SALES_AND_INVENTORY_VARIANCE_CONTROL_FAILED:
      return {
        ...state,
        varianceControlData: null,
        varianceControlError: action.payload,
      }
    case OVERRIDE_STATUS_IN_ACTION_COLUMN:
      const listData = state.mainTableData
      const newData = [...listData.list]
      newData[action.payload].overrideAction = true
      return {
        ...state,
        mainTableData: listData
      }
    default:
      return state
  }
}

export default SaleAndInventory
