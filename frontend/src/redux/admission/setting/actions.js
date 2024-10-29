import {SettingActionTypes} from "./constants";

export const admissionSettingApiResponseSuccess = (actionType, data) => ({
    type: SettingActionTypes.API_RESPONSE_SUCCESS,
    payload: { actionType, data }
});

export const admissionSettingApiResponseError = (actionType, error) => ({
    type: SettingActionTypes.API_RESPONSE_ERROR,
    payload: { actionType, error },
});

export const getAdmissionSetting = (params) => ({
    type: SettingActionTypes.GET_SETTING,
    payload: {params},
});

export const updateAdmissionSetting = ({formData: [id, institution_id, name, alias, year_id, brochure, status, youtube]}) => ({
    type: SettingActionTypes.UPDATE_SETTING,
    payload: {id, institution_id, name, alias, year_id, brochure, status, youtube},
})

export const resetAdmissionSetting = () => ({
    type: SettingActionTypes.RESET,
    payload: {}
})