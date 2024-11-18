import { APICore } from './APICore'

const api = new APICore()

function get(params){
    const baseUrl = '/admission/student'
    return api.get(baseUrl, params)
}

function store(params: {
    user_id: string,
    institution_id: string,
    year_id: string,
    nisn: string,
    nik: string,
    name: string,
    birthplace: string,
    birthdate: string,
    gender: string,
    orderborn: string,
    sibling: string,
    phone: string,
    email: string,
}){
    const baseUrl = '/admission/student';
    return api.create(baseUrl, params)
}

function update(params: {
    id: string,
    user_id: string,
    institution_id: string,
    year_id: string,
    nisn: string,
    nik: string,
    name: string,
    birthplace: string,
    birthdate: string,
    gender: string,
    orderborn: string,
    sibling: string,
    phone: string,
    email: string,
}){
    const baseUrl = `/admission/student/${params.id}`;
    return api.update(baseUrl, params)
}

function destroy(params){
    const baseUrl = `/admission/student/${params}`
    return api.delete(baseUrl);
}
export { get, store, update, destroy }
