import {ClassroomActionTypes} from "./constants";
const INITIAL_STATE = {
    loading: false,
    classroom: false,
    classrooms: [],
    modal : {
        add: false,
        edit: false,
    },
    error: false,
}
const Classroom = (state = INITIAL_STATE, action): any => {
    switch (action.type) {
        case ClassroomActionTypes.API_RESPONSE_SUCCESS: {
            switch (action.payload.actionType) {
                case ClassroomActionTypes.GET_CLASSROOM:
                    return {
                        ...state,
                        classrooms: action.payload.data,
                        loading: false,
                    }
                case ClassroomActionTypes.STORE_CLASSROOM:
                    return {
                        ...state,
                        loading: false,
                        classroom: action.payload.data.classroom,
                        modal: {
                            add: false,
                            edit: false,
                        }
                    }
                case ClassroomActionTypes.UPDATE_CLASSROOM:
                    return {
                        ...state,
                        loading: false,
                        classroom: action.payload.data.classroom,
                        modal: {
                            add: false,
                            edit: false,
                        }
                    }
                case ClassroomActionTypes.DESTROY_CLASSROOM:
                    return {
                        ...state,
                        classroom: action.payload.data,
                        loading: false,
                    }
                default:
                    return {...state}
            }
        }
        case ClassroomActionTypes.API_RESPONSE_ERROR: {
            switch (action.payload.actionType) {
                case ClassroomActionTypes.GET_CLASSROOM:
                    return {
                        ...state,
                        loading: false,
                        error: action.payload.error,
                    }
                case ClassroomActionTypes.STORE_CLASSROOM:
                    return {
                        ...state,
                        loading: false,
                        error: action.payload.error,

                    }
                case ClassroomActionTypes.UPDATE_CLASSROOM:
                    return {
                        ...state,
                        loading: false,
                        error: action.payload.error,

                    }
                case ClassroomActionTypes.DESTROY_CLASSROOM:
                    return {
                        ...state,
                        loading: false,
                        error: action.payload.error
                    }
                default:
                    return {...state}
            }
        }
        case ClassroomActionTypes.GET_CLASSROOM:
            return {
                ...state,
                loading: true,
            }
        case ClassroomActionTypes.ADD_CLASSROOM:
            return {
                ...state,
                loading: false,
                modal: {
                    add: action.payload.modal,
                    edit: false,
                }
            }
        case ClassroomActionTypes.STORE_CLASSROOM:
            return {
                ...state,
                loading: true,
            }
        case ClassroomActionTypes.SET_CLASSROOM:
            return {
                ...state,
                loading: false,
                classroom: action.payload.classroom,
                modal: {
                    add: false,
                    edit: action.payload.modal,
                }
            }
        case ClassroomActionTypes.UPDATE_CLASSROOM:
            return {
                ...state,
                loading: true,
            }
        case ClassroomActionTypes.DESTROY_CLASSROOM:
            return {
                ...state,
                loading: action.payload,
            }
        case ClassroomActionTypes.RESET:
            return {
                ...state,
                loading: false,
                classroom: false,
                classrooms: [],
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
export default Classroom;