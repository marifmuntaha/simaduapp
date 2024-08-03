import {UserActionTypes} from "./constants";
const INITIAL_STATE = {
    loading: false,
    user: false,
    modal : {
        add: false,
        edit: false,
    },
    error: false,
    success: false,
    loadData: true
}
const User = (state = INITIAL_STATE, action): any => {
    switch (action.type) {
        case UserActionTypes.API_RESPONSE_SUCCESS: {
            switch (action.payload.actionType) {
                case UserActionTypes.GET_USER:
                    return {
                        ...state,
                        users: action.payload.data.result,
                        loading: false,
                    }
                case UserActionTypes.STORE_USER:
                    return {
                        ...state,
                        loading: false,
                        success: action.payload.data.message,
                        user: action.payload.data.result,
                        loadData: true
                    }
                case UserActionTypes.UPDATE_USER:
                    return {
                        ...state,
                        loading: false,
                        success: action.payload.data.message,
                        user: action.payload.data.result,
                        loadData: true
                    }
                case UserActionTypes.DESTROY_USER:
                    return {
                        ...state,loading: false,
                        success: action.payload.data.message,
                        user: action.payload.data.result,
                        loadData: true
                    }
                default:
                    return {...state}
            }
        }
        case UserActionTypes.API_RESPONSE_ERROR: {
            switch (action.payload.actionType) {
                case UserActionTypes.GET_USER:
                    return {
                        ...state,
                        loading: false,
                        error: action.payload.error,
                    }
                case UserActionTypes.STORE_USER:
                    return {
                        ...state,
                        loading: false,
                        error: action.payload.error,

                    }
                case UserActionTypes.UPDATE_USER:
                    return {
                        ...state,
                        loading: false,
                        error: action.payload.error,

                    }
                case UserActionTypes.DESTROY_USER:
                    return {
                        ...state,
                        loading: false,
                        error: action.payload.error
                    }
                default:
                    return {...state}
            }
        }
        case UserActionTypes.GET_USER:
            return {
                ...state,
                loading: true,
            }
        case UserActionTypes.ADD_USER:
            return {
                ...state,
                loading: false,
                modal: {
                    add: action.payload.modal,
                    edit: false,
                }
            }
        case UserActionTypes.STORE_USER:
            return {
                ...state,
                loading: true,
            }
        case UserActionTypes.SET_USER:
            return {
                ...state,
                loading: false,
                user: action.payload.user,
                modal: {
                    add: false,
                    edit: action.payload.modal,
                }
            }
        case UserActionTypes.UPDATE_USER:
            return {
                ...state,
                loading: true,
            }
        case UserActionTypes.DESTROY_USER:
            return {
                ...state,
                loading: action.payload.params,
            }
        case UserActionTypes.RESET:
            return {
                ...state,
                loading: false,
                user: false,
                error: false,
                success: false,
                loadData: false
            }
        default:
            return {...state}
    }
}
export default User;