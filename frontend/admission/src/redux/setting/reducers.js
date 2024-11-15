import {SettingActionTypes} from "./constants";
const INITIAL_STATE = {
    loading: false,
    setting: false,
    error: false,
    success: false
}
const Setting = (state = INITIAL_STATE, action): any => {
    switch (action.type) {
        case SettingActionTypes.API_RESPONSE_SUCCESS: {
            switch (action.payload.actionType) {
                case SettingActionTypes.GET_SETTING:
                    return {
                        ...state,
                        settings: action.payload.data.result,
                        loading: false,
                    }
                case SettingActionTypes.UPDATE_SETTING:
                    return {
                        ...state,
                        loading: false,
                        success: action.payload.data.message,
                        setting: action.payload.data.result
                    }
                default:
                    return {...state}
            }
        }
        case SettingActionTypes.API_RESPONSE_ERROR: {
            switch (action.payload.actionType) {
                case SettingActionTypes.GET_SETTING:
                    return {
                        ...state,
                        loading: false,
                        error: action.payload.error,
                    }
                case SettingActionTypes.UPDATE_SETTING:
                    return {
                        ...state,
                        loading: false,
                        error: action.payload.error,

                    }
                default:
                    return {...state}
            }
        }
        case SettingActionTypes.GET_SETTING:
            return {
                ...state,
                loading: true,
            }
        case SettingActionTypes.UPDATE_SETTING:
            return {
                ...state,
                loading: true,
            }
        case SettingActionTypes.RESET:
            return {
                ...state,
                loading: false,
                error: false,
                success: false
            }
        default:
            return {...state}
    }
}
export default Setting;