import React, {Suspense} from "react";
import Head from "./head";
import Header from "./header";
import Footer from "./footer";
import AppRoot from "./global/AppRoot";
import AppMain from "./global/AppMain";
import AppWrap from "./global/AppWrap";
import Sidebar from "./sidebar";

const Layout = ({title, ...props}) => {
    return (
        <Suspense fallback={<div/>}>
            <Head title={!title && 'Memuat...'}/>
            <AppRoot>
                <AppMain>
                    <Sidebar fixed/>
                    <AppWrap>
                        <Header fixed/>
                        {props.children}
                        <Footer/>
                    </AppWrap>
                </AppMain>
            </AppRoot>

        </Suspense>
    );
};
export default Layout;
