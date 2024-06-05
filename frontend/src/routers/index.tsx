import React from 'react'
import { Route, RouteProps } from 'react-router-dom'

// components
import PrivateRoute from './PrivateRoute'
import Year from "@/pages/master/year";

// lazy load all the views

// auth
const Login = React.lazy(() => import('@/pages/auth/Login'))
const Logout = React.lazy(() => import('@/pages/auth/Logout'))
const RecoverPassword = React.lazy(() => import('@/pages/auth/RecoverPassword'))

// dashboard
const Analytics = React.lazy(() => import('@/pages/dashboard/Analytics/'))
// error
const Error404 = React.lazy(() => import('@/pages/error/Error404'))
const Error500 = React.lazy(() => import('@/pages/error/Error500'))

export interface RoutesProps {
    path: RouteProps['path']
    name?: string
    element?: RouteProps['element']
    route?: any
    exact?: boolean
    icon?: string
    header?: string
    roles?: string[]
    children?: RoutesProps[]
}

// dashboards
const dashboardRoutes: RoutesProps = {
    path: '/',
    name: 'Dashboards',
    icon: 'home',
    children: [
        {
            path: '/',
            name: 'Analytics',
            element: <Analytics />,
            route: PrivateRoute,
        },
    ],
}
const masterRoutes: RoutesProps = {
    path: '/master',
    name: 'Master',
    icon: 'box-archive',
    children: [
        {
            path: '/master/tahun-pelajaran',
            name: 'Tahun Pelajaran',
            element: <Year />,
            route: PrivateRoute,
        },
    ],
}
// auth
const authRoutes: RoutesProps[] = [
    {
        path: '/autentifikasi/masuk',
        name: 'Login',
        element: <Login />,
        route: Route,
    },
    {
        path: '/autentifikasi/keluar',
        name: 'Logout',
        element: <Logout />,
        route: Route,
    },
    {
        path: '/autentifikasi/lupa-sandi',
        name: 'Reset',
        element: <RecoverPassword />,
        route: Route,
    },
]

// public routes
const otherPublicRoutes = [
    {
        path: '*',
        name: 'Error - 404',
        element: <Error404 />,
        route: Route,
    },
    {
        path: '/error-404',
        name: 'Error - 404',
        element: <Error404 />,
        route: Route,
    },
    {
        path: '/error-500',
        name: 'Error - 500',
        element: <Error500 />,
        route: Route,
    },
]

// flatten the list of all nested routes
const flattenRoutes = (routes: RoutesProps[]) => {
    let flatRoutes: RoutesProps[] = []

    routes = routes || []
    routes.forEach((item: RoutesProps) => {
        flatRoutes.push(item)
        if (typeof item.children !== 'undefined') {
            flatRoutes = [...flatRoutes, ...flattenRoutes(item.children)]
        }
    })
    return flatRoutes
}

// All routes
const authProtectedRoutes = [dashboardRoutes, masterRoutes]
const publicRoutes = [...authRoutes, ...otherPublicRoutes]

const authProtectedFlattenRoutes = flattenRoutes([...authProtectedRoutes])
const publicProtectedFlattenRoutes = flattenRoutes([...publicRoutes])
export { publicRoutes, authProtectedRoutes, authProtectedFlattenRoutes, publicProtectedFlattenRoutes }
