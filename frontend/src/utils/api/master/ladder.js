import { APICore } from '../APICore'

const api = new APICore()

function get(params){
    const baseUrl = '/master/ladder'
    return api.get(baseUrl, params)
}

function store(params: {name: string, alias: string, description: string}){
    const baseUrl = '/master/ladder';
    return api.create(baseUrl, params)
}

function update(params: {id: string, name: string, alias: string, description: string}){
    const baseUrl = `/master/ladder/${params.id}`;
    return api.update(baseUrl, params)
}

function destroy(params){
    const baseUrl = `/master/ladder/${params}`
    return api.delete(baseUrl);
}
export { get, store, update, destroy }
