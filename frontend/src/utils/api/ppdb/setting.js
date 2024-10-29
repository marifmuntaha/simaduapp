import { APICore } from '../APICore'

const api = new APICore()

function get(params){
    const baseUrl = '/ppdb/setting'
    return api.get(baseUrl, params)
}

function show(params){
    const baseUrl = `/ppdb/setting/${params.id}`;
    return api.get(baseUrl, params)
}

function update(params: {id: number, institution: number, name: string, alias: string, year: string, brochure: string, status: string, youtube: string}) {
    const baseUrl = `/master/year/${params.id}`;
    return api.update(baseUrl, params)
}

export { get, show, update }
