import { APICore } from '../APICore'

const api = new APICore()

function get(params){
    const baseUrl = () => {
        if (params.id){
            return  `/master/year/${params.id}`
        }
        else {
            return '/master/year'
        }
    }
    return api.get(baseUrl(), params)
}

function store(params: {institution_id: string, name: number, description: string, active: string}){
    const baseUrl = '/master/year';
    return api.create(baseUrl, params)
}

function update(params: {id: number, institution_id: number, name: string, description: string, active: string}){
    const baseUrl = `/master/year/${params.id}`;
    return api.update(baseUrl, params)
}

function destroy(params){
    const baseUrl = `/master/year/${params}`
    return api.delete(baseUrl);
}
export { get, store, update, destroy }
