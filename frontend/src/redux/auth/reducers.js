import {AuthActionTypes} from "./constants";

const Auth = (state, action): any => {
    switch (action.type) {
        case AuthActionTypes.API_RESPONSE_SUCCESS: {
            switch (action.payload.actionType) {
                case AuthActionTypes.LOGIN_USER:
                    return {
                        ...state,
                        user: action.payload.data,
                        userLoggedIn: true,
                        loading: false
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
                        error: action.payload.error,
                        userLoggedIn: false,
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
                userSignUp: false,
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