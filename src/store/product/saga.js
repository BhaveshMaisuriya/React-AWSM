import { put, call, takeEvery } from "redux-saga/effects"
import factory from "./factory"
import {
  GET_PRODUCT_AUDITLOG,
  GET_PRODUCTS,
  GET_PRODUCT_DETAIL,
  UPDATE_PRODUCT_DETAIL,
  GET_DOWNLOAD_PRODUCTS,
} from "./actionTypes"

import {
  getProductSuccess,
  getProductFail,
  getProductAuditLogSuccess,
  getProductAuditLogFail,
  getProductFilterSuccess,
  getProductDetailFail,
  getProductDetailSuccess,
  updateProductDetailSuccess,
  updateProductDetailFail,
  getDownloadProductSuccess,
  getDownloadProductFail,
} from "./actions"

import {
  getProducts,
  getProductAuditLog,
  getProductDetail,
  updateProductDetail,
  getDownloadProducts,
} from "../../helpers/fakebackend_helper"

function* onGetProductAuditLog() {
  try {
    const response = yield call(getProductAuditLog)
    yield put(getProductAuditLogSuccess(response))
  } catch (error) {
    yield put(getProductAuditLogFail(error))
  }
}

function* onGetDownloadProducts({ params = {} }) {
  try {
    const response = yield call(getDownloadProducts, params)
    yield put(getDownloadProductSuccess(response.data))
  } catch (error) {
    yield put(getDownloadProductFail(error))
  }
}

function* onGetProducts({ params = {} }) {
  try {
    if(params.q && params.q === "()"){
      yield put(getProductSuccess('Data is not available'))
    } else {
      const response = yield call(getProducts, params)
      
      yield put(getProductSuccess(factory(response)))
      yield put(getProductFilterSuccess(response.data.filters))
    }
  } catch (error) {
    yield put(getProductFail(error))
  }
}

function* onGetProductDetail(action) {
  try {
    const response = yield call(getProductDetail, action.params)
    yield put(getProductDetailSuccess(response.data))
  } catch (error) {
    yield put(getProductDetailFail(error))
  }
}

function* onUpdateProductDetail(action) {
  try {
    const response = yield call(updateProductDetail, action.params)
    yield put(updateProductDetailSuccess(response))
  } catch (error) {
    yield put(updateProductDetailFail(error))
  }
}

function* ProductSaga() {
  yield takeEvery(GET_PRODUCT_AUDITLOG, onGetProductAuditLog)
  yield takeEvery(GET_PRODUCTS, onGetProducts)
  yield takeEvery(GET_PRODUCT_DETAIL, onGetProductDetail)
  yield takeEvery(UPDATE_PRODUCT_DETAIL, onUpdateProductDetail)
  yield takeEvery(GET_DOWNLOAD_PRODUCTS, onGetDownloadProducts)
}

export default ProductSaga