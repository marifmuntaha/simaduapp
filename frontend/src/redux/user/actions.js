import {UserActionTypes} from "./constants";

export const userApiResponseSuccess = (actionType, data) => ({
    type: UserActionTypes.API_RESPONSE_SUCCESS,
    payload: { actionType, data }
});

export const userApiResponseError = (actionType, error) => ({
    type: UserActionTypes.API_RESPONSE_ERROR,
    payload: { actionType, error },
});

export const getUsers = (params) => ({
    type: UserActionTypes.GET_USER,
    payload: params,
});