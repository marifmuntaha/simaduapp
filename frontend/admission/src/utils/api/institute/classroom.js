import { APICore } from '../APICore'

const api = new APICore()

function get(params){
    const baseUrl = '/institute/classroom'
    return api.get(baseUrl, params)
}

function store(params: {institution_id: string, year_id: string, level_id: string, major_id: string, name: string, fullname: string}){
    const baseUrl = '/institute/classroom';
    return api.create(baseUrl, params)
}

function update(params: {id: string, institution_id: string, year_id: string, level_id: string, major_id: string, name: string, fullname: string}){
    const baseUrl = `/institute/classroom/${params.id}`;
    return api.update(baseUrl, params)
}

function destroy(params){
    const baseUrl = `/institute/classroom/${params}`
    return api.delete(baseUrl);
}
export { get, store, update, destroy }
