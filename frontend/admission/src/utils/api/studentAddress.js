import {APICore} from './APICore'

const api = new APICore()

function get(params) {
    const baseUrl = '/student'
    return api.get(baseUrl, params)
}

function store(params: {
    student_id: string,
    province_id: string,
    district_id: string,
    subdistrict_id: string,
    village_id: string,
    address: string,
}) {
    const baseUrl = 'admission/student/address';
    return api.create(baseUrl, params)
}

function update(params: {
    id: string,
    province_id: string,
    district_id: string,
    subdistrict_id: string,
    village_id: string,
    address: string,
}) {
    const baseUrl = `admission/student/address/${params.id}`;
    return api.update(baseUrl, params)
}

function destroy(params) {
    const baseUrl = `/student/${params}`
    return api.delete(baseUrl);
}

export {get, store, update, destroy}
