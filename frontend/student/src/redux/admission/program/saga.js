
import {SagaIterator} from "redux-saga";
import {admissionProgramApiResponseError, admissionProgramApiResponseSuccess} from "./actions";
import {AdmissionProgramActionTypes} from "./constants";
import {get as getApi, store as storeApi, update as updateApi, destroy as destroyApi} from '../../../utils/api/admission/program'
import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import {toastError, toastSuccess} from "../../../components";

function* get({payload: {params}}): SagaIterator {
    try {
        const response = yield call(getApi, params)
        const data = response && response.data
        yield put(admissionProgramApiResponseSuccess(AdmissionProgramActionTypes.GET_ADMISSION_PROGRAM, data))
    } catch (error){
        yield put(admissionProgramApiResponseError(AdmissionProgramActionTypes.GET_ADMISSION_PROGRAM, error))
    }
}

function* store({payload: {institution_id, year_id, name, alias, description}}): SagaIterator {
    try {
        const response = yield call(storeApi, {institution_id, year_id, name, alias, description});
        const data = response && response.data;
        yield put(admissionProgramApiResponseSuccess(AdmissionProgramActionTypes.STORE_ADMISSION_PROGRAM, data));
        toastSuccess(data.message);
    } catch (error){
        yield put(admissionProgramApiResponseError(AdmissionProgramActionTypes.STORE_ADMISSION_PROGRAM, error));
        toastError(error);
    }
}

function* update({payload: {id, institution_id, year_id, name, alias, description}}): SagaIterator {
    try {
        const response = yield call(updateApi, {id, institution_id, year_id, name, alias, description});
        const data = response && response.data;
        yield put(admissionProgramApiResponseSuccess(AdmissionProgramActionTypes.UPDATE_ADMISSION_PROGRAM, data));
        toastSuccess(data.message);
    } catch (error){
        yield put(admissionProgramApiResponseError(AdmissionProgramActionTypes.UPDATE_ADMISSION_PROGRAM, error));
        toastError(error);
    }
}

function* destroy({payload: {params}}): SagaIterator {
    try {
        const response = yield call(destroyApi, params);
        const data = response && response.data
        yield put(admissionProgramApiResponseSuccess(AdmissionProgramActionTypes.DESTROY_ADMISSION_PROGRAM, data));
        toastSuccess(data.message);
    } catch (error){
        yield put(admissionProgramApiResponseError(AdmissionProgramActionTypes.DESTROY_ADMISSION_PROGRAM, error))
        toastError(error);
    }
}

export function* watchGetPrograms() {
    yield takeEvery(AdmissionProgramActionTypes.GET_ADMISSION_PROGRAM, get);
}

export function* watchStoreProgram() {
    yield takeEvery(AdmissionProgramActionTypes.STORE_ADMISSION_PROGRAM, store);
}

export function* watchUpdateProgram() {
    yield takeEvery(AdmissionProgramActionTypes.UPDATE_ADMISSION_PROGRAM, update);
}

export function* watchDestroyProgram() {
    yield takeEvery(AdmissionProgramActionTypes.DESTROY_ADMISSION_PROGRAM, destroy);
}
function* admissionProgramSaga(){
    yield all([fork(watchGetPrograms), fork(watchStoreProgram), fork(watchUpdateProgram), fork(watchDestroyProgram)])
}

export default admissionProgramSaga;