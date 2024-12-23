import {SagaIterator} from "redux-saga";
import {fileApiResponseError, fileApiResponseSuccess} from "./actions";
import {FileActionTypes} from "./constants";
import {get as getApi, store as storeApi, update as updateApi, destroy as destroyApi} from '../../../utils/api/master/file'
import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import {toastError, toastSuccess} from "../../../components";

function* get({payload: {params}}): SagaIterator {
    try {
        const response = yield call(getApi, params)
        const data = response && response.data
        yield put(fileApiResponseSuccess(FileActionTypes.GET_FILE, data));
    } catch (error){
        yield put(fileApiResponseError(FileActionTypes.GET_FILE, error))
    }
}

function* store({payload: {institution_id, name, description, active}}): SagaIterator {
    try {
        const response = yield call(storeApi, {institution_id, name, description, active});
        const data = response && response.data;
        const result = data && data.result;
        yield put(fileApiResponseSuccess(FileActionTypes.STORE_FILE, data));
        toastSuccess(result.message);
    } catch (error){
        yield put(fileApiResponseError(FileActionTypes.STORE_FILE, error))
        toastError(error);
    }
}

function* update({payload: {id, institution_id, name, description, active}}): SagaIterator {
    try {
        const response = yield call(updateApi, {id, institution_id, name, description, active});
        const data = response && response.data;
        const result = data && data.data;
        yield put(fileApiResponseSuccess(FileActionTypes.UPDATE_FILE, data));
        toastSuccess(result.message);
    } catch (error){
        yield put(fileApiResponseError(FileActionTypes.UPDATE_FILE, error));
        toastError(error);
    }
}

function* destroy({payload: {params}}): SagaIterator {
    try {
        const response = yield call(destroyApi, params);
        const data = response && response.data
        yield put(fileApiResponseSuccess(FileActionTypes.DESTROY_FILE, data));
        toastSuccess(data.message);
    } catch (error){
        yield put(fileApiResponseError(FileActionTypes.DESTROY_FILE, error));
        toastError(error);
    }
}

export function* watchGetFiles() {
    yield takeEvery(FileActionTypes.GET_FILE, get);
}

export function* watchStoreFile() {
    yield takeEvery(FileActionTypes.STORE_FILE, store);
}

export function* watchUpdateFile() {
    yield takeEvery(FileActionTypes.UPDATE_FILE, update);
}

export function* watchDestroyFile() {
    yield takeEvery(FileActionTypes.DESTROY_FILE, destroy);
}
function* fileSaga(){
    yield all([fork(watchGetFiles), fork(watchStoreFile), fork(watchUpdateFile), fork(watchDestroyFile)])
}

export default fileSaga;