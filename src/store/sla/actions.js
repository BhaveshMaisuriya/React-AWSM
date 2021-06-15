  import {
    GET_SLA_ITEMS,
    GET_SLA_ITEMS_SUCCESS,
    GET_SLA_ITEMS_FAIL,
    GET_SLA_AUDITLOG,
    GET_SLA_AUDITLOG_SUCCESS,
    GET_SLA_AUDITLOG_FAIL,
    UPDATE_SLA_DETAIL,
    UPDATE_SLA_DETAIL_FAIL,
    UPDATE_SLA_DETAIL_SUCCESS,
    DELETE_SLA_DETAIL,
    DELETE_SLA_DETAIL_SUCCESS,
    DELETE_SLA_DETAIL_FAIL,
    UPDATE_SLA_SECTION_NOTE,
    UPDATE_SLA_SECTION_NOTE_SUCCESS,
    UPDATE_SLA_SECTION_NOTE_FAIL,
  } from "./actionTypes"

  export const getSLAItems = params => ({
    type: GET_SLA_ITEMS,
    params,
  })

  export const getSlaItemsSuccess = response => ({
    type: GET_SLA_ITEMS_SUCCESS,
    payload: response,
  })

  export const getSlaItemsFail = error => ({
    type: GET_SLA_ITEMS_FAIL,
    payload: error
  })

  export const getSLAAuditLog = () => ({
    type: GET_SLA_AUDITLOG,
  })

  export const getSlaAuditLogSuccess = response => ({
    type: GET_SLA_AUDITLOG_SUCCESS,
    payload: response,
  })

  export const getSlaAuditLogFail = error => ({
    type: GET_SLA_AUDITLOG_FAIL,
    payload: error,
  })


  export const updateSLAItem = params => ({
    type: UPDATE_SLA_DETAIL,
    params,
  })

  export const updateSlaDetailSuccess = response => ({
    type: UPDATE_SLA_DETAIL_SUCCESS,
    payload: response,
  })

  export const updateSlaDetailFail = error => ({
    type: UPDATE_SLA_DETAIL_FAIL,
    payload: error
  })

  export const deleteSLADetail = params => ({
      type: DELETE_SLA_DETAIL,
      payload : params
  })

  export const deleteSLADetailSuccess = response => ({
    type: DELETE_SLA_DETAIL,
    payload : response
})
export const deleteSLADetailFail = error => ({
  type: DELETE_SLA_DETAIL,
  payload : error
})
  export const updateSlaSectionNote = params => ({
    type: UPDATE_SLA_SECTION_NOTE,
    params,
  })

  export const updateSlaSectionNoteSuccess = response => ({
    type: UPDATE_SLA_SECTION_NOTE_SUCCESS,
    payload: response,
  })

  export const updateSlaSectionNoteFail = error => ({
    type: UPDATE_SLA_SECTION_NOTE_FAIL,
    payload: error,
  })
