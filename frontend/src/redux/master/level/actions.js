import {LevelActionTypes} from "./constants";

export const levelApiResponseSuccess = (actionType, data) => ({
    type: LevelActionTypes.API_RESPONSE_SUCCESS,
    payload: { actionType, data }
});

export const levelApiResponseError = (actionType, error) => ({
    type: LevelActionTypes.API_RESPONSE_ERROR,
    payload: { actionType, error },
});

export const getLevels = (params) => ({
    type: LevelActionTypes.GET_LEVEL,
    payload: {params},
});

export const addLevel = (modal) => ({
    type: LevelActionTypes.ADD_LEVEL,
    payload: {modal}
})

export const storeLevel = ({formData: [ladder_id, name, alias]}) => ({
    type: LevelActionTypes.STORE_LEVEL,
    payload: {ladder_id, name, alias},
})

export const setLevel = (level, modal) => ({
    type: LevelActionTypes.SET_LEVEL,
    payload: {level, modal},
})

export const updateLevel = ({formData: [id, ladder_id, name, alias]}) => ({
    type: LevelActionTypes.UPDATE_LEVEL,
    payload: {id, ladder_id, name, alias},
})

export const destroyLevel = (params) => ({
    type: LevelActionTypes.DESTROY_LEVEL,
    payload: {params},
});

export const resetLevel = () => ({
    type: LevelActionTypes.RESET,
    payload: {}
})