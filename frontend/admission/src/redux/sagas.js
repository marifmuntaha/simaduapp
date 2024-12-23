import { all } from 'redux-saga/effects'
import authSaga from './auth/saga'
import institutionSaga from "./institution/saga";
import yearSaga from "./master/year/saga";
import programSaga from "./master/program/saga";
import settingSaga from "./setting/saga";
import studentSaga from "./student/saga";
import userSaga from "./user/saga";
import ladderSaga from "./master/ladder/saga";
import fileSaga from "./master/file/saga";

export default function* rootSaga(){
    yield all([
        authSaga(),
        fileSaga(),
        institutionSaga(),
        ladderSaga(),
        programSaga(),
        settingSaga(),
        studentSaga(),
        userSaga(),
        yearSaga(),
    ])
}