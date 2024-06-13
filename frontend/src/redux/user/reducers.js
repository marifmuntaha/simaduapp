import {UserActionTypes} from "./constants";
const INITIAL_STATE = {
    loading: false,
    user: false,
    users: [],
    modal : {
        add: false,
        edit: false,
    },
    success: false,
    error: false
}
const User = (state = INITIAL_STATE, action): any => {
    switch (action.type) {
        case UserActionTypes.API_RESPONSE_SUCCESS: {
            switch (action.payload.actionType) {
                case UserActionTypes.GET_USER:
                    return {
                        ...state,
                        users: action.payload.data,
                        loading: false,
                    }
                case UserActionTypes.STORE_USER:
                    return {
                        ...state,
                        loading: false,
                        user: action.payload.data,
                        users: [],
                        error: false,
                        success: true
                    }
                case UserActionTypes.DESTROY_USER:
                    return {
                        ...state,
                        user: action.payload.data,
                        loading: false,
                        users: [],
                        modal : {
                            add: false,
                            edit: false,
                        },
                        success: false,
                        error: false
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
                        success: false

                    }
                case UserActionTypes.DESTROY_USER:
                    return {
                        ...state,
                        loading: false,
                        success: false,
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
                reload: false,
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
        case UserActionTypes.DESTROY_USER:
            return {
                ...state,
                loading: action.payload,
            }
        case UserActionTypes.RESET:
            return {
                ...state,
                loading: false,
                error: false,
                success: false,
                users: [],
                user: false,
                modal: {
                    add: false,
                    edit: false
                }
            }
        default:
            return {...state}
    }
}
export default User;