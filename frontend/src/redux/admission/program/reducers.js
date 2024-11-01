import {AdmissionProgramActionTypes} from "./constants";
const INITIAL_STATE = {
    loading: false,
    program: false,
    modal : {
        add: false,
        edit: false,
    },
    error: false,
    success: false,
    loadData: true
}
const admissionProgram = (state = INITIAL_STATE, action): any => {
    switch (action.type) {
        case AdmissionProgramActionTypes.API_RESPONSE_SUCCESS: {
            switch (action.payload.actionType) {
                case AdmissionProgramActionTypes.GET_ADMISSION_PROGRAM:
                    return {
                        ...state,
                        programs: action.payload.data.result,
                        loading: false,
                    }
                case AdmissionProgramActionTypes.STORE_ADMISSION_PROGRAM:
                    return {
                        ...state,
                        loading: false,
                        success: action.payload.data.message,
                        program: action.payload.data.result,
                        loadData: true
                    }
                case AdmissionProgramActionTypes.UPDATE_ADMISSION_PROGRAM:
                    return {
                        ...state,
                        loading: false,
                        success: action.payload.data.message,
                        program: action.payload.data.result,
                        loadData: true
                    }
                case AdmissionProgramActionTypes.DESTROY_ADMISSION_PROGRAM:
                    return {
                        ...state,
                        loading: false,
                        success: action.payload.data.message,
                        program: action.payload.data.result,
                        loadData: true
                    }
                default:
                    return {...state}
            }
        }
        case AdmissionProgramActionTypes.API_RESPONSE_ERROR: {
            switch (action.payload.actionType) {
                case AdmissionProgramActionTypes.GET_ADMISSION_PROGRAM:
                    return {
                        ...state,
                        loading: false,
                        error: action.payload.error,
                    }
                case AdmissionProgramActionTypes.STORE_ADMISSION_PROGRAM:
                    return {
                        ...state,
                        loading: false,
                        error: action.payload.error,

                    }
                case AdmissionProgramActionTypes.UPDATE_ADMISSION_PROGRAM:
                    return {
                        ...state,
                        loading: false,
                        error: action.payload.error,

                    }
                case AdmissionProgramActionTypes.DESTROY_ADMISSION_PROGRAM:
                    return {
                        ...state,
                        loading: false,
                        error: action.payload.error
                    }
                default:
                    return {...state}
            }
        }
        case AdmissionProgramActionTypes.GET_ADMISSION_PROGRAM:
            return {
                ...state,
                loading: true,
            }
        case AdmissionProgramActionTypes.ADD_ADMISSION_PROGRAM:
            return {
                ...state,
                loading: false,
                modal: {
                    add: action.payload.modal,
                    edit: false,
                }
            }
        case AdmissionProgramActionTypes.STORE_ADMISSION_PROGRAM:
            return {
                ...state,
                loading: true,
            }
        case AdmissionProgramActionTypes.SET_ADMISSION_PROGRAM:
            return {
                ...state,
                loading: false,
                program: action.payload.program,
                modal: {
                    add: false,
                    edit: action.payload.modal,
                }
            }
        case AdmissionProgramActionTypes.UPDATE_ADMISSION_PROGRAM:
            return {
                ...state,
                loading: true,
            }
        case AdmissionProgramActionTypes.DESTROY_ADMISSION_PROGRAM:
            return {
                ...state,
                loading: action.payload.params,
            }
        case AdmissionProgramActionTypes.RESET:
            return {
                ...state,
                loading: false,
                program: false,
                error: false,
                success: false,
                loadData: false
            }
        default:
            return {...state}
    }
}
export default admissionProgram;