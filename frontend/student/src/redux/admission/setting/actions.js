import {AdmissionSettingActionTypes} from "./constants";

export const admissionSettingApiResponseSuccess = (actionType, data) => ({
    type: AdmissionSettingActionTypes.API_RESPONSE_SUCCESS,
    payload: { actionType, data }
});

export const admissionSettingApiResponseError = (actionType, error) => ({
    type: AdmissionSettingActionTypes.API_RESPONSE_ERROR,
    payload: { actionType, error },
});

export const getAdmissionSetting = (params) => ({
    type: AdmissionSettingActionTypes.GET_ADMISSION_SETTING,
    payload: {params},
});

export const updateAdmissionSetting = ({formData: [id, institution_id, name, alias, year_id, brochure, status, youtube]}) => ({
    type: AdmissionSettingActionTypes.UPDATE_ADMISSION_SETTING,
    payload: {id, institution_id, name, alias, year_id, brochure, status, youtube},
})

export const resetAdmissionSetting = () => ({
    type: AdmissionSettingActionTypes.RESET,
    payload: {}
})