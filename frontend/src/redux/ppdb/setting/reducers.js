import {PPDBSettingActionTypes} from "./constants";
const INITIAL_STATE = {
    loading: false,
    setting: false,
    error: false,
    success: false,
    loadData: true
}
const PPDBSetting = (state = INITIAL_STATE, action): any => {
    switch (action.type) {
        case PPDBSettingActionTypes.API_RESPONSE_SUCCESS: {
            switch (action.payload.actionType) {
                case PPDBSettingActionTypes.GET_PPDBSETTING:
                    return {
                        ...state,
                        settings: action.payload.data.result,
                        loading: false,
                    }
                case PPDBSettingActionTypes.SHOW_PPDBSETTING:
                    return {
                        ...state,
                        setting: action.payload.data.result,
                        loading: false,
                    }
                case PPDBSettingActionTypes.UPDATE_PPDBSETTING:
                    return {
                        ...state,
                        loading: false,
                        success: action.payload.data.message,
                        setting: action.payload.data.result,
                        loadData: true
                    }
                default:
                    return {...state}
            }
        }
        case PPDBSettingActionTypes.API_RESPONSE_ERROR: {
            switch (action.payload.actionType) {
                case PPDBSettingActionTypes.GET_PPDBSETTING:
                    return {
                        ...state,
                        loading: false,
                        error: action.payload.error,
                    }
                case PPDBSettingActionTypes.SHOW_PPDBSETTING:
                    return {
                        ...state,
                        loading: false,
                        error: action.payload.error,
                    }
                case PPDBSettingActionTypes.UPDATE_PPDBSETTING:
                    return {
                        ...state,
                        loading: false,
                        error: action.payload.error,

                    }
                default:
                    return {...state}
            }
        }
        case PPDBSettingActionTypes.GET_PPDBSETTING:
            return {
                ...state,
                loading: true,
            }
        case PPDBSettingActionTypes.SHOW_PPDBSETTING:
            return {
                ...state,
                loading: true,
            }
        case PPDBSettingActionTypes.UPDATE_PPDBSETTING:
            return {
                ...state,
                loading: true,
            }
        case PPDBSettingActionTypes.RESET:
            return {
                ...state,
                loading: false,
                setting: false,
                error: false,
                success: false,
                loadData: false
            }
        default:
            return {...state}
    }
}
export default PPDBSetting;