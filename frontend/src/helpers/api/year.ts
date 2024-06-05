import { APICore } from './apiCore'

const api = new APICore()

// account
function get(params: any) {
    const baseUrl = '/master/year'
    return api.get(`${baseUrl}`, params)
}

function create() {
    const baseUrl = '/auth/logout/'
    return api.create(`${baseUrl}`, {})
}

function update(params: { fullname: string; email: string; password: string }) {
    const baseUrl = '/auth/register/'
    return api.create(`${baseUrl}`, params)
}

function destroy(params: { username: string }) {
    const baseUrl = '/auth/forgot-password/'
    return api.create(`${baseUrl}`, params)
}

export { get, create, update, destroy }
