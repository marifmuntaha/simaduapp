import {APICore} from './APICore'

const api = new APICore()

function get(params) {
    const baseUrl = 'admission/student/school'
    return api.get(baseUrl, params)
}

function store(params: { student_id: string, npsn: string, name: string, address: string}) {
    const baseUrl = 'admission/student/school';
    return api.create(baseUrl, params)
}

function update(params: { id: string, npsn: string, name: string, address: string }) {
    const baseUrl = `admission/student/school/${params.id}`;
    return api.update(baseUrl, params)
}

function destroy(params) {
    const baseUrl = `admission/student/school/${params}`
    return api.delete(baseUrl);
}

export {get, store, update, destroy}
