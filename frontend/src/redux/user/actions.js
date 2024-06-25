import {UserActionTypes} from "./constants";

export const userApiResponseSuccess = (actionType, data) => ({
    type: UserActionTypes.API_RESPONSE_SUCCESS,
    payload: { actionType, data }
});

export const userApiResponseError = (actionType, error) => ({
    type: UserActionTypes.API_RESPONSE_ERROR,
    payload: { actionType, error },
});

export const getUsers = (params) => ({
    type: UserActionTypes.GET_USER,
    payload: {params},
});

export const addUser = (modal) => ({
    type: UserActionTypes.ADD_USER,
    payload: {modal}
})

export const storeUser = ({formData: [fullname, email, username, password, role, phone, image]}) => ({
    type: UserActionTypes.STORE_USER,
    payload: {fullname, email, username, password, role, phone, image},
})

export const setUser = (user, modal) => ({
    type: UserActionTypes.SET_USER,
    payload: {user, modal},
})

export const updateUser = ({formData: [id, fullname, email, username, password, role, phone, image]}) => ({
    type: UserActionTypes.UPDATE_USER,
    payload: {id, fullname, email, username, password, role, phone, image},
})

export const destroyUser = (params) => ({
    type: UserActionTypes.DESTROY_USER,
    payload: {params},
});

export const resetUser = () => ({
    type: UserActionTypes.RESET,
    payload: {}
})