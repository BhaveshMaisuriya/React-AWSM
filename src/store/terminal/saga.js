import { takeLatest, put, call, takeEvery } from "redux-saga/effects"
import Factory, { mergeFilterValues } from "./factory"
import {
  GET_TERMINAL,
  GET_TERMINAL_AUDITLOG,
  GET_TERMINAL_TABLE_INFORMATION,
  UPDATE_TABLE_INFORMATION,
  // GET_TERMINAL_FILTER,
  GET_DOWNLOAD_TERMINAL,
} from "./actionTypes"

import {
  getTerminalSuccess,
  getTerminalFail,
  getTerminalAuditLogSuccess,
  getTerminalAuditLogFail,
  getTerminalTableInformationSuccess,
  getTerminalTableInformationFail,
  updateTableInformationSuccess,
  updateTableInformationFail,
  getTerminalFilterSuccess,
  // getTerminalFilterFail,
  getDownloadTerminalSuccess,
  getDownloadTerminalFail
} from "./actions"

import {
  getTerminal,
  getTerminalAuditLog,
  getTerminalTableInformation,
  updateTableInformation,
  getDownloadTerminal,
  // getTerminalFilter,
} from "../../helpers/fakebackend_helper"

function* onGetTerminal({ params = {} }) {
  try {
    const response = yield call(getTerminal, params)
    yield put(getTerminalSuccess(Factory(response)))
    yield put(getTerminalFilterSuccess(response.data.filters))
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

function* onGetTerminalAuditLog() {
  try {
    const response = yield call(getTerminalAuditLog)
    yield put(getTerminalAuditLogSuccess(response))
  } catch (error) {
    yield put(getTerminalAuditLogFail(error))
  }
}

function* onGetTerminalTableInformation({ params }) {
  try {
    const response = yield call(getTerminalTableInformation, params.code)
    yield put(getTerminalTableInformationSuccess(response))
  } catch (error) {
    yield put(getTerminalTableInformationFail(error))
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

// function* onGetTerminalFilter({ params = {} }) {
//   try {
//     const response = yield call(getTerminalFilter, params)
//     yield put(
//       getTerminalFilterSuccess(
//         mergeFilterValues(response, params.search_fields)
//       )
//     )
//   } catch (error) {
//     yield put(getTerminalFilterFail(error))
//   }
// }

//last function
function* terminalSaga() {
  yield takeLatest(GET_TERMINAL, onGetTerminal)
  yield takeLatest(GET_TERMINAL_AUDITLOG, onGetTerminalAuditLog)
  yield takeLatest(GET_TERMINAL_TABLE_INFORMATION, onGetTerminalTableInformation)
  yield takeEvery(UPDATE_TABLE_INFORMATION, onUpdateTableInformation)
  yield takeEvery(GET_DOWNLOAD_TERMINAL, onGetDownloadTerminal)
  // yield takeLatest(GET_TERMINAL_FILTER, onGetTerminalFilter)
}

export default terminalSaga