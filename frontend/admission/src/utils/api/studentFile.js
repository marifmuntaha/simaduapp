import {APICore} from './APICore'

const api = new APICore()

function get(params) {
    const baseUrl = '/student/file'
    return api.get(baseUrl, params)
}

function store(params: { student_id: string, file_id: string, number: string, address: string}) {
    const baseUrl = 'admission/student/school';
    return api.create(baseUrl, params)
}

function update(params: {
    id: string,
    institution_id: string,
    year_id: string,
    level_id: string,
    major_id: string,
    name: string,
    fullname: string
}) {
    const baseUrl = `/student/${params.id}`;
    return api.update(baseUrl, params)
}

function show(params) {
    const baseUrl = `/student/file/${params.id}`;
    return api.get(baseUrl, params);
}
function destroy(params) {
    const baseUrl = `/student/${params}`
    return api.delete(baseUrl);
}

export {get, store, update, destroy}
