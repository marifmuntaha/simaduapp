import {LadderActionTypes} from "./constants";
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
const Ladder = (state = INITIAL_STATE, action): any => {
    switch (action.type) {
        case LadderActionTypes.API_RESPONSE_SUCCESS: {
            switch (action.payload.actionType) {
                case LadderActionTypes.GET_LADDER:
                    return {
                        ...state,
                        ladders: action.payload.data,
                        loading: false,
                    }
                case LadderActionTypes.STORE_LADDER:
                    return {
                        ...state,
                        loading: false,
                        ladder: action.payload.data.ladder,
                        modal: {
                            add: false,
                            edit: false,
                        }
                    }
                case LadderActionTypes.UPDATE_LADDER:
                    return {
                        ...state,
                        loading: false,
                        ladder: action.payload.data.ladder,
                        modal: {
                            add: false,
                            edit: false,
                        }
                    }
                case LadderActionTypes.DESTROY_LADDER:
                    return {
                        ...state,
                        ladder: action.payload.data,
                        loading: false,
                    }
                default:
                    return {...state}
            }
        }
        case LadderActionTypes.API_RESPONSE_ERROR: {
            switch (action.payload.actionType) {
                case LadderActionTypes.GET_LADDER:
                    return {
                        ...state,
                        loading: false,
                        error: action.payload.error,
                    }
                case LadderActionTypes.STORE_LADDER:
                    return {
                        ...state,
                        loading: false,
                        error: action.payload.error,

                    }
                case LadderActionTypes.UPDATE_LADDER:
                    return {
                        ...state,
                        loading: false,
                        error: action.payload.error,

                    }
                case LadderActionTypes.DESTROY_LADDER:
                    return {
                        ...state,
                        loading: false,
                        error: action.payload.error
                    }
                default:
                    return {...state}
            }
        }
        case LadderActionTypes.GET_LADDER:
            return {
                ...state,
                loading: true,
            }
        case LadderActionTypes.ADD_LADDER:
            return {
                ...state,
                loading: false,
                modal: {
                    add: action.payload.modal,
                    edit: false,
                }
            }
        case LadderActionTypes.STORE_LADDER:
            return {
                ...state,
                loading: true,
            }
        case LadderActionTypes.SET_LADDER:
            return {
                ...state,
                loading: false,
                ladder: action.payload.ladder,
                modal: {
                    add: false,
                    edit: action.payload.modal,
                }
            }
        case LadderActionTypes.UPDATE_LADDER:
            return {
                ...state,
                loading: true,
            }
        case LadderActionTypes.DESTROY_LADDER:
            return {
                ...state,
                loading: action.payload,
            }
        case LadderActionTypes.RESET:
            return {
                ...state,
                loading: false,
                user: false,
                users: [],
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
export default Ladder;