import {MajorActionTypes} from "./constants";

export const majorApiResponseSuccess = (actionType, data) => ({
    type: MajorActionTypes.API_RESPONSE_SUCCESS,
    payload: { actionType, data }
});

export const majorApiResponseError = (actionType, error) => ({
    type: MajorActionTypes.API_RESPONSE_ERROR,
    payload: { actionType, error },
});

export const getMajors = (params) => ({
    type: MajorActionTypes.GET_MAJOR,
    payload: {params},
});

export const addMajor = (modal) => ({
    type: MajorActionTypes.ADD_MAJOR,
    payload: {modal}
})

export const storeMajor = ({formData: [ladder_id: number, name: string, alias: string, description: string]}) => ({
    type: MajorActionTypes.STORE_MAJOR,
    payload: {ladder_id, name, alias, description},
})

export const setMajor = (major, modal) => ({
    type: MajorActionTypes.SET_MAJOR,
    payload: {major, modal},
})

export const updateMajor = ({formData: [id, ladder_id, name, alias, description]}) => ({
    type: MajorActionTypes.UPDATE_MAJOR,
    payload: {id, ladder_id, name, alias, description},
})

export const destroyMajor = (params) => ({
    type: MajorActionTypes.DESTROY_MAJOR,
    payload: {params},
});

export const resetMajor = () => ({
    type: MajorActionTypes.RESET,
    payload: {}
})