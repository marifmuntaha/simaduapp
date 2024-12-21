
import {SagaIterator} from "redux-saga";
import {studentParentApiResponseError, studentParentApiResponseSuccess} from "./actions";
import {StudentParentActionTypes} from "./constants";
import {get as getApi, store as storeApi, update as updateApi, destroy as destroyApi} from '../../utils/api/studentParent'
import {all, call, fork, put, takeEvery} from "redux-saga/effects";

function* get({payload: {params}}): SagaIterator {
    try {
        const response = yield call(getApi, params)
        const data = response && response.data
        yield put(studentParentApiResponseSuccess(StudentParentActionTypes.GET_STUDENT_PARENT, data))
    } catch (error){
        yield put(studentParentApiResponseError(StudentParentActionTypes.GET_STUDENT_PARENT, error))
    }
}

function* store({payload: {user_id, student_id, number_kk, head_family, father_status, father_name,
    father_nik, father_birthplace, father_birthday, father_email, father_phone, mother_status, mother_name,
    mother_nik, mother_birthplace, mother_birthday, mother_email, mother_phone, guard_status, guard_name, guard_nik,
    guard_birthplace, guard_birthday, guard_email, guard_phone
}}): SagaIterator {
    try {
        const response = yield call(storeApi, {user_id, student_id, number_kk, head_family, father_status, father_name,
            father_nik, father_birthplace, father_birthday, father_email, father_phone, mother_status, mother_name,
            mother_nik, mother_birthplace, mother_birthday, mother_email, mother_phone, guard_status, guard_name, guard_nik,
            guard_birthplace, guard_birthday, guard_email, guard_phone});
        const data = response && response.data;
        yield put(studentParentApiResponseSuccess(StudentParentActionTypes.STORE_STUDENT_PARENT, data));
    } catch (error){
        yield put(studentParentApiResponseError(StudentParentActionTypes.STORE_STUDENT_PARENT, error))
    }
}

function* update({payload: {id, institution_id, year_id, level_id, major_id, name, fullname}}): SagaIterator {
    try {
        const response = yield call(updateApi, {id, institution_id, year_id, level_id, major_id, name, fullname});
        const data = response && response.data;
        yield put(studentParentApiResponseSuccess(StudentParentActionTypes.UPDATE_STUDENT_PARENT, data));
    } catch (error){
        yield put(studentParentApiResponseError(StudentParentActionTypes.UPDATE_STUDENT_PARENT, error))
    }
}

function* destroy({payload: {params}}): SagaIterator {
    try {
        const response = yield call(destroyApi, params);
        const data = response && response.data
        yield put(studentParentApiResponseSuccess(StudentParentActionTypes.DESTROY_STUDENT_PARENT, data))
    } catch (error){
        yield put(studentParentApiResponseError(StudentParentActionTypes.DESTROY_STUDENT_PARENT, error))
    }
}

export function* watchGetStudentParents() {
    yield takeEvery(StudentParentActionTypes.GET_STUDENT_PARENT, get);
}

export function* watchStoreStudentParent() {
    yield takeEvery(StudentParentActionTypes.STORE_STUDENT_PARENT, store);
    yield takeEvery(StudentParentActionTypes.STORE_STUDENT_PARENT, get);
}

export function* watchUpdateStudentParent() {
    yield takeEvery(StudentParentActionTypes.UPDATE_STUDENT_PARENT, update);
    yield takeEvery(StudentParentActionTypes.UPDATE_STUDENT_PARENT, get);
}

export function* watchDestroyStudentParent() {
    yield takeEvery(StudentParentActionTypes.DESTROY_STUDENT_PARENT, destroy);
    yield takeEvery(StudentParentActionTypes.DESTROY_STUDENT_PARENT, get);
}
function* studentParentSaga(){
    yield all([fork(watchGetStudentParents), fork(watchStoreStudentParent), fork(watchUpdateStudentParent), fork(watchDestroyStudentParent)])
}

export default studentParentSaga;