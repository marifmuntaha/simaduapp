import React from "react";
import PrivateRoute from "./PrivateRoutes";
import {Route} from "react-router-dom";

const Dashboard = React.lazy(() => import("../pages/dashboard"));
const Year = React.lazy(() => import('../pages/master/year'));
const Program = React.lazy(() => import('../pages/master/program'));

const User = React.lazy(() => import("../pages/user"));

const Student = React.lazy(() => import("../pages/student"));
const AddStudent = React.lazy(() => import("../pages/student/Add"));
const Institution = React.lazy(() => import('../pages/administrator/institution'))

const Login = React.lazy(() => import("../pages/auth/Login"));
const Logout = React.lazy(() => import("../pages/auth/Logout"));
const Error404 = React.lazy(() => import('../pages/error/Error404'));
const Error504 = React.lazy(() => import('../pages/error/Error504'));

const AdministratorDashboard = React.lazy(() => import("../pages/dashboard"));

const OperatorDashboard = React.lazy(() => import('../pages/operator/dashboard'));
const OperatorSetting = React.lazy(() => import('../pages/operator/setting'));
const OperatorStudent = React.lazy(() => import('../pages/operator/student'));
const OperatorStudentAdd = React.lazy(() => import('../pages/operator/student/add'));

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
        path: '/operator/pendaftar',
        name: 'Data Pendaftar',
        element: <OperatorStudent/>,
        route: PrivateRoute,
    },
    {
        path: '/operator/pendaftar/tambah',
        name: 'Tambah Pendaftar',
        element: <OperatorStudentAdd/>,
        route: PrivateRoute,
    },
    {
        path: '/operator/pendaftar/ubah',
        name: 'Ubah Pendaftar',
        element: <AddStudent/>,
        route: PrivateRoute,
    },
    {
        path: '/operator/pengaturan',
        name: 'Pengaturan',
        element: <OperatorSetting/>,
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