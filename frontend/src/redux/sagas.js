import { all } from 'redux-saga/effects'
import authSaga from './auth/saga'
import userSaga from "./user/saga";
import ladderSaga from "./ladder/saga";

export default function* rootSaga(){
    yield all([authSaga(), userSaga(), ladderSaga()])
}