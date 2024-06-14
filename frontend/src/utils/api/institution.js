import { APICore } from './APICore'

const api = new APICore()

function get(params){
    const baseUrl = '/institution'
    return api.get(baseUrl, params)
}

function store(params: {user: number, ladder: number, name: string, alias: string, nsm: string, npsn: string, headmaster: string, logo: string}){
    const baseUrl = '/institution';
    return api.create(baseUrl, params)
}

function update(params: {id: string, fullname: string, email: string, username: string, password: string, role: string, phone: string, image: string}){
    const baseUrl = `/institution/${params.id}`;
    return api.update(baseUrl, params)
}

function destroy(params){
    const baseUrl = `/institution/${params}`
    return api.delete(baseUrl);
}
export { get, store, update, destroy }
