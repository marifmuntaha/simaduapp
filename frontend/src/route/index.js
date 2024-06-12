// import React, {useLayoutEffect} from "react";
// import {Routes, Route, useLocation} from "react-router-dom";
//
// import Layout from "../layout";
// import LayoutNoSidebar from "../layout/NoSidebar"
// import Dashboard from "../pages/dashboard";
// import Error404 from "../pages/error/Error404";
// import Error504 from "../pages/error/Error504";
// import Register from "../pages/auth/Register";
// import Login from "../pages/auth/Login";
// import Forgot from "../pages/auth/Forgot";
// import Registrant from "../pages/registrant";
// import Major from "../pages/master/major";
//
// const Router = () => {
//     const location = useLocation();
//     useLayoutEffect(() => {
//         window.scrollTo(0, 0);
//     }, [location]);
//
//     return (
//         <Routes>
//             <Route path={`${process.env.PUBLIC_URL}`} element={<Layout/>}>
//                 <Route index element={<Dashboard/>}/>
//                 <Route path="data-pendaftar" element={<Registrant/>}/>
//                 <Route path="data-master/jurusan" element={<Major/>}/>
//             </Route>
//             <Route path={`${process.env.PUBLIC_URL}`} element={<LayoutNoSidebar/>}>
//                 <Route path="reset-sandi" element={<Forgot/>}></Route>
//                 <Route path="pendaftaran" element={<Register/>}></Route>
//                 <Route path="masuk" element={<Login/>}></Route>
//                 <Route path="errors">
//                     <Route path="404" element={<Error404/>}></Route>
//                     <Route path="504" element={<Error504/>}></Route>
//                 </Route>
//                 <Route path="*" element={<Error404/>}></Route>
//             </Route>
//         </Routes>
//     );
// };
// export default Router;
import React from "react";
import PrivateRoute from "./PrivateRoutes";
import Login from "../pages/auth/Login";
import {Route} from "react-router-dom";
import {AuthProvider} from "../context/auth/AuthContext";

const Dashboard = React.lazy(() => import("../pages/dashboard"));

export const protectedRoutes = [
    {
        path: '/',
        name: 'Dashboard',
        element: <Dashboard/>,
        route: PrivateRoute,
    },
]

export const publicRoutes = [
    {
        path: '/auth/masuk',
        name: 'Masuk',
        element: (
            <AuthProvider>
                <Login/>
            </AuthProvider>
        ),
        route: Route,
    },
]