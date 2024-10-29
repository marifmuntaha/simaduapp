
import {SagaIterator} from "redux-saga";
import {admissionSettingApiResponseError, admissionSettingApiResponseSuccess} from "./actions";
import {SettingActionTypes} from "./constants";
import {get as getApi, update as updateApi} from '../../../utils/api/admission/setting'
import {all, call, fork, put, takeEvery} from "redux-saga/effects";

function* get({payload: {params}}): SagaIterator {
    try {
        const response = yield call(getApi, params)
        const data = response && response.data
        yield put(admissionSettingApiResponseSuccess(SettingActionTypes.GET_SETTING, data))
    } catch (error){
        yield put(admissionSettingApiResponseError(SettingActionTypes.GET_SETTING, error))
    }
}

function* update({payload: {id, institution_id, name, alias, year_id, brochure, status, youtube}}): SagaIterator {
    try {
        const response = yield call(updateApi, {id, institution_id, name, alias, year_id, brochure, status, youtube});
        const data = response && response.data;
        yield put(admissionSettingApiResponseSuccess(SettingActionTypes.UPDATE_SETTING, data));
    } catch (error){
        yield put(admissionSettingApiResponseError(SettingActionTypes.UPDATE_SETTING, error))
    }
}

export function* watchGetSettings() {
    yield takeEvery(SettingActionTypes.GET_SETTING, get);
}

export function* watchUpdateSetting() {
    yield takeEvery(SettingActionTypes.UPDATE_SETTING, update);
    yield takeEvery(SettingActionTypes.UPDATE_SETTING, get);
}

function* settingSaga(){
    yield all([fork(watchGetSettings), fork(watchUpdateSetting)])
}

export {settingSaga};