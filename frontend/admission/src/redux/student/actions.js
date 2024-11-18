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

export const storeStudent = ({formData: [user_id, institution_id, year_id, nisn, nik, name, birthplace, birthdate, gender, orderborn, sibling, phone, email]}) => ({
    type: StudentActionTypes.STORE_STUDENT,
    payload: {user_id, institution_id, year_id, nisn, nik, name, birthplace, birthdate, gender, orderborn, sibling, phone, email},
})

export const setStudent = (student, modal) => ({
    type: StudentActionTypes.SET_STUDENT,
    payload: {student, modal},
})

export const updateStudent = ({formData: [id, user_id, institution_id, year_id, nisn, nik, name, birthplace, birthdate, gender, orderborn, sibling, phone, email]}) => ({
    type: StudentActionTypes.UPDATE_STUDENT,
    payload: {id, user_id, institution_id, year_id, nisn, nik, name, birthplace, birthdate, gender, orderborn, sibling, phone, email},
})

export const destroyStudent = (params) => ({
    type: StudentActionTypes.DESTROY_STUDENT,
    payload: {params},
});

export const resetStudent = () => ({
    type: StudentActionTypes.RESET,
    payload: {}
})