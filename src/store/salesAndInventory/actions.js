import {
  GET_SALES_AND_INVENTORY_VARIANCE_CONTROL,
  GET_SALES_AND_INVENTORY_VARIANCE_CONTROL_SUCCESS,
  GET_SALES_AND_INVENTORY_VARIANCE_CONTROL_FAILED,
  UPDATE_SALES_AND_INVENTORY_VARIANCE_CONTROL,
  UPDATE_SALES_AND_INVENTORY_VARIANCE_CONTROL_SUCCESS,
  UPDATE_SALES_AND_INVENTORY_VARIANCE_CONTROL_FAILED,
  UPDATE_SALES_AND_INVENTORY_TANK_STATUS_MODAL,
  UPDATE_SALES_AND_INVENTORY_TANK_STATUS_MODAL_SUCCESS,
  UPDATE_SALES_AND_INVENTORY_TANK_STATUS_MODAL_FAILED
} from "./actionTypes"

export const getSalesAndInventoryVarianceControl = () => {
  return {
    type: GET_SALES_AND_INVENTORY_VARIANCE_CONTROL,
  }
}

export const getSalesAndInventoryVarianceControlSuccess = (data) => {
  return {
    type: GET_SALES_AND_INVENTORY_VARIANCE_CONTROL_SUCCESS,
    payload: data,
  }
}

export const getSalesAndInventoryVarianceControlFailed = (error) => {
  return {
    type: GET_SALES_AND_INVENTORY_VARIANCE_CONTROL_FAILED,
    payload: error,
  }
}

export const updateSalesAndInventoryVarianceControl = () => {
  return {
    type: UPDATE_SALES_AND_INVENTORY_VARIANCE_CONTROL,
  }
}
export const updateSaleAndInventoryVarianceControlSuccess = (data) => {
  return {
    type: UPDATE_SALES_AND_INVENTORY_VARIANCE_CONTROL_SUCCESS,
    payload: data,
  }
}

export const updateSalesAndInventoryVarianceControlFailed = (error) => {
  return {
    type: UPDATE_SALES_AND_INVENTORY_VARIANCE_CONTROL_FAILED,
    payload: error,
  }
}

export const updateSalesAndInventoryTankStatusModal = (data) => {
  return {
    type:   UPDATE_SALES_AND_INVENTORY_TANK_STATUS_MODAL,
    payload: data,
  }
}
export const updateSalesAndInventoryTankStatusModalSuccess = (data) => {
  return {
    type: UPDATE_SALES_AND_INVENTORY_TANK_STATUS_MODAL_SUCCESS,
    payload: data,
  }
}

export const updateSalesAndInventoryTankStatusModalFailed = (error) => {
  return {
    type: UPDATE_SALES_AND_INVENTORY_TANK_STATUS_MODAL_FAILED,
    payload: error,
  }
}

