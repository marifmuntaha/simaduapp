
import {SagaIterator} from "redux-saga";
import {userApiResponseError, userApiResponseSuccess} from "./actions";
import {UserActionTypes} from "./constants";
import {get as getApi, store as storeApi, destroy as destroyApi} from '../../utils/api/user'
import {all, call, fork, put, takeEvery} from "redux-saga/effects";

function* get(params): SagaIterator {
    try {
        const response = yield call(getApi, params.payload)
        const data = response && response.data.result
        yield put(userApiResponseSuccess(UserActionTypes.GET_USER, data))
    } catch (error){
        yield put(userApiResponseError(UserActionTypes.GET_USER, error))
    }
}

function* store({payload: {fullname, email, username, password, role, phone, image}}): SagaIterator {
    try {
        const response = yield call(storeApi, {fullname, email, username, password, role, phone, image});
        const data = response && response.data.result;
        yield put(userApiResponseSuccess(UserActionTypes.STORE_USER, data))
    } catch (error){
        yield put(userApiResponseError(UserActionTypes.STORE_USER, error))
    }
}

function* destroy(params): SagaIterator {
    try {
        const response = yield call(destroyApi, params.payload);
        const data = response && response.data.result
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

export function* watchDestroyUser() {
    yield takeEvery(UserActionTypes.DESTROY_USER, destroy);
}
function* userSaga(){
    yield all([fork(watchGetUsers), fork(watchStoreUser), fork(watchDestroyUser)])
}

export default userSaga;