import {useDispatch, useSelector} from "react-redux";
import {APICore} from "../../utils/api/APICore";
import React, {useEffect, useState} from "react";
import Head from "../../layout/head";
import Content from "../../layout/content";
import {
    BackTo, BlockBetween,
    BlockHead,
    BlockHeadContent,
    BlockTitle, Button, Col, Icon,
    PreviewCard, Row, toastError, toastSuccess
} from "../../components";
import {Nav, NavItem, NavLink, TabContent, TabPane} from "reactstrap";
import classnames from "classnames";
import {useForm} from "react-hook-form";
import {destroyUser, resetUser, storeUser} from "../../redux/user/actions";
import Personal from "./add/Personal";
import Parent from "./add/Parent";
import Address from "./add/Address";
import Activity from "./add/Activity";
import {storeStudentParent} from "../../redux/studentParent/actions";

const AddStudent = () => {
    const dispatch = useDispatch();
    const api = new APICore();
    const user = api.getLoggedInUser();
    const [userStudent, setUserStudent] = useState([]);
    const [userParent, setUserParent] = useState([]);
    const {userCreate, successUser, errorUser} = useSelector((state) => ({
        userCreate: state.user.user,
        successUser: state.user.success,
        errorUser: state.user.error,
    }));
    const {student, success, error} = useSelector((state) => state.student);
    const [activeIconTab, setActiveIconTab] = useState("1");

    const toggleIconTab = (icontab) => {
        if (activeIconTab !== icontab) setActiveIconTab(icontab);
    }
    const onSubmit = () => {
        setValue('role', 9);
        setValue('image', '');
        dispatch(storeUser({
            formData: getValues(['guard_name', 'guard_email', 'guard_nik', 'guard_nik', 'role', 'phone', 'image'])
        }));
        if (successUser) {
            setUserParent(userCreate);
            dispatch(resetUser());
            setValue('user_id', userParent.id);
            dispatch(storeStudentParent({
                formData: getValues([

                ])
            }))
        } else {
            dispatch(destroyUser(userStudent.id));
            dispatch(resetUser());
        }
    }
    const {
        handleSubmit,
        register,
        formState: {errors},
        control,
        getValues,
        setValue,
        watch
    } = useForm();

    // useEffect(() => {
    //     success && toastSuccess(success);
    // }, [success]);
    //
    useEffect(() => {
        errorUser && toastError(errorUser)
    }, [errorUser]);

    return (
        <>
            <Head title="Tambah Siswa"/>
            <Content>
                <BlockHead size="lg" wide="sm">
                    <BlockHeadContent>
                        <BackTo link="/operator/kesiswaan/data-siswa" icon="arrow-left">
                            DATA SISWA
                        </BackTo>
                    </BlockHeadContent>
                </BlockHead>
                <BlockHead>
                    <BlockBetween>
                        <BlockHeadContent>
                            <BlockTitle tag="h4">TAMBAH SISWA</BlockTitle>
                            <p>
                                Just import <code>ReactDataTable</code> from <code>components</code>, it is built in for
                                react dashlite.
                            </p>
                        </BlockHeadContent>
                    </BlockBetween>
                </BlockHead>
                <PreviewCard>
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
                                <Icon name="list"/> <span>Data Akademik</span>
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <form className="form-validate is-alter" onSubmit={handleSubmit(onSubmit)}>
                        <TabContent activeTab={activeIconTab}>
                            <TabPane tabId="1">
                                <Personal register={register} errors={errors} control={control}/>
                            </TabPane>
                            <TabPane tabId="2">
                                <Parent control={control} errors={errors} register={register} watch={watch} setValue={setValue} getValues={getValues}/>
                            </TabPane>
                            <TabPane tabId="3">
                                <Address user={user} control={control} getValues={getValues} watch={watch} register={register} errors={errors}/>
                            </TabPane>
                            <TabPane tabId="4">
                                <Activity user={user} control={control} errors={errors}/>
                            </TabPane>
                            <Row className="gy-2 mt-2">
                                <Col className="col-md-12">
                                    <Col className="col-md-2">
                                        <div className="form-group">
                                            <Button size="md" className="btn-block" color="success">SIMPAN</Button>
                                        </div>
                                    </Col>
                                </Col>
                            </Row>
                        </TabContent>
                    </form>
                </PreviewCard>
            </Content>
        </>
    )
}
export default AddStudent;