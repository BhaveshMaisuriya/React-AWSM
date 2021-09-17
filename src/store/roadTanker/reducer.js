import {
  GET_ROAD_TANKER,
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
  GET_DOWNLOAD_ROAD_TANKER_SUCCESS,
  GET_DOWNLOAD_ROAD_TANKER_FAIL,
  GET_ROAD_TANKER_DETAIL_SUCCESS,
  GET_ROAD_TANKER_DETAIL_FAIL,
  UPDATE_ROAD_TANKER_DETAIL_SUCCESS,
  UPDATE_ROAD_TANKER_DETAIL_FAIL,
  RESET_CURRENT_ROAD_TANKER_DATA,
} from "./actionTypes"
import { ToastSuccess, ToastError } from "../../helpers/swal"
import formatDateResponseList from "../../helpers/format-response-data/format-date-response.helper"
const initialState = {
  roadTanker: [],
  error: {},
  tableError: null,
  auditsRoadTanker: [],
  address: [],
  filterRoadTanker: [],
  downloadRoadTanker: [],
  currentRoadTanker: {},
  isUpdateSuccess: null,
  isLoading: false,
}

const RoadTanker = (state = initialState, action) => {
  switch (action.type) {
    case GET_ROAD_TANKER:
      return {
        ...state,
        isLoading: true,
      }
    case GET_ROAD_TANKER_SUCCESS:
      const list = action.payload?.list;
      if(list && list.length > 0){
        action.payload = {...action.payload,list: formatDateResponseList(list)}
      }
      return {
        ...state,
        roadTanker: action.payload,
        tableError: null,
        isLoading: false,
        isUpdateSuccess: false,
      }

    case GET_ROAD_TANKER_FAIL:
      return {
        ...state,
        tableError: action.payload,
        isLoading: false,
      }

    case GET_DOWNLOAD_ROAD_TANKER_SUCCESS:
      return {
        ...state,
        downloadRoadTanker: action.payload,
      }

    case GET_DOWNLOAD_ROAD_TANKER_FAIL:
      return {
        ...state,
        downloadRoadTanker: action.payload,
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
    case GET_ROAD_TANKER_DETAIL_SUCCESS:
      return {
        ...state,
        currentRoadTanker: action.payload,
      }
    case RESET_CURRENT_ROAD_TANKER_DATA:
      return {
        ...state,
        currentRoadTanker: {},
      }
    case GET_ROAD_TANKER_DETAIL_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    case UPDATE_ROAD_TANKER_DETAIL_SUCCESS:
      ToastSuccess.fire()
      // let newRoadTanker = { ...state.roadTanker }
      // let newData = newRoadTanker.list
      // const index = newData.findIndex(
      //   v => v.vehicle === action?.payload?.data?.vehicle
      // )
      // newData[index] = action?.payload?.data
      return {
        ...state,
        // roadTanker: newRoadTanker,
        isUpdateSuccess: true,
      }
    case UPDATE_ROAD_TANKER_DETAIL_FAIL:
      ToastError.fire()
      return {
        ...state,
        error: action.payload,
        isUpdateSuccess: false,
      }
    default:
      return state
  }
}

export default RoadTanker
