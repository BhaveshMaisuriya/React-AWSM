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
  UPDATE_SLA_SECTION,
  CREATE_SLA_SECTION,
  CREATE_SLA_SECTION_SUCCESS,
  CREATE_SLA_SECTION_FAIL,
  UPDATE_SLA_SECTION_SUCCESS,
  UPDATE_SLA_SECTION_FAIL,
  DELETE_SLA_SECTION,
  UPDATE_SECTION_TAB,
  UPDATE_SECTION_TAB_SUCCESS,
  UPDATE_SECTION_TAB_FAIL,
  CREATE_SLA_RECORD,
  CREATE_SLA_RECORD_SUCCESS,
  DELETE_SLA_SECTION_SUCCESS,
  DELETE_SLA_SECTION_FAIL,
  DELETE_SLA_RECORD,
  DELETE_SLA_RECORD_SUCCESS,
  DELETE_SLA_RECORD_FAIL,
  GET_SLA_ATTACHMENTS,
  GET_SLA_ATTACHMENTS_SUCCESS,
  GET_SLA_ATTACHMENTS_FAIL
} from "./actionTypes"

export const getSLAItems = params => ({
  type: GET_SLA_ITEMS,
  params,
})

export const getSLAAttchments = params => ({
  type: GET_SLA_ATTACHMENTS,
  params,
})

export const getSLAAttchmentsSuccess = response => ({
  type: GET_SLA_ATTACHMENTS_SUCCESS,
  params: response,
})

export const getSLAAttchmentsFail = error => ({
  type: GET_SLA_ATTACHMENTS_FAIL,
  payload: error,
})

export const getSlaItemsSuccess = response => ({
  type: GET_SLA_ITEMS_SUCCESS,
  payload: response,
})

export const getSlaItemsFail = error => ({
  type: GET_SLA_ITEMS_FAIL,
  payload: error,
})

export const getSLAAuditLog = (params) => ({
  type: GET_SLA_AUDITLOG,
  params,
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
  payload: error,
})

export const deleteSLARecord = params => ({
  type: DELETE_SLA_RECORD,
  params,
})

export const deleteSLARecordSuccess = response => ({
  type: DELETE_SLA_RECORD_SUCCESS,
  payload: response,
})
export const deleteSLARecordFail = error => ({
  type: DELETE_SLA_RECORD_FAIL,
  payload: error,
})
export const updateSLASection = params => ({
  type: UPDATE_SLA_SECTION,
  params,
})

export const updateSLASectionSuccess = response => ({
  type: UPDATE_SLA_SECTION_SUCCESS,
  payload: response,
})

export const updateSLASectionFail = error => ({
  type: UPDATE_SLA_SECTION_FAIL,
  payload: error,
})

  export const createSLASection = params => ({
    type: CREATE_SLA_SECTION,
    params,
  })

  export const createSLASectionSuccess = response => ({
    type: CREATE_SLA_SECTION_SUCCESS,
    payload: response,
  })

  export const createSLASectionFail = error => ({
    type: CREATE_SLA_SECTION_FAIL,
    payload: error,
  })

  export const updateSectionTab = params => ({
    type: UPDATE_SECTION_TAB,
    params,
  })

  export const updateSectionTabSuccess = response => ({
    type: UPDATE_SECTION_TAB_SUCCESS,
    payload: response,
  })

  export const updateSectionTabFail = error => ({
    type: UPDATE_SECTION_TAB_FAIL,
    payload: error,
  })

  export const deleteSLASection = params => ({
    type: DELETE_SLA_SECTION,
    params,
  })

  export const deleteSLASectionSuccess = response => ({
    type: DELETE_SLA_SECTION_SUCCESS,
    payload: response,
  })

  export const deleteSLASectionFail = error => ({
    type: DELETE_SLA_SECTION_FAIL,
    payload: error,
  })

  export const createSLARecord = params => ({
    type: CREATE_SLA_RECORD,
    params,
  })

  export const createSLARecordSuccess = response => ({
    type: CREATE_SLA_RECORD_SUCCESS,
    payload: response,
  })

  export const createSLARecordFail = error => ({
    type: CREATE_SLA_SECTION_FAIL,
    payload: error,
  })