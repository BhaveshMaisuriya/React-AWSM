import { takeLatest, put, call, takeEvery } from "redux-saga/effects"
import Factory, { mergeFilterValues } from "./factory"
import {
  GET_RETAIL_CUSTOMER,
  GET_RETAIL_AUDITLOG,
  GET_TABLE_INFORMATION,
  UPDATE_TABLE_INFORMATION,
  GET_RETAIL_FILTER,
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
  getRetailFilterSuccess,
  getRetailFilterFail,
} from "./actions"

import {
  getRetailCustomer,
  getRetailAuditLog,
  getTableInformation,
  updateTableInformation,
  getRetailFilter,
} from "../../helpers/fakebackend_helper"

function* onGetRetailCustomer({ params = {} }) {
  try {
    const response = yield call(getRetailCustomer, params)
    yield put(getRetailCustomerSuccess(Factory(response)))
  } catch (error) {
    yield put(getRetailCustomerFail(error))
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

function* fetchTableInformation() {
  try {
    const response = yield call(getTableInformation)
    yield put(getTableInformationSuccess(response))
  } catch (error) {
    yield put(getTableInformationFail(error))
  }
}

function* onUpdateTableInformation({ payload: event }) {
  try {
    const response = yield call(updateTableInformation, event)
    yield put(updateTableInformationSuccess(response))
  } catch (error) {
    yield put(updateTableInformationFail(error))
  }
}

function* onGetRetailFilter({ params = {} }) {
  try {
    const response = yield call(getRetailFilter, params)
    yield put(
      getRetailFilterSuccess(mergeFilterValues(response, params.search_fields))
    )
    // yield put(getRetailFilterSuccess(response))
  } catch (error) {
    yield put(getRetailFilterFail(error))
  }
}

//last function
function* retailCustomerSaga() {
  yield takeLatest(GET_RETAIL_CUSTOMER, onGetRetailCustomer)
  yield takeLatest(GET_RETAIL_AUDITLOG, onGetRetailAuditLog)
  yield takeLatest(GET_TABLE_INFORMATION, fetchTableInformation)
  yield takeEvery(UPDATE_TABLE_INFORMATION, onUpdateTableInformation)
  yield takeLatest(GET_RETAIL_FILTER, onGetRetailFilter)
}

export default retailCustomerSaga
