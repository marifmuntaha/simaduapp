
import {SagaIterator} from "redux-saga";
import {admissionProgramApiResponseError, admissionProgramApiResponseSuccess} from "./actions";
import {ProgramActionTypes} from "./constants";
import {get as getApi, store as storeApi, update as updateApi, destroy as destroyApi} from '../../../utils/api/admission/program'
import {all, call, fork, put, takeEvery} from "redux-saga/effects";

function* get({payload: {params}}): SagaIterator {
    try {
        const response = yield call(getApi, params)
        const data = response && response.data
        yield put(admissionProgramApiResponseError(ProgramActionTypes.GET_PROGRAM, data))
    } catch (error){
        yield put(admissionProgramApiResponseSuccess(ProgramActionTypes.GET_PROGRAM, error))
    }
}

function* store({payload: {institution_id, year_id, name, alias, description}}): SagaIterator {
    try {
        const response = yield call(storeApi, {institution_id, year_id, name, alias, description});
        const data = response && response.data;
        yield put(admissionProgramApiResponseError(ProgramActionTypes.STORE_PROGRAM, data));
    } catch (error){
        yield put(admissionProgramApiResponseSuccess(ProgramActionTypes.STORE_PROGRAM, error))
    }
}

function* update({payload: {id, institution_id, year_id, name, alias, description}}): SagaIterator {
    try {
        const response = yield call(updateApi, {id, institution_id, year_id, name, alias, description});
        const data = response && response.data;
        yield put(admissionProgramApiResponseError(ProgramActionTypes.UPDATE_PROGRAM, data));
    } catch (error){
        yield put(admissionProgramApiResponseSuccess(ProgramActionTypes.UPDATE_PROGRAM, error))
    }
}

function* destroy({payload: {params}}): SagaIterator {
    try {
        const response = yield call(destroyApi, params);
        const data = response && response.data
        yield put(admissionProgramApiResponseError(ProgramActionTypes.DESTROY_PROGRAM, data))
    } catch (error){
        yield put(admissionProgramApiResponseSuccess(ProgramActionTypes.DESTROY_PROGRAM, error))
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

export {programSaga};