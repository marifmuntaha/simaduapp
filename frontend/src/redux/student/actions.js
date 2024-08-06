import {StudentActionTypes} from "./constants";

export const studentApiResponseSuccess = (actionType, data) => ({
    type: StudentActionTypes.API_RESPONSE_SUCCESS,
    payload: { actionType, data }
});

export const studentApiResponseError = (actionType, error) => ({
    type: StudentActionTypes.API_RESPONSE_ERROR,
    payload: { actionType, error },
});

export const getStudents = (params) => ({
    type: StudentActionTypes.GET_STUDENT,
    payload: {params},
});

export const addStudent = (modal) => ({
    type: StudentActionTypes.ADD_STUDENT,
    payload: {modal}
})

export const storeStudent = ({formData: [institution_id, year_id, level_id, major_id, name, fullname]}) => ({
    type: StudentActionTypes.STORE_STUDENT,
    payload: {institution_id, year_id, level_id, major_id, name, fullname},
})

export const setStudent = (student, modal) => ({
    type: StudentActionTypes.SET_STUDENT,
    payload: {student, modal},
})

export const updateStudent = ({formData: [id, institution_id, year_id, level_id, major_id, name, fullname]}) => ({
    type: StudentActionTypes.UPDATE_STUDENT,
    payload: {id, institution_id, year_id, level_id, major_id, name, fullname},
})

export const destroyStudent = (params) => ({
    type: StudentActionTypes.DESTROY_STUDENT,
    payload: {params},
});

export const resetStudent = () => ({
    type: StudentActionTypes.RESET,
    payload: {}
})