import axios from "axios";
import handleError from "../utils/handleError";
import {toastSuccess} from "../components";

export const Login = (username, password) => {
    // const {setLoading} = useContext(AuthContext);
    // setLoading(true);

    // return await axios.post(url, state.formData).then(resp => {
    //     localStorage.setItem('token', resp.data.result.token);
    //     state.setLoading && state.setLoading(false);
    //     toastSuccess(resp.data.message);
    //     return resp.data.result;
    // }).catch(error => {
    //     handleError(error);
    //     state.setLoading && state.setLoading(false);
    // })
}
export const AuthInfo = async (url, state) => {
    // return await axios.get(url).then(resp => {
    //     state.setData(resp.data.result);
    //     state.setAuth(true);
    //     return resp.data.result;
    // }).catch(error => {
    //     handleError(error);
    //     state.setAuth(false);
    // })
}

export const getData = async (url, state, params) => {
    return await axios.get(url, {
        params: params
    }).then(resp => {
        state.setData && state.setData(resp.data.result);
        return resp.data.result;
    }).catch(error => handleError(error));
}

export const storeData = async (url, state) => {
    state.setLoading && state.setLoading(true);
    return await axios.post(url, state.formData).then(resp => {
        toastSuccess(resp.data.message);
        state.setLoading && state.setLoading(false);
        state.toggle && state.toggle();
        state.setReload && state.setReload(true);
        return resp.data.result
    }).catch(error => {
        handleError(error);
        state.setLoading && state.setLoading(false);
    })
}
export const updateData = async (url, state) => {
    state.setLoading && state.setLoading(true);
    return await axios.put(url, state.formData).then(resp => {
        toastSuccess(resp.data.message);
        state.setLoading && state.setLoading(false);
        state.toggle && state.toggle();
        state.setReload && state.setReload(true);
        return resp.data.result;
    }).catch(error => {
        handleError(error);
        state.setLoading && state.setLoading(false);
    })
}
export const deleteData =  async (url, state) => {
    state.setLoading && state.setLoading(state.id);
    return await axios.delete(url).then(resp => {
        toastSuccess(resp.data.message);
        state.setLoading && state.setLoading(0);
        state.setReload && state.setReload(true);
        return resp.data.result;
    }).catch(error => {
        handleError(error);
        state.setLoading && state.setLoading(0);

    })
}