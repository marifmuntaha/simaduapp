import {StudentParentActionTypes} from "./constants";

export const studentParentApiResponseSuccess = (actionType, data) => ({
    type: StudentParentActionTypes.API_RESPONSE_SUCCESS,
    payload: { actionType, data }
});

export const studentParentApiResponseError = (actionType, error) => ({
    type: StudentParentActionTypes.API_RESPONSE_ERROR,
    payload: { actionType, error },
});

export const getStudentParents = (params) => ({
    type: StudentParentActionTypes.GET_STUDENT_PARENT,
    payload: {params},
});

export const addStudentParent = (modal) => ({
    type: StudentParentActionTypes.ADD_STUDENT_PARENT,
    payload: {modal}
})

export const storeStudentParent = ({formData: [user_id, student_id, number_kk, head_family, father_status, father_name,
    father_nik, father_birthplace, father_birthday, father_email, father_phone, mother_status, mother_name,
    mother_nik, mother_birthplace, mother_birthday, mother_email, mother_phone, guard_status, guard_name, guard_nik,
    guard_birthplace, guard_birthday, guard_email, guard_phone,
]}) => ({
    type: StudentParentActionTypes.STORE_STUDENT_PARENT,
    payload: {user_id, student_id, number_kk, head_family, father_status, father_name,
        father_nik, father_birthplace, father_birthday, father_email, father_phone, mother_status, mother_name,
        mother_nik, mother_birthplace, mother_birthday, mother_email, mother_phone, guard_status, guard_name, guard_nik,
        guard_birthplace, guard_birthday, guard_email, guard_phone,},
})

export const setStudentParent = (student, modal) => ({
    type: StudentParentActionTypes.SET_STUDENT_PARENT,
    payload: {student, modal},
})

export const updateStudentParent = ({formData: [id, institution_id, year_id, level_id, major_id, name, fullname]}) => ({
    type: StudentParentActionTypes.UPDATE_STUDENT_PARENT,
    payload: {id, institution_id, year_id, level_id, major_id, name, fullname},
})

export const destroyStudentParent = (params) => ({
    type: StudentParentActionTypes.DESTROY_STUDENT_PARENT,
    payload: {params},
});

export const resetStudentParent = () => ({
    type: StudentParentActionTypes.RESET,
    payload: {}
})