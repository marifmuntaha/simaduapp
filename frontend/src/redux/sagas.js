import { all } from 'redux-saga/effects'
import authSaga from './auth/saga'
import userSaga from "./user/saga";
import ladderSaga from "./master/ladder/saga";
import institutionSaga from "./institution/saga";
import yearSaga from "./master/year/saga";
import levelSaga from "./master/level/saga";
import majorSaga from "./master/major/saga";
import programSaga from "./institute/program/saga";
import classroomSaga from "./institute/classroom/saga";
import studentSaga from "./student/saga";

export default function* rootSaga(){
    yield all([
        authSaga(),
        classroomSaga(),
        majorSaga(),
        ladderSaga(),
        levelSaga(),
        programSaga(),
        studentSaga(),
        yearSaga(),
        institutionSaga(),
        userSaga()])
}