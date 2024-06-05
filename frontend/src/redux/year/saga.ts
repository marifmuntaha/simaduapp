import {APICore} from "@/helpers/api/apiCore";
import {SagaIterator} from "@redux-saga/core";
import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import {YearActionTypes} from "@/redux/year/constanst.ts";
import {yearApiResponseError, yearApiResponseSuccess} from "@/redux/year/actions.ts";
import { get as getApi } from '@/helpers/api/year'

const api = new APICore();

function* get(): SagaIterator {
    try {
        const response = yield call(getApi, {})
        const years = response.data.result
        yield put(yearApiResponseSuccess(YearActionTypes.GET_YEAR, years))
    } catch (error: any){
        yield put(yearApiResponseError(YearActionTypes.GET_YEAR, error))
    }
}
export function* watchgetYear() {
    yield takeEvery(YearActionTypes.GET_YEAR, get)
}
function* yearSaga() {
    yield all([fork(watchgetYear)])
}
export default yearSaga;