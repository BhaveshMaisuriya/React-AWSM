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
} from "./actionTypes"
import Factory, {
  formatResponseDataVarianceControl,
  DownloadData,
} from "./factory"
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
  getSaleAndInventoryByRecordId
} from "../../helpers/fakebackend_helper"

function* onGetSalesAndInventory({ params = {} }) {
  try {
    if(params.q && params.q === "()"){
      yield put(getSaleAndInventorySuccess('Data is not available'))
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
    const response = yield call(getSaleAndInventoryVarianceControl, date)
    const convertResponse = formatResponseDataVarianceControl(response.data,"vc_",["id","created_at"])
    if (convertResponse){
      convertResponse.date = response.data?.vc_created_at
      yield put(getSalesAndInventoryVarianceControlSuccess(convertResponse))
    }else{
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
    const response = yield call(getSaleAndInventory, {search_date: date})
    yield put(getSalesAndInventoryTankStatusSuccess(response?.data.tank_status_settings))
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
    /*Because response not return updated record. So we must call
     Api to get the new updated record*/
    if (response && response.status === 200) {
      const responseUpdatedRecord = yield call(
        getSaleAndInventoryDetail,
        recordId
      )
      responseUpdatedRecord.data.trans_id = recordId
      yield put(updateSalesAndInventoryDetailSuccess(responseUpdatedRecord))
    }
  } catch (error) {
    yield put(updateSalesAndInventoryDetailFail(error))
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
    GET_SALES_AND_INVENTORY_TANK_STATUS,
    onGetSalesAndInventoryTankStatus
  )
  onGetSalesAndInventoryTankStatus
  yield takeLatest(
    UPDATE_SALES_AND_INVENTORY_TANK_STATUS,
    onUpdateSalesAndInventoryTankStatus
  )
  yield takeLatest(GET_SALES_AUDITLOG, onGetSalesAuditLog)
  yield takeLatest(GET_DOWNLOAD_SALES, onGetDownloadSales)
  yield takeLatest(GET_SALES_AND_INVENTORY, onGetSalesAndInventory)
  yield takeLatest(GET_DETAIL_SALES, onGetSalesAndInventoryDetail)
  yield takeLatest(
    UPDATE_SALES_AND_INVENTORY_DETAIL,
    onUpdateSalesAndInventoryDetail
  )
  yield takeLatest(
    UPDATE_SALES_AND_INVENTORY_VARIANCE_CONTROL,
    onUpdateSalesAndInventoryVarianceControl
  )
}

export default saleAndInventorySaga
