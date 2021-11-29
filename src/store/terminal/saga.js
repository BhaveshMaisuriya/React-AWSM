import { takeLatest, put, call, takeEvery, select } from "redux-saga/effects"
import Factory from "./factory"
import {
  GET_TERMINAL,
  GET_TERMINAL_AUDITLOG,
  GET_TERMINAL_TABLE_INFORMATION,
  UPDATE_TERMINAL_TABLE_INFORMATION,
  GET_DOWNLOAD_TERMINAL,
} from "./actionTypes"

import {
  getTerminalSuccess,
  getTerminalFail,
  getTerminalAuditLogSuccess,
  getTerminalAuditLogFail,
  getTerminalTableInformationSuccess,
  getTerminalTableInformationFail,
  updateTerminalTableInformationSuccess,
  updateTerminalTableInformationFail,
  getTerminalFilterSuccess,
  getDownloadTerminalSuccess,
  getDownloadTerminalFail
} from "./actions"

import {
  getTerminal,
  getAuditLog,
  getTerminalTableInformation,
  getDownloadTerminal,
  updateTerminalDetail,
} from "../../helpers/fakebackend_helper"

function* onGetTerminal({ params = {} }) {
  try {
    if(params.q && params.q === "()"){
      yield put(getTerminalSuccess('Data is not available'))
    } else {
      const response = yield call(getTerminal, params)
      yield put(getTerminalSuccess(Factory(response)))
      yield put(getTerminalFilterSuccess(response.data.filters))
    }
  } catch (error) {
    yield put(getTerminalFail(error))
  }
}

function* onGetDownloadTerminal({ params = {} }) {
  try {
    const response = yield call(getDownloadTerminal, params)
    yield put(getDownloadTerminalSuccess(response.data))
  } catch (error) {
    yield put(getDownloadTerminalFail(error))
  }
}

function* onGetTerminalAuditLog(params) {
  try {
    const response = yield call(getAuditLog, params.params)
    yield put(getTerminalAuditLogSuccess(response))
  } catch (error) {
    yield put(getTerminalAuditLogFail(error))
  }
}

function* fetchTableInformation({ code }) {
  try {
    const response = yield call(getTerminalTableInformation, code)
    yield put(getTerminalTableInformationSuccess(response))
  } catch (error) {
    yield put(getTerminalTableInformationFail(error))
  }
}

function* onUpdateTableInformation({ payload: event }) {
  try {
    const preValue = yield select(store => store.terminal.currentTerminal)
    const response = yield call(updateTerminalDetail, { updateValue: event.body, preValue })
    yield put(updateTerminalTableInformationSuccess(response))
  } catch (error) {
    yield put(updateTerminalTableInformationFail(error))
  }
}

//last function
function* terminalSaga() {
  yield takeLatest(GET_TERMINAL, onGetTerminal)
  yield takeLatest(GET_TERMINAL_AUDITLOG, onGetTerminalAuditLog)
  yield takeLatest(GET_TERMINAL_TABLE_INFORMATION, fetchTableInformation)
  yield takeEvery(UPDATE_TERMINAL_TABLE_INFORMATION, onUpdateTableInformation)
  yield takeEvery(GET_DOWNLOAD_TERMINAL, onGetDownloadTerminal)
}

export default terminalSaga