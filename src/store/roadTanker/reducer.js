import {
  GET_ROAD_TANKER_FAIL,
  GET_ROAD_TANKER_SUCCESS,
  GET_ROADTANKER_AUDITLOG_SUCCESS,
  GET_ROADTANKER_AUDITLOG_FAIL,
  GET_TABLE_INFORMATION_FAIL,
  GET_TABLE_INFORMATION_SUCCESS,
  UPDATE_TABLE_INFORMATION_SUCCESS,
  UPDATE_TABLE_INFORMATION_FAIL,
  GET_ROADTANKER_FILTER_SUCCESS,
  GET_ROADTANKER_FILTER_FAIL,
} from "./actionTypes"

const initialState = {
  roadTanker: [],
  error: {},
  auditsRoadTanker: [],
  address: [],
  filterRoadTanker: [],
}

const RoadTanker = (state = initialState, action) => {
  switch (action.type) {
    case GET_ROAD_TANKER_SUCCESS:
      return {
        ...state,
        retailCustomers: action.payload,
      }

    case GET_ROAD_TANKER_FAIL:
      return {
        ...state,
        retailCustomers: action.payload,
      }

    case GET_ROADTANKER_AUDITLOG_SUCCESS:
      return {
        ...state,
        auditsRoadTanker: action.payload,
      }

    case GET_ROADTANKER_AUDITLOG_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_TABLE_INFORMATION_SUCCESS:
      return {
        ...state,
        address: action.payload,
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

    case GET_ROADTANKER_FILTER_SUCCESS:
      return {
        ...state,
        filterRoadTanker: action.payload,
      }

    case GET_ROADTANKER_FILTER_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default RoadTanker
