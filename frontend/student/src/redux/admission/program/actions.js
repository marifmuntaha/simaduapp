import {AdmissionProgramActionTypes} from "./constants";

export const admissionProgramApiResponseSuccess = (actionType, data) => ({
    type: AdmissionProgramActionTypes.API_RESPONSE_SUCCESS,
    payload: { actionType, data }
});

export const admissionProgramApiResponseError = (actionType, error) => ({
    type: AdmissionProgramActionTypes.API_RESPONSE_ERROR,
    payload: { actionType, error },
});

export const getAdmissionPrograms = (params) => ({
    type: AdmissionProgramActionTypes.GET_ADMISSION_PROGRAM,
    payload: {params},
});

export const addAdmissionProgram = (modal) => ({
    type: AdmissionProgramActionTypes.ADD_ADMISSION_PROGRAM,
    payload: {modal}
})

export const storeAdmissionProgram = ({formData: [institution_id, year_id, name, alias, description, boarding]}) => ({
    type: AdmissionProgramActionTypes.STORE_ADMISSION_PROGRAM,
    payload: {institution_id, year_id, name, alias, description, boarding},
})

export const setAdmissionProgram = (program, modal) => ({
    type: AdmissionProgramActionTypes.SET_ADMISSION_PROGRAM,
    payload: {program, modal},
})

export const updateAdmissionProgram = ({formData: [id, institution_id, year_id, name, alias, description, boarding]}) => ({
    type: AdmissionProgramActionTypes.UPDATE_ADMISSION_PROGRAM,
    payload: {id, institution_id, year_id, name, alias, description, boarding},
})

export const destroyAdmissionProgram = (params) => ({
    type: AdmissionProgramActionTypes.DESTROY_ADMISSION_PROGRAM,
    payload: {params},
});

export const resetAdmissionProgram = () => ({
    type: AdmissionProgramActionTypes.RESET,
    payload: {}
})