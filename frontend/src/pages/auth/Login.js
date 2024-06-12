import React, {useEffect, useState} from "react";
import Logo from "../../images/limitless/logo.png";
import LogoDark from "../../images/limitless/logo-dark.png";
import Head from "../../layout/head";
import AuthFooter from "./AuthFooter";
import {
    Block,
    BlockContent,
    BlockDes,
    BlockHead,
    BlockTitle,
    Button,
    Icon,
    PreviewCard,
} from "../../components";
import {Alert, Form, Spinner} from "reactstrap";
import {Link, Navigate, useLocation} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {loginUser, resetAuth} from "../../redux/actions";
import {useForm} from "react-hook-form";

const Login = () => {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const [passState, setPassState] = useState(false);
    const handleFormSubmit = () => {
        dispatch(loginUser(getValues('username'), getValues('password')))
    }
    const {
        register,
        handleSubmit,
        formState: {errors},
        getValues
    } = useForm({});
    const location = useLocation()
    const redirectUrl = location?.search?.slice(6) || '/'
    useEffect(() => {
        dispatch(resetAuth())
    }, [dispatch])
    return (
        <>
            {(auth.userLoggedIn || auth.user) && <Navigate to={redirectUrl} />}
            <Head title="Masuk"/>
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
                            <BlockTitle tag="h4">Masuk SIMADU</BlockTitle>
                            <BlockDes>
                                <p>Masuk ke aplikasi menggunakan email & kata sandi anda.</p>
                            </BlockDes>
                        </BlockContent>
                    </BlockHead>
                    {auth.error && (
                        <div className="mb-3">
                            <Alert className="alert-icon" color="danger">
                                <Icon name="cross-circle"/>
                                <strong>Kesalahan !</strong> {auth.error}.
                            </Alert>
                        </div>
                    )}
                    <Form
                        className="form-validate is-alter"
                        onSubmit={handleSubmit(handleFormSubmit)}>
                        <div className="form-group">
                            <div className="form-label-group">
                                <label className="form-label" htmlFor="username">Nama Pengguna</label>
                            </div>
                            <div className="form-control-wrap">
                                <input
                                    type="text"
                                    id="username"
                                    placeholder="Masukkan nama pengguna."
                                    className="form-control-lg form-control"
                                    {...register('username', {required: true})}
                                />
                                {errors.username && <span className="invalid">Kolom tidak boleh kosong.</span>}
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="form-label-group">
                                <label className="form-label" htmlFor="password">Kata Sandi</label>
                                <Link className="link link-primary link-sm"
                                      to={`${process.env.PUBLIC_URL}/reset-sandi`}>
                                    Lupa Sandi?
                                </Link>
                            </div>
                            <div className="form-control-wrap">
                                <a
                                    href="#password"
                                    onClick={(ev) => {
                                        ev.preventDefault();
                                        setPassState(!passState);
                                    }}
                                    className={`form-icon lg form-icon-right passcode-switch ${passState ? "is-hidden" : "is-shown"}`}
                                >
                                    <Icon name="eye" className="passcode-icon icon-show"></Icon>
                                    <Icon name="eye-off" className="passcode-icon icon-hide"></Icon>
                                </a>
                                <input
                                    type={passState ? "text" : "password"}
                                    className={`form-control-lg form-control ${passState ? "is-hidden" : "is-shown"}`}
                                    id="password"
                                    placeholder="Masukkan Kata Sandi anda"
                                    {...register('password', {required: true})}
                                />
                                {errors.password && <span className="invalid">Kolom tidak boleh kosong.</span>}
                            </div>
                        </div>
                        <div className="form-group">
                            <Button size="lg" className="btn-block" type="submit" color="primary">
                                {auth.loading ? <Spinner size="sm" color="light"/> : "MASUK"}
                            </Button>
                        </div>
                    </Form>
                </PreviewCard>
                <ToastContainer/>
            </Block>
            <AuthFooter/>
        </>
    );
};
export default Login;
