
import {SagaIterator} from "redux-saga";
import {ladderApiResponseError, ladderApiResponseSuccess} from "./actions";
import {LadderActionTypes} from "./constants";
import {get as getApi, store as storeApi, update as updateApi, destroy as destroyApi} from '../../../utils/api/master/ladder'
import {all, call, fork, put, takeEvery} from "redux-saga/effects";

function* get({payload: {params}}): SagaIterator {
    try {
        const response = yield call(getApi, params)
        const data = response && response.data
        yield put(ladderApiResponseSuccess(LadderActionTypes.GET_LADDER, data))
    } catch (error){
        yield put(ladderApiResponseError(LadderActionTypes.GET_LADDER, error))
    }
}

function* store({payload: {name, alias, description}}): SagaIterator {
    try {
        const response = yield call(storeApi, {name, alias, description});
        const data = response && response.data;
        yield put(ladderApiResponseSuccess(LadderActionTypes.STORE_LADDER, data));
    } catch (error){
        yield put(ladderApiResponseError(LadderActionTypes.STORE_LADDER, error))
    }
}

function* update({payload: {id, name, alias, description}}): SagaIterator {
    try {
        const response = yield call(updateApi, {id, name, alias, description});
        const data = response && response.data;
        yield put(ladderApiResponseSuccess(LadderActionTypes.UPDATE_LADDER, data));
    } catch (error){
        yield put(ladderApiResponseError(LadderActionTypes.UPDATE_LADDER, error))
    }
}

function* destroy({payload: {params}}): SagaIterator {
    try {
        const response = yield call(destroyApi, params);
        const data = response && response.data
        yield put(ladderApiResponseSuccess(LadderActionTypes.DESTROY_LADDER, data))
    } catch (error){
        yield put(ladderApiResponseError(LadderActionTypes.DESTROY_LADDER, error))
    }
}

export function* watchGetLadders() {
    yield takeEvery(LadderActionTypes.GET_LADDER, get);
}

export function* watchStoreLadder() {
    yield takeEvery(LadderActionTypes.STORE_LADDER, store);
}

export function* watchUpdateLadder() {
    yield takeEvery(LadderActionTypes.UPDATE_LADDER, update);
}

export function* watchDestroyLadder() {
    yield takeEvery(LadderActionTypes.DESTROY_LADDER, destroy);
}
function* ladderSaga(){
    yield all([fork(watchGetLadders), fork(watchStoreLadder), fork(watchUpdateLadder), fork(watchDestroyLadder)])
}

export default ladderSaga;