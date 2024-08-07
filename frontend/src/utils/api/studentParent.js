import {APICore} from './APICore'

const api = new APICore()

function get(params) {
    const baseUrl = '/student'
    return api.get(baseUrl, params)
}

function store(params: {
    user_id: string, number_kk: string, head_family: string, father_status: string,
    father_name: string, father_nik: string, father_birthplace: string, father_birthday: string,
    father_email: string, father_phone: string, mother_status: string, mother_name: string,
    mother_nik: string, mother_birthplace: string, mother_birthday: string, mother_email: string,
    mother_phone: string, guard_status: string, guard_name: string, guard_nik: string,
    guard_birthplace: string, guard_birthday: string, guard_email: string, guard_phone: string,
    creator: string, updater: string,
}) {
    const baseUrl = '/student';
    return api.create(baseUrl, params)
}

function update(params: {
    id: string,
    institution_id: string,
    year_id: string,
    level_id: string,
    major_id: string,
    name: string,
    fullname: string
}) {
    const baseUrl = `/student/${params.id}`;
    return api.update(baseUrl, params)
}

function destroy(params) {
    const baseUrl = `/student/${params}`
    return api.delete(baseUrl);
}

export {get, store, update, destroy}
