import {SettingActionTypes} from "./constants";

export const SettingApiResponseSuccess = (actionType, data) => ({
    type: SettingActionTypes.API_RESPONSE_SUCCESS,
    payload: { actionType, data }
});

export const SettingApiResponseError = (actionType, error) => ({
    type: SettingActionTypes.API_RESPONSE_ERROR,
    payload: { actionType, error },
});

export const getSetting = (params) => ({
    type: SettingActionTypes.GET_SETTING,
    payload: {params},
});

export const updateSetting = ({formData: [id, institution_id, name, alias, year_id, brochure, status, youtube]}) => ({
    type: SettingActionTypes.UPDATE_SETTING,
    payload: {id, institution_id, name, alias, year_id, brochure, status, youtube},
})

export const resetSetting = () => ({
    type: SettingActionTypes.RESET,
    payload: {}
})