import {APICore} from './APICore'

const api = new APICore()

function get(params) {
    const baseUrl = 'admission/student/file'
    return api.get(baseUrl, params)
}

function store(params: { student_id: string, file_id: string, number: string, address: string}) {
    const baseUrl = 'admission/student/file';
    return api.createWithFile(baseUrl, params)
}

function destroy(params) {
    const baseUrl = `admission/student/file/${params}`
    return api.delete(baseUrl);
}

export {get, store, destroy}
