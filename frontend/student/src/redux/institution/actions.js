import {InstitutionActionTypes} from "./constants";

export const institutionApiResponseSuccess = (actionType, data) => ({
    type: InstitutionActionTypes.API_RESPONSE_SUCCESS,
    payload: { actionType, data }
});

export const institutionApiResponseError = (actionType, error) => ({
    type: InstitutionActionTypes.API_RESPONSE_ERROR,
    payload: { actionType, error },
});

export const getInstitutions = (params) => ({
    type: InstitutionActionTypes.GET_INSTITUTION,
    payload: {params},
});

export const addInstitution = (modal) => ({
    type: InstitutionActionTypes.ADD_INSTITUTION,
    payload: {modal}
})

export const storeInstitution = ({formData: [user_id, ladder_id, name, alias, nsm, npsn, headmaster, logo]}) => ({
    type: InstitutionActionTypes.STORE_INSTITUTION,
    payload: {user_id, ladder_id, name, alias, nsm, npsn, headmaster, logo},
})

export const setInstitution = (institution, modal) => ({
    type: InstitutionActionTypes.SET_INSTITUTION,
    payload: {institution, modal},
})

export const updateInstitution = ({formData: [id, user_id, ladder_id, name, alias, nsm, npsn, headmaster, logo]}) => ({
    type: InstitutionActionTypes.UPDATE_INSTITUTION,
    payload: {id, user_id, ladder_id, name, alias, nsm, npsn, headmaster, logo},
})

export const destroyInstitution = (params) => ({
    type: InstitutionActionTypes.DESTROY_INSTITUTION,
    payload: {params},
});

export const resetInstitution = () => ({
    type: InstitutionActionTypes.RESET,
    payload: {}
})