// constants
import {YearActionTypes} from "@/redux/year/constanst.ts";

export interface YearActionType {
    type: YearActionTypes.API_RESPONSE_SUCCESS | YearActionTypes.API_RESPONSE_ERROR | YearActionTypes.GET_YEAR | YearActionTypes.CREATE_YEAR | YearActionTypes.SET_YEAR | YearActionTypes.UPDATE_YEAR | YearActionTypes.DELETE_YEAR | YearActionTypes.RESET
    payload: object | string
}

interface YearData {
    id: number
    name: string
    description: string
}

// common success
export const yearApiResponseSuccess = (actionType: string, data: YearData | object): YearActionType => ({
    type: YearActionTypes.API_RESPONSE_SUCCESS,
    payload: { actionType, data },
})
// common error
export const yearApiResponseError = (actionType: string, error: string): YearActionType => ({
    type: YearActionTypes.API_RESPONSE_ERROR,
    payload: { actionType, error },
})

export const getYear = (): YearActionType => ({
    type: YearActionTypes.GET_YEAR,
    payload: {},
})

export const setYear = (): YearActionType => ({
    type: YearActionTypes.SET_YEAR,
    payload: {},
})

export const updateYear = (fullname: string, email: string, password: string): YearActionType => ({
    type: YearActionTypes.UPDATE_YEAR,
    payload: { fullname, email, password },
})

export const deleteYear = (username: string): YearActionType => ({
    type: YearActionTypes.DELETE_YEAR,
    payload: { username },
})

export const reset = (): YearActionType => ({
    type: YearActionTypes.RESET,
    payload: {},
})
