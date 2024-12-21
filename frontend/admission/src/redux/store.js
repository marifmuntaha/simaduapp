import {configureStore} from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'

import Auth from './auth/reducers'

// saga
import rootSaga from './sagas'
import Institution from "./institution/reducers";
import Ladder from "./master/ladder/reducers";
import Year from "./master/year/reducers";
import Program from "./master/program/reducers";
import Setting from "./setting/reducers";
import Student from "./student/reducers";
import User from "./user/reducers";

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()
const middleware = [sagaMiddleware]

// mount it on the store
export const store = configureStore({
    reducer: {
        auth: Auth,
        institution: Institution,
        ladder: Ladder,
        program: Program,
        setting: Setting,
        student: Student,
        user: User,
        year: Year,
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware),
})

// run the saga
sagaMiddleware.run(rootSaga)