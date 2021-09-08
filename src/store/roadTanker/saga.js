import { takeLatest, put, call, takeEvery, select } from "redux-saga/effects"
import { Factory } from "./factory"
import {
  GET_DOWNLOAD_ROAD_TANKER,
  GET_ROADTANKER_AUDITLOG,
  GET_ROADTANKER_FILTER,
  GET_TABLE_INFORMATION,
  UPDATE_TABLE_INFORMATION,
  GET_ROAD_TANKER,
  GET_ROAD_TANKER_DETAIL,
  UPDATE_ROAD_TANKER_DETAIL
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
  getRoadTankeDetailSuccess,
  getRoadTankerDetailFail,
  updateRoadTankerDetailSuccess,
  updateRoadTankerDetailFail,
} from "./actions"

import {
  getRoadTanker,
  getRoadTankerAuditLog,
  getTableInformation,
  updateTableInformation,
  getDownloadRoadTanker,
  getRoadTankerDetail,
  updateRoadTankerDetail
} from "../../helpers/fakebackend_helper"

function* onGetRoadTanker({ params = {} }) {
  try {
    if(params.q && params.q === "()"){
      yield put(getRoadTankerSuccess('Data is not available'))
    } else {
      const response = yield call(getRoadTanker, params)
      yield put(getRoadTankerSuccess(response.data))
      yield put(getRoadTankerFilterSuccess(response.data.filters))
    }
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

function* onGetRoadTankerDetail({ params }) {
  try {
    const response = yield call(getRoadTankerDetail, params)
    yield put(getRoadTankeDetailSuccess(response))
  } catch (error) {
    yield put(getRoadTankerDetailFail(error))
  }
}

function* onUpdateRoadTankerDetail({ params }) {
  try {
    const preValue = yield select(store => store.roadTanker.currentRoadTanker.data)
    const response = yield call(updateRoadTankerDetail, { ...params, data: { preValue, updateValue: params.data}})
    yield put(updateRoadTankerDetailSuccess(response))
  } catch (error) {
    yield put(updateRoadTankerDetailFail(error))
  }
}

//last function
function* roadTankerSaga() {
  yield takeLatest(GET_ROAD_TANKER, onGetRoadTanker)
  yield takeLatest(GET_ROADTANKER_AUDITLOG, onGetRoadTankerAuditLog)
  yield takeLatest(GET_TABLE_INFORMATION, fetchTableInformation)
  yield takeEvery(UPDATE_TABLE_INFORMATION, onUpdateTableInformation)
  // yield takeLatest(GET_ROADTANKER_FILTER, onGetRoadTankerFilter)
  yield takeLatest(GET_DOWNLOAD_ROAD_TANKER, onGetDownloadRoadTanker)
  yield takeLatest(GET_ROAD_TANKER_DETAIL, onGetRoadTankerDetail)
  yield takeLatest(UPDATE_ROAD_TANKER_DETAIL, onUpdateRoadTankerDetail)
}

export default roadTankerSaga
