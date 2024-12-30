import { APICore } from './APICore'

const api = new APICore()

function get(params){
    const baseUrl = '/admission/setting'
    return api.get(baseUrl, params)
}

function update(params: {id: number, name: string, alias: string, year_id: string, brochure: string, status: string, youtube: string}) {
    const baseUrl = `/admission/setting/${params.id}`;
    return api.update(baseUrl, params)
}

export { get, update }