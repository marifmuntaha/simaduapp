
import {SagaIterator} from "redux-saga";
import {yearApiResponseError, yearApiResponseSuccess} from "./actions";
import {YearActionTypes} from "./constants";
import {get as getApi, store as storeApi, update as updateApi, destroy as destroyApi} from '../../../utils/api/master/year'
import {all, call, fork, put, takeEvery} from "redux-saga/effects";

function* get({payload: {params}}): SagaIterator {
    try {
        const response = yield call(getApi, params)
        const data = response && response.data.result
        yield put(yearApiResponseSuccess(YearActionTypes.GET_YEAR, data))
    } catch (error){
        yield put(yearApiResponseError(YearActionTypes.GET_YEAR, error))
    }
}

function* store({payload: {name, description, active}}): SagaIterator {
    try {
        const response = yield call(storeApi, {name, description, active});
        const data = response && response.data.result;
        yield put(yearApiResponseSuccess(YearActionTypes.STORE_YEAR, data));
    } catch (error){
        yield put(yearApiResponseError(YearActionTypes.STORE_YEAR, error))
    }
}

function* update({payload: {id, name, description, active}}): SagaIterator {
    try {
        const response = yield call(updateApi, {id, name, description, active});
        const data = response && response.data.result;
        yield put(yearApiResponseSuccess(YearActionTypes.UPDATE_YEAR, data));
    } catch (error){
        yield put(yearApiResponseError(YearActionTypes.UPDATE_YEAR, error))
    }
}

function* destroy({payload: {params}}): SagaIterator {
    try {
        const response = yield call(destroyApi, params);
        const data = response && response.data.result
        yield put(yearApiResponseSuccess(YearActionTypes.DESTROY_YEAR, data))
    } catch (error){
        yield put(yearApiResponseError(YearActionTypes.DESTROY_YEAR, error))
    }
}

export function* watchGetYears() {
    yield takeEvery(YearActionTypes.GET_YEAR, get);
}

export function* watchStoreYear() {
    yield takeEvery(YearActionTypes.STORE_YEAR, store);
    yield takeEvery(YearActionTypes.STORE_YEAR, get);
}

export function* watchUpdateYear() {
    yield takeEvery(YearActionTypes.UPDATE_YEAR, update);
    yield takeEvery(YearActionTypes.UPDATE_YEAR, get);
}

export function* watchDestroyYear() {
    yield takeEvery(YearActionTypes.DESTROY_YEAR, destroy);
    yield takeEvery(YearActionTypes.DESTROY_YEAR, get);
}
function* yearSaga(){
    yield all([fork(watchGetYears), fork(watchStoreYear), fork(watchUpdateYear), fork(watchDestroyYear)])
}

export default yearSaga;