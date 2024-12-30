import Head from "../../../../layout/head";
import {
    Block,
    BlockBetween,
    BlockDes,
    BlockHead,
    BlockHeadContent,
    BlockTitle, Col,
    Icon, Row, Sidebar,
    toastError, UserAvatar
} from "../../../../components";
import {Badge, Button, Card} from "reactstrap";
import React, {useEffect, useState} from "react";
import Content from "../../../../layout/content";
import {useNavigate, useParams} from "react-router-dom";
import {show as showStudent} from "../../../../utils/api/student";
import "moment/locale/id";
import {findUpper} from "../../../../utils/Utils";
import Personal from "./partials/Personal";
import Parent from "./partials/Parent";
import Address from "./partials/Address";

const View = () => {
    const {id} = useParams();
    const [student, setStudent] = useState();
    const [sideBar, setSidebar] = useState(false);
    const [activeIconTab, setActiveIconTab] = useState('1')
    const navigate = useNavigate();
    const toggle = () => {
        setSidebar(!sideBar);
    };
    const toggleIconTab = (icontab) => {
        if (activeIconTab !== icontab) setActiveIconTab(icontab);
    }
    const Tabs = [
        {number: '1', icon: 'user-circle', name: 'Data Pribadi'},
        {number: '2', icon: 'users', name: 'Data Orangtua'},
        {number: '3', icon: 'map-pin', name: 'Data Alamat'},
        {number: '4', icon: 'list', name: 'Program Pilihan'},
        {number: '5', icon: 'building', name: 'Sekolah Asal'},
    ]
    useEffect(() => {
        showStudent({id: id, with: 'user,parent,address,program'}).then((resp) => {
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
                            <span>Kembali</span>
                        </Button>
                        <a
                            href="#"
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
                                    {Tabs.map((tab, index) => (
                                        <li className="nav-item" key={index}>
                                            <a
                                                className={`nav-link ${activeIconTab === tab.number && 'active'}`}
                                                href="#"
                                                onClick={(ev) => {
                                                    ev.preventDefault();
                                                    toggleIconTab(tab.number);
                                                }}
                                            >
                                                <Icon name={tab.icon}></Icon>
                                                <span>{tab.name}</span>
                                            </a>
                                        </li>
                                    ))}
                                    {student && student.program && student.program.boarding === '1' && (
                                        <li className="nav-item">
                                            <a
                                                className={`nav-link ${activeIconTab === '6' && 'active'}`}
                                                href="#boarding"
                                                onClick={(ev) => {
                                                    ev.preventDefault();
                                                    toggleIconTab("6");
                                                }}
                                            >
                                                <Icon name="notify"></Icon>
                                                <span>Boarding</span>
                                            </a>
                                        </li>
                                    )}
                                    <li className="nav-item nav-item-trigger d-xxl-none">
                                        <Button className={`toggle btn-icon btn-trigger ${sideBar && "active"}`}
                                                onClick={toggle}>
                                            <Icon name="user-list-fill"></Icon>
                                        </Button>
                                    </li>

                                </ul>
                                <div className="card-inner">
                                    {activeIconTab === '1' && (<Personal student={student}/>)}
                                    {activeIconTab === '2' && (<Parent parent={student.parent}/>)}
                                    {activeIconTab === '3' && (<Address address={student.address}/>)}
                                </div>
                            </div>
                            <Sidebar toggleState={sideBar}>
                                <div className="card-inner">
                                    <div className="user-card user-card-s2 mt-5 mt-xxl-0">
                                        <UserAvatar className="lg" theme="primary"
                                                    text={student && findUpper(student.name)}/>
                                        <div className="user-info">
                                        <Badge color="outline-light" pill className="ucap">Calon Peserta Didik Baru</Badge>
                                            <h5>{student && student.name}</h5>
                                            <span className="sub-text">{student && student.nisn}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-inner">
                                    <h6 className="overline-title-alt mb-2">Tambahan</h6>
                                    <Row className="g-3">
                                        <Col size="6">
                                            <span className="sub-text">Nama Pengguna:</span>
                                            <span>{student && student.user.username}</span>
                                        </Col>
                                        <Col size="6">
                                            <span className="sub-text">NIK</span>
                                            <span>{student && student.nik}</span>
                                        </Col>
                                        <Col size="6">
                                            <span className="sub-text">Tagihan:</span>
                        {/*                    <span*/}
                        {/*                        className={`lead-text text-${*/}
                        {/*                            student && student.nisn === "success"*/}
                        {/*                                ? "success"*/}
                        {/*                                : student.nisn === "pending"*/}
                        {/*                                    ? "info"*/}
                        {/*                                    : student.nisn === "warning"*/}
                        {/*                                        ? "warning"*/}
                        {/*                                        : "secondary"*/}
                        {/*                        }`}*/}
                        {/*                    >*/}
                        {/*  {student.nisn?.toUpperCase()}*/}
                        {/*</span>*/}
                                        </Col>
                                        <Col size="6">
                                            <span className="sub-text">Tanggal Pendaftaran</span>
                                            <span>Nov 24, 2019</span>
                                        </Col>
                                    </Row>
                                </div>
                                <div className="card-inner">
                                    <div className="col-12 between-center">
                                        <Button className="btn btn-success"><Icon name="printer"/><span>CETAK KARTU</span></Button>
                                        <Button className="btn btn-success"><Icon name="whatsapp"/><span>KIRIM PESAN</span></Button>
                                    </div>
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