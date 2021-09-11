import { takeLatest, put, call, takeEvery, select } from "redux-saga/effects"
import Factory from "./factory"
import {
  GET_COMMERCIAL_CUSTOMER,
  GET_DOWNLOAD_COMMERCIAL_CUSTOMER,
  GET_COMMERCIAL_AUDITLOG,
  GET_COMMERCIAL_TABLE_INFORMATION,
  UPDATE_COMMERCIAL_TABLE_INFORMATION,
} from "./actionTypes"

import {
  getCommercialCustomerSuccess,
  getCommercialCustomerFail,
  getDownloadCommercialCustomerSuccess,
  getDownloadCommercialCustomerFail,
  getCommercialAuditLogSuccess,
  getCommercialAuditLogFail,
  getCommercialFilterSuccess,
  getCommercialTableInformationFail,
  getCommercialTableInformationSuccess,
  resetCommercialTableInformation,
  updateCommercialTableInformationSuccess,
  updateCommercialTableInformationFail,
} from "./actions"

import {
  getCommercialCustomer,
  getDownloadCommercialCustomer,
  getAuditLog,
  getCommercialDetail,
  putCommercialDetail,
} from "../../helpers/fakebackend_helper"

function* onGetCommercialCustomer({ params = {} }) {
  try {
    if(params.q && params.q === "()"){
      yield put(getCommercialCustomerSuccess('Data is not available'))
    } else {
      const response = yield call(getCommercialCustomer, params)
      yield put(getCommercialCustomerSuccess(Factory(response)))
      yield put(getCommercialFilterSuccess(response.data.filters))
    }
  } catch (error) {
    yield put(getCommercialCustomerFail(error))
  }
}
// download excel
function* onGetDownloadCommercialCustomer({ params = {} }) {
  try {
    const response = yield call(getDownloadCommercialCustomer, params)
    yield put(getDownloadCommercialCustomerSuccess(response.data))
  } catch (error) {
    yield put(getDownloadCommercialCustomerFail(error))
  }
}

function* onGetCommercialAuditLog(params) {
  try {
    const response = yield call(getAuditLog, params.params)
    yield put(getCommercialAuditLogSuccess(response))
  } catch (error) {
    yield put(getCommercialAuditLogFail(error))
  }
}

function* onGetCommercialTableInformation({ params }) {
  try {
    yield put(resetCommercialTableInformation())
    const response = yield call(getCommercialDetail, params.ship_to_party)
    yield put(getCommercialTableInformationSuccess(response))
  } catch (error) {
    yield put(getCommercialTableInformationFail(error))
  }
}

function* onPutCommercialTableInformation({ data }) {
  try {
    const preValue = yield select(store => store.commercialCustomer.currentCommercialDetail)
    yield call(putCommercialDetail, { updateValue: data, preValue })
    yield put(updateCommercialTableInformationSuccess())
  } catch (error) {
    yield put(updateCommercialTableInformationFail(error))
  }
}

function* commercialCustomerSaga() {
  yield takeLatest(GET_COMMERCIAL_CUSTOMER, onGetCommercialCustomer)
  yield takeEvery(GET_COMMERCIAL_AUDITLOG, onGetCommercialAuditLog)
  yield takeLatest(
    GET_COMMERCIAL_TABLE_INFORMATION,
    onGetCommercialTableInformation
  )
  yield takeLatest(
    UPDATE_COMMERCIAL_TABLE_INFORMATION,
    onPutCommercialTableInformation
  )
  yield takeLatest(
    GET_DOWNLOAD_COMMERCIAL_CUSTOMER,
    onGetDownloadCommercialCustomer
  )
}

export default commercialCustomerSaga