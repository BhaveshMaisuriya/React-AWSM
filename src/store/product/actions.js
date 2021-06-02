import {
  GET_PRODUCTS,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_FAIL,
  GET_PRODUCT_AUDITLOG,
  GET_PRODUCT_AUDITLOG_SUCCESS,
  GET_PRODUCT_AUDITLOG_FAIL,
  GET_PRODUCT_FILTER,
  GET_PRODUCT_FILTER_SUCCESS,
  GET_PRODUCT_FILTER_FAIL,
  GET_PRODUCT_DETAIL,
  GET_PRODUCT_DETAIL_SUCCESS,
  GET_PRODUCT_DETAIL_FAIL,
  UPDATE_PRODUCT_DETAIL,
  UPDATE_PRODUCT_DETAIL_FAIL,
  UPDATE_PRODUCT_DETAIL_SUCCESS,
  GET_DOWNLOAD_PRODUCTS,
  GET_DOWNLOAD_PRODUCTS_SUCCESS,
  GET_DOWNLOAD_PRODUCTS_FAIL,
} from "./actionTypes"

export const getProducts = params => ({
  type: GET_PRODUCTS,
  params,
})

export const getProductSuccess = response => ({
  type: GET_PRODUCT_SUCCESS,
  payload: response,
})

export const getProductFail = error => ({
  type: GET_PRODUCT_FAIL,
  payload: error
})

export const getDownloadProducts = params => ({
  type: GET_DOWNLOAD_PRODUCTS,
  params,
})

export const getDownloadProductSuccess = response => ({
  type: GET_DOWNLOAD_PRODUCTS_SUCCESS,
  payload: response,
})

export const getDownloadProductFail = error => ({
  type: GET_DOWNLOAD_PRODUCTS_FAIL,
  payload: error
})

export const getProductAuditLog = () => ({
  type: GET_PRODUCT_AUDITLOG,
})

export const getProductAuditLogSuccess = response => ({
  type: GET_PRODUCT_AUDITLOG_SUCCESS,
  payload: response,
})

export const getProductAuditLogFail = error => ({
  type: GET_PRODUCT_AUDITLOG_FAIL,
  payload: error,
})

export const getProductFilter = params => ({
  type: GET_PRODUCT_FILTER,
  params,
})

export const getProductFilterSuccess = response => ({
  type: GET_PRODUCT_FILTER_SUCCESS,
  payload: response,
})

export const getProductFilterFail = error => ({
  type: GET_PRODUCT_FILTER_FAIL,
  payload: error
})

export const getProductDetail = params => ({
  type: GET_PRODUCT_DETAIL,
  params,
})

export const getProductDetailSuccess = response => ({
  type: GET_PRODUCT_DETAIL_SUCCESS,
  payload: response,
})

export const getProductDetailFail = error => ({
  type: GET_PRODUCT_DETAIL_FAIL,
  payload: error
})

export const updateProductDetail = params => ({
  type: UPDATE_PRODUCT_DETAIL,
  params,
})

export const updateProductDetailSuccess = response => ({
  type: UPDATE_PRODUCT_DETAIL_SUCCESS,
  payload: response,
})

export const updateProductDetailFail = error => ({
  type: UPDATE_PRODUCT_DETAIL_FAIL,
  payload: error
})