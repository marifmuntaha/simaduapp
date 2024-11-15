import { all } from 'redux-saga/effects'
import authSaga from './auth/saga'
import institutionSaga from "./institution/saga";
import yearSaga from "./master/year/saga";
import programSaga from "./master/program/saga";

export default function* rootSaga(){
    yield all([
        authSaga(),
        institutionSaga(),
        programSaga(),
        yearSaga(),
    ])
}