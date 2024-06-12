import React, {useEffect} from "react";
import Logo from "../../images/limitless/logo.png";
import LogoDark from "../../images/limitless/logo-dark.png";
import Head from "../../layout/head";
import AuthFooter from "./AuthFooter";
import {Block, BlockContent, BlockDes, BlockHead, BlockTitle, PreviewCard} from "../../components";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {logoutUser} from "../../redux/auth/actions";

const Logout = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(logoutUser())
    }, [dispatch]);
    return (
        <>
            <Head title="Keluar"/>
            <Block className="nk-block-middle nk-auth-body  wide-xs">
                <div className="brand-logo pb-4 text-center">
                    <Link to={process.env.PUBLIC_URL + "/"} className="logo-link">
                        <img className="logo-light logo-img logo-img-lg" src={Logo} alt="logo"/>
                        <img className="logo-dark logo-img logo-img-lg" src={LogoDark} alt="logo-dark"/>
                    </Link>
                </div>
                <PreviewCard className="card-bordered" bodyClass="card-inner-lg">
                    <BlockHead>
                        <BlockContent>
                            <BlockTitle tag="h5">Berhasil Keluar!</BlockTitle>
                            <BlockDes>
                                <p>You are now successfully sign out.</p>
                            </BlockDes>
                        </BlockContent>
                    </BlockHead>
                    <div className="form-group">
                        <Link to={`${process.env.PUBLIC_URL}/auth/masuk`} className="btn btn-block btn-primary">
                            Halaman Masuk
                        </Link>
                    </div>
                </PreviewCard>
            </Block>
            <AuthFooter/>
        </>
    );
};
export default Logout;
