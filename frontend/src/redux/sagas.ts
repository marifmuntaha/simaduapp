import { all } from 'redux-saga/effects'

import authSaga from './auth/saga'
import yearSaga from './year/saga'

export default function* rootSaga() {
    yield all([authSaga(), yearSaga()])
}
