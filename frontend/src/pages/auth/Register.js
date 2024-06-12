import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
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
import {Spinner} from "reactstrap";
import {Link} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import {actionType, Dispatch} from "../../reducer";

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone: ''
    })
    const [passState, setPassState] = useState(false);
    const [rePassState, setRePassState] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleFormInput = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }
    return <>
        <Head title="Pendaftaran"/>
        <ToastContainer/>
        <Block className="nk-block-middle nk-auth-body  wide-xs">
            <div className="brand-logo pb-4 text-center">
                <Link to={`${process.env.PUBLIC_URL}/`} className="logo-link">
                    <img className="logo-light logo-img logo-img-lg" src={Logo} alt="logo"/>
                    <img className="logo-dark logo-img logo-img-lg" src={LogoDark} alt="logo-dark"/>
                </Link>
            </div>
            <PreviewCard className="card-bordered" bodyClass="card-inner-lg">
                <BlockHead>
                    <BlockContent>
                        <BlockTitle tag="h4">Pendaftaran</BlockTitle>
                        <BlockDes>
                            <p>Buat akun baru SIMADU APP</p>
                        </BlockDes>
                    </BlockContent>
                </BlockHead>
                <form className="is-alter"
                      onSubmit={(e) => {
                          e.preventDefault();
                          Dispatch(actionType.AUTH_REGISTER, {
                              formData: formData,
                              setLoading: setLoading
                          }).then(resp => {
                              resp && setTimeout(() => {
                                  navigate(`${process.env.PUBLIC_URL}/masuk`);
                              }, 2000);
                          })
                      }}>
                    <div className="form-group">
                        <label className="form-label" htmlFor="name">Nama Lengkap</label>
                        <div className="form-control-wrap">
                            <input
                                type="text"
                                name="name"
                                placeholder="Ex. Ahmad Purwoto"
                                className="form-control-lg form-control"
                                onChange={(e) => handleFormInput(e)}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="form-label-group">
                            <label className="form-label" htmlFor="email">Email anda</label>
                        </div>
                        <div className="form-control-wrap">
                            <input
                                type="text"
                                name="email"
                                className="form-control-lg form-control"
                                placeholder="Ex. purwoto@gmail.com"
                                onChange={(e) => handleFormInput(e)}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="form-label-group">
                            <label className="form-label" htmlFor="password">Kata Sandi</label>
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
                                name="password"
                                placeholder="Ex. ***********"
                                className={`form-control-lg form-control ${passState ? "is-hidden" : "is-shown"}`}
                                onChange={(e) => handleFormInput(e)}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="form-label-group">
                            <label className="form-label" htmlFor="repassword">Ulangi Sandi</label>
                        </div>
                        <div className="form-control-wrap">
                            <a
                                href="#repassword"
                                onClick={(ev) => {
                                    ev.preventDefault();
                                    setRePassState(!rePassState);
                                }}
                                className={`form-icon lg form-icon-right passcode-switch ${passState ? "is-hidden" : "is-shown"}`}
                            >
                                <Icon name="eye" className="passcode-icon icon-show"></Icon>
                                <Icon name="eye-off" className="passcode-icon icon-hide"></Icon>
                            </a>
                            <input
                                type={rePassState ? "text" : "password"}
                                name="password_confirmation"
                                placeholder="Ex. ***********"
                                className={`form-control-lg form-control ${rePassState ? "is-hidden" : "is-shown"}`}
                                onChange={(e) => handleFormInput(e)}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="form-label-group">
                            <label className="form-label" htmlFor="nip">Nomor Whatsapp</label>
                        </div>
                        <div className="form-control-wrap">
                            <input
                                type="text"
                                name="phone"
                                className="form-control-lg form-control"
                                placeholder="Ex. 6282229366506"
                                onChange={(e) => handleFormInput(e)}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <Button type="submit" color="primary" size="lg" className="btn-block">
                            {loading ? <Spinner size="sm" color="light"/> : "DAFTAR"}
                        </Button>
                    </div>
                </form>
                <div className="form-note-s2 text-center pt-4">
                    {" "}
                    Sudah punya akun?{" "}
                    <Link to={`${process.env.PUBLIC_URL}/masuk`}>
                        <strong>Masuk</strong>
                    </Link>
                </div>
            </PreviewCard>
        </Block>
        <AuthFooter/>
    </>;
};
export default Register;
