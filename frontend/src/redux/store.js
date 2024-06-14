import {configureStore} from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'

import Auth from './auth/reducers'

// saga
import rootSaga from './sagas'
import User from "./user/reducers";
import Ladder from "./ladder/reducers";
import Institution from "./institution/reducers";
import Year from "./year/reducers";

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()
const middleware = [sagaMiddleware]

// mount it on the store
export const store = configureStore({
    reducer: {
        auth: Auth,
        user: User,
        ladder: Ladder,
        year: Year,
        institution: Institution
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware),
})

// run the saga
sagaMiddleware.run(rootSaga)