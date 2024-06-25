
import {SagaIterator} from "redux-saga";
import {majorApiResponseError, majorApiResponseSuccess} from "./actions";
import {MajorActionTypes} from "./constants";
import {get as getApi, store as storeApi, update as updateApi, destroy as destroyApi} from '../../../utils/api/master/major'
import {all, call, fork, put, takeEvery} from "redux-saga/effects";

function* get({payload: {params}}): SagaIterator {
    try {
        const response = yield call(getApi, params)
        const data = response && response.data
        yield put(majorApiResponseSuccess(MajorActionTypes.GET_MAJOR, data))
    } catch (error){
        yield put(majorApiResponseError(MajorActionTypes.GET_MAJOR, error))
    }
}

function* store({payload: {ladder_id, name, alias, description}}): SagaIterator {
    try {
        const response = yield call(storeApi, {ladder_id, name, alias, description});
        const data = response && response.data;
        yield put(majorApiResponseSuccess(MajorActionTypes.STORE_MAJOR, data));
    } catch (error){
        yield put(majorApiResponseError(MajorActionTypes.STORE_MAJOR, error))
    }
}

function* update({payload: {id, ladder_id, name, alias, description}}): SagaIterator {
    try {
        const response = yield call(updateApi, {id, ladder_id, name, alias, description});
        const data = response && response.data;
        yield put(majorApiResponseSuccess(MajorActionTypes.UPDATE_MAJOR, data));
    } catch (error){
        yield put(majorApiResponseError(MajorActionTypes.UPDATE_MAJOR, error))
    }
}

function* destroy({payload: {params}}): SagaIterator {
    try {
        const response = yield call(destroyApi, params);
        const data = response && response.data
        yield put(majorApiResponseSuccess(MajorActionTypes.DESTROY_MAJOR, data))
    } catch (error){
        yield put(majorApiResponseError(MajorActionTypes.DESTROY_MAJOR, error))
    }
}

export function* watchGetMajors() {
    yield takeEvery(MajorActionTypes.GET_MAJOR, get);
}

export function* watchStoreMajor() {
    yield takeEvery(MajorActionTypes.STORE_MAJOR, store);
}

export function* watchUpdateMajor() {
    yield takeEvery(MajorActionTypes.UPDATE_MAJOR, update);
}

export function* watchDestroyMajor() {
    yield takeEvery(MajorActionTypes.DESTROY_MAJOR, destroy);
}
function* majorSaga(){
    yield all([fork(watchGetMajors), fork(watchStoreMajor), fork(watchUpdateMajor), fork(watchDestroyMajor)])
}

export default majorSaga;