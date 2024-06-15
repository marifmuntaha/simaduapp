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
import {Button, ButtonGroup, Spinner} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import Add from "./Add";
// import Edit from "./Edit";
import {
    addClassroom,
    destroyClassroom,
    getClassrooms,
    resetClassroom,
    setClassroom
} from "../../../redux/institute/classroom/actions";

const Classroom = () => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state.classroom)
    const {loading, classrooms, error} = selector;
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
            name: "Tingkat",
            selector: (row) => row.level && row.level.name,
            sortable: false,
        },
        {
            name: "Jurusan",
            selector: (row) => row.major && row.major.alias,
            sortable: false,
        },
        {
            name: "Nama",
            selector: (row) => row.name,
            sortable: false,
        },
        {
            name: "Alias",
            selector: (row) => row.fullname,
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
                            dispatch(setClassroom(row, true));
                        }}>
                        <Icon name="edit"/>
                    </Button>
                    <Button
                        color="outline-danger"
                        onClick={() => {
                            dispatch(destroyClassroom(row.id));
                        }}
                        disabled={row.id === loading}>
                        {row.id === loading ? <Spinner size="sm" color="danger"/> : <Icon name="trash"/>}
                    </Button>
                </ButtonGroup>
            )
        },
    ];
    useEffect(() => {
        dispatch(getClassrooms({with: ['institution', 'year', 'level', 'major']}));
        dispatch(resetClassroom());
    }, [dispatch])
    return (
        <>
            {error && toastError(error) && dispatch(resetClassroom())}
            <Head title="Data Rombel"/>
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
                            <BlockTitle tag="h4">Data Rombel</BlockTitle>
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
                                            onClick={() => dispatch(addClassroom(true))}
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
                    <ReactDataTable data={classrooms} columns={Columns} pagination className="nk-tb-list"/>
                </PreviewCard>
                <Add/>
                {/*<Edit/>*/}
            </Content>
        </>
    )
}
export default Classroom;