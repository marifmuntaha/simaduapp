import React from "react";
import PrivateRoute from "./PrivateRoutes";
import {Route} from "react-router-dom";

const Dashboard = React.lazy(() => import("../pages/dashboard"));
const Major = React.lazy(() => import("../pages/master/major"));
const Ladder = React.lazy(() => import('../pages/master/ladder'))
const Level = React.lazy(() => import('../pages/master/level'))
const Year = React.lazy(() => import('../pages/master/year'))
const User = React.lazy(() => import("../pages/user"));

const Student = React.lazy(() => import("../pages/student"));
const AddStudent = React.lazy(() => import("../pages/student/Add"));
const Institution = React.lazy(() => import('../pages/administrator/institution'))

const Program = React.lazy(() => import('../pages/institute/program'));
const Classroom = React.lazy(() => import('../pages/institute/classroom'));

const Login = React.lazy(() => import("../pages/auth/Login"));
const Logout = React.lazy(() => import("../pages/auth/Logout"));
const Error404 = React.lazy(() => import('../pages/error/Error404'))
const Error504 = React.lazy(() => import('../pages/error/Error504'))

const AdministratorDashboard = React.lazy(() => import("../pages/dashboard"));

const OperatorDashboard = React.lazy(() => import('../pages/operator/dashboard'));
const AdmissionDashboard = React.lazy(() => import('../pages/operator/admission/dashboard'));
const AdmissionProgram = React.lazy(() => import('../pages/operator/admission/program'));
const AdmissionSetting = React.lazy(() => import('../pages/operator/admission/setting'));

const administratorRoute = [
    {
        path: '/administrator',
        name: 'Dashboard',
        element: <AdministratorDashboard/>,
        route: PrivateRoute,
    },
    {
        path: '/administrator/institusi',
        name: 'Data Institusi',
        element: <Institution/>,
        route: PrivateRoute,
    },

    {
        path: '/administrator/pengguna',
        name: 'Data Pengguna',
        element: <User/>,
        route: PrivateRoute,
    },
]
const operatorRoutes = [
    {
        path: '/operator',
        name: 'Dashboard',
        element: <OperatorDashboard/>,
        route: PrivateRoute,
    },
    {
        path: '/operator/master/tahun-pelajaran',
        name: 'Tahun Pelajaran',
        element: <Year/>,
        route: PrivateRoute,
    },
    {
        path: '/operator/master/program',
        name: 'Program',
        element: <Program/>,
        route: PrivateRoute,
    },
    {
        path: '/operator/master/rombel',
        name: 'Rombel',
        element: <Classroom/>,
        route: PrivateRoute,
    },
    {
        path: '/operator/kesiswaan/data-siswa',
        name: 'Data Siswa',
        element: <Student/>,
        route: PrivateRoute,
    },
    {
        path: '/operator/kesiswaan/data-siswa/tambah',
        name: 'Tambah Siswa',
        element: <AddStudent/>,
        route: PrivateRoute,
    },
    {
        path: '/operator/ppdb',
        name: 'Admission Dashboard',
        element: <AdmissionDashboard/>,
        route: PrivateRoute,
    },
    {
        path: '/operator/ppdb/program',
        name: 'Admission Program',
        element: <AdmissionProgram/>,
        route: PrivateRoute,
    },
    {
        path: '/operator/ppdb/pengaturan',
        name: 'Admission Pengaturan',
        element: <AdmissionSetting/>,
        route: PrivateRoute,
    },
]

const otherProtectedRoutes = [
    {
        path: '/',
        name: 'Dashboard',
        element: <Dashboard/>,
        route: PrivateRoute,
    },
]

export const protectedRoutes = [
    ...administratorRoute,
    ...operatorRoutes,
    ...otherProtectedRoutes
]
export const protectedRoute = [
    {
        path: '/',
        name: 'Dashboard',
        element: <Dashboard/>,
        route: PrivateRoute,
    },
    {
        path: '/master/jenjang',
        name: 'Jenjang',
        element: <Ladder/>,
        route: PrivateRoute,
    },
    {
        path: '/master/jurusan',
        name: 'Jurusan',
        element: <Major/>,
        route: PrivateRoute,
    },
    {
        path: '/master/tahun-pelajaran',
        name: 'Tahun Pelajaran',
        element: <Year/>,
        route: PrivateRoute,
    },
    {
        path: '/master/tingkatan',
        name: 'Tingkatan',
        element: <Level/>,
        route: PrivateRoute,
    },
    {
        path: '/institusi',
        name: 'Data Institusi',
        element: <Institution/>,
        route: PrivateRoute,
    },
    {
        path: '/lembaga/program',
        name: 'Program',
        element: <Program/>,
        route: PrivateRoute,
    },
    {
        path: '/lembaga/rombel',
        name: 'Rombel',
        element: <Classroom/>,
        route: PrivateRoute,
    },
    {
        path: '/pengguna',
        name: 'Pengguna',
        element: <User/>,
        route: PrivateRoute,
    },
]

export const publicRoutes = [
    {
        path: '/auth/masuk',
        name: 'Masuk',
        element: <Login/>,
        route: Route,
    },
    {
        path: '/auth/keluar',
        name: 'Keluar',
        element: <Logout/>,
        route: Route,
    },
    {
        path: '*',
        name: 'Error404',
        element: <Error404/>,
        route: Route,
    },
    {
        path: '/error404',
        name: 'Error404',
        element: <Error404/>,
        route: Route,
    },
    {
        path: '/error504',
        name: 'Error504',
        element: <Error504/>,
        route: Route,
    },
]