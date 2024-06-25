import {MajorActionTypes} from "./constants";
const INITIAL_STATE = {
    loading: false,
    major: false,
    modal : {
        add: false,
        edit: false,
    },
    error: false,
    success: false,
    loadData: true
}
const Major = (state = INITIAL_STATE, action): any => {
    switch (action.type) {
        case MajorActionTypes.API_RESPONSE_SUCCESS: {
            switch (action.payload.actionType) {
                case MajorActionTypes.GET_MAJOR:
                    return {
                        ...state,
                        majors: action.payload.data.result,
                        loading: false,
                    }
                case MajorActionTypes.STORE_MAJOR:
                    return {
                        ...state,
                        loading: false,
                        success: action.payload.data.message,
                        major: action.payload.data.result,
                    }
                case MajorActionTypes.UPDATE_MAJOR:
                    return {
                        ...state,
                        loading: false,
                        success: action.payload.data.message,
                        major: action.payload.data.result,
                    }
                case MajorActionTypes.DESTROY_MAJOR:
                    return {
                        ...state,
                        loading: false,
                        success: action.payload.data.message,
                        major: action.payload.data.result,
                    }
                default:
                    return {...state}
            }
        }
        case MajorActionTypes.API_RESPONSE_ERROR: {
            switch (action.payload.actionType) {
                case MajorActionTypes.GET_MAJOR:
                    return {
                        ...state,
                        loading: false,
                        error: action.payload.error,
                    }
                case MajorActionTypes.STORE_MAJOR:
                    return {
                        ...state,
                        loading: false,
                        error: action.payload.error,

                    }
                case MajorActionTypes.UPDATE_MAJOR:
                    return {
                        ...state,
                        loading: false,
                        error: action.payload.error,

                    }
                case MajorActionTypes.DESTROY_MAJOR:
                    return {
                        ...state,
                        loading: false,
                        error: action.payload.error
                    }
                default:
                    return {...state}
            }
        }
        case MajorActionTypes.GET_MAJOR:
            return {
                ...state,
                loading: true,
            }
        case MajorActionTypes.ADD_MAJOR:
            return {
                ...state,
                loading: false,
                modal: {
                    add: action.payload.modal,
                    edit: false,
                }
            }
        case MajorActionTypes.STORE_MAJOR:
            return {
                ...state,
                loading: true,
            }
        case MajorActionTypes.SET_MAJOR:
            return {
                ...state,
                loading: false,
                major: action.payload.major,
                modal: {
                    add: false,
                    edit: action.payload.modal,
                }
            }
        case MajorActionTypes.UPDATE_MAJOR:
            return {
                ...state,
                loading: true,
            }
        case MajorActionTypes.DESTROY_MAJOR:
            return {
                ...state,
                loading: action.payload.params,
            }
        case MajorActionTypes.RESET:
            return {
                ...state,
                loading: false,
                major: false,
                error: false,
                success: false,
                loadData: false
            }
        default:
            return {...state}
    }
}
export default Major;