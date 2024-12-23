import { APICore } from '../APICore'

const api = new APICore()

function get(params){
    const baseUrl = '/master/file'
    return api.get(baseUrl, params)
}

function store(params: {name: string, alias: string, status: string}){
    const baseUrl = '/master/file';
    return api.create(baseUrl, params)
}

function update(params: {id: string, name: string, alias: string, status: string}){
    const baseUrl = `/master/file/${params.id}`;
    return api.update(baseUrl, params)
}

function show(id) {
    const baseUrl = `/master/file/${id}`;
    return api.get(baseUrl);
}

function destroy(params){
    const baseUrl = `/master/file/${params}`
    return api.delete(baseUrl);
}
export { get, store, update, destroy }
