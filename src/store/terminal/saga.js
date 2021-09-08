import { takeLatest, put, call, takeEvery, select } from "redux-saga/effects"
import Factory, { mergeFilterValues } from "./factory"
import {
  GET_TERMINAL,
  GET_TERMINAL_AUDITLOG,
  GET_TERMINAL_TABLE_INFORMATION,
  UPDATE_TERMINAL_TABLE_INFORMATION,
  // GET_TERMINAL_FILTER,
  GET_DOWNLOAD_TERMINAL,
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
  getDownloadTerminalSuccess,
  getDownloadTerminalFail
} from "./actions"

import {
  getTerminal,
  getTerminalAuditLog,
  getTableInformation,
  updateTableInformation,
  getTerminalTableInformation,
  getDownloadTerminal,
  updateTerminalDetail,
  // getTerminalFilter,
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

function* onGetTerminalAuditLog() {
  try {
    const response = yield call(getTerminalAuditLog)
    yield put(getTerminalAuditLogSuccess(response))
  } catch (error) {
    yield put(getTerminalAuditLogFail(error))
  }
}

function* fetchTableInformation({ code }) {
  try {
    const response = yield call(getTerminalTableInformation, code)
    yield put(getTableInformationSuccess(response))
  } catch (error) {
    yield put(getTableInformationFail(error))
  }
}

function* onUpdateTableInformation({ payload: event }) {
  try {
    const preValue = yield select(store => store.terminal.currentTerminal)
    const response = yield call(updateTerminalDetail, { updateValue: event.body, preValue })
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
  yield takeLatest(GET_TERMINAL_TABLE_INFORMATION, fetchTableInformation)
  yield takeEvery(UPDATE_TERMINAL_TABLE_INFORMATION, onUpdateTableInformation)
  yield takeEvery(GET_DOWNLOAD_TERMINAL, onGetDownloadTerminal)
  // yield takeLatest(GET_TERMINAL_FILTER, onGetTerminalFilter)
}

export default terminalSaga