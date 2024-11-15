import {LevelActionTypes} from "./constants";
const INITIAL_STATE = {
    loading: false,
    level: false,
    modal : {
        add: false,
        edit: false,
    },
    error: false,
    success: false,
    loadData: true
}
const Level = (state = INITIAL_STATE, action): any => {
    switch (action.type) {
        case LevelActionTypes.API_RESPONSE_SUCCESS: {
            switch (action.payload.actionType) {
                case LevelActionTypes.GET_LEVEL:
                    return {
                        ...state,
                        levels: action.payload.data.result,
                        loading: false,
                    }
                case LevelActionTypes.STORE_LEVEL:
                    return {
                        ...state,
                        loading: false,
                        success: action.payload.data.message,
                        level: action.payload.data.result,
                    }
                case LevelActionTypes.UPDATE_LEVEL:
                    return {
                        ...state,
                        loading: false,
                        success: action.payload.data.message,
                        level: action.payload.data.result,
                        modal: {
                            add: false,
                            edit: false,
                        }
                    }
                case LevelActionTypes.DESTROY_LEVEL:
                    return {
                        ...state,
                        success: action.payload.data.message,
                        level: action.payload.data.result,
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
                loading: action.payload.params,
            }
        case LevelActionTypes.RESET:
            return {
                ...state,
                loading: false,
                level: false,
                error: false,
                success: false,
                loadData: false
            }
        default:
            return {...state}
    }
}
export default Level;