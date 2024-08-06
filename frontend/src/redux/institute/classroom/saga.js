
import {SagaIterator} from "redux-saga";
import {classroomApiResponseError, classroomApiResponseSuccess} from "./actions";
import {ClassroomActionTypes} from "./constants";
import {get as getApi, store as storeApi, update as updateApi, destroy as destroyApi} from '../../../utils/api/institute/classroom'
import {all, call, fork, put, takeEvery} from "redux-saga/effects";

function* get({payload: {params}}): SagaIterator {
    try {
        const response = yield call(getApi, params)
        const data = response && response.data
        yield put(classroomApiResponseSuccess(ClassroomActionTypes.GET_CLASSROOM, data))
    } catch (error){
        yield put(classroomApiResponseError(ClassroomActionTypes.GET_CLASSROOM, error))
    }
}

function* store({payload: {institution_id, year_id, level_id, major_id, name, fullname}}): SagaIterator {
    try {
        const response = yield call(storeApi, {institution_id, year_id, level_id, major_id, name, fullname});
        const data = response && response.data;
        yield put(classroomApiResponseSuccess(ClassroomActionTypes.STORE_CLASSROOM, data));
    } catch (error){
        yield put(classroomApiResponseError(ClassroomActionTypes.STORE_CLASSROOM, error))
    }
}

function* update({payload: {id, institution_id, year_id, level_id, major_id, name, fullname}}): SagaIterator {
    try {
        const response = yield call(updateApi, {id, institution_id, year_id, level_id, major_id, name, fullname});
        const data = response && response.data;
        yield put(classroomApiResponseSuccess(ClassroomActionTypes.UPDATE_CLASSROOM, data));
    } catch (error){
        yield put(classroomApiResponseError(ClassroomActionTypes.UPDATE_CLASSROOM, error))
    }
}

function* destroy({payload: {params}}): SagaIterator {
    try {
        const response = yield call(destroyApi, params);
        const data = response && response.data
        yield put(classroomApiResponseSuccess(ClassroomActionTypes.DESTROY_CLASSROOM, data))
    } catch (error){
        yield put(classroomApiResponseError(ClassroomActionTypes.DESTROY_CLASSROOM, error))
    }
}

export function* watchGetClassrooms() {
    yield takeEvery(ClassroomActionTypes.GET_CLASSROOM, get);
}

export function* watchStoreClassroom() {
    yield takeEvery(ClassroomActionTypes.STORE_CLASSROOM, store);
    yield takeEvery(ClassroomActionTypes.STORE_CLASSROOM, get);
}

export function* watchUpdateClassroom() {
    yield takeEvery(ClassroomActionTypes.UPDATE_CLASSROOM, update);
    yield takeEvery(ClassroomActionTypes.UPDATE_CLASSROOM, get);
}

export function* watchDestroyClassroom() {
    yield takeEvery(ClassroomActionTypes.DESTROY_CLASSROOM, destroy);
    yield takeEvery(ClassroomActionTypes.DESTROY_CLASSROOM, get);
}
function* classroomSaga(){
    yield all([fork(watchGetClassrooms), fork(watchStoreClassroom), fork(watchUpdateClassroom), fork(watchDestroyClassroom)])
}

export default classroomSaga;