import { takeLatest, put, call, takeEvery } from "redux-saga/effects"
import Factory, { mergeFilterValues } from "./factory"
import {
  GET_COMMERCIAL_CUSTOMER,
  GET_DOWNLOAD_COMMERCIAL_CUSTOMER,
  GET_COMMERCIAL_AUDITLOG,
  GET_COMMERCIAL_TABLE_INFORMATION,
  UPDATE_COMMERCIAL_TABLE_INFORMATION,
  // GET_COMMERCIAL_FILTER,
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
  // getCommercialFilterFail,
} from "./actions"

import {
  getCommercialCustomer,
  getDownloadCommercialCustomer,
  getCommercialAuditLog,
  getCommercialDetail,
  putCommercialDetail,
  // getCommercialFilter,
} from "../../helpers/fakebackend_helper"

function* onGetCommercialCustomer({ params = {} }) {
  try {
    const response = yield call(getCommercialCustomer, params)
    yield put(getCommercialCustomerSuccess(Factory(response)))
    yield put(getCommercialFilterSuccess(response.data.filters))
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

function* onGetCommercialAuditLog() {
  try {
    const response = yield call(getCommercialAuditLog)
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
    yield call(putCommercialDetail, data)
    yield put(updateCommercialTableInformationSuccess())
  } catch (error) {
    yield put(updateCommercialTableInformationFail(error))
  }
}

// function* onGetCommercialFIlter({ params = {} }) {
//   try {
//     const response = yield call(getCommercialFilter)
//     yield put(
//       getCommercialFilterSuccess(
//         mergeFilterValues(response, params.search_fields)
//       )
//     )
//   } catch (error) {
//     yield put(getCommercialFilterFail(error))
//   }
// }

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
  // yield takeEvery(GET_COMMERCIAL_FILTER, onGetCommercialFIlter)
  yield takeLatest(GET_DOWNLOAD_COMMERCIAL_CUSTOMER, onGetDownloadCommercialCustomer)
  }

export default commercialCustomerSaga