import { takeLatest, put, call, takeEvery, select } from "redux-saga/effects"
import Factory from "./factory"
import {
  GET_RETAIL_CUSTOMER,
  GET_RETAIL_AUDITLOG,
  GET_TABLE_INFORMATION,
  UPDATE_TABLE_INFORMATION,
  GET_DOWNLOAD_RETAIL_CUSTOMER,
  GET_UPLOAD_CSV,
  SET_UPLOAD_CSV,  
  GET_DOWNLOAD_CSV,
} from "./actionTypes"

import {
  getRetailCustomerSuccess,
  getRetailCustomerFail,
  getRetailAuditLogSuccess,
  getRetailAuditLogFail,
  getTableInformationSuccess,
  getTableInformationFail,
  updateTableInformationSuccess,
  updateTableInformationFail,
  resetRetailTableInformation,
  getRetailFilterSuccess,
  getDownloadRetailCustomerSuccess,
  getDownloadRetailCustomerFail,
  getUploadCsvSuccess,
  setUploadCsvSuccess,  
  getUploadCsvFail,
  getDownloadCsvSuccess,
  getDownloadCsvFail,    
} from "./actions"

import {
  getRetailCustomer,
  getAuditLog,
  getTableInformation,
  updateTableInformation,
  getDownloadRetailCustomer,
  getUploadCsv,
  getDownloadCsv,
} from "../../helpers/fakebackend_helper"

function* onGetRetailCustomer({ params = {} }) {
  try {
    if(params.q && params.q === "()"){
      yield put(getRetailCustomerSuccess('Data is not available'))
    } else {
      const response = yield call(getRetailCustomer, params)
      yield put(getRetailCustomerSuccess(Factory(response)))
      yield put(getRetailFilterSuccess(response.data.filters))
    }
  } catch (error) {
    yield put(getRetailCustomerFail(error))
  }
}

function* onGetDownloadRetailCustomer({ params = {} }) {
  try {
    const response = yield call(getDownloadRetailCustomer, params)
    yield put(getDownloadRetailCustomerSuccess(response.data))
  } catch (error) {
    yield put(getDownloadRetailCustomerFail(error))
  }
}

function* onGetUploadCsv({ params = {} }) {
  try {
    const response = yield call(getUploadCsv, params)
    yield put(getUploadCsvSuccess(response.data))
  } catch (error) {
    yield put(getUploadCsvFail(error))
  }
}

function* onSetUploadCsv() {
  yield put(setUploadCsvSuccess(null))
}

function* onGetDownloadCsv({ params = {} }) {
  try {
    const response = yield call(getDownloadCsv, params)
    yield put(getDownloadCsvSuccess(response.data))
  } catch (error) {
    yield put(getDownloadCsvFail(error))
  }
}

function* onGetRetailAuditLog(params) {
  try {
    const response = yield call(getAuditLog, params.params)
    yield put(getRetailAuditLogSuccess(response))
  } catch (error) {
    yield put(getRetailAuditLogFail(error))
  }
}

function* onGetTableInformation({ params }) {
  try {
    yield put(resetRetailTableInformation())
    const response = yield call(getTableInformation, params.ship_to_party)
    yield put(getTableInformationSuccess(response))
  } catch (error) {
    yield put(getTableInformationFail(error))
  }
}

function* onUpdateTableInformation({ payload }) {
  try {
    let preValue = yield select(store => store.retailCustomer.currentRetailDetail)
    const response = yield call(updateTableInformation, { updateValue: payload, preValue })
    yield put(updateTableInformationSuccess(response))
  } catch (error) {
    yield put(updateTableInformationFail(error))
  }
}

//last function
function* retailCustomerSaga() {
  yield takeLatest(GET_RETAIL_CUSTOMER, onGetRetailCustomer)
  yield takeLatest(GET_RETAIL_AUDITLOG, onGetRetailAuditLog)
  yield takeLatest(GET_TABLE_INFORMATION, onGetTableInformation)
  yield takeEvery(UPDATE_TABLE_INFORMATION, onUpdateTableInformation)
  yield takeLatest(GET_DOWNLOAD_RETAIL_CUSTOMER, onGetDownloadRetailCustomer)
  yield takeLatest(GET_UPLOAD_CSV, onGetUploadCsv)
  yield takeLatest(SET_UPLOAD_CSV, onSetUploadCsv)  
  yield takeLatest(GET_DOWNLOAD_CSV, onGetDownloadCsv)  
}

export default retailCustomerSaga