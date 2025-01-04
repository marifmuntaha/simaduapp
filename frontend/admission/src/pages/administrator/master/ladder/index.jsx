import Head from "../../../../layout/head";
import {
    BackTo,
    BlockBetween,
    BlockHead,
    BlockHeadContent,
    BlockTitle,
    Icon, PreviewCard,
    ReactDataTable, toastError, toastSuccess
} from "../../../../components";
import React, {useEffect, useState} from "react";
import Content from "../../../../layout/content";
import {Button, ButtonGroup, Spinner} from "reactstrap";
import {get as getLadder, destroy as destroyLadder} from "../../../../utils/api/master/ladder"


const Ladder = () => {
    const [sm, updateSm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadData, setLoadData] = useState(true);
    const [ladders, setLadders] = useState([]);
    const [ladder, setLadder] = useState([]);
    const [modal, setModal] = useState(false);
    const Columns = [
        {
            name: "Nama",
            selector: (row) => row.name,
            sortable: false,
            hide: "sm",
        },
        {
            name: "Alias",
            selector: (row) => row.alias,
            sortable: false,
        },
        {
            name: "Diskripsi",
            selector: (row) => row.description,
            sortable: false,
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
                            setLadder(row);
                            setModal('edit');
                        }}>
                        <Icon name="edit"/>
                    </Button>
                    <Button
                        color="outline-danger"
                        onClick={() => {
                            setLoading(row.id);
                            destroyLadder(row.id).then(resp => {
                                toastSuccess(resp.data.message);
                                setLoading(false);
                                setLoadData(true);
                            }).catch(err => {
                                toastError(err);
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
        loadData && getLadder().then(resp => {
            setLadders(resp.data.result);
            setLoadData(false);
        }).catch(err => {
            toastError(err);
            setLoadData(false);
        })
    }, [loadData]);
    return (
        <>
            <Head title="Data Jenjang"/>
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
                            <BlockTitle tag="h4">Data Jenjang</BlockTitle>
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
                                        <li className="nk-block-tools-opt" onClick={() => alert('testing')}>
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
                    <ReactDataTable data={ladders} columns={Columns} pagination className="nk-tb-list"/>
                </PreviewCard>
            </Content>
        </>
    )
}
export default Ladder