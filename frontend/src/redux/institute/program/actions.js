import {ProgramActionTypes} from "./constants";

export const programApiResponseSuccess = (actionType, data) => ({
    type: ProgramActionTypes.API_RESPONSE_SUCCESS,
    payload: { actionType, data }
});

export const programApiResponseError = (actionType, error) => ({
    type: ProgramActionTypes.API_RESPONSE_ERROR,
    payload: { actionType, error },
});

export const getPrograms = (params) => ({
    type: ProgramActionTypes.GET_PROGRAM,
    payload: {params},
});

export const addProgram = (modal) => ({
    type: ProgramActionTypes.ADD_PROGRAM,
    payload: {modal}
})

export const storeProgram = ({formData: [institution_id, year_id, name, alias, description, boarding]}) => ({
    type: ProgramActionTypes.STORE_PROGRAM,
    payload: {institution_id, year_id, name, alias, description, boarding},
})

export const setProgram = (program, modal) => ({
    type: ProgramActionTypes.SET_PROGRAM,
    payload: {program, modal},
})

export const updateProgram = ({formData: [id, institution_id, year_id, name, alias, description, boarding]}) => ({
    type: ProgramActionTypes.UPDATE_PROGRAM,
    payload: {id, institution_id, year_id, name, alias, description, boarding},
})

export const destroyProgram = (params) => ({
    type: ProgramActionTypes.DESTROY_PROGRAM,
    payload: {params},
});

export const resetProgram = () => ({
    type: ProgramActionTypes.RESET,
    payload: {}
})