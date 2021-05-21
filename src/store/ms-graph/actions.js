import {
    GET_USER_PROPERTIES,
    GET_USER_PROPERTIES_SUCCESS,
    GET_USER_PROPERTIES_FAIL,
    GET_USER_IMAGE,
    GET_USER_IMAGE_SUCCESS,
    GET_USER_IMAGE_FAIL
} from './actionTypes';


export const getUserProperties = () => ({
    type: GET_USER_PROPERTIES,
})

export const getUserPropertiesSuccess = properties => ({
    type: GET_USER_PROPERTIES_SUCCESS,
    payload: properties,
})

export const getUserPropertiesFail = error => ({
    type: GET_USER_PROPERTIES_FAIL,
    payload: error,
})

export const getUserImage = params => ({
    type: GET_USER_IMAGE,
    params
})

export const getUserImageSuccess = image => ({
    type: GET_USER_IMAGE_SUCCESS,
    payload: image,
})

export const getUserImageFail = error => ({
    type: GET_USER_IMAGE_FAIL,
    payload: error,
})
