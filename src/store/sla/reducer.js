import {
  GET_SLA_ITEMS_SUCCESS,
  GET_SLA_ITEMS_FAIL,
  GET_SLA_AUDITLOG_SUCCESS,
  GET_SLA_AUDITLOG_FAIL,
  UPDATE_SLA_DETAIL_FAIL,
  UPDATE_SLA_DETAIL_SUCCESS,
  UPDATE_SLA_SECTION_NOTE_SUCCESS
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
          data: action.payload
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
        notify.success('SLA Item Updated!')
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

      case UPDATE_SLA_SECTION_NOTE_SUCCESS: {
        return {
          ...state,
          data: action.payload,
        }
      }
      default:
        return state
    }
  }

  export default SLA
