import {InstitutionActionTypes} from "./constants";
const INITIAL_STATE = {
    loading: false,
    institution: false,
    modal : {
        add: false,
        edit: false,
    },
    error: false,
    success: false,
    loadData: true
}
const Institution = (state = INITIAL_STATE, action): any => {
    switch (action.type) {
        case InstitutionActionTypes.API_RESPONSE_SUCCESS: {
            switch (action.payload.actionType) {
                case InstitutionActionTypes.GET_INSTITUTION:
                    return {
                        ...state,
                        institutions: action.payload.data.result,
                        loading: false,
                    }
                case InstitutionActionTypes.STORE_INSTITUTION:
                    return {
                        ...state,
                        loading: false,
                        success: action.payload.data.message,
                        institution: action.payload.data.result,
                        loadData: true
                    }
                case InstitutionActionTypes.UPDATE_INSTITUTION:
                    return {
                        ...state,
                        loading: false,
                        success: action.payload.data.message,
                        institution: action.payload.data.institution,
                        loadData: true
                    }
                case InstitutionActionTypes.SHOW_INSTITUTION:
                    return {
                        ...state,
                        institution: action.payload.data.result,
                        loading: false,
                    }
                case InstitutionActionTypes.DESTROY_INSTITUTION:
                    return {
                        ...state,
                        loading: false,
                        success: action.payload.data.message,
                        institution: action.payload.params,
                        loadData: true
                    }
                default:
                    return {...state}
            }
        }
        case InstitutionActionTypes.API_RESPONSE_ERROR: {
            switch (action.payload.actionType) {
                case InstitutionActionTypes.GET_INSTITUTION:
                    return {
                        ...state,
                        loading: false,
                        error: action.payload.error,
                    }
                case InstitutionActionTypes.STORE_INSTITUTION:
                    return {
                        ...state,
                        loading: false,
                        error: action.payload.error,

                    }
                case InstitutionActionTypes.UPDATE_INSTITUTION:
                    return {
                        ...state,
                        loading: false,
                        error: action.payload.error,

                    }
                case InstitutionActionTypes.SHOW_INSTITUTION:
                    return {
                        ...state,
                        loading: false,
                        error: action.payload.error,

                    }
                case InstitutionActionTypes.DESTROY_INSTITUTION:
                    return {
                        ...state,
                        loading: false,
                        error: action.payload.error
                    }
                default:
                    return {...state}
            }
        }
        case InstitutionActionTypes.GET_INSTITUTION:
            return {
                ...state,
                loading: true,
            }
        case InstitutionActionTypes.ADD_INSTITUTION:
            return {
                ...state,
                loading: false,
                modal: {
                    add: action.payload.modal,
                    edit: false,
                }
            }
        case InstitutionActionTypes.STORE_INSTITUTION:
            return {
                ...state,
                loading: true,
            }
        case InstitutionActionTypes.SET_INSTITUTION:
            return {
                ...state,
                loading: false,
                institution: action.payload.institution,
                modal: {
                    add: false,
                    edit: action.payload.modal,
                }
            }
        case InstitutionActionTypes.UPDATE_INSTITUTION:
            return {
                ...state,
                loading: true,
            }
        case InstitutionActionTypes.DESTROY_INSTITUTION:
            return {
                ...state,
                loading: action.payload.params,
            }
        case InstitutionActionTypes.RESET:
            return {
                ...state,
                loading: false,
                institution: false,
                error: false,
                success: false,
                loadData: false
            }
        default:
            return {...state}
    }
}
export default Institution;