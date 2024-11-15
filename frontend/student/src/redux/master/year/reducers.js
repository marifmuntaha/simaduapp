import {YearActionTypes} from "./constants";
const INITIAL_STATE = {
    loading: false,
    year: false,
    modal : {
        add: false,
        edit: false,
    },
    success: false,
    error: false,
    loadData: true,
    active: false
}
const Year = (state = INITIAL_STATE, action): any => {
    switch (action.type) {
        case YearActionTypes.API_RESPONSE_SUCCESS: {
            switch (action.payload.actionType) {
                case YearActionTypes.GET_YEAR:
                    return {
                        ...state,
                        years: action.payload.data.result,
                        loading: false,
                        loadData: false,
                        active: action.payload.data.result.filter((year) => {
                            return year.active === 1
                        })[0]
                    }
                case YearActionTypes.STORE_YEAR:
                    return {
                        ...state,
                        loading: false,
                        success: action.payload.data.message,
                        year: action.payload.data.result,
                        loadData: true
                    }
                case YearActionTypes.UPDATE_YEAR:
                    return {
                        ...state,
                        loading: false,
                        success: action.payload.data.message,
                        year: action.payload.data.result,
                        loadData: true
                    }
                case YearActionTypes.DESTROY_YEAR:
                    return {
                        ...state,
                        success: action.payload.data.message,
                        year: action.payload.data.result,
                        loading: false,
                        loadData: true
                    }
                default:
                    return {...state}
            }
        }
        case YearActionTypes.API_RESPONSE_ERROR: {
            switch (action.payload.actionType) {
                case YearActionTypes.GET_YEAR:
                    return {
                        ...state,
                        loading: false,
                        error: action.payload.error,
                        loadData: false
                    }
                case YearActionTypes.STORE_YEAR:
                    return {
                        ...state,
                        loading: false,
                        error: action.payload.error,

                    }
                case YearActionTypes.UPDATE_YEAR:
                    return {
                        ...state,
                        loading: false,
                        error: action.payload.error,

                    }
                case YearActionTypes.DESTROY_YEAR:
                    return {
                        ...state,
                        loading: false,
                        error: action.payload.error
                    }
                default:
                    return {...state}
            }
        }
        case YearActionTypes.GET_YEAR:
            return {
                ...state,
                loading: true,
            }
        case YearActionTypes.ADD_YEAR:
            return {
                ...state,
                loading: false,
                modal: {
                    add: action.payload.modal,
                    edit: false,
                }
            }
        case YearActionTypes.STORE_YEAR:
            return {
                ...state,
                loading: true,
            }
        case YearActionTypes.SET_YEAR:
            return {
                ...state,
                loading: false,
                year: action.payload.year,
                modal: {
                    add: false,
                    edit: action.payload.modal,
                }
            }
        case YearActionTypes.UPDATE_YEAR:
            return {
                ...state,
                loading: true,
            }
        case YearActionTypes.DESTROY_YEAR:
            return {
                ...state,
                loading: action.payload.params,
            }
        case YearActionTypes.RESET:
            return {
                ...state,
                loading: false,
                year: false,
                error: false,
                success: false,
                loadData: false,
            }
        default:
            return {...state}
    }
}
export default Year;