import { put, call, takeEvery } from "redux-saga/effects"
import factory from "./factory"
import {
  GET_SLA_AUDITLOG,
  GET_SLA_ITEMS,
  UPDATE_SLA_DETAIL,
  UPDATE_SLA_SECTION,
  UPDATE_SECTION_TAB,
  DELETE_SLA_SECTION,
  CREATE_SLA_SECTION,
  DELETE_SLA_RECORD,
  CREATE_SLA_RECORD,
  GET_SLA_ATTACHMENTS,
  GET_SLA_PDFS,
} from "./actionTypes"

import {
    getSlaItemsSuccess,
    getSlaItemsFail,
    getSlaAuditLogSuccess,
    getSlaAuditLogFail,
    updateSlaDetailSuccess,
    updateSlaDetailFail,
    updateSLASectionSuccess,
    updateSLASectionFail,
    updateSectionTabSuccess,
    updateSectionTabFail,
    deleteSLASectionSuccess,
    deleteSLASectionFail,
    createSLASectionSuccess,
    createSLASectionFail,
    createSLARecordSuccess,
    createSLARecordFail,
    deleteSLARecordSuccess,
    deleteSLARecordFail,
    getSLAAttchmentsSuccess,
    getSLAAttchmentsFail,
    getSLAPdfsSuccess,
    getSLAPdfsFail,    
} from "./actions"

import {
  getSlaItems,
  getAuditLog,
  updateSlaItem,
  updateSLASection,
  getSLASection,
  deleteSLASection,
  createSLASection,
  createSLATableRecord,
  deleteSLARecord,
  updateSLARecord,
  getAttchments,
  getSLAPdfs
} from "../../helpers/fakebackend_helper"

function* onGetSLAAuditLog(params) {
  try {
    const response = yield call(getAuditLog, params.params)
    yield put(getSlaAuditLogSuccess(response))
  } catch (error) {
    yield put(getSlaAuditLogFail(error))
  }
}

function* onGetSLAAttachments(params) {
  try {
    const response = yield call(getAttchments, params.params)
    yield put(getSLAAttchmentsSuccess(response))
  } catch (error) {
    yield put(getSLAAttchmentsFail(error.response))
  }
}

function* onGetSLAPDFs() {
  try {
    const response = yield call(getSLAPdfs)
    yield put(getSLAPdfsSuccess(response.data))
  } catch (error) {
    yield put(getSLAPdfsFail(error))
  }
}

function* onGetSLAItems({ params = {} }) {
  try {
    if(params.q && params.q === "()"){
      yield put(getSlaItemsSuccess('Data is not available'))
    } else {
      const response = yield call(getSlaItems, params)
      yield put(getSlaItemsSuccess(factory(response)))
    }
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

function* onUpdateSLASection({ params }) {
  try {
    yield call(updateSLASection, params)
    const response = yield call(getSLASection, params)
    yield put(updateSLASectionSuccess({ category: params.category, title: params.title, data: response, action: params.action }))
  } catch (error) {
    yield put(updateSLASectionFail(error))
  }
}

function* onDeleteSLARecord({ params }){
  try {
    yield call(deleteSLARecord, params)
    const response = yield call(getSLASection, params)
    yield put(deleteSLARecordSuccess({ category: params.category, title: params.title, data: response }))
  } catch (error) {
    yield put(deleteSLARecordFail(error))
  }
}

function* onCreateSLASection({ params }){
  try {
    yield call(createSLASection, params)
    const response = yield call(getSLASection, params)
    yield put(createSLASectionSuccess({ category: params.category, title: params.data.title, data: response }))
  } catch (error) {
    yield put(createSLASectionFail(error))
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

function* onDeleteSLASection({ params }){
  try {
    yield call(deleteSLASection, params)
    const response = yield call(getSLASection, params)
    yield put(deleteSLASectionSuccess({ category: params.category, title: params.title, data: response }))
  } catch (error) {
    yield put(deleteSLASectionFail(error))
  }
}

function* onCreateSLARecord({ params }){
  try {
    yield call(createSLATableRecord, params)
    const response = yield call(getSLASection, params)
    yield put(createSLARecordSuccess({ category: params.category, tabName: params.tabName, data: response }))
  } catch (error) {
    yield put(createSLARecordFail(error))
  }
}

function* onUpdateSLARecord({ params }){
  try {
    yield call(updateSLARecord, params)
    const response = yield call(getSLASection, params)
    yield put(updateSlaDetailSuccess({ category: params.category, tabName: params.tabName, data: response }))
  } catch (error) {
    yield put(updateSlaDetailFail(error))
  }
}

function* SLASaga() {
  yield takeEvery(GET_SLA_AUDITLOG, onGetSLAAuditLog)
  yield takeEvery(GET_SLA_ITEMS, onGetSLAItems)
  yield takeEvery(UPDATE_SLA_DETAIL, onUpdateSLARecord)
  yield takeEvery(UPDATE_SLA_SECTION, onUpdateSLASection)
  yield takeEvery(DELETE_SLA_RECORD, onDeleteSLARecord)
  yield takeEvery(CREATE_SLA_SECTION, onCreateSLASection)
  yield takeEvery(UPDATE_SECTION_TAB, onUpdateSectionTab)
  yield takeEvery(CREATE_SLA_RECORD, onCreateSLARecord)
  yield takeEvery(DELETE_SLA_SECTION, onDeleteSLASection)
  yield takeEvery(GET_SLA_ATTACHMENTS, onGetSLAAttachments)
  yield takeEvery(GET_SLA_PDFS, onGetSLAPDFs)
}

export default SLASaga