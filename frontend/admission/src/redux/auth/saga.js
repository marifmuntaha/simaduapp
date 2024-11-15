import {SagaIterator} from "redux-saga";
import {authApiResponseError, authApiResponseSuccess} from "./actions";
import {AuthActionTypes} from "./constants";
import {APICore, setAuthorization} from "../../utils/api/APICore";
import {login as loginApi, logout as logoutApi} from '../../utils/api/auth'
import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import {toastError, toastSuccess} from "../../components";

const api = new APICore()

function* login({payload: {username, password, institution, ability, role}}): SagaIterator {
    try {
        const response = yield call(loginApi, {username, password, institution, ability, role})
        const data = response && response.data;
        const user = data && data.result;
        api.setLoggedInUser(user);
        setAuthorization(user.token);
        yield put(authApiResponseSuccess(AuthActionTypes.LOGIN_USER, data));
        toastSuccess(data.message);
    } catch (error) {
        yield put(authApiResponseError(AuthActionTypes.LOGIN_USER, error));
        api.setLoggedInUser(null);
        setAuthorization(null);
        toastError(error);
    }
}

function* logout(): SagaIterator {
    try {
        yield call(logoutApi)
        api.setLoggedInUser()
        setAuthorization()
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

function* authSaga() {
    yield all([fork(watchLoginUser), fork(watchLogout)])
}

export default authSaga;