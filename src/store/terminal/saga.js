import { takeLatest, put, call, takeEvery } from "redux-saga/effects"
import Factory, { mergeFilterValues } from "./factory"
import {
  GET_TERMINAL,
  GET_TERMINAL_AUDITLOG,
  GET_TABLE_INFORMATION,
  UPDATE_TABLE_INFORMATION,
  // GET_TERMINAL_FILTER,
} from "./actionTypes"

import {
  getTerminalSuccess,
  getTerminalFail,
  getTerminalAuditLogSuccess,
  getTerminalAuditLogFail,
  getTableInformationSuccess,
  getTableInformationFail,
  updateTableInformationSuccess,
  updateTableInformationFail,
  getTerminalFilterSuccess,
  // getTerminalFilterFail,
} from "./actions"

import {
  getTerminal,
  getTerminalAuditLog,
  getTableInformation,
  updateTableInformation,
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

function* onGetTerminalAuditLog() {
  try {
    const response = yield call(getTerminalAuditLog)
    yield put(getTerminalAuditLogSuccess(response))
  } catch (error) {
    yield put(getTerminalAuditLogFail(error))
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
  yield takeLatest(GET_TABLE_INFORMATION, fetchTableInformation)
  yield takeEvery(UPDATE_TABLE_INFORMATION, onUpdateTableInformation)
  // yield takeLatest(GET_TERMINAL_FILTER, onGetTerminalFilter)
}

export default terminalSaga
