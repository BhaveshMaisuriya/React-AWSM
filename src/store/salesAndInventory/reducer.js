import {
  GET_SALES_AND_INVENTORY_VARIANCE_CONTROL_FAILED,
  GET_SALES_AND_INVENTORY_VARIANCE_CONTROL_SUCCESS,
  GET_SALES_AND_INVENTORY_TANK_STATUS_MODAL_SUCCESS,
  GET_SALES_AND_INVENTORY_TANK_STATUS_MODAL_FAILED,
} from "./actionTypes"

const initialState = {
  varianceControlData: null,
  varianceControlError: null,
  tankStatusModalError:null,
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
    default:
      return state
  }
}

export default SaleAndInventory
