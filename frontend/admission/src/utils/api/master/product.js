import { APICore } from '../APICore'

const api = new APICore()

function get(params){
    const baseUrl = '/admission/product'
    return api.get(baseUrl, params)
}

function store(params: {institution_id: string, year_id: string, name: string, alias: string, gender: string; program: string; price: string, boarding: string}){
    const baseUrl = '/admission/product';
    return api.create(baseUrl, params)
}

function update(params: {id: string, institution: string, year: string, name: string, alias: string, gender: string; program: string; price: string, boarding: string}){
    const baseUrl = `/admission/product/${params.id}`;
    return api.update(baseUrl, params)
}

function destroy(params){
    const baseUrl = `/admission/product/${params}`
    return api.delete(baseUrl);
}
export { get, store, update, destroy }
