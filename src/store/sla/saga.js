import { put, call, takeEvery } from "redux-saga/effects"
import factory from "./factory"
import {
    GET_SLA_AUDITLOG,
    GET_SLA_ITEMS,
    UPDATE_SLA_DETAIL,
    UPDATE_SLA_SECTION_NOTE,
} from "./actionTypes"

import {
    getSlaItemsSuccess,
    getSlaItemsFail,
    getSlaAuditLogSuccess,
    getSlaAuditLogFail,
    updateSlaDetailSuccess,
    updateSlaDetailFail,
    updateSlaSectionNoteSuccess,
    updateSlaSectionNoteFail,
} from "./actions"

import {
  getSlaItems,
  getSlaAuditLog,
  updateSlaItem,
  updateSlaSectionNote,
} from "../../helpers/fakebackend_helper"

function* onGetSLAAuditLog() {
  try {
    const response = yield call(getSlaAuditLog)
    yield put(getSlaAuditLogSuccess(response))
  } catch (error) {
    yield put(getSlaAuditLogFail(error))
  }
}

function* onGetSLAItems({ params = {} }) {
  try {
    const response = yield call(getSlaItems, params)
    yield put(getSlaItemsSuccess(factory(response)))
  } catch (error) {
    yield put(getSlaItemsFail(error))
  }
}


function* onUpdateSLAItem(action) {
  try {
    const response = yield call(updateSlaItem, action.params)
    yield put(updateSlaDetailSuccess(response))
  } catch (error) {
    yield put(updateSlaDetailFail(error))
  }
}

function* onUpdateSLASectionNote({ params }) {
  try {
    console.log({params})
    const response = yield call(updateSlaSectionNote, params)
    yield put(updateSlaSectionNoteSuccess(response))
  } catch (error) {
    yield put(updateSlaSectionNoteFail(error))
  }
}

function* SLASaga() {
  yield takeEvery(GET_SLA_AUDITLOG, onGetSLAAuditLog)
  yield takeEvery(GET_SLA_ITEMS, onGetSLAItems)
  yield takeEvery(UPDATE_SLA_DETAIL, onUpdateSLAItem)
  yield takeEvery(UPDATE_SLA_SECTION_NOTE, onUpdateSLASectionNote)
}

export default SLASaga
