import { takeLatest, put, call, takeEvery } from "redux-saga/effects"
import Factory from "./factory"
import { GET_RETAIL_CUSTOMER, GET_COMMERCIAL_AUDITLOG } from "./actionTypes"

import {
  getRetailCustomerSuccess,
  getRetailCustomerFail,
  getCommercialAuditLogSuccess,
  getCommercialAuditLogFail,
} from "./actions"

import {
  getRetailCustomer,
  getCommercialAuditLog,
} from "../../helpers/fakebackend_helper"

function* onGetRetailCustomer({ params = {} }) {
  try {
    const response = yield call(getRetailCustomer, params)
    // console.log(params, Factory(response))
    yield put(getRetailCustomerSuccess(Factory(response)))
  } catch (error) {
    yield put(getRetailCustomerFail(error))
  }
}

function* onGetCommercialAuditLog() {
  try {
    const response = yield call(getCommercialAuditLog)
    yield put(getCommercialAuditLogSuccess(response))
  } catch (error) {
    yield put(getCommercialAuditLogFail(error))
  }
}

function* commercialCustomerSaga() {
  yield takeLatest(GET_RETAIL_CUSTOMER, onGetRetailCustomer)
  yield takeEvery(GET_COMMERCIAL_AUDITLOG, onGetCommercialAuditLog)
}

export default commercialCustomerSaga
