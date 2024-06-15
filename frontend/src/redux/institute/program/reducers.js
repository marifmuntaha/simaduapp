import {ProgramActionTypes} from "./constants";
const INITIAL_STATE = {
    loading: false,
    program: false,
    programs: [],
    modal : {
        add: false,
        edit: false,
    },
    error: false,
}
const Program = (state = INITIAL_STATE, action): any => {
    switch (action.type) {
        case ProgramActionTypes.API_RESPONSE_SUCCESS: {
            switch (action.payload.actionType) {
                case ProgramActionTypes.GET_PROGRAM:
                    return {
                        ...state,
                        programs: action.payload.data,
                        loading: false,
                    }
                case ProgramActionTypes.STORE_PROGRAM:
                    return {
                        ...state,
                        loading: false,
                        program: action.payload.data.program,
                        modal: {
                            add: false,
                            edit: false,
                        }
                    }
                case ProgramActionTypes.UPDATE_PROGRAM:
                    return {
                        ...state,
                        loading: false,
                        program: action.payload.data.program,
                        modal: {
                            add: false,
                            edit: false,
                        }
                    }
                case ProgramActionTypes.DESTROY_PROGRAM:
                    return {
                        ...state,
                        program: action.payload.data,
                        loading: false,
                    }
                default:
                    return {...state}
            }
        }
        case ProgramActionTypes.API_RESPONSE_ERROR: {
            switch (action.payload.actionType) {
                case ProgramActionTypes.GET_PROGRAM:
                    return {
                        ...state,
                        loading: false,
                        error: action.payload.error,
                    }
                case ProgramActionTypes.STORE_PROGRAM:
                    return {
                        ...state,
                        loading: false,
                        error: action.payload.error,

                    }
                case ProgramActionTypes.UPDATE_PROGRAM:
                    return {
                        ...state,
                        loading: false,
                        error: action.payload.error,

                    }
                case ProgramActionTypes.DESTROY_PROGRAM:
                    return {
                        ...state,
                        loading: false,
                        error: action.payload.error
                    }
                default:
                    return {...state}
            }
        }
        case ProgramActionTypes.GET_PROGRAM:
            return {
                ...state,
                loading: true,
            }
        case ProgramActionTypes.ADD_PROGRAM:
            return {
                ...state,
                loading: false,
                modal: {
                    add: action.payload.modal,
                    edit: false,
                }
            }
        case ProgramActionTypes.STORE_PROGRAM:
            return {
                ...state,
                loading: true,
            }
        case ProgramActionTypes.SET_PROGRAM:
            return {
                ...state,
                loading: false,
                program: action.payload.program,
                modal: {
                    add: false,
                    edit: action.payload.modal,
                }
            }
        case ProgramActionTypes.UPDATE_PROGRAM:
            return {
                ...state,
                loading: true,
            }
        case ProgramActionTypes.DESTROY_PROGRAM:
            return {
                ...state,
                loading: action.payload,
            }
        case ProgramActionTypes.RESET:
            return {
                ...state,
                loading: false,
                program: false,
                programs: [],
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
export default Program;