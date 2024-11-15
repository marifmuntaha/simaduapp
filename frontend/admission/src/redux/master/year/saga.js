
import {SagaIterator} from "redux-saga";
import {yearApiResponseError, yearApiResponseSuccess} from "./actions";
import {YearActionTypes} from "./constants";
import {get as getApi, store as storeApi, update as updateApi, destroy as destroyApi} from '../../../utils/api/master/year'
import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import {toastError, toastSuccess} from "../../../components";

function* get({payload: {params}}): SagaIterator {
    try {
        const response = yield call(getApi, params)
        const data = response && response.data
        yield put(yearApiResponseSuccess(YearActionTypes.GET_YEAR, data));
    } catch (error){
        yield put(yearApiResponseError(YearActionTypes.GET_YEAR, error))
    }
}

function* store({payload: {institution_id, name, description, active}}): SagaIterator {
    try {
        const response = yield call(storeApi, {institution_id, name, description, active});
        const data = response && response.data;
        const result = data && data.result;
        yield put(yearApiResponseSuccess(YearActionTypes.STORE_YEAR, data));
        toastSuccess(result.message);
    } catch (error){
        yield put(yearApiResponseError(YearActionTypes.STORE_YEAR, error))
        toastError(error);
    }
}

function* update({payload: {id, institution_id, name, description, active}}): SagaIterator {
    try {
        const response = yield call(updateApi, {id, institution_id, name, description, active});
        const data = response && response.data;
        const result = data && data.data;
        yield put(yearApiResponseSuccess(YearActionTypes.UPDATE_YEAR, data));
        toastSuccess(result.message);
    } catch (error){
        yield put(yearApiResponseError(YearActionTypes.UPDATE_YEAR, error));
        toastError(error);
    }
}

function* destroy({payload: {params}}): SagaIterator {
    try {
        const response = yield call(destroyApi, params);
        const data = response && response.data
        yield put(yearApiResponseSuccess(YearActionTypes.DESTROY_YEAR, data));
        toastSuccess(data.message);
    } catch (error){
        yield put(yearApiResponseError(YearActionTypes.DESTROY_YEAR, error));
        toastError(error);
    }
}

export function* watchGetYears() {
    yield takeEvery(YearActionTypes.GET_YEAR, get);
}

export function* watchStoreYear() {
    yield takeEvery(YearActionTypes.STORE_YEAR, store);
}

export function* watchUpdateYear() {
    yield takeEvery(YearActionTypes.UPDATE_YEAR, update);
}

export function* watchDestroyYear() {
    yield takeEvery(YearActionTypes.DESTROY_YEAR, destroy);
}
function* yearSaga(){
    yield all([fork(watchGetYears), fork(watchStoreYear), fork(watchUpdateYear), fork(watchDestroyYear)])
}

export default yearSaga;