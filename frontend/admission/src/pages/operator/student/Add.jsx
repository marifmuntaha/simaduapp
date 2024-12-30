import React, {Suspense, useState} from "react";
import Head from "../../../layout/head";
import {BackTo, BlockBetween, BlockHead, BlockHeadContent, BlockTitle} from "../../../components";
import Content from "../../../layout/content";
import {TabContent, TabPane} from "reactstrap";
import Personal from "./partials/Personal";
import Tabs from "./partials/Tabs";
import Parent from "./partials/Parent";
import Address from "./partials/Address";
import Program from "./partials/Program";
import School from "./partials/School";
import Index from "./partials/File";

const Add = () => {
    const [studentID, setStudentID] = useState();
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
                <Tabs activeIconTab={activeIconTab} toggleIconTab={toggleIconTab} />
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