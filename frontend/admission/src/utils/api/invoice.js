import { APICore } from './APICore'

const api = new APICore()

function get(params){
    const baseUrl = '/admission/finance/invoice'
    return api.get(baseUrl, params)
}

function store(params: {
    institution_id: string,
    year_id: string,
    student_id: string,
    number: string,
    amount: string,
    discount: string,
    discount_description: string,
    total: string,
    item: string,
    status: string,
}){
    const baseUrl = '/admission/finance/invoice';
    return api.create(baseUrl, params)
}

function show(params){
    const baseUrl = `/admission/student/${params.id}`;
    return api.get(baseUrl, params)
}

function update(params: {
    id: string,
    institution_id: string,
    year_id: string,
    student_id: string,
    number: string,
    amount: string,
    discount: string,
    discount_description: string,
    total: string,
    item: string,
    status: string,
}){
    const baseUrl = `/admission/finance/invoice/${params.id}`;
    return api.update(baseUrl, params)
}

function destroy(params){
    const baseUrl = `/admission/finance/invoice/${params}`
    return api.delete(baseUrl);
}
export { get, store, show,  update, destroy }
