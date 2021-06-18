import {
  GET_SLA_ITEMS_SUCCESS,
  GET_SLA_ITEMS_FAIL,
  GET_SLA_AUDITLOG_SUCCESS,
  GET_SLA_AUDITLOG_FAIL,
  UPDATE_SLA_DETAIL_FAIL,
  UPDATE_SLA_DETAIL_SUCCESS,
  UPDATE_SLA_SECTION_SUCCESS,
  ADD_NEW_SECTION_TAB_SUCCESS,
  UPDATE_SECTION_TAB_SUCCESS,
  DELETE_SECTION_TAB_SUCCESS,
  CREATE_SLA_RECORD_SUCCESS,
  CREATE_SLA_RECORD_FAIL
} from "./actionTypes"

const initialState = {
  data: {},
  error: null,
  slaAuditLog: [],
  updateStatus: null,
}

import { notify } from "../../helpers/notify"

const SLA = (state = initialState, action) => {
  switch (action.type) {
    case GET_SLA_ITEMS_SUCCESS:
      return {
        ...state,
        data: action.payload,
      }

    case GET_SLA_ITEMS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_SLA_AUDITLOG_SUCCESS:
      return {
        ...state,
        slaAuditLog: action.payload,
      }

    case GET_SLA_AUDITLOG_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case UPDATE_SLA_DETAIL_SUCCESS:
      notify.success("SLA Item Updated!")
      return {
        ...state,
        updateStatus: action.payload,
      }

    case UPDATE_SLA_DETAIL_FAIL:
      notify.error(action.payload)
      return {
        ...state,
        error: action.payload,
      }

      case UPDATE_SLA_SECTION_SUCCESS: {
        notify.success("SLA Section Updated!")
        const newData = { ...state.data }
        newData[action.payload.category] = action.payload.data
        return {
          ...state,
          data: newData
        }
      }
    case ADD_NEW_SECTION_TAB_SUCCESS:
      notify.success("New section has successfully added in Internal")
      return {
        ...state,
      }

    case UPDATE_SECTION_TAB_SUCCESS:
      notify.success("New section has successfully updated in Internal")
      return {
        ...state,
      }

    case DELETE_SECTION_TAB_SUCCESS:
      notify.success("New section has successfully deleted in Internal")
      return {
        ...state,
      }

    case CREATE_SLA_RECORD_SUCCESS:
      notify.success("New row has successfully added in Section A, RBD")
      return {
        ...state,
      }

    default:
      return state
  }
}

export default SLA
