import {StudentActionTypes} from "./constants";
const INITIAL_STATE = {
    loading: false,
    student: false,
    modal : {
        add: false,
        edit: false,
    },
    error: false,
    success: false,
}
const Student = (state = INITIAL_STATE, action): any => {
    switch (action.type) {
        case StudentActionTypes.API_RESPONSE_SUCCESS: {
            switch (action.payload.actionType) {
                case StudentActionTypes.GET_STUDENT:
                    return {
                        ...state,
                        students: action.payload.data.result,
                        loading: false,
                    }
                case StudentActionTypes.STORE_STUDENT:
                    return {
                        ...state,
                        loading: false,
                        success: action.payload.data.message,
                        student: action.payload.data.result,
                    }
                case StudentActionTypes.UPDATE_STUDENT:
                    return {
                        ...state,
                        loading: false,
                        success: action.payload.data.message,
                        student: action.payload.data.result,
                    }
                case StudentActionTypes.DESTROY_STUDENT:
                    return {
                        ...state,
                        loading: false,
                        success: action.payload.data.message,
                        student: action.payload.data.result,
                    }
                default:
                    return {...state}
            }
        }
        case StudentActionTypes.API_RESPONSE_ERROR: {
            switch (action.payload.actionType) {
                case StudentActionTypes.GET_STUDENT:
                    return {
                        ...state,
                        loading: false,
                        error: action.payload.error,
                    }
                case StudentActionTypes.STORE_STUDENT:
                    return {
                        ...state,
                        loading: false,
                        error: action.payload.error,

                    }
                case StudentActionTypes.UPDATE_STUDENT:
                    return {
                        ...state,
                        loading: false,
                        error: action.payload.error,

                    }
                case StudentActionTypes.DESTROY_STUDENT:
                    return {
                        ...state,
                        loading: false,
                        error: action.payload.error
                    }
                default:
                    return {...state}
            }
        }
        case StudentActionTypes.GET_STUDENT:
            return {
                ...state,
                loading: true,
            }
        case StudentActionTypes.ADD_STUDENT:
            return {
                ...state,
                loading: false,
                modal: {
                    add: action.payload.modal,
                    edit: false,
                }
            }
        case StudentActionTypes.STORE_STUDENT:
            return {
                ...state,
                loading: true,
            }
        case StudentActionTypes.SET_STUDENT:
            return {
                ...state,
                loading: false,
                student: action.payload.student,
                modal: {
                    add: false,
                    edit: action.payload.modal,
                }
            }
        case StudentActionTypes.UPDATE_STUDENT:
            return {
                ...state,
                loading: true,
            }
        case StudentActionTypes.DESTROY_STUDENT:
            return {
                ...state,
                loading: action.payload,
            }
        case StudentActionTypes.RESET:
            return {
                ...state,
                loading: false,
                student: false,
                error: false,
                success: false,
            }
        default:
            return {...state}
    }
}
export default Student;