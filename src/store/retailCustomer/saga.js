import { takeLatest, put, call, takeEvery } from "redux-saga/effects"
import Factory from "./factory"
import {
  GET_RETAIL_CUSTOMER,
  GET_RETAIL_AUDITLOG,
  GET_TABLE_INFORMATION,
  UPDATE_TABLE_INFORMATION,
  GET_DOWNLOAD_RETAIL_CUSTOMER,
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
} from "./actions"

import {
  getRetailCustomer,
  getRetailAuditLog,
  getTableInformation,
  updateTableInformation,
  getDownloadRetailCustomer,
} from "../../helpers/fakebackend_helper"

function* onGetRetailCustomer({ params = {} }) {
  try {
    const response = yield call(getRetailCustomer, params)
    yield put(getRetailCustomerSuccess(Factory(response)))
    yield put(getRetailFilterSuccess(response.data.filters))
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

function* onGetRetailAuditLog() {
  try {
    const response = yield call(getRetailAuditLog)
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
    const response = yield call(updateTableInformation, payload)
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
}

export default retailCustomerSaga
