import {UserActionTypes} from "./constants";

const User = (state, action): any => {
    switch (action.type) {
        case UserActionTypes.API_RESPONSE_SUCCESS: {
            switch (action.payload.actionType) {
                case UserActionTypes.GET_USER:
                    return {
                        ...state,
                        users: action.payload.data,
                        loading: false
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
                default:
                    return {...state}
            }
        }
        case UserActionTypes.GET_USER:
            return {
                ...state,
                loading: true,
            }
        case UserActionTypes.SET_USER:
            return {
                ...state, loading: true
            }
        case UserActionTypes.RESET:
            return {
                ...state,
                loading: false,
                error: false,
            }
        default:
            return {...state}
    }
}
export default User;