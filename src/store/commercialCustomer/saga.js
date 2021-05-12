import { takeLatest, put, call, takeEvery } from "redux-saga/effects"
import Factory, { mergeFilterValues } from "./factory"
import {
  GET_COMMERCIAL_CUSTOMER,
  GET_COMMERCIAL_AUDITLOG,
  GET_COMMERCIAL_FILTER,
} from "./actionTypes"

import {
  getCommercialCustomerSuccess,
  getCommercialCustomerFail,
  getCommercialAuditLogSuccess,
  getCommercialAuditLogFail,
  getCommercialFilterSuccess,
  getCommercialFilterFail
} from "./actions"

import {
  getCommercialCustomer,
  getCommercialAuditLog,
  getCommercialFilter
} from "../../helpers/fakebackend_helper"

function* onGetCommercialCustomer({ params = {} }) {
  try {
    const response = yield call(getCommercialCustomer, params)
    yield put(getCommercialCustomerSuccess(Factory(response)))
  } catch (error) {
    yield put(getCommercialCustomerFail(error))
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

function* onGetCommercialFIlter({ params = {} }) {
  try {
    const response = yield call(getCommercialFilter)
    console.log(mergeFilterValues(response, params.search_fields))
    yield put(
      getCommercialFilterSuccess(
        mergeFilterValues(response, params.search_fields)
      )
    )
  } catch (error) {
    yield put(getCommercialFilterFail(error))
  }
}

function* commercialCustomerSaga() {
  yield takeLatest(GET_COMMERCIAL_CUSTOMER, onGetCommercialCustomer)
  yield takeEvery(GET_COMMERCIAL_AUDITLOG, onGetCommercialAuditLog)
  yield takeEvery(GET_COMMERCIAL_FILTER, onGetCommercialFIlter)
}

export default commercialCustomerSaga
