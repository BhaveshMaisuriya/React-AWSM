import {
  GET_PRODUCT_FAIL,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_AUDITLOG_SUCCESS,
  GET_PRODUCT_AUDITLOG_FAIL,
  GET_PRODUCT_FILTER_SUCCESS,
  GET_PRODUCT_FILTER_FAIL,
  GET_PRODUCT_DETAIL_SUCCESS,
  GET_PRODUCT_DETAIL_FAIL,
  UPDATE_PRODUCT_DETAIL_SUCCESS,
  UPDATE_PRODUCT_DETAIL_FAIL,
  GET_DOWNLOAD_PRODUCTS_SUCCESS,
  GET_DOWNLOAD_PRODUCTS_FAIL
} from "./actionTypes"

const initialState = {
  dataList: [],
  error: null,
  productAuditLog: [],
  productFilter: [],
  currentProduct: null,
  updateStatus: null,
  downloadProducts: [],
}

import { notify } from "../../helpers/notify"

const Product = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCT_SUCCESS:
      return {
        ...state,
        dataList: action.payload
      }

    case GET_PRODUCT_FAIL:
      return {
        ...state,
        dataList: action.payload,
      }

    case GET_DOWNLOAD_PRODUCTS_SUCCESS:
      return {
        ...state,
        downloadProducts: action.payload
      }

    case GET_DOWNLOAD_PRODUCTS_FAIL:
      return {
        ...state,
        downloadProducts: action.payload,
      }

    case GET_PRODUCT_AUDITLOG_SUCCESS:
      return {
        ...state,
        productAuditLog: action.payload,
      }

    case GET_PRODUCT_AUDITLOG_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_PRODUCT_FILTER_SUCCESS:
      return {
        ...state,
        productFilter: action.payload,
      }

    case GET_PRODUCT_FILTER_FAIL:
      notify.error(action.payload)
      return {
        ...state,
        error: action.payload,
      }

    case GET_PRODUCT_DETAIL_SUCCESS:
      return {
        ...state,
        currentProduct: action.payload,
      }

    case GET_PRODUCT_DETAIL_FAIL:
      notify.error(action.payload)
      return {
        ...state,
        error: action.payload,
      }

    case UPDATE_PRODUCT_DETAIL_SUCCESS:
      notify.success('Product Detail Updated!')
      return {
        ...state,
        updateStatus: action.payload,
      }
  
    case UPDATE_PRODUCT_DETAIL_FAIL:
      notify.error(action.payload)
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default Product
