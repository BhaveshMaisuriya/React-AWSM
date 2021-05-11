import {
  GET_RETAIL_CUSTOMER_FAIL,
  GET_RETAIL_CUSTOMER_SUCCESS,
  GET_COMMERCIAL_AUDITLOG_SUCCESS,
  GET_COMMERCIAL_AUDITLOG_FAIL,
} from "./actionTypes"

const initialState = {
  retailCustomers: [],
  error: {},
  auditsCom: [],
}

const CommercialCustomer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RETAIL_CUSTOMER_SUCCESS:
      return {
        ...state,
        retailCustomers: action.payload,
      }

    case GET_RETAIL_CUSTOMER_FAIL:
      return {
        ...state,
        retailCustomers: action.payload,
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

    default:
      return state
  }
}

export default CommercialCustomer
