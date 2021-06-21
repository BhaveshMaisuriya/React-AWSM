import {
  GET_SLA_ITEMS_SUCCESS,
  GET_SLA_ITEMS_FAIL,
  GET_SLA_AUDITLOG_SUCCESS,
  GET_SLA_AUDITLOG_FAIL,
  UPDATE_SLA_DETAIL_FAIL,
  UPDATE_SLA_DETAIL_SUCCESS,
  CREATE_SLA_SECTION_SUCCESS,
  CREATE_SLA_SECTION_FAIL,
  UPDATE_SLA_SECTION_SUCCESS,
  UPDATE_SLA_SECTION_FAIL,
  DELETE_SLA_SECTION_SUCCESS,
  DELETE_SLA_SECTION_FAIL,
  UPDATE_SECTION_TAB_SUCCESS,
  DELETE_SLA_RECORD_SUCCESS,
  DELETE_SLA_RECORD_FAIL,
  CREATE_SLA_RECORD_SUCCESS,
  CREATE_SLA_RECORD_FAIL,
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

    case UPDATE_SLA_DETAIL_SUCCESS:{
        const { payload } = action
        notify.success(`${payload.category.toUpperCase()} Item Updated!`)
        const newData = { ...state.data }
        newData[payload.category] = payload.data
        return {
          ...state,
          data: newData,
        }
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
        data: newData,
      }
    }

    case UPDATE_SLA_SECTION_FAIL: {
      notify.error(action.payload)
      return state
    }

    case CREATE_SLA_SECTION_SUCCESS: {
      notify.success(
        `${
          action.payload.title
        } has successfully added in ${action.payload.category.toUpperCase()}`
      )
      const newData = { ...state.data }
      newData[action.payload.category] = action.payload.data
      return {
        ...state,
        data: newData,
      }
    }

    case CREATE_SLA_SECTION_FAIL: {
      notify.error(action.payload)
      return state
    }

    case DELETE_SLA_SECTION_SUCCESS:
      notify.success(
        `${
          action.payload.title
        } has successfully deleted in ${action.payload.category.toUpperCase()}`
      )
      const newData = { ...state.data }
      newData[action.payload.category] = action.payload.data
      return {
        ...state,
        data: newData,
      }

    case DELETE_SLA_SECTION_FAIL: {
      notify.error(action.payload)
      return state
    }

    case DELETE_SLA_RECORD_SUCCESS: {
      notify.success(`Data in ${action.payload.title}, ${action.payload.category.toUpperCase()} has successfully updated`)
      const newData = { ...state.data }
      newData[action.payload.category] = action.payload.data
      return {
        ...state,
        data: newData
      }
    }

    case  DELETE_SLA_RECORD_FAIL: {
      notify.error(action.payload)
      return state
    }

    case UPDATE_SECTION_TAB_SUCCESS:
      notify.success("New section has successfully updated in Internal")
      return {
        ...state,
      }

    case CREATE_SLA_RECORD_SUCCESS:{
      const { payload, } = action
      notify.success(`New row has successfully added in ${payload.tabName}, ${payload.category.toUpperCase()}`)
      const newData = { ...state.data }
      newData[payload.category] = payload.data
      return {
        ...state,
        data: newData,
      }
    }
      

    default:
      return state
  }
}

export default SLA
