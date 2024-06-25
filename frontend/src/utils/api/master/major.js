import { APICore } from '../APICore'

const api = new APICore()

function get(params){
    const baseUrl = '/master/major'
    return api.get(baseUrl, params)
}

function store(params: {ladder_id: number, name: string, alias: string, description: string}){
    const baseUrl = '/master/major';
    return api.create(baseUrl, params)
}

function update(params: {id: number, ladder_id: number, name: string, alias: string, description: string}){
    const baseUrl = `/master/major/${params.id}`;
    return api.update(baseUrl, params)
}

function destroy(params){
    const baseUrl = `/master/major/${params}`
    return api.delete(baseUrl);
}
export { get, store, update, destroy }
