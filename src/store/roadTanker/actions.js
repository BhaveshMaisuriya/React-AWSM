import {
  GET_ROAD_TANKER,
  GET_ROAD_TANKER_SUCCESS,
  GET_ROAD_TANKER_FAIL,
  GET_ROADTANKER_AUDITLOG,
  GET_ROADTANKER_AUDITLOG_SUCCESS,
  GET_ROADTANKER_AUDITLOG_FAIL,
  GET_TABLE_INFORMATION,
  GET_TABLE_INFORMATION_FAIL,
  GET_TABLE_INFORMATION_SUCCESS,
  UPDATE_TABLE_INFORMATION,
  UPDATE_TABLE_INFORMATION_SUCCESS,
  UPDATE_TABLE_INFORMATION_FAIL,
  GET_ROADTANKER_FILTER,
  GET_ROADTANKER_FILTER_SUCCESS,
  GET_ROADTANKER_FILTER_FAIL,
} from "./actionTypes"

export const getRoadTanker = params => ({
  type: GET_ROAD_TANKER,
  params,
})

export const getRoadTankerSuccess = response => ({
  type: GET_ROAD_TANKER_SUCCESS,
  payload: response,
})

export const getRoadTankerFail = error => ({
  type: GET_ROAD_TANKER_FAIL,
  payload: error,
})

export const getRoadTankerAuditLog = () => ({
  type: GET_ROADTANKER_AUDITLOG,
})

export const getRoadTankerAuditLogSuccess = response => ({
  type: GET_ROADTANKER_AUDITLOG_SUCCESS,
  payload: response,
})

export const getRoadTankerAuditLogFail = error => ({
  type: GET_ROADTANKER_AUDITLOG_FAIL,
  payload: error,
})

export const getTableInformation = () => ({
  type: GET_TABLE_INFORMATION,
})

export const getTableInformationSuccess = response => ({
  type: GET_TABLE_INFORMATION_SUCCESS,
  payload: response,
})

export const getTableInformationFail = error => ({
  type: GET_TABLE_INFORMATION_FAIL,
  payload: error,
})

export const updateTableInformation = event => ({
  type: UPDATE_TABLE_INFORMATION,
  payload: event,
})

export const updateTableInformationSuccess = event => ({
  type: UPDATE_TABLE_INFORMATION_SUCCESS,
  payload: event,
})

export const updateTableInformationFail = error => ({
  type: UPDATE_TABLE_INFORMATION_FAIL,
  payload: error,
})

export const getRoadTankerFilter = params => ({
  type: GET_ROADTANKER_FILTER,
  params,
})

export const getRoadTankerFilterSuccess = response => ({
  type: GET_ROADTANKER_FILTER_SUCCESS,
  payload: response,
})

export const getRoadTankerFilterFail = error => ({
  type: GET_ROADTANKER_FILTER_FAIL,
  payload: error,
})
