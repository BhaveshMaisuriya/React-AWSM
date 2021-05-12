import { put, call, takeEvery } from "redux-saga/effects"
import { mergeFilterValues } from "./factory"
import {
  GET_PRODUCT_AUDITLOG,
  GET_PRODUCT_FILTER,
  GET_PRODUCTS,
  GET_PRODUCT_DETAIL,
  UPDATE_PRODUCT_DETAIL
} from "./actionTypes"

import {
  getProductSuccess,
  getProductFail,
  getProductAuditLogSuccess,
  getProductAuditLogFail,
  getProductFilterSuccess,
  getProductFilterFail,
  getProductDetailFail,
  getProductDetailSuccess,
  updateProductDetailSuccess,
  updateProductDetailFail
} from "./actions"

import {
  getProducts,
  getProductAuditLog,
  getProductFilter,
  getProductDetail,
  updateProductDetail
} from "../../helpers/fakebackend_helper"

function* onGetProductAuditLog() {
  try {
    const response = yield call(getProductAuditLog)
    yield put(getProductAuditLogSuccess(response))
  } catch (error) {
    yield put(getProductAuditLogFail(error))
  }
}

function* onGetProductFIlter({ params = {} }) {
  try {
    const response = yield call(getProductFilter)
    console.log(mergeFilterValues(response, params.search_fields))
    yield put(
      getProductFilterSuccess(
        mergeFilterValues(response, params.search_fields)
      )
    )
  } catch (error) {
    yield put(getProductFilterFail(error))
  }
}


function* onGetProducts() {
  try {
    const response = yield call(getProducts)
    yield put(getProductSuccess(response))
  } catch (error) {
    yield put(getProductFail(error))
  }
}

function* onGetProductDetail(action) {
  try {
    const response = yield call(getProductDetail, action.params)
    yield put(getProductDetailSuccess(response))
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
  yield takeEvery(GET_PRODUCT_FILTER, onGetProductFIlter)
  yield takeEvery(GET_PRODUCTS, onGetProducts)
  yield takeEvery(GET_PRODUCT_DETAIL, onGetProductDetail)
  yield takeEvery(UPDATE_PRODUCT_DETAIL, onUpdateProductDetail)
}

export default ProductSaga
