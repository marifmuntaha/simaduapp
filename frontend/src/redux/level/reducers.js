import {LevelActionTypes} from "./constants";
const INITIAL_STATE = {
    loading: false,
    level: false,
    levels: [],
    modal : {
        add: false,
        edit: false,
    },
    error: false,
}
const Level = (state = INITIAL_STATE, action): any => {
    switch (action.type) {
        case LevelActionTypes.API_RESPONSE_SUCCESS: {
            switch (action.payload.actionType) {
                case LevelActionTypes.GET_LEVEL:
                    return {
                        ...state,
                        levels: action.payload.data,
                        loading: false,
                    }
                case LevelActionTypes.STORE_LEVEL:
                    return {
                        ...state,
                        loading: false,
                        level: action.payload.data.level,
                        modal: {
                            add: false,
                            edit: false,
                        }
                    }
                case LevelActionTypes.UPDATE_LEVEL:
                    return {
                        ...state,
                        loading: false,
                        level: action.payload.data.level,
                        modal: {
                            add: false,
                            edit: false,
                        }
                    }
                case LevelActionTypes.DESTROY_LEVEL:
                    return {
                        ...state,
                        level: action.payload.data,
                        loading: false,
                    }
                default:
                    return {...state}
            }
        }
        case LevelActionTypes.API_RESPONSE_ERROR: {
            switch (action.payload.actionType) {
                case LevelActionTypes.GET_LEVEL:
                    return {
                        ...state,
                        loading: false,
                        error: action.payload.error,
                    }
                case LevelActionTypes.STORE_LEVEL:
                    return {
                        ...state,
                        loading: false,
                        error: action.payload.error,

                    }
                case LevelActionTypes.UPDATE_LEVEL:
                    return {
                        ...state,
                        loading: false,
                        error: action.payload.error,

                    }
                case LevelActionTypes.DESTROY_LEVEL:
                    return {
                        ...state,
                        loading: false,
                        error: action.payload.error
                    }
                default:
                    return {...state}
            }
        }
        case LevelActionTypes.GET_LEVEL:
            return {
                ...state,
                loading: true,
            }
        case LevelActionTypes.ADD_LEVEL:
            return {
                ...state,
                loading: false,
                modal: {
                    add: action.payload.modal,
                    edit: false,
                }
            }
        case LevelActionTypes.STORE_LEVEL:
            return {
                ...state,
                loading: true,
            }
        case LevelActionTypes.SET_LEVEL:
            return {
                ...state,
                loading: false,
                level: action.payload.level,
                modal: {
                    add: false,
                    edit: action.payload.modal,
                }
            }
        case LevelActionTypes.UPDATE_LEVEL:
            return {
                ...state,
                loading: true,
            }
        case LevelActionTypes.DESTROY_LEVEL:
            return {
                ...state,
                loading: action.payload,
            }
        case LevelActionTypes.RESET:
            return {
                ...state,
                loading: false,
                level: false,
                levels: [],
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
export default Level;