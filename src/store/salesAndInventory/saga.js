import {
  GET_SALES_AND_INVENTORY_VARIANCE_CONTROL,
  UPDATE_SALES_AND_INVENTORY_VARIANCE_CONTROL,
  UPDATE_SALES_AND_INVENTORY_TANK_STATUS,
  GET_SALES_AND_INVENTORY,
  GET_SALES_AUDITLOG,
  GET_DOWNLOAD_SALES,
  GET_DETAIL_SALES,
  UPDATE_SALES_AND_INVENTORY_DETAIL,
  GET_SALES_AND_INVENTORY_TANK_STATUS,
  OVERRIDE_STATUS_IN_ACTION_COLUMN,
} from "./actionTypes"
import Factory, { formatResponseDataVarianceControl, DownloadData } from "./factory"
import {
  getSalesAndInventoryTankStatusSuccess,
  getSalesAndInventoryTankStatusFailed,
  getSalesAndInventoryVarianceControlSuccess,
  getSalesAndInventoryVarianceControlFailed,
  updateSaleAndInventoryVarianceControlSuccess,
  updateSalesAndInventoryVarianceControlFailed,
  updateSalesAndInventoryTankStatusFailed,
  updateSalesAndInventoryTankStatusSuccess,
  updateSalesAndInventoryDetailSuccess,
  updateSalesAndInventoryDetailFail,
  getSaleAndInventoryFail,
  getSaleAndInventorySuccess,
  getSaleAndInventoryFilterSuccess,
  getSalesAuditLogSuccess,
  getSalesAuditLogFail,
  getDownloadSalesSuccess,
  getDownloadSalesFail,
  getDetailsSalesSuccess,
  getDetailsSalesFail,
  overrideStatusInActionColumnSuccess,
  overrideStatusInActionColumnFail,
} from "./actions"
import { call, put, takeLatest } from "redux-saga/effects"
import {
  getSaleAndInventoryVarianceControl,
  updateSaleAndInventoryVarianceControl,
  getSaleAndInventoryTankStatus,
  updateSaleAndInventoryTankStatusModal,
  getSaleAndInventory,
  getAuditLog,
  getDownloadSales,
  getSaleAndInventoryDetail,
  updateSaleAndInventoryDetail,
  getSaleAndInventoryByRecordId,
  updateSaleAndInventoryOverride,
} from "../../helpers/fakebackend_helper"

function* onGetSalesAndInventory({ params = {} }) {
  try {
    if (params.q && params.q === "()") {
      yield put(getSaleAndInventorySuccess("Data is not available"))
    } else {
      const response = yield call(getSaleAndInventory, params)
      yield put(getSaleAndInventorySuccess(Factory(response)))
      yield put(getSaleAndInventoryFilterSuccess(response.data.filters))
    }
  } catch (error) {
    yield put(getSaleAndInventoryFail(error))
  }
}

function* onGetSalesAndInventoryDetail({ recordId }) {
  try {
    const response = yield call(getSaleAndInventoryDetail, recordId)
    yield put(getDetailsSalesSuccess(response.data))
  } catch (error) {
    yield put(getDetailsSalesFail(error))
  }
}

function* onGetSalesAndInventoryVarianceControl({ date }) {
  try {
    const response = yield call(getSaleAndInventoryVarianceControl, date ? date : "")
    const { updated_at, updated_by, ...dataToFormat } = response.data
    const convertResponse = formatResponseDataVarianceControl(dataToFormat, "", [
      "id",
      "created_at",
    ])
    if (convertResponse) {
      convertResponse.date = response.data?.vc_created_at
      convertResponse.updated_at = updated_at
      convertResponse.updated_by = updated_by
      yield put(getSalesAndInventoryVarianceControlSuccess(convertResponse))
    } else {
      yield put(getSalesAndInventoryVarianceControlSuccess(response.data))
    }
  } catch (error) {
    yield put(getSalesAndInventoryVarianceControlFailed(error))
  }
}

function* onUpdateSalesAndInventoryVarianceControl({ data }) {
  try {
    const response = yield call(updateSaleAndInventoryVarianceControl, data)
    yield put(updateSaleAndInventoryVarianceControlSuccess(response))
  } catch (error) {
    yield put(updateSalesAndInventoryVarianceControlFailed(error))
  }
}

function* onGetSalesAndInventoryTankStatus({ date }) {
  try {
    // const response = yield call(getSaleAndInventoryTankStatus, date)
    const response = yield call(getSaleAndInventoryTankStatus, date ? date : "")
    yield put(getSalesAndInventoryTankStatusSuccess(response?.data))
  } catch (error) {
    yield put(getSalesAndInventoryTankStatusFailed(error))
  }
}
function* onUpdateSalesAndInventoryTankStatus({ payload }) {
  try {
    const response = yield call(updateSaleAndInventoryTankStatusModal, payload)
    yield put(updateSalesAndInventoryTankStatusSuccess(response))
  } catch (error) {
    yield put(updateSalesAndInventoryTankStatusFailed(error))
  }
}

function* onGetSalesAuditLog(params) {
  try {
    const response = yield call(getAuditLog, params.params)
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
    yield put(getDownloadSalesFail(error?.response?.data?.message))
  }
}

function* onUpdateSalesAndInventoryDetail({ recordId, payload }) {
  try {
    const response = yield call(updateSaleAndInventoryDetail, recordId, payload)
    if (response && response.status === 200) {
      // optimistic data
      const updateData = {
        data: { ...payload?.updateValue, trans_id: recordId },
      }
      yield put(updateSalesAndInventoryDetailSuccess(updateData))
    }
  } catch (error) {
    yield put(updateSalesAndInventoryDetailFail(error))
  }
}

function* onUpdateSalesAndInventoryOverride({ payload }) {
  try {
    yield call(
      updateSaleAndInventoryOverride,
      payload.trans_id,
      !(payload.override_status === "Override")
    )
    yield put(overrideStatusInActionColumnSuccess())
  } catch (err) {
    yield put(overrideStatusInActionColumnFail(err))
  }
}

function* saleAndInventorySaga() {
  yield takeLatest(GET_SALES_AND_INVENTORY_VARIANCE_CONTROL, onGetSalesAndInventoryVarianceControl)
  yield takeLatest(
    UPDATE_SALES_AND_INVENTORY_VARIANCE_CONTROL,
    onUpdateSalesAndInventoryVarianceControl
  )
  yield takeLatest(GET_SALES_AND_INVENTORY_TANK_STATUS, onGetSalesAndInventoryTankStatus)
  yield takeLatest(UPDATE_SALES_AND_INVENTORY_TANK_STATUS, onUpdateSalesAndInventoryTankStatus)
  yield takeLatest(GET_SALES_AUDITLOG, onGetSalesAuditLog)
  yield takeLatest(GET_DOWNLOAD_SALES, onGetDownloadSales)
  yield takeLatest(GET_SALES_AND_INVENTORY, onGetSalesAndInventory)
  yield takeLatest(GET_DETAIL_SALES, onGetSalesAndInventoryDetail)
  yield takeLatest(UPDATE_SALES_AND_INVENTORY_DETAIL, onUpdateSalesAndInventoryDetail)
  yield takeLatest(OVERRIDE_STATUS_IN_ACTION_COLUMN, onUpdateSalesAndInventoryOverride)
}

export default saleAndInventorySaga
