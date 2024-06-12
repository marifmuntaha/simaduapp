import {AuthActionTypes} from "./constants";

export const authApiResponseSuccess = (actionType, data) => ({
    type: AuthActionTypes.API_RESPONSE_SUCCESS,
    payload: { actionType, data }
});

export const authApiResponseError = (actionType, error) => ({
    type: AuthActionTypes.API_RESPONSE_ERROR,
    payload: { actionType, error },
});

export const loginUser = (username, password) => ({
    type: AuthActionTypes.LOGIN_USER,
    payload: { username, password },
})

export const logoutUser = () => ({
    type: AuthActionTypes.LOGOUT_USER,
    payload: {},
})

export const resetAuth = ()=> ({
    type: AuthActionTypes.RESET,
    payload: {},
})