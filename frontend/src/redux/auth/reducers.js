import {AuthActionTypes} from "./constants";

const INITIAL_STATE = {
    loading: false,
    user: false,
    userLoggedIn: false,
    userLoggedOut: false,
    error: false,
    success: false
}
const Auth = (state = INITIAL_STATE, action): any => {
    switch (action.type) {
        case AuthActionTypes.API_RESPONSE_SUCCESS: {
            switch (action.payload.actionType) {
                case AuthActionTypes.LOGIN_USER:
                    return {
                        ...state,
                        loading: false,
                        userLoggedIn: true,
                        success: action.payload.data.message,
                        user: action.payload.data.result,
                    }
                case AuthActionTypes.LOGOUT_USER: {
                    return {
                        ...state,
                        user: null,
                        loading: false,
                        userLogout: true,
                    }
                }
                default:
                    return {...state}
            }
        }
        case AuthActionTypes.API_RESPONSE_ERROR: {
            switch (action.payload.actionType) {
                case AuthActionTypes.LOGIN_USER:
                    return {
                        ...state,
                        loading: false,
                        userLoggedIn: false,
                        error: action.payload.error,
                    }
                default:
                    return {...state}
            }
        }
        case AuthActionTypes.LOGIN_USER:
            return {
                ...state,
                loading: true,
                userLoggedIn: false
            }
        case AuthActionTypes.LOGOUT_USER:
            return { ...state, loading: true, userLogout: false }
        case AuthActionTypes.RESET:
            return {
                ...state,
                loading: false,
                error: false,
                userLoggedIn: false,
                passwordReset: false,
                passwordChange: false,
                resetPasswordSuccess: null,
            }
        default:
            return {...state}
    }
}
export default Auth