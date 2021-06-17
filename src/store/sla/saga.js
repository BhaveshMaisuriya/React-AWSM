import { put, call, takeEvery } from "redux-saga/effects"
import factory from "./factory"
import {
    GET_SLA_AUDITLOG,
    GET_SLA_ITEMS,
    UPDATE_SLA_DETAIL,
    UPDATE_SLA_SECTION_NOTE,
    DELETE_SLA_DETAIL,
    ADD_NEW_SECTION_TAB,
    UPDATE_SECTION_TAB,
    DELETE_SECTION_TAB
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
    deleteSLADetailSuccess,
    deleteSLADetailFail,
    addNewSectionTabSuccess,
    addNewSectionTabFail,
    updateSectionTabSuccess,
    updateSectionTabFail,
    deleteSectionTabSuccess,
    deleteSectionTabFail
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

function* onDeleteSLADetail(action){
  try {
    // const response = yield call(deleteSLADetail, action.params)
    yield put(deleteSLADetailSuccess(response))
  } catch (error) {
    yield put(deleteSLADetailFail(error))
  }
}

function* onAddNewSectionTab(action){
  try {
    // const response = yield call(deleteSLADetail, action.params)
    yield put(addNewSectionTabSuccess())
  } catch (error) {
    yield put(addNewSectionTabFail(error))
  }
}

function* onUpdateSectionTab(action){
  try {
    // const response = yield call(deleteSLADetail, action.params)
    yield put(updateSectionTabSuccess())
  } catch (error) {
    yield put(updateSectionTabFail(error))
  }
}

function* onDeleteSectionTab(action){
  try {
    // const response = yield call(deleteSLADetail, action.params)
    yield put(deleteSectionTabSuccess())
  } catch (error) {
    yield put(deleteSectionTabFail(error))
  }
}

function* SLASaga() {
  yield takeEvery(GET_SLA_AUDITLOG, onGetSLAAuditLog)
  yield takeEvery(GET_SLA_ITEMS, onGetSLAItems)
  yield takeEvery(UPDATE_SLA_DETAIL, onUpdateSLAItem)
  yield takeEvery(UPDATE_SLA_SECTION_NOTE, onUpdateSLASectionNote)
  yield takeEvery(DELETE_SLA_DETAIL, onDeleteSLADetail)
  yield takeEvery(ADD_NEW_SECTION_TAB, onAddNewSectionTab)
  yield takeEvery(UPDATE_SECTION_TAB, onUpdateSectionTab)
  yield takeEvery(DELETE_SECTION_TAB, onDeleteSectionTab)
}

export default SLASaga
