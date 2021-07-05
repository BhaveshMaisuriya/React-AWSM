import { takeLatest, put, call, takeEvery } from "redux-saga/effects"
import Factory from "./factory"
import {
  GET_ORDERBANK,
  GET_ORDERBANK_TABLE_INFORMATION,
  UPDATE_ORDERBANK_TABLE_INFORMATION,
  DELETE_ORDERBANK_TABLE_INFORMATION,
  GET_RTS_ORDER_BANK_TABLE_DATA,
  SEND_ORDER_BANK_DN,
  REFRESH_ORDER_BANK_DN,
} from "./actionTypes"

import {
  getRTSOrderBankTableDataSuccess,
  getRTSOrderBankTableDataFail,
  getOrderBankSuccess,
  getOrderBankFail,
  getOrderBankDetailFail,
  getOrderBankDetailSuccess,
  deleteOrderBankDetailFail,
  deleteOrderBankDetailSuccess,
  updateOrderbankTableInformationSuccess,
  updateOrderbankTableInformationFail,
  sendOrderBankDNFail,
  sendOrderBankDNSuccess,
  refreshOderBankDNFail,
  refreshOderBankDNSuccess,
} from "./actions"
import {
  getOrderBank,
  getOrderBankDetail,
  getRTSOderBank,
  putOrderbankDetail,
  sendRTSOrderBank,
  refreshRTSOrderBank,
  deleteOrderBankDetail,
} from "../../helpers/fakebackend_helper"

function* onGetOrderbank({ params = {} }) {
  try {
    const response = yield call(getOrderBank, params)
    yield put(getOrderBankSuccess(Factory(response, params)))
  } catch (error) {
    yield put(getOrderBankFail(error))
  }
}

function* onGetOrderbankTableInformation({ params }) {
  try {
    const response = yield call(getOrderBankDetail, params)
    yield put(getOrderBankDetailSuccess(response))
  } catch (error) {
    yield put(getOrderBankDetailFail(error))
  }
}

function* onDeleteOrderbankTableInformation({ params }) {
  try {
    const response = yield call(deleteOrderBankDetail, params)
    yield put(deleteOrderBankDetailSuccess(response))
  } catch (error) {
    yield put(deleteOrderBankDetailFail(error))
  }
}

function* onGetRTSOrderBank({ params = {} }) {
  try {
    const response = yield call(getRTSOderBank, params)
    yield put(getRTSOrderBankTableDataSuccess(response))
  } catch (error) {
    yield put(getRTSOrderBankTableDataFail(error))
  }
}

// function* onPutOrderbankTableInformation({ data }) {
//   try {
//     yield call(putOrderbankDetail, data)
//     yield put(updateOrderbankTableInformationSuccess())
//   } catch (error) {
//     yield put(updateOrderbankTableInformationFail(error))
//   }
// }

function* onRefreshOrderBankDN({ params = {}}) {
  try {
    const response = yield call(refreshRTSOrderBank, params)
    yield put(refreshOderBankDNSuccess(response))
  } catch (error) {
    yield put(refreshOderBankDNFail(error))
  }
}

function* onSendOrderBankDN({ params = {}}) {
  try {
    const response = yield call(sendRTSOrderBank, params)
    yield put(sendOrderBankDNSuccess(response))
  } catch (error) {
    yield put(sendOrderBankDNFail(error))
  }
}

function* orderBankSaga() {
  yield takeLatest(GET_ORDERBANK, onGetOrderbank)
  yield takeLatest(GET_RTS_ORDER_BANK_TABLE_DATA, onGetRTSOrderBank)
  yield takeLatest(
    GET_ORDERBANK_TABLE_INFORMATION,
    onGetOrderbankTableInformation
  )
  yield takeLatest(
    DELETE_ORDERBANK_TABLE_INFORMATION,
    onDeleteOrderbankTableInformation
  )
  // yield takeLatest(
  //   UPDATE_ORDERBANK_TABLE_INFORMATION,
  //   onPutOrderbankTableInformation
  // )
  yield takeLatest(REFRESH_ORDER_BANK_DN, onRefreshOrderBankDN)
  yield takeLatest(SEND_ORDER_BANK_DN, onSendOrderBankDN)
}

export default orderBankSaga