import { APICore } from './APICore'

const api = new APICore()

function get(params){
    const baseUrl = '/user'
    return api.get(baseUrl, params)
}

export { get }
