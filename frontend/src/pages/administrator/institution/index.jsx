import React, {useCallback, useEffect, useState} from "react";
import Head from "../../../layout/head";
import Content from "../../../layout/content";
import {
    BackTo,
    BlockBetween,
    BlockHead,
    BlockHeadContent,
    BlockTitle,
    Icon,
    PreviewCard,
    ReactDataTable, toastError, toastSuccess
} from "../../../components";
import {Button, ButtonGroup, Spinner} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {
    addInstitution,
    destroyInstitution,
    getInstitutions,
    resetInstitution,
    setInstitution
} from "../../../redux/institution/actions";
import Add from "./Add";
import Edit from "./Edit";
import {getUsers} from "../../../redux/user/actions";
import {getLadders} from "../../../redux/master/ladder/actions";
import {APICore} from "../../../utils/api/APICore";

const Institution = () => {
    const dispatch = useDispatch();
    const {loading, institutions, error, success, loadData} = useSelector((state) => state.institution);
    const api = new APICore();
    const user = api.getLoggedInUser();
    const [sm, updateSm] = useState(false);
    const Columns = [
        {
            name: "Jenjang",
            selector: (row) => row.ladder && row.ladder.name,
            sortable: false,
            hide: "sm",
        },
        {
            name: "Nama Madrasah",
            selector: (row) => row.name,
            sortable: false,
        },
        {
            name: "NSM",
            selector: (row) => row.nsm,
            sortable: false,
        },
        {
            name: "NPSN",
            selector: (row) => row.npsn,
            sortable: false,
            hide: "sm",
        },
        {
            name: "Kepala Madrasah",
            selector: (row) => row.headmaster,
            sortable: false,
            hide: "sm"
        },
        {
            name: "Operator",
            selector: (row) => row.user && row.user.fullname,
            sortable: false,
            hide: "sm",
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
                            dispatch(setInstitution(row, true));
                        }}>
                        <Icon name="edit"/>
                    </Button>
                    {user.role === '1' && (
                        <Button
                            color="outline-danger"
                            onClick={() => {
                                dispatch(destroyInstitution(row.id));
                            }}
                            disabled={row.id === loading}>
                            {row.id === loading ? <Spinner size="sm" color="danger"/> : <Icon name="trash"/>}
                        </Button>
                    )}
                </ButtonGroup>
            )
        },
    ];
    const params = useCallback(() => {
        return user.role !== '1'
            ? {with: ['ladder', 'user'], user_id: user.id}
            : {with: ['ladder', 'user']}
    }, [user])

    useEffect(() => {
        loadData && dispatch(getInstitutions(params())) && dispatch(resetInstitution());
        dispatch(getUsers({type: 'select', role: 5}));
        dispatch(getLadders({type: 'select'}));
    }, [loadData, dispatch]);

    useEffect(() => {
        success && toastSuccess(success);
    }, [success]);
    useEffect(() => {
        error && toastError(error);
    }, [error]);
    return (
        <>
            <Head title="Data Institutusi"/>
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
                            <BlockTitle tag="h4">Data Institusi</BlockTitle>
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
                                    {user.role === '1' && (
                                        <ul className="nk-block-tools g-3">
                                            <li
                                                className="nk-block-tools-opt"
                                                onClick={() => dispatch(addInstitution(true))}
                                            >
                                                <Button color="secondary">
                                                    <Icon name="plus"/>
                                                    <span>Tambah</span>
                                                </Button>
                                            </li>
                                        </ul>
                                    )}
                                </div>
                            </div>
                        </BlockHeadContent>
                    </BlockBetween>
                </BlockHead>
                <PreviewCard>
                    <ReactDataTable data={institutions} columns={Columns} pagination className="nk-tb-list"/>
                </PreviewCard>
                <Add/>
                <Edit user={user}/>
            </Content>
        </>
    )
}
export default Institution