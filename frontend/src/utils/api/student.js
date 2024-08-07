import { APICore } from './APICore'

const api = new APICore()

function get(params){
    const baseUrl = '/student'
    return api.get(baseUrl, params)
}

function store(params: {
    user_id: string,
    nism: string,
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

    province_id: string,
    city_id: string,
    district_id: string,
    village_id: string,
    address: string,

    boarding: string,
    oneemis: string,
    onevervalpd: string,

    parent_id: string,

}){
    const baseUrl = '/student';
    return api.create(baseUrl, params)
}

function update(params: {id: string, institution_id: string, year_id: string, level_id: string, major_id: string, name: string, fullname: string}){
    const baseUrl = `/student/${params.id}`;
    return api.update(baseUrl, params)
}

function destroy(params){
    const baseUrl = `/student/${params}`
    return api.delete(baseUrl);
}
export { get, store, update, destroy }
