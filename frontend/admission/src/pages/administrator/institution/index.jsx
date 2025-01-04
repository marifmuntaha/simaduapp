import React, {useEffect, useState} from "react";
import Head from "../../../layout/head";
import Content from "../../../layout/content";
import Add from "./Add";
import Edit from "./Edit";
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
import {get as getInstitution, destroy as destroyInstitution} from "../../../utils/api/institution";

const Institution = () => {
    const [sm, updateSm] = useState(false);
    const [modal, setModal] = useState(false);
    const [institutions, setInstitutions] = useState([]);
    const [institution, setInstitution] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadData, setLoadData] = useState(true);
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
                            setInstitution(row);
                            setModal('edit');
                        }}>
                        <Icon name="edit"/>
                    </Button>
                    <Button
                        color="outline-danger"
                        onClick={() => {
                            setLoading(row.id)
                            destroyInstitution(row.id).then((resp) => {
                                toastSuccess(resp.data.message);
                                setLoading(false);
                            }).catch((e) => {
                                toastError(e);
                                setLoading(false);
                            });
                        }}
                        disabled={row.id === loading}>
                        {row.id === loading ? <Spinner size="sm" color="danger"/> : <Icon name="trash"/>}
                    </Button>
                </ButtonGroup>
            )
        },
    ];
    useEffect(() => {
        loadData && getInstitution({with: 'ladder,user'}).then(resp => {
            setInstitutions(resp.data.result);
            setLoadData(false);
        }).catch(e => {
            toastError(e);
        })
    }, [loadData]);

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
                                    <ul className="nk-block-tools g-3">
                                        <li
                                            className="nk-block-tools-opt"
                                            onClick={() => setModal('add')}
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
                <Add />
                <Edit/>
            </Content>
        </>
    )
}
export default Institution