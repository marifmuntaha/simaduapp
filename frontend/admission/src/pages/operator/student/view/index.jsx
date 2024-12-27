import Head from "../../../../layout/head";
import {
    BackTo, Block,
    BlockBetween,
    BlockDes,
    BlockHead,
    BlockHeadContent,
    BlockTitle, Col,
    Icon, OverlineTitle, Row, Sidebar,
    toastError, UserAvatar
} from "../../../../components";
import {Badge, Button, Card} from "reactstrap";
import React, {useEffect, useState} from "react";
import Content from "../../../../layout/content";
import {useNavigate, useParams} from "react-router-dom";
import {show as showStudent} from "../../../../utils/api/student";
import moment from "moment/moment";
import "moment/locale/id";
import {findUpper} from "../../../../utils/Utils";

const View = () => {
    const {id} = useParams();
    const [sm, updateSm] = useState();
    const [student, setStudent] = useState();
    const [sideBar, setSidebar] = useState(false);
    const navigate = useNavigate();
    const toggle = () => {
        setSidebar(!sideBar);
    };
    useEffect(() => {
        showStudent({id: id}).then((resp) => {
            setStudent(resp.data.result);
        }).catch(err => {
            toastError(err);
        })
    }, [id])
    return (
        <>
            <Head title="Data Siswa"/>
            <Content>
            <BlockHead size="sm">
                <BlockBetween>
                    <BlockHeadContent>
                        <BlockTitle tag="h3" page>
                            Data Pendaftar / <strong className="text-primary small">{student && student.name}</strong>
                        </BlockTitle>
                        <BlockDes className="text-soft">
                            <ul className="list-inline">
                                <li>
                                    NISN: <span className="text-base">{student && student.nisn}</span>
                                </li>
                                <li>
                                    NIK: <span className="text-base">{student && student.nik}</span>
                                </li>
                            </ul>
                        </BlockDes>
                    </BlockHeadContent>
                    <BlockHeadContent>
                        <Button
                            color="light"
                            outline
                            className="bg-white d-none d-sm-inline-flex"
                            onClick={() => navigate(-1)}
                        >
                            <Icon name="arrow-left"></Icon>
                            <span>Back</span>
                        </Button>
                        <a
                            href="#back"
                            onClick={(ev) => {
                                ev.preventDefault();
                                navigate(-1);
                            }}
                            className="btn btn-icon btn-outline-light bg-white d-inline-flex d-sm-none"
                        >
                            <Icon name="arrow-left"></Icon>
                        </a>
                    </BlockHeadContent>
                </BlockBetween>
            </BlockHead>
                <Block>
                    <Card>
                        <div className="card-aside-wrap" id="user-detail-block">
                            <div className="card-content">
                                <ul className="nav nav-tabs nav-tabs-mb-icon nav-tabs-card">
                                    <li className="nav-item">
                                        <a
                                            className="nav-link active"
                                            href="#personal"
                                            onClick={(ev) => {
                                                ev.preventDefault();
                                            }}
                                        >
                                            <Icon name="user-circle"></Icon>
                                            <span>Data Pribadi</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            className="nav-link disabled"
                                            href="#transactions"
                                            onClick={(ev) => {
                                                ev.preventDefault();
                                            }}
                                        >
                                            <Icon name="repeat"></Icon>
                                            <span>Transactions</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            className="nav-link disabled"
                                            href="#documents"
                                            onClick={(ev) => {
                                                ev.preventDefault();
                                            }}
                                        >
                                            <Icon name="file-text"></Icon>
                                            <span>Documents</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            className="nav-link disabled"
                                            href="#notifications"
                                            onClick={(ev) => {
                                                ev.preventDefault();
                                            }}
                                        >
                                            <Icon name="bell"></Icon>
                                            <span>Notifications</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            className="nav-link disabled"
                                            href="#activities"
                                            onClick={(ev) => {
                                                ev.preventDefault();
                                            }}
                                        >
                                            <Icon name="activity"></Icon>
                                            <span>Activities</span>
                                        </a>
                                    </li>
                                    <li className="nav-item nav-item-trigger d-xxl-none">
                                        <Button className={`toggle btn-icon btn-trigger ${sideBar && "active"}`}
                                                onClick={toggle}>
                                            <Icon name="user-list-fill"></Icon>
                                        </Button>
                                    </li>
                                </ul>
                                <div className="card-inner">
                                    <Block>
                                        <BlockHead>
                                            <BlockTitle tag="h5">Informasi Pribadi</BlockTitle>
                                            <p>Info dasar, seperti nama dan alamat Anda Pendaftar.</p>
                                        </BlockHead>
                                        <div className="profile-ud-list">
                                            <div className="profile-ud-item">
                                                <div className="profile-ud wider">
                                                    <span className="profile-ud-label">Nama Lengkap</span>
                                                    <span className="profile-ud-value">{student && student.name}</span>
                                                </div>
                                            </div>
                                            <div className="profile-ud-item">
                                                <div className="profile-ud wider">
                                                    <span className="profile-ud-label">NISN</span>
                                                    <span className="profile-ud-value">{student && student.nisn}</span>
                                                </div>
                                            </div>
                                            <div className="profile-ud-item">
                                                <div className="profile-ud wider">
                                                    <span className="profile-ud-label">Tempat</span>
                                                    <span
                                                        className="profile-ud-value">{student && student.birthplace}</span>
                                                </div>
                                            </div>
                                            <div className="profile-ud-item">
                                                <div className="profile-ud wider">
                                                    <span className="profile-ud-label">NIK</span>
                                                    <span className="profile-ud-value">{student && student.nik}</span>
                                                </div>
                                            </div>
                                            <div className="profile-ud-item">
                                                <div className="profile-ud wider">
                                                    <span className="profile-ud-label">Tanggal Lahir</span>
                                                    <span
                                                        className="profile-ud-value">{student && moment(student.birthdate).locale('id').format("D MMMM Y")}</span>
                                                </div>
                                            </div>
                                            <div className="profile-ud-item">
                                                <div className="profile-ud wider">
                                                    <span className="profile-ud-label">Email Address</span>
                                                    <span className="profile-ud-value">{student && student.email}</span>
                                                </div>
                                            </div>
                                            <div className="profile-ud-item">
                                                <div className="profile-ud wider">
                                                    <span className="profile-ud-label">Jenis Kelamin</span>
                                                    <span
                                                        className="profile-ud-value">{student && student.gender === "L" ? "Laki-laki" : "Perempuan"}</span>
                                                </div>
                                            </div>
                                            <div className="profile-ud-item">
                                                <div className="profile-ud wider">
                                                    <span className="profile-ud-label">Nomor Telepon</span>
                                                    <span
                                                        className="profile-ud-value">{student && student.phone}</span>
                                                </div>
                                            </div>
                                            <div className="profile-ud-item">
                                                <div className="profile-ud wider">
                                                    <span className="profile-ud-label">Anak Ke-</span>
                                                    <span
                                                        className="profile-ud-value">{student && student.orderborn}</span>
                                                </div>
                                            </div>
                                            <div className="profile-ud-item">
                                                <div className="profile-ud wider">
                                                    <span className="profile-ud-label">Jumlah Saudara</span>
                                                    <span
                                                        className="profile-ud-value">{student && student.sibling}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Block>
                                </div>
                            </div>
                            <Sidebar toggleState={sideBar}>
                                <div className="card-inner">
                                    <div className="user-card user-card-s2 mt-5 mt-xxl-0">
                                        {/*<UserAvatar className="lg" theme="primary" text={findUpper(student && student.name)} />*/}
                                        <div className="user-info">
                                            <Badge color="outline-light" pill className="ucap">{student.user.role}</Badge>
                                            <h5>{student.name}</h5>
                                            <span className="sub-text">{student.email}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-inner card-inner-sm">
                                    <ul className="btn-toolbar justify-center gx-1">
                                        <li>
                                            <Button
                                                href="#tool"
                                                onClick={(ev) => {
                                                    ev.preventDefault();
                                                }}
                                                className="btn-trigger btn-icon"
                                            >
                                                <Icon name="shield-off"></Icon>
                                            </Button>
                                        </li>
                                        <li>
                                            <Button
                                                href="#mail"
                                                onClick={(ev) => {
                                                    ev.preventDefault();
                                                }}
                                                className="btn-trigger btn-icon"
                                            >
                                                <Icon name="mail"></Icon>
                                            </Button>
                                        </li>
                                        <li>
                                            <Button
                                                href="#download"
                                                onClick={(ev) => {
                                                    ev.preventDefault();
                                                }}
                                                className="btn-trigger btn-icon"
                                            >
                                                <Icon name="download-cloud"></Icon>
                                            </Button>
                                        </li>
                                        <li>
                                            <Button
                                                href="#bookmark"
                                                onClick={(ev) => {
                                                    ev.preventDefault();
                                                }}
                                                className="btn-trigger btn-icon"
                                            >
                                                <Icon name="bookmark"></Icon>
                                            </Button>
                                        </li>
                                        <li>
                                            <Button
                                                href="#cancel"
                                                onClick={(ev) => {
                                                    ev.preventDefault();
                                                }}
                                                className="btn-trigger btn-icon text-danger"
                                            >
                                                <Icon name="na"></Icon>
                                            </Button>
                                        </li>
                                    </ul>
                                </div>
                                <div className="card-inner">
                                    <div className="overline-title-alt mb-2">In Account</div>
                                    <div className="profile-balance">
                                        <div className="profile-balance-group gx-4">
                                            <div className="profile-balance-sub">
                                                <div className="profile-balance-amount">
                                                    <div className="number">
                                                        2,500.00 <small className="currency currency-usd">USD</small>
                                                    </div>
                                                </div>
                                                <div className="profile-balance-subtitle">Invested Amount</div>
                                            </div>
                                            <div className="profile-balance-sub">
                          <span className="profile-balance-plus text-soft">
                            <Icon className="ni-plus"></Icon>
                          </span>
                                                <div className="profile-balance-amount">
                                                    <div className="number">1,643.76</div>
                                                </div>
                                                <div className="profile-balance-subtitle">Profit Earned</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-inner">
                                    <Row className="text-center">
                                        <Col size="4">
                                            <div className="profile-stats">
                                                <span className="amount">task</span>
                                                <span className="sub-text">Total Order</span>
                                            </div>
                                        </Col>
                                        <Col size="4">
                                            <div className="profile-stats">
                                                <span className="amount">project</span>
                                                <span className="sub-text">Complete</span>
                                            </div>
                                        </Col>
                                        <Col size="4">
                                            <div className="profile-stats">
                                                <span className="amount">performed</span>
                                                <span className="sub-text">Progress</span>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                                <div className="card-inner">
                                    <h6 className="overline-title-alt mb-2">Additional</h6>
                                    <Row className="g-3">
                                        <Col size="6">
                                            <span className="sub-text">User ID:</span>
                                            <span>UD003054</span>
                                        </Col>
                                        <Col size="6">
                                            <span className="sub-text">Last Login:</span>
                                            <span>{student.nik} 01:02 PM</span>
                                        </Col>
                                        <Col size="6">
                                            <span className="sub-text">KYC Status:</span>
                                            <span
                                                className={`lead-text text-${
                                                    student.status === "success"
                                                        ? "success"
                                                        : student.status === "pending"
                                                            ? "info"
                                                            : student.status === "warning"
                                                                ? "warning"
                                                                : "secondary"
                                                }`}
                                            >
                          {student.status?.toUpperCase()}
                        </span>
                                        </Col>
                                        <Col size="6">
                                            <span className="sub-text">Register At:</span>
                                            <span>Nov 24, 2019</span>
                                        </Col>
                                    </Row>
                                </div>
                                <div className="card-inner">
                                    <OverlineTitle tag="h6" className="mb-3">
                                        Groups
                                    </OverlineTitle>
                                    <ul className="g-1">
                                        <li className="btn-group">
                                            <Button
                                                color="light"
                                                size="xs"
                                                className="btn-dim"
                                                onClick={(ev) => {
                                                    ev.preventDefault();
                                                }}
                                            >
                                                investor
                                            </Button>
                                            <Button
                                                color="light"
                                                size="xs"
                                                className="btn-icon btn-dim"
                                                onClick={(ev) => {
                                                    ev.preventDefault();
                                                }}
                                            >
                                                <Icon className="ni-cross"></Icon>
                                            </Button>
                                        </li>
                                        <li className="btn-group">
                                            <Button
                                                color="light"
                                                size="xs"
                                                className="btn-dim"
                                                onClick={(ev) => {
                                                    ev.preventDefault();
                                                }}
                                            >
                                                support
                                            </Button>
                                            <Button
                                                color="light"
                                                size="xs"
                                                className="btn-icon btn-dim"
                                                onClick={(ev) => {
                                                    ev.preventDefault();
                                                }}
                                            >
                                                <Icon className="ni-cross"></Icon>
                                            </Button>
                                        </li>
                                        <li className="btn-group">
                                            <Button
                                                color="light"
                                                size="xs"
                                                className="btn-dim"
                                                onClick={(ev) => {
                                                    ev.preventDefault();
                                                }}
                                            >
                                                another tag
                                            </Button>
                                            <Button
                                                color="light"
                                                size="xs"
                                                className="btn-icon btn-dim"
                                                onClick={(ev) => {
                                                    ev.preventDefault();
                                                }}
                                            >
                                                <Icon className="ni-cross"></Icon>
                                            </Button>
                                        </li>
                                    </ul>
                                </div>
                            </Sidebar>
                            {sideBar && <div className="toggle-overlay" onClick={() => toggle()}></div>}
                        </div>
                    </Card>
                </Block>
            </Content>
        </>
    )
}

export default View;