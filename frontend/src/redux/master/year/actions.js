import {YearActionTypes} from "./constants";

export const yearApiResponseSuccess = (actionType, data) => ({
    type: YearActionTypes.API_RESPONSE_SUCCESS,
    payload: { actionType, data }
});

export const yearApiResponseError = (actionType, error) => ({
    type: YearActionTypes.API_RESPONSE_ERROR,
    payload: { actionType, error },
});

export const getYears = (params) => ({
    type: YearActionTypes.GET_YEAR,
    payload: {params},
});

export const addYear = (modal) => ({
    type: YearActionTypes.ADD_YEAR,
    payload: {modal}
})

export const storeYear = ({formData: [name, description, active]}) => ({
    type: YearActionTypes.STORE_YEAR,
    payload: {name, description, active},
})

export const setYear = (year, modal) => ({
    type: YearActionTypes.SET_YEAR,
    payload: {year, modal},
})

export const updateYear = ({formData: [id, name, description, active]}) => ({
    type: YearActionTypes.UPDATE_YEAR,
    payload: {id, name, description, active},
})

export const destroyYear = (params) => ({
    type: YearActionTypes.DESTROY_YEAR,
    payload: {params},
});

export const resetYear = () => ({
    type: YearActionTypes.RESET,
    payload: {}
})