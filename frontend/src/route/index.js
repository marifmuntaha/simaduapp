import React from "react";
import PrivateRoute from "./PrivateRoutes";
import {Route} from "react-router-dom";

const Dashboard = React.lazy(() => import("../pages/dashboard"));
const Ladder = React.lazy(() => import('../pages/master/ladder'))
const Year = React.lazy(() => import('../pages/master/year'))
const User = React.lazy(() => import("../pages/user"));
const Institution = React.lazy(() => import('../pages/institution'))

const Login = React.lazy(() => import("../pages/auth/Login"));
const Logout = React.lazy(() => import("../pages/auth/Logout"));
const Error404 = React.lazy(() => import('../pages/error/Error404'))
const Error504 = React.lazy(() => import('../pages/error/Error504'))

export const protectedRoutes = [
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
        path: '/master/tahun-pelajaran',
        name: 'Tahun Pelajaran',
        element: <Year/>,
        route: PrivateRoute,
    },
    {
        path: '/institusi',
        name: 'Data Institusi',
        element: <Institution/>,
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