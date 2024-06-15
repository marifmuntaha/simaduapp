import {ClassroomActionTypes} from "./constants";

export const classroomApiResponseSuccess = (actionType, data) => ({
    type: ClassroomActionTypes.API_RESPONSE_SUCCESS,
    payload: { actionType, data }
});

export const classroomApiResponseError = (actionType, error) => ({
    type: ClassroomActionTypes.API_RESPONSE_ERROR,
    payload: { actionType, error },
});

export const getClassrooms = (params) => ({
    type: ClassroomActionTypes.GET_CLASSROOM,
    payload: {params},
});

export const addClassroom = (modal) => ({
    type: ClassroomActionTypes.ADD_CLASSROOM,
    payload: {modal}
})

export const storeClassroom = ({formData: [institution, year, level, major, name, fullname]}) => ({
    type: ClassroomActionTypes.STORE_CLASSROOM,
    payload: {institution, year, level, major, name, fullname},
})

export const setClassroom = (classroom, modal) => ({
    type: ClassroomActionTypes.SET_CLASSROOM,
    payload: {classroom, modal},
})

export const updateClassroom = ({formData: [id, institution, year, level, major, name, fullname]}) => ({
    type: ClassroomActionTypes.UPDATE_CLASSROOM,
    payload: {id, institution, year, level, major, name, fullname},
})

export const destroyClassroom = (params) => ({
    type: ClassroomActionTypes.DESTROY_CLASSROOM,
    payload: {params},
});

export const resetClassroom = () => ({
    type: ClassroomActionTypes.RESET,
    payload: {}
})