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
  UPDATE_SLA_SECTION,
  UPDATE_SLA_SECTION_SUCCESS,
  UPDATE_SLA_SECTION_FAIL,
  DELETE_SLA_SECTION,
  ADD_NEW_SECTION_TAB,
  ADD_NEW_SECTION_TAB_SUCCESS,
  ADD_NEW_SECTION_TAB_FAIL,
  UPDATE_SECTION_TAB,
  UPDATE_SECTION_TAB_SUCCESS,
  UPDATE_SECTION_TAB_FAIL,
  DELETE_SECTION_TAB,
  DELETE_SECTION_TAB_SUCCESS,
  DELETE_SECTION_TAB_FAIL,
  CREATE_SLA_RECORD,
  CREATE_SLA_RECORD_SUCCESS,
  CREATE_SLA_SECTION_FAIL
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
  payload: error,
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
  payload: error,
})

export const deleteSLADetail = params => ({
  type: DELETE_SLA_DETAIL,
  payload: params,
})

export const deleteSLADetailSuccess = response => ({
  type: DELETE_SLA_DETAIL,
  payload: response,
})
export const deleteSLADetailFail = error => ({
  type: DELETE_SLA_DETAIL,
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

  export const addNewSectionTab = params => ({
    type: ADD_NEW_SECTION_TAB,
    params,
  })

  export const addNewSectionTabSuccess = response => ({
    type: ADD_NEW_SECTION_TAB_SUCCESS,
    payload: response,
  })

  export const addNewSectionTabFail = error => ({
    type: ADD_NEW_SECTION_TAB_FAIL,
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

  export const deleteSectionTab = params => ({
    type: DELETE_SECTION_TAB,
    params,
  })

  export const deleteSectionTabSuccess = response => ({
    type: DELETE_SECTION_TAB_SUCCESS,
    payload: response,
  })

  export const deleteSectionTabFail = error => ({
    type: DELETE_SECTION_TAB_FAIL,
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
