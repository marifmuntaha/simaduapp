// constants
import { YearActionTypes } from './constanst'

const INIT_STATE = {
    loading: false,
}

interface YearData {
    id: number
    name: string
    desc: string
}

interface State {
    loading?: boolean
    value?: boolean
}

const Year = (state: State = INIT_STATE, action: any): any => {
    switch (action.type) {
        case YearActionTypes.API_RESPONSE_SUCCESS:
            switch (action.payload.actionType) {
                case YearActionTypes.GET_YEAR: {
                    return {
                        ...state,
                        years: action.payload.years,
                        loading: false,
                    }
                }
                case YearActionTypes.CREATE_YEAR: {
                    return {
                        ...state,
                        year: action.payload.data,
                        loading: false,
                    }
                }
                case YearActionTypes.UPDATE_YEAR: {
                    return {
                        ...state,
                        loading: false,
                    }
                }
                case YearActionTypes.DELETE_YEAR: {
                    return {
                        ...state,
                        loading: false,
                    }
                }
                default:
                    return { ...state }
            }

        case YearActionTypes.API_RESPONSE_ERROR:
            switch (action.payload.actionType) {
                case YearActionTypes.CREATE_YEAR: {
                    return {
                        ...state,
                        error: action.payload.error,
                        loading: false,
                    }
                }
                case YearActionTypes.UPDATE_YEAR: {
                    return {
                        ...state,
                        registerError: action.payload.error,
                        loading: false,
                    }
                }
                case YearActionTypes.DELETE_YEAR: {
                    return {
                        ...state,
                        error: action.payload.error,
                        loading: false,
                    }
                }
                default:
                    return { ...state }
            }

        case YearActionTypes.GET_YEAR:
            return { ...state, loading: true }
        case YearActionTypes.CREATE_YEAR:
            return { ...state, loading: true }
        case YearActionTypes.SET_YEAR:
            return { ...state, loading: false }
        case YearActionTypes.UPDATE_YEAR:
            return { ...state, loading: true }
        case YearActionTypes.DELETE_YEAR:
            return { ...state, loading: true }
        case YearActionTypes.RESET:
            return {
                ...state,
                loading: false,
                error: false,
            }
        default:
            return { ...state }
    }
}

export default Year
