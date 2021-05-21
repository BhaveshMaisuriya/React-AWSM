import {
    GET_USER_PROPERTIES_SUCCESS,
    GET_USER_PROPERTIES_FAIL,
    GET_USER_IMAGE_SUCCESS,
    GET_USER_IMAGE_FAIL
} from "./actionTypes"

const initialState = {
    userProperties: [],
    userImage: [],
    error: {},
}

const msGraph = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_PROPERTIES_SUCCESS:
            return {
                ...state,
                userProperties: action.payload,
            }

        case GET_USER_PROPERTIES_FAIL:
            return {
                ...state,
                error: action.payload,
            }

        case GET_USER_IMAGE_SUCCESS:
            return {
                ...state,
                userImage: action.payload,
            }

        case GET_USER_IMAGE_FAIL:
            return {
                ...state,
                error: action.payload,
            }

        default:
            return state
    }
}

export default msGraph
