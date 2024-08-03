import React, {useEffect, useState} from "react";
import Head from "../../layout/head";
import Content from "../../layout/content";
import {
    BackTo,
    BlockBetween,
    BlockHead,
    BlockHeadContent,
    BlockTitle,
    Icon,
    PreviewCard,
    ReactDataTable, toastError, toastSuccess
} from "../../components";
import {Button, ButtonGroup, Spinner} from "reactstrap";
import Add from "./Add";
import {useDispatch, useSelector} from "react-redux";
import {addUser, destroyUser, getUsers, resetUser, setUser} from "../../redux/user/actions";
import Edit from "./Edit";
import {Role} from "../../utils/Utils";

const User = () => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state.user)
    const {loading, users, error, success, loadData} = selector;
    const [sm, updateSm] = useState(false);
    const Columns = [
        {
            name: "Nama",
            selector: (row) => row.fullname,
            sortable: false,
            hide: "sm",
        },
        {
            name: "Alamat Email",
            selector: (row) => row.email,
            sortable: false,
        },
        {
            name: "Nama Pengguna",
            selector: (row) => row.username,
            sortable: false,
        },
        {
            name: "Hak Akses",
            selector: (row) => row.role,
            sortable: false,
            hide: "sm",
            cell: (row) => (
                Role(row.role)
            )
        },
        {
            name: "Nomor Telepon",
            selector: (row) => row.phone,
            sortable: false,
            hide: "sm"
        },
        {
            name: "Aksi",
            selector: (row) => row.id,
            sortable: false,
            hide: "sm",
            cell: (row) => (
                <ButtonGroup size="sm">
                    <Button
                        color="outline-warning"
                        onClick={() => {
                            dispatch(setUser(row, true));
                        }}>
                        <Icon name="edit"/>
                    </Button>
                    <Button
                        color="outline-danger"
                        onClick={() => {
                            dispatch(destroyUser(row.id));
                        }}
                        disabled={row.id === loading}>
                        {row.id === loading ? <Spinner size="sm" color="danger"/> : <Icon name="trash"/>}
                    </Button>
                </ButtonGroup>
            )
        },
    ];

    useEffect(() => {
        dispatch(getUsers()) && dispatch(resetUser());
    }, [loadData, dispatch]);

    useEffect(() => {
        success && toastSuccess(success);
    }, [success]);

    useEffect(() => {
        error && toastError(error);
    }, [error])

    return (
        <>
            <Head title="Data Pengguna"/>
            <Content>
                <BlockHead size="lg" wide="sm">
                    <BlockHeadContent>
                        <BackTo link="/" icon="arrow-left">
                            DASHBOARD
                        </BackTo>
                    </BlockHeadContent>
                </BlockHead>
                <BlockHead>
                    <BlockBetween>
                        <BlockHeadContent>
                            <BlockTitle tag="h4">Data Pengguna</BlockTitle>
                            <p>
                                Just import <code>ReactDataTable</code> from <code>components</code>, it is built in for
                                react dashlite.
                            </p>
                        </BlockHeadContent>
                        <BlockHeadContent>
                            <div className="toggle-wrap nk-block-tools-toggle">
                                <Button
                                    className={`btn-icon btn-trigger toggle-expand me-n1 ${sm ? "active" : ""}`}
                                    onClick={() => updateSm(!sm)}
                                >
                                    <Icon name="menu-alt-r"></Icon>
                                </Button>
                                <div className="toggle-expand-content" style={{display: sm ? "block" : "none"}}>
                                    <ul className="nk-block-tools g-3">
                                        <li
                                            className="nk-block-tools-opt"
                                            onClick={() => dispatch(addUser(true))}
                                        >
                                            <Button color="secondary">
                                                <Icon name="plus"/>
                                                <span>Tambah</span>
                                            </Button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </BlockHeadContent>
                    </BlockBetween>
                </BlockHead>
                <PreviewCard>
                    <ReactDataTable data={users} columns={Columns} pagination className="nk-tb-list"/>
                </PreviewCard>
                <Add/>
                <Edit/>
            </Content>
        </>
    )
}
export default User