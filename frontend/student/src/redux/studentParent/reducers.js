import {StudentParentActionTypes} from "./constants";
const INITIAL_STATE = {
    loading: false,
    studentParent: false,
    error: false,
    success: false,
    loadData: true
}
const StudentParent = (state = INITIAL_STATE, action): any => {
    switch (action.type) {
        case StudentParentActionTypes.API_RESPONSE_SUCCESS: {
            switch (action.payload.actionType) {
                case StudentParentActionTypes.GET_STUDENT_PARENT:
                    return {
                        ...state,
                        studentParents: action.payload.data.result,
                        loading: false,
                    }
                case StudentParentActionTypes.STORE_STUDENT_PARENT:
                    return {
                        ...state,
                        loading: false,
                        success: action.payload.data.message,
                        studentParent: action.payload.data.result,
                        loadData: true
                    }
                case StudentParentActionTypes.UPDATE_STUDENT_PARENT:
                    return {
                        ...state,
                        loading: false,
                        success: action.payload.data.message,
                        studentParent: action.payload.data.result,
                        loadData: true
                    }
                case StudentParentActionTypes.DESTROY_STUDENT_PARENT:
                    return {
                        ...state,
                        loading: false,
                        success: action.payload.data.message,
                        studentParent: action.payload.data.result,
                        loadData: true
                    }
                default:
                    return {...state}
            }
        }
        case StudentParentActionTypes.API_RESPONSE_ERROR: {
            switch (action.payload.actionType) {
                case StudentParentActionTypes.GET_STUDENT_PARENT:
                    return {
                        ...state,
                        loading: false,
                        error: action.payload.error,
                    }
                case StudentParentActionTypes.STORE_STUDENT_PARENT:
                    return {
                        ...state,
                        loading: false,
                        error: action.payload.error,

                    }
                case StudentParentActionTypes.UPDATE_STUDENT_PARENT:
                    return {
                        ...state,
                        loading: false,
                        error: action.payload.error,

                    }
                case StudentParentActionTypes.DESTROY_STUDENT_PARENT:
                    return {
                        ...state,
                        loading: false,
                        error: action.payload.error
                    }
                default:
                    return {...state}
            }
        }
        case StudentParentActionTypes.GET_STUDENT_PARENT:
            return {
                ...state,
                loading: true,
            }
        case StudentParentActionTypes.STORE_STUDENT_PARENT:
            return {
                ...state,
                loading: true,
            }
        case StudentParentActionTypes.SET_STUDENT_PARENT:
            return {
                ...state,
                loading: false,
                studentParent: action.payload.studentParent,
                modal: {
                    add: false,
                    edit: action.payload.modal,
                }
            }
        case StudentParentActionTypes.UPDATE_STUDENT_PARENT:
            return {
                ...state,
                loading: true,
            }
        case StudentParentActionTypes.DESTROY_STUDENT_PARENT:
            return {
                ...state,
                loading: action.payload,
            }
        case StudentParentActionTypes.RESET:
            return {
                ...state,
                loading: false,
                studentParent: false,
                error: false,
                success: false,
                loadData: false
            }
        default:
            return {...state}
    }
}
export default StudentParent;