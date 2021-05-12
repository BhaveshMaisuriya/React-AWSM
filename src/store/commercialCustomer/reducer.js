import {
  GET_COMMERCIAL_CUSTOMER_FAIL,
  GET_COMMERCIAL_CUSTOMER_SUCCESS,
  GET_COMMERCIAL_AUDITLOG_SUCCESS,
  GET_COMMERCIAL_AUDITLOG_FAIL,
  GET_COMMERCIAL_FILTER_SUCCESS,
  GET_COMMERCIAL_FILTER_FAIL
} from "./actionTypes"

const initialState = {
  commercialCustomers: [],
  error: {},
  auditsCom: [],
  filterCom: []
}

const CommercialCustomer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COMMERCIAL_CUSTOMER_SUCCESS:
      return {
        ...state,
        commercialCustomers: action.payload,
      }
    case GET_COMMERCIAL_CUSTOMER_FAIL:
      return {
        ...state,
        commercialCustomers: action.payload,
      }

    case GET_COMMERCIAL_AUDITLOG_SUCCESS:
      return {
        ...state,
        auditsCom: action.payload,
      }

    case GET_COMMERCIAL_AUDITLOG_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_COMMERCIAL_FILTER_SUCCESS:
      return {
        ...state,
        filterCom: action.payload,
      }

    case GET_COMMERCIAL_FILTER_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default CommercialCustomer
