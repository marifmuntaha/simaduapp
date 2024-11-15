
import {SagaIterator} from "redux-saga";
import {admissionSettingApiResponseError, admissionSettingApiResponseSuccess} from "./actions";
import {AdmissionSettingActionTypes} from "./constants";
import {get as getApi, update as updateApi} from '../../../utils/api/admission/setting'
import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import {toastError, toastSuccess} from "../../../components";

function* get({payload: {params}}): SagaIterator {
    try {
        const response = yield call(getApi, params)
        const data = response && response.data
        yield put(admissionSettingApiResponseSuccess(AdmissionSettingActionTypes.GET_ADMISSION_SETTING, data))
    } catch (error){
        yield put(admissionSettingApiResponseError(AdmissionSettingActionTypes.GET_ADMISSION_SETTING, error))
    }
}

function* update({payload: {id, institution_id, name, alias, year_id, brochure, status, youtube}}): SagaIterator {
    try {
        const response = yield call(updateApi, {id, institution_id, name, alias, year_id, brochure, status, youtube});
        const data = response && response.data;
        yield put(admissionSettingApiResponseSuccess(AdmissionSettingActionTypes.UPDATE_ADMISSION_SETTING, data));
        toastSuccess(data.message);
    } catch (error){
        yield put(admissionSettingApiResponseError(AdmissionSettingActionTypes.UPDATE_ADMISSION_SETTING, error))
        toastError(error);
    }
}

export function* watchGetSettings() {
    yield takeEvery(AdmissionSettingActionTypes.GET_ADMISSION_SETTING, get);
}

export function* watchUpdateSetting() {
    yield takeEvery(AdmissionSettingActionTypes.UPDATE_ADMISSION_SETTING, update);
    yield takeEvery(AdmissionSettingActionTypes.UPDATE_ADMISSION_SETTING, get);
}

function* admissionSettingSaga(){
    yield all([fork(watchGetSettings), fork(watchUpdateSetting)])
}

export default admissionSettingSaga;