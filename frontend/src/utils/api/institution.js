import { APICore } from './APICore'

const api = new APICore()

function get(params){
    const baseUrl = '/institution'
    return api.get(baseUrl, params)
}

function store(params: {user_id: number, ladder_id: number, name: string, alias: string, nsm: string, npsn: string, headmaster: string, logo: string}){
    const baseUrl = '/institution';
    return api.create(baseUrl, params)
}

function update(params: {id: string, user_id: number, ladder_id: number, name: string, alias: string, nsm: string, npsn: string, headmaster: string, logo: string}){
    const baseUrl = `/institution/${params.id}`;
    return api.update(baseUrl, params)
}

function destroy(params){
    const baseUrl = `/institution/${params}`
    return api.delete(baseUrl);
}
export { get, store, update, destroy }
