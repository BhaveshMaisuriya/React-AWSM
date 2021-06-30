import { takeLatest, put, call, takeEvery } from "redux-saga/effects"
import Factory from "./factory"
import {
  GET_ORDERBANK,
  GET_ORDERBANK_TABLE_INFORMATION,
  UPDATE_ORDERBANK_TABLE_INFORMATION,
} from "./actionTypes"
import {
  getOrderBankSuccess,
  getOrderBankFail,
  getOrderBankDetailFail,
  getOrderBankDetailSuccess,
  updateOrderbankTableInformationSuccess,
  updateOrderbankTableInformationFail,
} from "./actions"
import {
  getOrderBank,
  getOrderBankDetail,
  putOrderbankDetail,
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

// function* onPutOrderbankTableInformation({ data }) {
//   try {
//     yield call(putOrderbankDetail, data)
//     yield put(updateOrderbankTableInformationSuccess())
//   } catch (error) {
//     yield put(updateOrderbankTableInformationFail(error))
//   }
// }

function* orderBankSaga() {
  yield takeLatest(GET_ORDERBANK, onGetOrderbank)
  yield takeLatest(
    GET_ORDERBANK_TABLE_INFORMATION,
    onGetOrderbankTableInformation
  )
  // yield takeLatest(
  //   UPDATE_ORDERBANK_TABLE_INFORMATION,
  //   onPutOrderbankTableInformation
  // )
}

export default orderBankSaga
