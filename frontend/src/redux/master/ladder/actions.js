import {LadderActionTypes} from "./constants";

export const ladderApiResponseSuccess = (actionType, data) => ({
    type: LadderActionTypes.API_RESPONSE_SUCCESS,
    payload: { actionType, data }
});

export const ladderApiResponseError = (actionType, error) => ({
    type: LadderActionTypes.API_RESPONSE_ERROR,
    payload: { actionType, error },
});

export const getLadders = (params) => ({
    type: LadderActionTypes.GET_LADDER,
    payload: {params},
});

export const addLadder = (modal) => ({
    type: LadderActionTypes.ADD_LADDER,
    payload: {modal}
})

export const storeLadder = ({formData: [name, alias, description]}) => ({
    type: LadderActionTypes.STORE_LADDER,
    payload: {name, alias, description},
})

export const setLadder = (ladder, modal) => ({
    type: LadderActionTypes.SET_LADDER,
    payload: {ladder, modal},
})

export const updateLadder = ({formData: [id, name, alias, description]}) => ({
    type: LadderActionTypes.UPDATE_LADDER,
    payload: {id, name, alias, description},
})

export const destroyLadder = (params) => ({
    type: LadderActionTypes.DESTROY_LADDER,
    payload: {params},
});

export const resetLadder = () => ({
    type: LadderActionTypes.RESET,
    payload: {}
})