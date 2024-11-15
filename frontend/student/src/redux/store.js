import {configureStore} from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'

import Auth from './auth/reducers'

// saga
import rootSaga from './sagas'
import User from "./user/reducers";
import Ladder from "./master/ladder/reducers";
import Institution from "./institution/reducers";
import Year from "./master/year/reducers";
import Level from "./master/level/reducers";
import Major from "./master/major/reducers";
import Program from "./institute/program/reducers";
import Classroom from "./institute/classroom/reducers";
import Student from "./student/reducers";
import StudentParent from "./studentParent/reducers";
import admissionSetting from "./admission/setting/reducers";
import admissionProgram from "./admission/program/reducers";

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()
const middleware = [sagaMiddleware]

// mount it on the store
export const store = configureStore({
    reducer: {
        auth: Auth,
        classroom: Classroom,
        institution: Institution,
        major: Major,
        ladder: Ladder,
        level: Level,
        program: Program,
        student: Student,
        studentParent: StudentParent,
        user: User,
        year: Year,
        admissionSetting: admissionSetting,
        admissionProgram: admissionProgram
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware),
})

// run the saga
sagaMiddleware.run(rootSaga)