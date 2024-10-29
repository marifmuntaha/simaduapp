import {PPDBSettingActionTypes} from "./constants";

export const SettingApiResponseSuccess = (actionType, data) => ({
    type: PPDBSettingActionTypes.API_RESPONSE_SUCCESS,
    payload: { actionType, data }
});

export const SettingApiResponseError = (actionType, error) => ({
    type: PPDBSettingActionTypes.API_RESPONSE_ERROR,
    payload: { actionType, error },
});

export const getSetting = (params) => ({
    type: PPDBSettingActionTypes.GET_PPDBSETTING,
    payload: {params},
});

export const showSetting = (params) => ({
    type: PPDBSettingActionTypes.SHOW_PPDBSETTING,
    payload: {params},
});

export const updateSetting = ({formData: [id, institution, name, alias, year, brochure, status, youtube]}) => ({
    type: PPDBSettingActionTypes.UPDATE_PPDBSETTING,
    payload: {id, institution, name, alias, year, brochure, status, youtube},
})

export const resetSetting = () => ({
    type: PPDBSettingActionTypes.RESET,
    payload: {}
})