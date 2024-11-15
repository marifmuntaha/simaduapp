import { APICore } from '../APICore'

const api = new APICore()

function get(params){
    const baseUrl = '/master/level'
    return api.get(baseUrl, params)
}

function store(params: {ladder_id: number, name: string, alias: string}){
    const baseUrl = '/master/level';
    return api.create(baseUrl, params)
}

function update(params: {id: string, ladder_id: number, name: string, alias: string}){
    const baseUrl = `/master/level/${params.id}`;
    return api.update(baseUrl, params)
}

function destroy(params){
    const baseUrl = `/master/level/${params}`
    return api.delete(baseUrl);
}
export { get, store, update, destroy }
