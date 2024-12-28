import React, {useEffect, useState} from "react";
import Head from "../../../layout/head";
import Content from "../../../layout/content";
import Personal from "./partials/Personal";
import Parent from "./partials/Parent";
import Address from "./partials/Address";
import Program from "./partials/Program";
// import School from "./School";
// import File from "./File";
import {BackTo, BlockBetween, BlockHead, BlockHeadContent, BlockTitle, Icon} from "../../../components";
import {Nav, NavItem, NavLink, TabContent, TabPane} from "reactstrap";
import {useParams} from "react-router-dom";
import {show as showStudent} from "../../../utils/api/student";
import Tabs from "./partials/Tabs";

const Edit = () => {
    const {id} = useParams();
    const [activeIconTab, setActiveIconTab] = useState("1");
    const [student, setStudent] = useState([]);
    const [parent, setParent] = useState([]);
    const [address, setAddress] = useState([]);
    const [program, setProgram] = useState([]);
    const [school, setSchool] = useState([]);
    const toggleIconTab = (icontab) => {
        if (activeIconTab !== icontab) setActiveIconTab(icontab);
    }
    useEffect(() => {
        showStudent({id: id, with: 'parent,address,program,school'}).then(resp => {
            let student = resp.data.result;
            setStudent(student);
            setParent(student.parent);
            setAddress(student.address);
            setProgram(student.program);
            setSchool(student.school);
        });
    }, [id]);
    return (
        <>
            <Head title="Ubah Pendaftar"/>
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
                            <BlockTitle tag="h5">Ubah Pendaftar</BlockTitle>
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
                        <Personal student={student}/>
                    </TabPane>
                    <TabPane tabId="2">
                        <Parent parent={parent} studentID={id}/>
                    </TabPane>
                    <TabPane tabId="3">
                        <Address address={address}/>
                    </TabPane>
                    <TabPane tabId="4">
                        <Program program={program}/>
                    </TabPane>
                    {/*<TabPane tabId="5">*/}
                    {/*    <School school={school}/>*/}
                    {/*</TabPane>*/}
                    {/*<TabPane tabId="6">*/}
                    {/*    <File studentID={id}/>*/}
                    {/*</TabPane>*/}
                </TabContent>
            </Content>
        </>
    )
}

export default Edit;