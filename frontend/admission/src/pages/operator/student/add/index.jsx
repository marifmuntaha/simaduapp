import React, {Suspense, useState} from "react";
import Head from "../../../../layout/head";
import {BackTo, BlockBetween, BlockHead, BlockHeadContent, BlockTitle, Icon, PreviewCard} from "../../../../components";
import Content from "../../../../layout/content";
import {Nav, NavItem, NavLink, TabContent, TabPane} from "reactstrap";
import classnames from "classnames";
import Personal from "./Personal";
import Parent from "./Parent";
import Address from "./Address";
import Program from "./Program";
import School from "./School";
import Index from "./File";

const Add = () => {
    const [studentID, setStudentID] = useState(3);
    const [activeIconTab, setActiveIconTab] = useState("1");
    const toggleIconTab = (icontab) => {
        if (activeIconTab !== icontab) setActiveIconTab(icontab);
    }
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Head title="Tambah Pendaftar"/>
            <Content>
                <BlockHead size="lg" wide="sm">
                    <BlockHeadContent>
                        <BackTo link="/operator/pendaftar" icon="arrow-left">
                            DATA PENDAFTAR
                        </BackTo>
                    </BlockHeadContent>
                </BlockHead>
                <BlockHead>
                    <BlockBetween>
                        <BlockHeadContent>
                            <BlockTitle tag="h5">Tambah Pendaftar</BlockTitle>
                            <p>
                                Just import <code>ReactDataTable</code> from <code>components</code>, it is built in for
                                react dashlite.
                            </p>
                        </BlockHeadContent>
                    </BlockBetween>
                </BlockHead>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            tag="a"
                            href="#tab"
                            className={classnames({active: activeIconTab === "1"})}
                            onClick={(ev) => {
                                ev.preventDefault();
                                toggleIconTab("1");
                            }}
                        >
                            <Icon name="user"/> <span>Data Pribadi</span>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            tag="a"
                            href="#tab"
                            className={classnames({active: activeIconTab === "2"})}
                            onClick={(ev) => {
                                ev.preventDefault();
                                toggleIconTab("2");
                            }}
                        >
                            <Icon name="user-fill"/> <span>Data Orangtua</span>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            tag="a"
                            href="#tab"
                            className={classnames({active: activeIconTab === "3"})}
                            onClick={(ev) => {
                                ev.preventDefault();
                                toggleIconTab("3");
                            }}
                        >
                            <Icon name="map"/> <span>Data Alamat</span>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            tag="a"
                            href="#tab"
                            className={classnames({active: activeIconTab === "4"})}
                            onClick={(ev) => {
                                ev.preventDefault();
                                toggleIconTab("4");
                            }}
                        >
                            <Icon name="list"/> <span>Data Program</span>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            tag="a"
                            href="#tab"
                            className={classnames({active: activeIconTab === "5"})}
                            onClick={(ev) => {
                                ev.preventDefault();
                                toggleIconTab("5");
                            }}
                        >
                            <Icon name="building"/> <span>Data Sekolah Asal</span>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            tag="a"
                            href="#tab"
                            className={classnames({active: activeIconTab === "6"})}
                            onClick={(ev) => {
                                ev.preventDefault();
                                toggleIconTab("6");
                            }}
                        >
                            <Icon name="file"/> <span>Data Berkas</span>
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={activeIconTab}>
                    <TabPane tabId="1">
                        <Personal studentID={studentID} setStudentID={setStudentID}/>
                    </TabPane>
                    <TabPane tabId="2">
                        <Parent studentID={studentID} setStudentID={setStudentID}/>
                    </TabPane>
                    <TabPane tabId="3">
                        <Address studentID={studentID} setStudentID={setStudentID}/>
                    </TabPane>
                    <TabPane tabId="4">
                        <Program studentID={studentID} setStudentID={setStudentID}/>
                    </TabPane>
                    <TabPane tabId="5">
                        <School studentID={studentID} setStudentID={setStudentID}/>
                    </TabPane>
                    <TabPane tabId="6">
                        <Index studentID={studentID} setStudentID={setStudentID}/>
                    </TabPane>
                </TabContent>
            </Content>
        </Suspense>
    )
}

export default Add;