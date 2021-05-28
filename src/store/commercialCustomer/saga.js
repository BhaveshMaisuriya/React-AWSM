import { takeLatest, put, call, takeEvery } from "redux-saga/effects"
import Factory, { mergeFilterValues, DownloadData } from "./factory"
import {
  GET_COMMERCIAL_CUSTOMER,
  GET_DOWNLOAD_COMMERCIAL_CUSTOMER,
  GET_COMMERCIAL_AUDITLOG,
  GET_COMMERCIAL_FILTER,
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
  getCommercialFilterFail,
  getCommercialTableInformationFail,
  getCommercialTableInformationSuccess,
  resetCommercialTableInformation,
  updateCommercialTableInformationSuccess,
  updateCommercialTableInformationFail,
} from "./actions"

import {
  getCommercialCustomer,
  getDownloadCommercialCustomer,
  getCommercialAuditLog,
  getCommercialFilter,
  getCommercialDetail,
  putCommercialDetail,
} from "../../helpers/fakebackend_helper"

function* onGetCommercialCustomer({ params = {} }) {
  try {
    const response = yield call(getCommercialCustomer, params)
    yield put(getCommercialCustomerSuccess(Factory(response.data)))
  } catch (error) {
    yield put(getCommercialCustomerFail(error))
  }
}

function* onGetDownloadCommercialCustomer({ params = {} }) {
  try {
    const response = yield call(getDownloadCommercialCustomer, params)
    yield put(getDownloadCommercialCustomerSuccess(DownloadData(response.data)))
  } catch (error) {
    yield put(getDownloadCommercialCustomerFail(error))
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
    yield put(
      getCommercialFilterSuccess(
        mergeFilterValues(response, params.search_fields)
      )
    )
  } catch (error) {
    yield put(getCommercialFilterFail(error))
  }
}

function * onGetCommercialTableInformation({ params }) {
  try {
    yield put(resetCommercialTableInformation())
    const response = yield call(getCommercialDetail, params.ship_to_party)
    yield put(getCommercialTableInformationSuccess(response))
  } catch (error) {
    yield put(getCommercialTableInformationFail(error))
  }
}

function * onPutCommercialTableInformation({ data }) {
  try {
    yield call(putCommercialDetail, data)
    yield put(updateCommercialTableInformationSuccess())
  } catch (error) {
    yield put(updateCommercialTableInformationFail(error))
  }
}

function* commercialCustomerSaga() {
  yield takeLatest(GET_COMMERCIAL_CUSTOMER, onGetCommercialCustomer)
  yield takeEvery(GET_COMMERCIAL_AUDITLOG, onGetCommercialAuditLog)
  yield takeEvery(GET_COMMERCIAL_FILTER, onGetCommercialFIlter)
  yield takeLatest(GET_COMMERCIAL_TABLE_INFORMATION, onGetCommercialTableInformation)
  yield takeLatest(UPDATE_COMMERCIAL_TABLE_INFORMATION, onPutCommercialTableInformation);
  yield takeLatest(GET_DOWNLOAD_COMMERCIAL_CUSTOMER, onGetDownloadCommercialCustomer)
}

export default commercialCustomerSaga
