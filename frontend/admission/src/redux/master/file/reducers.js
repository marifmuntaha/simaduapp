import {FileActionTypes} from "./constants";
const INITIAL_STATE = {
    loading: false,
    file: false,
    modal : {
        add: false,
        edit: false,
    },
    success: false,
    error: false,
}
const File = (state = INITIAL_STATE, action): any => {
    switch (action.type) {
        case FileActionTypes.API_RESPONSE_SUCCESS: {
            switch (action.payload.actionType) {
                case FileActionTypes.GET_FILE:
                    return {
                        ...state,
                        files: action.payload.data.result,
                        loading: false,
                    }
                case FileActionTypes.STORE_FILE:
                    return {
                        ...state,
                        loading: false,
                        success: action.payload.data.message,
                        file: action.payload.data.result,
                    }
                case FileActionTypes.UPDATE_FILE:
                    return {
                        ...state,
                        loading: false,
                        success: action.payload.data.message,
                        file: action.payload.data.result,
                    }
                case FileActionTypes.DESTROY_FILE:
                    return {
                        ...state,
                        success: action.payload.data.message,
                        file: action.payload.data.result,
                        loading: false,
                    }
                default:
                    return {...state}
            }
        }
        case FileActionTypes.API_RESPONSE_ERROR: {
            switch (action.payload.actionType) {
                case FileActionTypes.GET_FILE:
                    return {
                        ...state,
                        loading: false,
                        error: action.payload.error,
                    }
                case FileActionTypes.STORE_FILE:
                    return {
                        ...state,
                        loading: false,
                        error: action.payload.error,

                    }
                case FileActionTypes.UPDATE_FILE:
                    return {
                        ...state,
                        loading: false,
                        error: action.payload.error,

                    }
                case FileActionTypes.DESTROY_FILE:
                    return {
                        ...state,
                        loading: false,
                        error: action.payload.error
                    }
                default:
                    return {...state}
            }
        }
        case FileActionTypes.GET_FILE:
            return {
                ...state,
                loading: true,
            }
        case FileActionTypes.ADD_FILE:
            return {
                ...state,
                loading: false,
                modal: {
                    add: action.payload.modal,
                    edit: false,
                }
            }
        case FileActionTypes.STORE_FILE:
            return {
                ...state,
                loading: true,
            }
        case FileActionTypes.SET_FILE:
            return {
                ...state,
                loading: false,
                file: action.payload.file,
                modal: {
                    add: false,
                    edit: action.payload.modal,
                }
            }
        case FileActionTypes.UPDATE_FILE:
            return {
                ...state,
                loading: true,
            }
        case FileActionTypes.DESTROY_FILE:
            return {
                ...state,
                loading: action.payload.params,
            }
        case FileActionTypes.RESET:
            return {
                ...state,
                loading: false,
                file: false,
                error: false,
                success: false,
            }
        default:
            return {...state}
    }
}
export default File;