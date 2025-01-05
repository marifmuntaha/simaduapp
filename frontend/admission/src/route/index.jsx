import React from "react";
import PrivateRoute from "./PrivateRoutes";
import {Route} from "react-router-dom";

const Dashboard = React.lazy(() => import("../pages/dashboard"));
const Year = React.lazy(() => import('../pages/master/year'));
const Program = React.lazy(() => import('../pages/master/program'));
const File = React.lazy(() => import('../pages/master/file'));

const Institution = React.lazy(() => import('../pages/administrator/institution'))

const Login = React.lazy(() => import("../pages/auth/Login"));
const Logout = React.lazy(() => import("../pages/auth/Logout"));
const Error404 = React.lazy(() => import('../pages/error/Error404'));
const Error504 = React.lazy(() => import('../pages/error/Error504'));


const MasterUser = React.lazy(() => import('../pages/master/user'));

const AdministratorDashboard = React.lazy(() => import("../pages/dashboard"));
const Ladder = React.lazy(() => import("../pages/administrator/master/ladder"));
const Product = React.lazy(() => import("../pages/master/product"));

const OperatorDashboard = React.lazy(() => import('../pages/operator/dashboard'));
const OperatorSetting = React.lazy(() => import('../pages/operator/setting'));
const OperatorStudent = React.lazy(() => import('../pages/operator/student'));
const OperatorStudentView = React.lazy(() => import('../pages/operator/student/view'));
const OperatorStudentAdd = React.lazy(() => import('../pages/operator/student/Add'));
const OperatorStudentEdit = React.lazy(() => import('../pages/operator/student/Edit'));
const OperatorReport = React.lazy(() => import('../pages/operator/report'));

const TreasurerDashboard = React.lazy(() => import('../pages/treasurer/dashboard'));
const TreasurerStudentView = React.lazy(() => import('../pages/operator/student/view'));
const TreasurerInvoice = React.lazy(() => import('../pages/treasurer/invoice'));


const administratorRoute = [
    {
        path: '/administrator',
        name: 'Dashboard',
        element: <AdministratorDashboard/>,
        route: PrivateRoute,
    },
    {
        path: '/administrator/master/jenjang',
        name: 'Data Jenjang',
        element: <Ladder/>,
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
        element: <MasterUser/>,
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
        path: '/operator/master/berkas',
        name: 'Berkas',
        element: <File/>,
        route: PrivateRoute,
    },
    {
        path: '/operator/pendaftar',
        name: 'Data Pendaftar',
        element: <OperatorStudent/>,
        route: PrivateRoute,
    },
    {
        path: '/operator/pendaftar/:id/ubah',
        name: 'Ubah Pendaftar',
        element: <OperatorStudentEdit/>,
        route: PrivateRoute,
    },
    {
        path: '/operator/pendaftar/:id/detail',
        name: 'Detail Pendaftar',
        element: <OperatorStudentView/>,
        route: PrivateRoute,
    },
    {
        path: '/operator/pendaftar/tambah',
        name: 'Tambah Pendaftar',
        element: <OperatorStudentAdd/>,
        route: PrivateRoute,
    },
    {
        path: '/operator/laporan',
        name: 'Laporan',
        element: <OperatorReport/>,
        route: PrivateRoute,
    },
    {
        path: '/operator/pengguna',
        name: 'Pengguna',
        element: <MasterUser/>,
        route: PrivateRoute,
    },
    {
        path: '/operator/pengaturan',
        name: 'Pengaturan',
        element: <OperatorSetting/>,
        route: PrivateRoute,
    },
]
const treasurerRoutes = [
    {
        path: '/bendahara',
        name: 'Dashboard',
        element: <TreasurerDashboard/>,
        route: PrivateRoute,
    },
    {
        path: 'bendahara/master/item-pembayaran',
        name: 'Item Pembayaran',
        element: <Product/>,
        route: PrivateRoute,
    },
    {
        path: 'bendahara/pendaftar',
        name: 'Data Pendaftar',
        element: <OperatorStudent/>,
        route: PrivateRoute,
    },
    {
        path: '/bendahara/pendaftar/:id/detail',
        name: 'Detail Pendaftar',
        element: <TreasurerStudentView/>,
        route: PrivateRoute,
    },
    {
        path: 'bendahara/tagihan',
        name: 'Data Tagihan',
        element: <TreasurerInvoice/>,
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
    ...treasurerRoutes,
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