
import {SagaIterator} from "redux-saga";
import {SettingApiResponseError, SettingApiResponseSuccess} from "./actions";
import {SettingActionTypes} from "./constants";
import {get as getApi, update as updateApi} from '../../utils/api/setting'
import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import {toastError, toastSuccess} from "../../components";

function* get({payload: {params}}): SagaIterator {
    try {
        const response = yield call(getApi, params)
        const data = response && response.data
        yield put(SettingApiResponseSuccess(SettingActionTypes.GET_SETTING, data))
    } catch (error){
        yield put(SettingApiResponseError(SettingActionTypes.GET_SETTING, error))
    }
}

function* update({payload: {id, institution_id, name, alias, year_id, brochure, status, youtube}}): SagaIterator {
    try {
        const response = yield call(updateApi, {id, institution_id, name, alias, year_id, brochure, status, youtube});
        const data = response && response.data;
        yield put(SettingApiResponseSuccess(SettingActionTypes.UPDATE_SETTING, data));
        toastSuccess(data.message);
    } catch (error){
        yield put(SettingApiResponseError(SettingActionTypes.UPDATE_SETTING, error))
        toastError(error);
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

export default settingSaga;