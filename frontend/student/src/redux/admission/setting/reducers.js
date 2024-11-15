import {AdmissionSettingActionTypes} from "./constants";
const INITIAL_STATE = {
    loading: false,
    setting: false,
    error: false,
    success: false,
    loadData: true
}
const admissionSetting = (state = INITIAL_STATE, action): any => {
    switch (action.type) {
        case AdmissionSettingActionTypes.API_RESPONSE_SUCCESS: {
            switch (action.payload.actionType) {
                case AdmissionSettingActionTypes.GET_ADMISSION_SETTING:
                    return {
                        ...state,
                        setting: action.payload.data.result,
                        loading: false,
                        loadData: false,
                    }
                case AdmissionSettingActionTypes.UPDATE_ADMISSION_SETTING:
                    return {
                        ...state,
                        loading: false,
                        success: action.payload.data.message,
                        setting: action.payload.data.result,
                        loadData: false
                    }
                default:
                    return {...state}
            }
        }
        case AdmissionSettingActionTypes.API_RESPONSE_ERROR: {
            switch (action.payload.actionType) {
                case AdmissionSettingActionTypes.GET_ADMISSION_SETTING:
                    return {
                        ...state,
                        loading: false,
                        error: action.payload.error,
                    }
                case AdmissionSettingActionTypes.UPDATE_ADMISSION_SETTING:
                    return {
                        ...state,
                        loading: false,
                        error: action.payload.error,

                    }
                default:
                    return {...state}
            }
        }
        case AdmissionSettingActionTypes.GET_ADMISSION_SETTING:
            return {
                ...state,
                loading: true,
            }
        case AdmissionSettingActionTypes.UPDATE_ADMISSION_SETTING:
            return {
                ...state,
                loading: true,
            }
        case AdmissionSettingActionTypes.RESET:
            return {
                ...state,
                loading: false,
                error: false,
                success: false,
                loadData: false
            }
        default:
            return {...state}
    }
}
export default admissionSetting;