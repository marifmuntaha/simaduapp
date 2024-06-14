import {YearActionTypes} from "./constants";
const INITIAL_STATE = {
    loading: false,
    user: false,
    users: [],
    modal : {
        add: false,
        edit: false,
    },
    error: false,
}
const Year = (state = INITIAL_STATE, action): any => {
    switch (action.type) {
        case YearActionTypes.API_RESPONSE_SUCCESS: {
            switch (action.payload.actionType) {
                case YearActionTypes.GET_YEAR:
                    return {
                        ...state,
                        years: action.payload.data,
                        loading: false,
                    }
                case YearActionTypes.STORE_YEAR:
                    return {
                        ...state,
                        loading: false,
                        year: action.payload.data.year,
                        modal: {
                            add: false,
                            edit: false,
                        }
                    }
                case YearActionTypes.UPDATE_YEAR:
                    return {
                        ...state,
                        loading: false,
                        year: action.payload.data.year,
                        modal: {
                            add: false,
                            edit: false,
                        }
                    }
                case YearActionTypes.DESTROY_YEAR:
                    return {
                        ...state,
                        year: action.payload.data,
                        loading: false,
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
                loading: action.payload,
            }
        case YearActionTypes.RESET:
            return {
                ...state,
                loading: false,
                year: false,
                years: [],
                modal : {
                    add: false,
                    edit: false,
                },
                error: false,
            }
        default:
            return {...state}
    }
}
export default Year;