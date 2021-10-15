import {
  GET_SALES_AND_INVENTORY_VARIANCE_CONTROL,
  GET_SALES_AND_INVENTORY_VARIANCE_CONTROL_SUCCESS,
  GET_SALES_AND_INVENTORY_VARIANCE_CONTROL_FAILED,
  UPDATE_SALES_AND_INVENTORY_VARIANCE_CONTROL,
  UPDATE_SALES_AND_INVENTORY_VARIANCE_CONTROL_SUCCESS,
  UPDATE_SALES_AND_INVENTORY_VARIANCE_CONTROL_FAILED,
  GET_SALES_AND_INVENTORY_TANK_STATUS,
  GET_SALES_AND_INVENTORY_TANK_STATUS_FAILED,
  GET_SALES_AND_INVENTORY_TANK_STATUS_SUCCESS,
  UPDATE_SALES_AND_INVENTORY_TANK_STATUS,
  UPDATE_SALES_AND_INVENTORY_TANK_STATUS_SUCCESS,
  UPDATE_SALES_AND_INVENTORY_TANK_STATUS_FAILED,
  GET_SALES_AND_INVENTORY,
  GET_SALES_AND_INVENTORY_SUCCESS,
  GET_SALES_AND_INVENTORY_FAIL,
  GET_SALES_AND_INVENTORY_FILTER_SUCCESS,
  GET_SALES_AND_INVENTORY_FILTER_FAIL,
  GET_SALES_AUDITLOG,
  GET_SALES_AUDITLOG_SUCCESS,
  GET_SALES_AUDITLOG_FAIL,
  GET_DOWNLOAD_SALES,
  GET_DOWNLOAD_SALES_SUCCESS,
  GET_DOWNLOAD_SALES_FAIL,
  GET_DETAIL_SALES,
  GET_DETAIL_SALES_SUCCESS,
  GET_DETAIL_SALES_FAIL,
  UPDATE_SALES_AND_INVENTORY_DETAIL,
  UPDATE_SALES_AND_INVENTORY_DETAIL_SUCCESS,
  UPDATE_SALES_AND_INVENTORY_DETAIL_FAIL,
  OVERRIDE_STATUS_IN_ACTION_COLUMN,
  OVERRIDE_STATUS_IN_ACTION_COLUMN_SUCCESS,
  OVERRIDE_STATUS_IN_ACTION_COLUMN_FAIL,
} from "./actionTypes"

export const getSalesAndInventoryVarianceControl = date => {
  return {
    type: GET_SALES_AND_INVENTORY_VARIANCE_CONTROL,
    date,
  }
}

export const getSalesAndInventoryVarianceControlSuccess = data => {
  return {
    type: GET_SALES_AND_INVENTORY_VARIANCE_CONTROL_SUCCESS,
    payload: data,
  }
}

export const getSalesAndInventoryVarianceControlFailed = error => {
  return {
    type: GET_SALES_AND_INVENTORY_VARIANCE_CONTROL_FAILED,
    payload: error,
  }
}

export const updateSalesAndInventoryVarianceControl = data => {
  return {
    type: UPDATE_SALES_AND_INVENTORY_VARIANCE_CONTROL,
    data,
  }
}
export const updateSaleAndInventoryVarianceControlSuccess = data => {
  return {
    type: UPDATE_SALES_AND_INVENTORY_VARIANCE_CONTROL_SUCCESS,
    payload: data,
  }
}

export const updateSalesAndInventoryVarianceControlFailed = error => {
  return {
    type: UPDATE_SALES_AND_INVENTORY_VARIANCE_CONTROL_FAILED,
    payload: error,
  }
}

export const updateSalesAndInventoryTankStatus = data => {
  return {
    type: UPDATE_SALES_AND_INVENTORY_TANK_STATUS,
    payload: data,
  }
}
export const updateSalesAndInventoryTankStatusSuccess = data => {
  return {
    type: UPDATE_SALES_AND_INVENTORY_TANK_STATUS_SUCCESS,
    payload: data,
  }
}

export const updateSalesAndInventoryTankStatusFailed = error => {
  return {
    type: UPDATE_SALES_AND_INVENTORY_TANK_STATUS_FAILED,
    error: error,
  }
}

export const getSalesAndInventoryTankStatus = data => {
  return {
    type: GET_SALES_AND_INVENTORY_TANK_STATUS,
    payload: data,
  }
}
export const getSalesAndInventoryTankStatusSuccess = data => {
  return {
    type: GET_SALES_AND_INVENTORY_TANK_STATUS_SUCCESS,
    payload: data,
  }
}

export const getSalesAndInventoryTankStatusFailed = error => {
  return {
    type: GET_SALES_AND_INVENTORY_TANK_STATUS_FAILED,
    error: error,
  }
}

export const getSaleAndInventory = params => {
  return {
    type: GET_SALES_AND_INVENTORY,
    params,
  }
}
export const getSaleAndInventorySuccess = data => {
  return {
    type: GET_SALES_AND_INVENTORY_SUCCESS,
    payload: data,
  }
}

export const getSaleAndInventoryFail = error => {
  return {
    type: GET_SALES_AND_INVENTORY_FAIL,
    payload: error,
  }
}

export const getSaleAndInventoryFilterSuccess = response => ({
  type: GET_SALES_AND_INVENTORY_FILTER_SUCCESS,
  payload: response,
})

export const getSaleAndInventoryFilterFail = error => ({
  type: GET_SALES_AND_INVENTORY_FILTER_FAIL,
  payload: error,
})
export const getSalesAuditLog = params => ({
  type: GET_SALES_AUDITLOG,
  params,
})

export const getSalesAuditLogSuccess = response => ({
  type: GET_SALES_AUDITLOG_SUCCESS,
  payload: response,
})

export const getSalesAuditLogFail = error => ({
  type: GET_SALES_AUDITLOG_FAIL,
  payload: error,
})

export const getDownloadSales = params => ({
  type: GET_DOWNLOAD_SALES,
  params,
})

export const getDownloadSalesSuccess = response => ({
  type: GET_DOWNLOAD_SALES_SUCCESS,
  payload: response,
})

export const getDownloadSalesFail = error => ({
  type: GET_DOWNLOAD_SALES_FAIL,
  payload: error,
})

export const getDetailsSales = recordId => ({
  type: GET_DETAIL_SALES,
  recordId,
})

export const getDetailsSalesSuccess = response => ({
  type: GET_DETAIL_SALES_SUCCESS,
  payload: response,
})

export const getDetailsSalesFail = error => ({
  type: GET_DETAIL_SALES_FAIL,
  payload: error,
})

export const updateSalesAndInventoryDetail = (recordId, payload) => ({
  type: UPDATE_SALES_AND_INVENTORY_DETAIL,
  payload,
  recordId,
})

export const updateSalesAndInventoryDetailSuccess = data => ({
  type: UPDATE_SALES_AND_INVENTORY_DETAIL_SUCCESS,
  payload: data,
})

export const updateSalesAndInventoryDetailFail = error => ({
  type: UPDATE_SALES_AND_INVENTORY_DETAIL_FAIL,
  payload: error,
})

export const overrideStatusInActionColumn = params => ({
  type: OVERRIDE_STATUS_IN_ACTION_COLUMN,
  payload: params,
})

export const overrideStatusInActionColumnSuccess = () =>({
  type: OVERRIDE_STATUS_IN_ACTION_COLUMN_SUCCESS,
})

export const overrideStatusInActionColumnFail = (error) =>({
  type: OVERRIDE_STATUS_IN_ACTION_COLUMN_FAIL,
  payload: error,
})