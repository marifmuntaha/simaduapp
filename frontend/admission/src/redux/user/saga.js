
import {SagaIterator} from "redux-saga";
import {userApiResponseError, userApiResponseSuccess} from "./actions";
import {UserActionTypes} from "./constants";
import {get as getApi, store as storeApi, update as updateApi, destroy as destroyApi} from '../../utils/api/user'
import {all, call, fork, put, takeEvery} from "redux-saga/effects";

function* get({payload: {params}}): SagaIterator {
    try {
        const response = yield call(getApi, params)
        const data = response && response.data;
        yield put(userApiResponseSuccess(UserActionTypes.GET_USER, data))
    } catch (error){
        yield put(userApiResponseError(UserActionTypes.GET_USER, error))
    }
}

function* store({payload: {fullname, email, username, password, role, phone, image}}): SagaIterator {
    try {
        const response = yield call(storeApi, {fullname, email, username, password, role, phone, image});
        const data = response && response.data;
        yield put(userApiResponseSuccess(UserActionTypes.STORE_USER, data));
    } catch (error){
        yield put(userApiResponseError(UserActionTypes.STORE_USER, error));
    }
}

function* update({payload: {id, fullname, email, username, password, role, phone, image}}): SagaIterator {
    try {
        const response = yield call(updateApi, {id, fullname, email, username, password, role, phone, image});
        const data = response && response.data;
        yield put(userApiResponseSuccess(UserActionTypes.UPDATE_USER, data));
    } catch (error){
        yield put(userApiResponseError(UserActionTypes.UPDATE_USER, error))
    }
}

function* destroy({payload: {params}}): SagaIterator {
    try {
        const response = yield call(destroyApi, params);
        const data = response && response.data;
        yield put(userApiResponseSuccess(UserActionTypes.DESTROY_USER, data))
    } catch (error){
        yield put(userApiResponseError(UserActionTypes.DESTROY_USER, error))
    }
}

export function* watchGetUsers() {
    yield takeEvery(UserActionTypes.GET_USER, get);
}

export function* watchStoreUser() {
    yield takeEvery(UserActionTypes.STORE_USER, store);
}

export function* watchUpdateUser() {
    yield takeEvery(UserActionTypes.UPDATE_USER, update);
}

export function* watchDestroyUser() {
    yield takeEvery(UserActionTypes.DESTROY_USER, destroy);
}
function* userSaga(){
    yield all([fork(watchGetUsers), fork(watchStoreUser), fork(watchUpdateUser), fork(watchDestroyUser)])
}

export default userSaga;