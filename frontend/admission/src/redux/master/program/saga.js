
import {SagaIterator} from "redux-saga";
import {ProgramApiResponseError, ProgramApiResponseSuccess} from "./actions";
import {ProgramActionTypes} from "./constants";
import {get as getApi, store as storeApi, update as updateApi, destroy as destroyApi} from '../../../utils/api/master/program'
import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import {toastError, toastSuccess} from "../../../components";

function* get({payload: {params}}): SagaIterator {
    try {
        const response = yield call(getApi, params)
        const data = response && response.data
        yield put(ProgramApiResponseSuccess(ProgramActionTypes.GET_PROGRAM, data))
    } catch (error){
        yield put(ProgramApiResponseError(ProgramActionTypes.GET_PROGRAM, error))
    }
}

function* store({payload: {institution_id, year_id, name, alias, description}}): SagaIterator {
    try {
        const response = yield call(storeApi, {institution_id, year_id, name, alias, description});
        const data = response && response.data;
        yield put(ProgramApiResponseSuccess(ProgramActionTypes.STORE_PROGRAM, data));
        toastSuccess(data.message);
    } catch (error){
        yield put(ProgramApiResponseError(ProgramActionTypes.STORE_PROGRAM, error));
        toastError(error);
    }
}

function* update({payload: {id, institution_id, year_id, name, alias, description}}): SagaIterator {
    try {
        const response = yield call(updateApi, {id, institution_id, year_id, name, alias, description});
        const data = response && response.data;
        yield put(ProgramApiResponseSuccess(ProgramActionTypes.UPDATE_PROGRAM, data));
        toastSuccess(data.message);
    } catch (error){
        yield put(ProgramApiResponseError(ProgramActionTypes.UPDATE_PROGRAM, error));
        toastError(error);
    }
}

function* destroy({payload: {params}}): SagaIterator {
    try {
        const response = yield call(destroyApi, params);
        const data = response && response.data
        yield put(ProgramApiResponseSuccess(ProgramActionTypes.DESTROY_PROGRAM, data));
        toastSuccess(data.message);
    } catch (error){
        yield put(ProgramApiResponseError(ProgramActionTypes.DESTROY_PROGRAM, error))
        toastError(error);
    }
}

export function* watchGetPrograms() {
    yield takeEvery(ProgramActionTypes.GET_PROGRAM, get);
}

export function* watchStoreProgram() {
    yield takeEvery(ProgramActionTypes.STORE_PROGRAM, store);
}

export function* watchUpdateProgram() {
    yield takeEvery(ProgramActionTypes.UPDATE_PROGRAM, update);
}

export function* watchDestroyProgram() {
    yield takeEvery(ProgramActionTypes.DESTROY_PROGRAM, destroy);
}
function* programSaga(){
    yield all([fork(watchGetPrograms), fork(watchStoreProgram), fork(watchUpdateProgram), fork(watchDestroyProgram)])
}

export default programSaga;