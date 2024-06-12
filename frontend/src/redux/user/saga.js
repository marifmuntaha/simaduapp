
import {SagaIterator} from "redux-saga";
import {userApiResponseError, userApiResponseSuccess} from "./actions";
import {UserActionTypes} from "./constants";
import {get as getApi} from '../../utils/api/user'
import {all, call, fork, put, takeEvery} from "redux-saga/effects";


function* get(params): SagaIterator {
    try {
        const response = yield call(getApi, params)
        const data = response && response.data.result
        yield put(userApiResponseSuccess(UserActionTypes.GET_USER, data))
    } catch (error){
        yield put(userApiResponseError(UserActionTypes.GET_USER, error))
    }
}

export function* watchGetUsers() {
    yield takeEvery(UserActionTypes.GET_USER, get);
}

function* userSaga(){
    yield all([fork(watchGetUsers)])
}

export default userSaga;