
import {SagaIterator} from "redux-saga";
import {studentApiResponseError, studentApiResponseSuccess} from "./actions";
import {StudentActionTypes} from "./constants";
import {get as getApi, store as storeApi, update as updateApi, destroy as destroyApi} from '../../utils/api/student'
import {all, call, fork, put, takeEvery} from "redux-saga/effects";

function* get({payload: {params}}): SagaIterator {
    try {
        const response = yield call(getApi, params)
        const data = response && response.data
        yield put(studentApiResponseSuccess(StudentActionTypes.GET_STUDENT, data))
    } catch (error){
        yield put(studentApiResponseError(StudentActionTypes.GET_STUDENT, error))
    }
}

function* store({payload: {user_id, nism, nisn, nik, name, birthplace, birthdate, gender, orderborn, sibling, phone, email, province_id, city_id, district_id, village_id, address, boarding, oneemis, onevervalpd, parent_id}}): SagaIterator {
    try {
        const response = yield call(storeApi, {user_id, nism, nisn, nik, name, birthplace, birthdate, gender, orderborn, sibling, phone, email, province_id, city_id, district_id, village_id, address, boarding, oneemis, onevervalpd, parent_id});
        const data = response && response.data;
        yield put(studentApiResponseSuccess(StudentActionTypes.STORE_STUDENT, data));
    } catch (error){
        yield put(studentApiResponseError(StudentActionTypes.STORE_STUDENT, error))
    }
}

function* update({payload: {id, institution_id, year_id, level_id, major_id, name, fullname}}): SagaIterator {
    try {
        const response = yield call(updateApi, {id, institution_id, year_id, level_id, major_id, name, fullname});
        const data = response && response.data;
        yield put(studentApiResponseSuccess(StudentActionTypes.UPDATE_STUDENT, data));
    } catch (error){
        yield put(studentApiResponseError(StudentActionTypes.UPDATE_STUDENT, error))
    }
}

function* destroy({payload: {params}}): SagaIterator {
    try {
        const response = yield call(destroyApi, params);
        const data = response && response.data
        yield put(studentApiResponseSuccess(StudentActionTypes.DESTROY_STUDENT, data))
    } catch (error){
        yield put(studentApiResponseError(StudentActionTypes.DESTROY_STUDENT, error))
    }
}

export function* watchGetStudents() {
    yield takeEvery(StudentActionTypes.GET_STUDENT, get);
}

export function* watchStoreStudent() {
    yield takeEvery(StudentActionTypes.STORE_STUDENT, store);
    yield takeEvery(StudentActionTypes.STORE_STUDENT, get);
}

export function* watchUpdateStudent() {
    yield takeEvery(StudentActionTypes.UPDATE_STUDENT, update);
    yield takeEvery(StudentActionTypes.UPDATE_STUDENT, get);
}

export function* watchDestroyStudent() {
    yield takeEvery(StudentActionTypes.DESTROY_STUDENT, destroy);
    yield takeEvery(StudentActionTypes.DESTROY_STUDENT, get);
}
function* studentSaga(){
    yield all([fork(watchGetStudents), fork(watchStoreStudent), fork(watchUpdateStudent), fork(watchDestroyStudent)])
}

export default studentSaga;