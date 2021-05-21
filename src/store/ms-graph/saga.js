import { call, put, takeEvery } from "redux-saga/effects"

import {
    GET_USER_PROPERTIES,
    GET_USER_IMAGE,
} from "./actionTypes"

import {
    getUserPropertiesSuccess,
    getUserPropertiesFail,
    getUserImageSuccess,
    getUserImageFail,
} from "./actions"

import {
    getUserProperties,
    getUserImage,
} from "../../helpers/ms_graph_helper"

function* onGetUserProperties() {
    try {
        console.log("ENTER TRY")
        const response = yield call(getUserProperties);
        // ADTODO
        // yield put(getUserPropertiesSuccess(response))
        yield put(getUserPropertiesSuccess(response.data))
    } catch (error) {
        yield put(getUserPropertiesFail(error))
    }
}

function* onGetUserImage({ params = "" }) {
    try {
        const response = yield call(getUserImage, params);
        yield put(getUserImageSuccess(response))
    } catch (error) {
        yield put(getUserImageFail(error))
    }
}

function* msGraphSaga() {
    yield takeEvery(GET_USER_PROPERTIES, onGetUserProperties)
    yield takeEvery(GET_USER_IMAGE, onGetUserImage)
}

export default msGraphSaga