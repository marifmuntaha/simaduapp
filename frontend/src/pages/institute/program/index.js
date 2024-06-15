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
    ReactDataTable,
    toastError
} from "../../../components";
import {Badge, Button, ButtonGroup, Spinner} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import Add from "./Add";
import Edit from "./Edit";
import {
    addProgram,
    destroyProgram,
    getPrograms,
    resetProgram,
    setProgram
} from "../../../redux/institute/program/actions";

const Program = () => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state.program)
    const {loading, programs, error} = selector;
    const [sm, updateSm] = useState(false);
    const Columns = [
        {
            name: "Lembaga",
            selector: (row) => row.institution && row.institution.withLadderAlias,
            sortable: false,
            hide: "sm",
        },
        {
            name: "Tahun Pelajaran",
            selector: (row) => row.year && row.year.name,
            sortable: false,
        },
        {
            name: "Nama Program",
            selector: (row) => row.name,
            sortable: false,
        },
        {
            name: "Singkatan",
            selector: (row) => row.alias,
            sortable: false,
        },
        {
            name: "Boarding",
            selector: (row) => row.boarding,
            sortable: false,
            cell: (row) => (
                row.boarding === 1 ? <Badge color="success">Ya</Badge> : <Badge color="danger">Tidak</Badge>
            )
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
                            dispatch(setProgram(row, true));
                        }}>
                        <Icon name="edit"/>
                    </Button>
                    <Button
                        color="outline-danger"
                        onClick={() => {
                            dispatch(destroyProgram(row.id));
                        }}
                        disabled={row.id === loading}>
                        {row.id === loading ? <Spinner size="sm" color="danger"/> : <Icon name="trash"/>}
                    </Button>
                </ButtonGroup>
            )
        },
    ];
    useEffect(() => {
        dispatch(getPrograms({with: ['institution', 'year']}));
        dispatch(resetProgram());
    }, [dispatch])
    return (
        <>
            {error && toastError(error) && dispatch(resetProgram())}
            <Head title="Data Program"/>
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
                            <BlockTitle tag="h4">Data Program</BlockTitle>
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
                                            onClick={() => dispatch(addProgram(true))}
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
                    <ReactDataTable data={programs} columns={Columns} pagination className="nk-tb-list"/>
                </PreviewCard>
                <Add/>
                <Edit/>
            </Content>
        </>
    )
}
export default Program;