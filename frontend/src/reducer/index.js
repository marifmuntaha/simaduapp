import {actionType} from "./actionType";
import {AuthInfo, getData, storeData, updateData, deleteData, Login} from "./action";
import {useContext} from "react";
import {AuthContext} from "../context/auth/AuthContext";

let url = '';

const Dispatch = (type, payload, params) => {
    const {auth} = useContext(AuthContext);
    switch (type) {
        case actionType.INSTITUTION_SHOW :
            url = `/master/institution/${params.id}`;
            return getData(url, payload, params).then(resp => {
                return resp;
            });
        case actionType.AUTH_REGISTER :
            url = '/auth/register';
            return storeData(url, payload).then(resp => {
                return resp;
            });
        case actionType.AUTH_LOGIN :
            Login(payload.username, payload.password)
        case actionType.AUTH_INFO :
            url = '/auth/info';
            return AuthInfo(url, payload).then(resp => {
                return resp;
            });
        case actionType.MAJOR_GET :
            url = '/master/major';
            return getData(url, payload, params).then(resp => {
                return resp;
            });
        case actionType.MAJOR_STORE :
            url = '/master/major';
            return storeData(url, payload).then(resp => {
                return resp;
            });
        case actionType.MAJOR_SHOW :
            url = `/master/major/${params.id}`;
            return getData(url, payload, params).then(resp => {
                return resp;
            });
        case actionType.MAJOR_UPDATE :
            url = `/master/major/${payload.formData.id}`;
            return updateData(url, payload).then(resp => {
                return resp;
            });
        case actionType.MAJOR_DELETE :
            url = `/master/major/${payload.id}`;
            return deleteData(url, payload).then(resp => {
                return resp;
            });
        case actionType.REGISTRANT_GET :
            url = '/admission/registrant';
            return getData(url, payload, params).then(resp => {
                return resp;
            });
        case actionType.REGISTRANT_STORE :
            url = '/admission/registrant';
            return storeData(url, payload).then(resp => {
                return resp;
            });
        case actionType.REGISTRANT_SHOW :
            url = `/admission/registrant/${params.id}`;
            return getData(url, payload, params).then(resp => {
                return resp;
            });
        case actionType.REGISTRANT_UPDATE :
            url = `/admission/registrant/${payload.formData.id}`;
            return updateData(url, payload).then(resp => {
                return resp;
            });
        case actionType.REGISTRANT_DELETE :
            url = `/admission/registrant/${payload.id}`;
            return deleteData(url, payload).then(resp => {
                return resp;
            });
        default:
    }
}

export {Dispatch, actionType}