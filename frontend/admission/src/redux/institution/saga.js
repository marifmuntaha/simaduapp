
import {SagaIterator} from "redux-saga";
import {institutionApiResponseError, institutionApiResponseSuccess} from "./actions";
import {InstitutionActionTypes} from "./constants";
import {get as getApi, store as storeApi, update as updateApi, destroy as destroyApi} from '../../utils/api/institution'
import {all, call, fork, put, takeEvery} from "redux-saga/effects";

function* get({payload: {params}}): SagaIterator {
    try {
        const response = yield call(getApi, params)
        const data = response && response.data
        yield put(institutionApiResponseSuccess(InstitutionActionTypes.GET_INSTITUTION, data))
    } catch (error){
        yield put(institutionApiResponseError(InstitutionActionTypes.GET_INSTITUTION, error))
    }
}

function* store({payload: {user_id, ladder_id, name, alias, nsm, npsn, headmaster, logo}}): SagaIterator {
    try {
        const response = yield call(storeApi, {user_id, ladder_id, name, alias, nsm, npsn, headmaster, logo});
        const data = response && response.data;
        yield put(institutionApiResponseSuccess(InstitutionActionTypes.STORE_INSTITUTION, data));
    } catch (error){
        yield put(institutionApiResponseError(InstitutionActionTypes.STORE_INSTITUTION, error))
    }
}

function* update({payload: {id, user_id, ladder_id, name, alias, nsm, npsn, headmaster, logo}}): SagaIterator {
    try {
        const response = yield call(updateApi, {id, user_id, ladder_id, name, alias, nsm, npsn, headmaster, logo});
        const data = response && response.data;
        yield put(institutionApiResponseSuccess(InstitutionActionTypes.UPDATE_INSTITUTION, data));
    } catch (error){
        yield put(institutionApiResponseError(InstitutionActionTypes.UPDATE_INSTITUTION, error))
    }
}

function* destroy({payload: {params}}): SagaIterator {
    try {
        const response = yield call(destroyApi, params);
        const data = response && response.data
        yield put(institutionApiResponseSuccess(InstitutionActionTypes.DESTROY_INSTITUTION, data))
    } catch (error){
        yield put(institutionApiResponseError(InstitutionActionTypes.DESTROY_INSTITUTION, error))
    }
}

export function* watchGetInstitutions() {
    yield takeEvery(InstitutionActionTypes.GET_INSTITUTION, get);
}

export function* watchStoreInstitution() {
    yield takeEvery(InstitutionActionTypes.STORE_INSTITUTION, store);
}

export function* watchUpdateInstitution() {
    yield takeEvery(InstitutionActionTypes.UPDATE_INSTITUTION, update);
}

export function* watchDestroyInstitution() {
    yield takeEvery(InstitutionActionTypes.DESTROY_INSTITUTION, destroy);
}
function* institutionSaga(){
    yield all([fork(watchGetInstitutions), fork(watchStoreInstitution), fork(watchUpdateInstitution), fork(watchDestroyInstitution)])
}

export default institutionSaga;