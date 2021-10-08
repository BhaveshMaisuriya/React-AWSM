import { takeLatest, put, call } from "redux-saga/effects"
import {
  GET_DQM_EXCEL_DOWNLOAD,
} from "./actionTypes"

import {
  getDQMExcelDownloadSuccess,
  getDQMExcelDownloadFail,
} from "./actions"

import {
  getDQMExcel,
} from "../../helpers/fakebackend_helper"

function* onGetDownloadDQMExcel({ params = {} }) {
  try {
    const response = yield call(getDQMExcel, params)
    yield put(getDQMExcelDownloadSuccess(response.data))
  } catch (error) {
    yield put(getDQMExcelDownloadFail(error))
  }
}

//last function
function* dqmSaga() {
  yield takeLatest(GET_DQM_EXCEL_DOWNLOAD, onGetDownloadDQMExcel)
}

export default dqmSaga