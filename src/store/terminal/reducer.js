import {
  GET_TERMINAL_FAIL,
  GET_TERMINAL_SUCCESS,
  GET_TERMINAL_AUDITLOG_SUCCESS,
  GET_TERMINAL_AUDITLOG_FAIL,
  GET_TABLE_INFORMATION_FAIL,
  GET_TABLE_INFORMATION_SUCCESS,
  UPDATE_TABLE_INFORMATION_SUCCESS,
  UPDATE_TABLE_INFORMATION_FAIL,
  GET_TERMINAL_FILTER_SUCCESS,
  GET_TERMINAL_FILTER_FAIL,
  GET_DOWNLOAD_TERMINAL_SUCCESS,
  GET_DOWNLOAD_TERMINAL_FAIL,  
} from "./actionTypes"

const initialState = {
  terminal: [],
  error: {},
  auditsTerminal: [],
  address: [],
  filterTerminal: [],
  currentTerminal: null,
  downloadTerminal: [],
}

const Terminal = (state = initialState, action) => {
  switch (action.type) {
    case GET_TERMINAL_SUCCESS:
      return {
        ...state,
        terminal: action.payload,
      }

    case GET_TERMINAL_FAIL:
      return {
        ...state,
        error: action.payload,
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

    case GET_TABLE_INFORMATION_SUCCESS:
      return {
        ...state,
        currentTerminal: action.payload,
      }

    case GET_TABLE_INFORMATION_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case UPDATE_TABLE_INFORMATION_SUCCESS:
      return {
        ...state,
        address: state.events.map(event =>
          event.id.toString() === action.payload.id.toString()
            ? { event, ...action.payload }
            : event
        ),
      }

    case UPDATE_TABLE_INFORMATION_FAIL:
      return {
        ...state,
        error: action.payload,
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

    default:
      return state
  }
}

export default Terminal
