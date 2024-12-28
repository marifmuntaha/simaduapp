import {APICore} from './APICore'

const api = new APICore()

function get(params) {
    const baseUrl = '/student'
    return api.get(baseUrl, params)
}

function store(params: {
    user_id: string, student_id: string, number_kk: string, head_family: string, father_status: string,
    father_name: string, father_nik: string, father_birthplace: string, father_birthdate: string,
    father_email: string, father_phone: string, mother_status: string, mother_name: string,
    mother_nik: string, mother_birthplace: string, mother_birthdate: string, mother_email: string,
    mother_phone: string, guard_status: string, guard_name: string, guard_nik: string,
    guard_birthplace: string, guard_birthdate: string, guard_email: string, guard_phone: string,
    creator: string, updater: string,
}) {
    const baseUrl = 'admission/student/parent';
    return api.create(baseUrl, params)
}

function update(params: {
    id: string, number_kk: string, head_family: string, father_status: string, father_name: string, father_nik: string,
    father_birthplace: string, father_birthdate: string, father_email: string, father_phone: string,
    mother_status: string, mother_name: string, mother_nik: string, mother_birthplace: string, mother_birthdate: string,
    mother_email: string, mother_phone: string, guard_status: string, guard_name: string, guard_nik: string,
    guard_birthplace: string, guard_birthdate: string, guard_email: string, guard_phone: string,
}) {
    const baseUrl = `admission/student/parent/${params.id}`;
    return api.update(baseUrl, params)
}

function destroy(params) {
    const baseUrl = `/student/${params}`
    return api.delete(baseUrl);
}

export {get, store, update, destroy}
