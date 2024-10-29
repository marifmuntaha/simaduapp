import {ProgramActionTypes} from "./constants";

export const admissionProgramApiResponseSuccess = (actionType, data) => ({
    type: ProgramActionTypes.API_RESPONSE_SUCCESS,
    payload: { actionType, data }
});

export const admissionProgramApiResponseError = (actionType, error) => ({
    type: ProgramActionTypes.API_RESPONSE_ERROR,
    payload: { actionType, error },
});

export const getAdmissionPrograms = (params) => ({
    type: ProgramActionTypes.GET_PROGRAM,
    payload: {params},
});

export const addAdmissionProgram = (modal) => ({
    type: ProgramActionTypes.ADD_PROGRAM,
    payload: {modal}
})

export const storeAdmissionProgram = ({formData: [institution_id, year_id, name, alias, description, boarding]}) => ({
    type: ProgramActionTypes.STORE_PROGRAM,
    payload: {institution_id, year_id, name, alias, description, boarding},
})

export const setAdmissionProgram = (program, modal) => ({
    type: ProgramActionTypes.SET_PROGRAM,
    payload: {program, modal},
})

export const updateAdmissionProgram = ({formData: [id, institution_id, year_id, name, alias, description, boarding]}) => ({
    type: ProgramActionTypes.UPDATE_PROGRAM,
    payload: {id, institution_id, year_id, name, alias, description, boarding},
})

export const destroyAdmissionProgram = (params) => ({
    type: ProgramActionTypes.DESTROY_PROGRAM,
    payload: {params},
});

export const resetAdmissionProgram = () => ({
    type: ProgramActionTypes.RESET,
    payload: {}
})