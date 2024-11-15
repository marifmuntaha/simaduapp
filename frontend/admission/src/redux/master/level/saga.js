
import {SagaIterator} from "redux-saga";
import {levelApiResponseError, levelApiResponseSuccess} from "./actions";
import {LevelActionTypes} from "./constants";
import {get as getApi, store as storeApi, update as updateApi, destroy as destroyApi} from '../../../utils/api/master/level'
import {all, call, fork, put, takeEvery} from "redux-saga/effects";

function* get({payload: {params}}): SagaIterator {
    try {
        const response = yield call(getApi, params)
        const data = response && response.data
        yield put(levelApiResponseSuccess(LevelActionTypes.GET_LEVEL, data))
    } catch (error){
        yield put(levelApiResponseError(LevelActionTypes.GET_LEVEL, error))
    }
}

function* store({payload: {ladder_id, name, alias}}): SagaIterator {
    try {
        const response = yield call(storeApi, {ladder_id, name, alias});
        const data = response && response.data;
        yield put(levelApiResponseSuccess(LevelActionTypes.STORE_LEVEL, data));
    } catch (error){
        yield put(levelApiResponseError(LevelActionTypes.STORE_LEVEL, error))
    }
}

function* update({payload: {id, ladder_id, name, alias}}): SagaIterator {
    try {
        const response = yield call(updateApi, {id, ladder_id, name, alias});
        const data = response && response.data;
        yield put(levelApiResponseSuccess(LevelActionTypes.UPDATE_LEVEL, data));
    } catch (error){
        yield put(levelApiResponseError(LevelActionTypes.UPDATE_LEVEL, error))
    }
}

function* destroy({payload: {params}}): SagaIterator {
    try {
        const response = yield call(destroyApi, params);
        const data = response && response.data
        yield put(levelApiResponseSuccess(LevelActionTypes.DESTROY_LEVEL, data))
    } catch (error){
        yield put(levelApiResponseError(LevelActionTypes.DESTROY_LEVEL, error))
    }
}

export function* watchGetLevels() {
    yield takeEvery(LevelActionTypes.GET_LEVEL, get);
}

export function* watchStoreLevel() {
    yield takeEvery(LevelActionTypes.STORE_LEVEL, store);
}

export function* watchUpdateLevel() {
    yield takeEvery(LevelActionTypes.UPDATE_LEVEL, update);
}

export function* watchDestroyLevel() {
    yield takeEvery(LevelActionTypes.DESTROY_LEVEL, destroy);
}
function* levelSaga(){
    yield all([fork(watchGetLevels), fork(watchStoreLevel), fork(watchUpdateLevel), fork(watchDestroyLevel)])
}

export default levelSaga;