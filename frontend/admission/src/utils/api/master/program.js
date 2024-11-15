import { APICore } from '../APICore'

const api = new APICore()

function get(params){
    const baseUrl = '/admission/program'
    return api.get(baseUrl, params)
}

function store(params: {institution_id: string, year_id: string, name: string, alias: string, description: string; boarding: string}){
    const baseUrl = '/admission/program';
    return api.create(baseUrl, params)
}

function update(params: {id: string, institution: string, year: string, name: string, alias: string, description: string; boarding: string}){
    const baseUrl = `/admission/program/${params.id}`;
    return api.update(baseUrl, params)
}

function destroy(params){
    const baseUrl = `/admission/program/${params}`
    return api.delete(baseUrl);
}
export { get, store, update, destroy }
