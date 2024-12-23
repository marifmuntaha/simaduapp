import {FileActionTypes} from "./constants";

export const fileApiResponseSuccess = (actionType, data) => ({
    type: FileActionTypes.API_RESPONSE_SUCCESS,
    payload: { actionType, data }
});

export const fileApiResponseError = (actionType, error) => ({
    type: FileActionTypes.API_RESPONSE_ERROR,
    payload: { actionType, error },
});

export const getFiles = (params) => ({
    type: FileActionTypes.GET_FILE,
    payload: {params},
});

export const addFile = (modal) => ({
    type: FileActionTypes.ADD_FILE,
    payload: {modal}
})

export const storeFile = ({formData: [institution_id, year_id, name, alias]}) => ({
    type: FileActionTypes.STORE_FILE,
    payload: {institution_id, year_id, name, alias},
})

export const setFile = (file, modal) => ({
    type: FileActionTypes.SET_FILE,
    payload: {file, modal},
})

export const updateFile = ({formData: [id, institution_id, year_id, name, alias]}) => ({
    type: FileActionTypes.UPDATE_FILE,
    payload: {id, institution_id, year_id, name, alias},
})

export const destroyFile = (params) => ({
    type: FileActionTypes.DESTROY_FILE,
    payload: {params},
});

export const resetFile = (params) => ({
    type: FileActionTypes.RESET,
    payload: {params}
})