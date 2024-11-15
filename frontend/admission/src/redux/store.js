import {configureStore} from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'

import Auth from './auth/reducers'

// saga
import rootSaga from './sagas'
import Institution from "./institution/reducers";
import Year from "./master/year/reducers";
import Program from "./master/program/reducers";

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()
const middleware = [sagaMiddleware]

// mount it on the store
export const store = configureStore({
    reducer: {
        auth: Auth,
        institution: Institution,
        program: Program,
        year: Year,
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware),
})

// run the saga
sagaMiddleware.run(rootSaga)