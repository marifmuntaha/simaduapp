
import {SagaIterator} from "redux-saga";
import {authApiResponseError, authApiResponseSuccess} from "./actions";
import {AuthActionTypes} from "./constants";
import {APICore, setAuthorization} from "../../utils/api/APICore";
import {login as loginApi, logout as logoutApi} from '../../utils/api/auth'
import {all, call, fork, put, takeEvery} from "redux-saga/effects";

const api = new APICore()

function* login({payload: {username, password}}): SagaIterator {
    try {
        const response = yield call(loginApi, { username, password })
        const user = response && response.data.result
        api.setLoggedInUser(user)
        setAuthorization(user['token'])
        yield put(authApiResponseSuccess(AuthActionTypes.LOGIN_USER, user))
    } catch (error){
        yield put(authApiResponseError(AuthActionTypes.LOGIN_USER, error))
        api.setLoggedInUser(null)
        setAuthorization(null)
    }
}

function* logout(): SagaIterator {
    try {
        yield call(logoutApi)
        api.setLoggedInUser(null)
        setAuthorization(null)
        yield put(authApiResponseSuccess(AuthActionTypes.LOGOUT_USER, {}))
    } catch (error) {
        yield put(authApiResponseError(AuthActionTypes.LOGOUT_USER, error))
    }
}

export function* watchLoginUser() {
    yield takeEvery(AuthActionTypes.LOGIN_USER, login);
}

export function* watchLogout() {
    yield takeEvery(AuthActionTypes.LOGOUT_USER, logout);
}

function* authSaga(){
    yield all([fork(watchLoginUser), fork(watchLogout)])
}

export default authSaga;