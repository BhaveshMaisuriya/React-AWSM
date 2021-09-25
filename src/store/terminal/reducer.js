import {
  GET_TERMINAL,
  GET_TERMINAL_FAIL,
  GET_TERMINAL_SUCCESS,
  GET_TERMINAL_AUDITLOG_SUCCESS,
  GET_TERMINAL_AUDITLOG_FAIL,
  GET_TERMINAL_TABLE_INFORMATION_FAIL,
  GET_TERMINAL_TABLE_INFORMATION_SUCCESS,
  UPDATE_TERMINAL_TABLE_INFORMATION_SUCCESS,
  UPDATE_TERMINAL_TABLE_INFORMATION_FAIL,
  GET_TERMINAL_FILTER_SUCCESS,
  GET_TERMINAL_FILTER_FAIL,
  GET_DOWNLOAD_TERMINAL_SUCCESS,
  GET_DOWNLOAD_TERMINAL_FAIL,
  RESET_CURRENT_TERMINAL_DETAIL,
} from "./actionTypes"
import { ToastSuccess, ToastError } from "../../helpers/swal"
import formatDateResponseList from "../../helpers/format-response-data/format-date-response.helper"

const initialState = {
  terminal: [],
  error: {},
  tableError: null,
  auditsTerminal: null,
  address: [],
  filterTerminal: [],
  currentTerminal: null,
  downloadTerminal: [],
  isFetchDataAfterChange: false,
  isLoading: false,
}

const Terminal = (state = initialState, action) => {
  switch (action.type) {
    case GET_TERMINAL:
      return {
        ...state,
        isLoading: true,
      }
    case GET_TERMINAL_SUCCESS:
      const list = action.payload?.list;
      if(list && list.length > 0){
        action.payload = {...action.payload,list: formatDateResponseList(list)}
      }
      return {
        ...state,
        terminal: action.payload,
        isLoading: false,
        tableError: null,
        isFetchDataAfterChange: false,
      }

    case GET_TERMINAL_FAIL:
      return {
        ...state,
        tableError: action.payload,
        isLoading: false,
      }

    case GET_DOWNLOAD_TERMINAL_SUCCESS:
      return {
        ...state,
        downloadTerminal: action.payload,
      }

    case GET_DOWNLOAD_TERMINAL_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_TERMINAL_AUDITLOG_SUCCESS:
      return {
        ...state,
        auditsTerminal: action.payload,
      }

    case GET_TERMINAL_AUDITLOG_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_TERMINAL_TABLE_INFORMATION_SUCCESS:
      return {
        ...state,
        currentTerminal: action.payload,
      }

    case GET_TERMINAL_TABLE_INFORMATION_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case UPDATE_TERMINAL_TABLE_INFORMATION_SUCCESS:
      ToastSuccess.fire()
      return {
        ...state,
        isFetchDataAfterChange: true,
      }

    case UPDATE_TERMINAL_TABLE_INFORMATION_FAIL:
      ToastError.fire()
      return {
        ...state,
        error: action.payload,
        isFetchDataAfterChange: true,
      }

    case GET_TERMINAL_FILTER_SUCCESS:
      return {
        ...state,
        filterTerminal: action.payload,
      }

    case GET_TERMINAL_FILTER_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    case RESET_CURRENT_TERMINAL_DETAIL:
      return {
        ...state,
        currentTerminal: null,
      }
    default:
      return state
  }
}

export default Terminal
