
import {SagaIterator} from "redux-saga";
import {SettingApiResponseError, SettingApiResponseSuccess} from "./actions";
import {PPDBSettingActionTypes} from "./constants";
import {get as getApi, show as showApi, update as updateApi} from '../../../utils/api/ppdb/setting'
import {all, call, fork, put, takeEvery} from "redux-saga/effects";

function* get({payload: {params}}): SagaIterator {
    try {
        const response = yield call(getApi, params)
        const data = response && response.data
        yield put(SettingApiResponseSuccess(PPDBSettingActionTypes.GET_PPDBSETTING, data))
    } catch (error){
        yield put(SettingApiResponseError(PPDBSettingActionTypes.GET_PPDBSETTING, error))
    }
}

function* show({payload: {params}}): SagaIterator {
    try {
        const response = yield call(showApi, params);
        const data = response && response.data;
        yield put(SettingApiResponseSuccess(PPDBSettingActionTypes.SHOW_PPDBSETTING, data));
    } catch (error){
        yield put(SettingApiResponseError(PPDBSettingActionTypes.SHOW_PPDBSETTING, error))
    }
}

function* update({payload: {id, institution, name, alias, year, brochure, status, youtube}}): SagaIterator {
    try {
        const response = yield call(updateApi, {id, institution, name, alias, year, brochure, status, youtube});
        const data = response && response.data;
        yield put(SettingApiResponseSuccess(PPDBSettingActionTypes.UPDATE_PPDBSETTING, data));
    } catch (error){
        yield put(SettingApiResponseError(PPDBSettingActionTypes.UPDATE_PPDBSETTING, error))
    }
}

export function* watchGetSettings() {
    yield takeEvery(PPDBSettingActionTypes.GET_PPDBSETTING, get);
}

export function* watchShowSettings() {
    yield takeEvery(PPDBSettingActionTypes.SHOW_PPDBSETTING, show);
}


export function* watchUpdateSetting() {
    yield takeEvery(PPDBSettingActionTypes.UPDATE_PPDBSETTING, update);
    yield takeEvery(PPDBSettingActionTypes.UPDATE_PPDBSETTING, get);
}

function* PPDBSettingSaga(){
    yield all([fork(watchGetSettings), fork(watchUpdateSetting), fork(watchShowSettings)])
}

export default PPDBSettingSaga;