
import {SagaIterator} from "redux-saga";
import {programApiResponseError, programApiResponseSuccess} from "./actions";
import {ProgramActionTypes} from "./constants";
import {get as getApi, store as storeApi, update as updateApi, destroy as destroyApi} from '../../../utils/api/institute/program'
import {all, call, fork, put, takeEvery} from "redux-saga/effects";

function* get({payload: {params}}): SagaIterator {
    try {
        const response = yield call(getApi, params)
        const data = response && response.data
        yield put(programApiResponseSuccess(ProgramActionTypes.GET_PROGRAM, data))
    } catch (error){
        yield put(programApiResponseError(ProgramActionTypes.GET_PROGRAM, error))
    }
}

function* store({payload: {institution_id, year_id, name, alias, description, boarding}}): SagaIterator {
    try {
        const response = yield call(storeApi, {institution_id, year_id, name, alias, description, boarding});
        const data = response && response.data;
        yield put(programApiResponseSuccess(ProgramActionTypes.STORE_PROGRAM, data));
    } catch (error){
        yield put(programApiResponseError(ProgramActionTypes.STORE_PROGRAM, error))
    }
}

function* update({payload: {id, institution_id, year_id, name, alias, description, boarding}}): SagaIterator {
    try {
        const response = yield call(updateApi, {id, institution_id, year_id, name, alias, description, boarding});
        const data = response && response.data;
        yield put(programApiResponseSuccess(ProgramActionTypes.UPDATE_PROGRAM, data));
    } catch (error){
        yield put(programApiResponseError(ProgramActionTypes.UPDATE_PROGRAM, error))
    }
}

function* destroy({payload: {params}}): SagaIterator {
    try {
        const response = yield call(destroyApi, params);
        const data = response && response.data
        yield put(programApiResponseSuccess(ProgramActionTypes.DESTROY_PROGRAM, data))
    } catch (error){
        yield put(programApiResponseError(ProgramActionTypes.DESTROY_PROGRAM, error))
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