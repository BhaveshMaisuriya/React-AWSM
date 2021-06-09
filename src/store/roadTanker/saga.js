import { takeLatest, put, call, takeEvery } from "redux-saga/effects"
import { Factory } from "./factory"
import {
  GET_DOWNLOAD_ROAD_TANKER,
  GET_ROADTANKER_AUDITLOG,
  GET_ROADTANKER_FILTER,
  GET_TABLE_INFORMATION,
  UPDATE_TABLE_INFORMATION,
  GET_ROAD_TANKER
} from "./actionTypes"

import {
  getRoadTankerSuccess,
  getRoadTankerFail,
  getRoadTankerAuditLogSuccess,
  getRoadTankerAuditLogFail,
  getTableInformationSuccess,
  getTableInformationFail,
  updateTableInformationSuccess,
  updateTableInformationFail,
  getRoadTankerFilterSuccess,
  // getRoadTankerFilterFail,
  getDownloadRoadTankerSuccess,
  getDownloadRoadTankerFail,
} from "./actions"

import {
  getRoadTanker,
  getRoadTankerAuditLog,
  getTableInformation,
  updateTableInformation,
  getDownloadRoadTanker,
  // getRoadTankerFilter,
} from "../../helpers/fakebackend_helper"

function* onGetRoadTanker({ params = {} }) {
  try {
    const response = yield call(getRoadTanker, params)
    yield put(getRoadTankerSuccess(response.data))
    yield put(getRoadTankerFilterSuccess(response.data.filters))
  } catch (error) {
    yield put(getRoadTankerFail(error))
  }
}

function* onGetDownloadRoadTanker({ params = {} }) {
  try {
    const response = yield call(getDownloadRoadTanker, params)
    yield put(getDownloadRoadTankerSuccess(response.data))
  } catch (error) {
    yield put(getDownloadRoadTankerFail(error))
  }
}

function* onGetRoadTankerAuditLog() {
  try {
    const response = yield call(getRoadTankerAuditLog)
    yield put(getRoadTankerAuditLogSuccess(response))
  } catch (error) {
    yield put(getRoadTankerAuditLogFail(error))
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

// function* onGetRoadTankerFilter({ params = {} }) {
//   try {
//     const response = yield call(getRoadTankerFilter, params)
//     yield put(
//       getRoadTankerFilterSuccess(
//         mergeFilterValues(response, params.search_fields)
//       )
//     )
//   } catch (error) {
//     yield put(getRoadTankerFilterFail(error))
//   }
// }

//last function
function* roadTankerSaga() {
  yield takeLatest(GET_ROAD_TANKER, onGetRoadTanker)
  yield takeLatest(GET_ROADTANKER_AUDITLOG, onGetRoadTankerAuditLog)
  yield takeLatest(GET_TABLE_INFORMATION, fetchTableInformation)
  yield takeEvery(UPDATE_TABLE_INFORMATION, onUpdateTableInformation)
  // yield takeLatest(GET_ROADTANKER_FILTER, onGetRoadTankerFilter)
  yield takeLatest(GET_DOWNLOAD_ROAD_TANKER, onGetDownloadRoadTanker)
}

export default roadTankerSaga