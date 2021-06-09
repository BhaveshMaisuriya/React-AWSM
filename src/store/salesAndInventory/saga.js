import {
  GET_SALES_AND_INVENTORY_VARIANCE_CONTROL,
  UPDATE_SALES_AND_INVENTORY_VARIANCE_CONTROL,
  UPDATE_SALES_AND_INVENTORY_TANK_STATUS_MODAL,
  GET_SALES_AND_INVENTORY,
  GET_SALES_AUDITLOG,
  GET_DOWNLOAD_SALES,
} from "./actionTypes"
import Factory, { DownloadData } from "./factory"
import {
  getSalesAndInventoryVarianceControlSuccess,
  getSalesAndInventoryVarianceControlFailed,
  updateSaleAndInventoryVarianceControlSuccess,
  updateSalesAndInventoryVarianceControlFailed,
  updateSalesAndInventoryTankStatusModalFailed,
  updateSalesAndInventoryTankStatusModalSuccess,
  getSaleAndInventoryFail,
  getSaleAndInventorySuccess,
  getSaleAndInventoryFilterSuccess,
  getSalesAuditLogSuccess,
  getSalesAuditLogFail,
  getDownloadSalesSuccess,
  getDownloadSalesFail,
} from "./actions"
import { call, put, takeLatest } from "redux-saga/effects"
import {
  getSaleAndInventoryVarianceControl,
  updateSaleAndInventoryVarianceControl,
  updateSaleAndInventoryTankStatusModal,
  getSaleAndInventory,
  getSalesAuditLog,
  getDownloadSales,
} from "../../helpers/fakebackend_helper"

function* onGetSalesAndInventory({ params = {} }) {
  try {
    const response = yield call(getSaleAndInventory, params)
    yield put(getSaleAndInventorySuccess(Factory(response)))
    yield put(getSaleAndInventoryFilterSuccess(response.data.filters))
  } catch (error) {
    yield put(getSaleAndInventoryFail(error))
  }
}

function* onGetSalesAndInventoryVarianceControl({ date }) {
  try {
    const response = yield call(getSaleAndInventoryVarianceControl, date)
    console.log(response)
    yield put(getSalesAndInventoryVarianceControlSuccess(response))
  } catch (error) {
    yield put(getSalesAndInventoryVarianceControlFailed(error))
  }
}

function* onUpdateSalesAndInventoryVarianceControl({ data }) {
  try {
    const response = yield call(updateSaleAndInventoryVarianceControl, data)
    yield put(updateSalesAndInventoryTankStatusModalSuccess(response))
  } catch (error) {
    yield put(updateSalesAndInventoryVarianceControlFailed(error))
  }
}

function* onUpdateSalesAndInventoryTankStatusModal(payload) {
  try {
    const response = yield call(updateSaleAndInventoryTankStatusModal, payload)
    yield put(updateSalesAndInventoryTankStatusModalSuccess(response))
  } catch (error) {
    yield put(updateSalesAndInventoryTankStatusModalFailed(error))
  }
}

function* onGetSalesAuditLog() {
  try {
    const response = yield call(getSalesAuditLog)
    yield put(getSalesAuditLogSuccess(response))
  } catch (error) {
    yield put(getSalesAuditLogFail(error))
  }
}

function* onGetDownloadSales({ params = {} }) {
  try {
    const response = yield call(getDownloadSales, params)
    yield put(getDownloadSalesSuccess(response.data))
  } catch (error) {
    yield put(getDownloadSalesFail(error))
  }
}

function* saleAndInventorySaga() {
  yield takeLatest(
    GET_SALES_AND_INVENTORY_VARIANCE_CONTROL,
    onGetSalesAndInventoryVarianceControl
  )
  yield takeLatest(
    UPDATE_SALES_AND_INVENTORY_VARIANCE_CONTROL,
    onUpdateSalesAndInventoryVarianceControl
  )
  yield takeLatest(
    UPDATE_SALES_AND_INVENTORY_TANK_STATUS_MODAL,
    onUpdateSalesAndInventoryTankStatusModal
  )
  yield takeLatest(GET_SALES_AUDITLOG, onGetSalesAuditLog)
  yield takeLatest(GET_DOWNLOAD_SALES, onGetDownloadSales)
  yield takeLatest(GET_SALES_AND_INVENTORY, onGetSalesAndInventory)
}

export default saleAndInventorySaga
