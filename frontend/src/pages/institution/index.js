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
    ReactDataTable, toastError
} from "../../components";
import {Button, ButtonGroup, Spinner} from "reactstrap";
import Add from "./Add";
import {useDispatch, useSelector} from "react-redux";
import {
    addInstitution,
    destroyInstitution,
    getInstitutions,
    resetInstitution,
    setInstitution
} from "../../redux/institution/actions";
import Edit from "./Edit";

const Institution = () => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state.institution)
    const {loading, institutions, error} = selector;
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
                    <Button
                        color="outline-danger"
                        onClick={() => {
                            dispatch(destroyInstitution(row.id));
                        }}
                        disabled={row.id === loading}>
                        {row.id === loading ? <Spinner size="sm" color="danger"/> : <Icon name="trash"/>}
                    </Button>
                </ButtonGroup>
            )
        },
    ];
    useEffect(() => {
        dispatch(getInstitutions({with: ['ladder', 'user']}));
        console.log(institutions)
    }, [dispatch]);
    return (
        <>
            {error && toastError(error) && dispatch(resetInstitution())}
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
                                </div>
                            </div>
                        </BlockHeadContent>
                    </BlockBetween>
                </BlockHead>
                <PreviewCard>
                    <ReactDataTable data={institutions} columns={Columns} pagination className="nk-tb-list"/>
                </PreviewCard>
                <Add/>
                <Edit/>
            </Content>
        </>
    )
}
export default Institution