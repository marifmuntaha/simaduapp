import React, {useEffect, useState} from "react";
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
    ReactDataTable
} from "../../../components";
import {Badge, Button, ButtonGroup, Spinner} from "reactstrap";
import Add from "./Add";
import {ToastContainer} from "react-toastify";
import {actionType, Dispatch} from "../../../reducer";
import Edit from "./Edit";

const Major = () => {
    const [sm, updateSm] = useState(false);
    const [modal, setModal] = useState({
        add: false,
        edit: false
    });
    const [majors, setMajors] = useState([]);
    const [major, setMajor] = useState({});
    const [reload, setReload] = useState(true);
    const [loading, setLoading] = useState(0);
    const Columns = [
        {
            name: "Nama",
            selector: (row) => row.name,
            sortable: false,
            hide: "sm",
        },
        {
            name: "Singkatan",
            selector: (row) => row.alias,
            sortable: false,
        },
        {
            name: "Diskripsi",
            selector: (row) => row.desc,
            sortable: false,
            hide: "sm",
        },
        {
            name: "Boarding",
            selector: (row) => row.boarding,
            sortable: false,
            hide: "sm",
            cell: (row) => parseInt(row.boarding) === 1 ? 'YA' : 'TIDAK'
        },
        {
            name: "Program",
            selector: (row) => row.program,
            sortable: false,
            hide: "sm",
            cell: (row) => {
                let program = JSON.parse(row.program);
                return program.map((item) => {
                    return <Badge className="badge-dot me-2" color="success">{item.label}</Badge>
                })
            }
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
                            setMajor(row);
                            setModal({
                                add: false,
                                edit: true
                            });
                        }}>
                        <Icon name="edit"/>
                    </Button>
                    <Button
                        color="outline-danger"
                        onClick={() => Dispatch(actionType.MAJOR_DELETE, {
                            id: row.id,
                            setLoading: setLoading,
                            setReload: setReload
                        })}
                        disabled={row.id === loading}>
                        {row.id === loading ? <Spinner size="sm" color="danger"/> : <Icon name="trash"/>}
                    </Button>
                </ButtonGroup>
            )
        },
    ];
    useEffect(() => {
        reload && Dispatch(actionType.MAJOR_GET, {setData: setMajors}).then(() => setReload(false))
    }, [reload]);
    return <>
        <Head title="Data Jurusan"/>
        <Content page="component">
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
                        <BlockTitle tag="h4">Data Jurusan</BlockTitle>
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
                                        onClick={() => setModal({
                                            ...modal, add: true,
                                        })}
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
                <ReactDataTable data={majors} columns={Columns} pagination className="nk-tb-list" onLoad={reload}/>
            </PreviewCard>
            <Add open={modal.add} setOpen={setModal} setReload={setReload}/>
            <Edit open={modal.edit} setOpen={setModal} setReload={setReload} major={major}/>
        </Content>
        <ToastContainer/>
    </>
}
export default Major