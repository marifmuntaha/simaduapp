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
    ReactDataTable,
    toastError, toastSuccess
} from "../../../components";
import {Button, ButtonGroup, Spinner} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import Add from "./Add";
import Edit from "./Edit";
import {
    addClassroom,
    destroyClassroom,
    getClassrooms,
    resetClassroom,
    setClassroom
} from "../../../redux/institute/classroom/actions";
import {APICore} from "../../../utils/api/APICore";
import {getYears} from "../../../redux/master/year/actions";
import {getLevels} from "../../../redux/master/level/actions";
import {getMajors} from "../../../redux/master/major/actions";

const Classroom = () => {
    const dispatch = useDispatch();
    const api = new APICore();
    const user = api.getLoggedInUser();
    const {loading, classrooms, success, error, loadData} = useSelector((state) => state.classroom)
    const {years} = useSelector((state) => state.year);
    const {majors} = useSelector((state ) => state.major);
    const {levels} = useSelector((state) => state.level);
    const [sm, updateSm] = useState(false);
    const ColumnAdministrator = [
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
    ]
    const ColumnOther = [
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
    ]
    const Columns = user.role === '1' ? [...ColumnAdministrator, ...ColumnOther] : ColumnOther;
    const params = useCallback(() => {
        return user.role !== '1'
            ? {institution_id: user.institution.id, year_id: years && years.filter((year) => {
                    return year.active === '1'
                })[0].id, with: ['level', 'major']}
            : {with: ['institution', 'year', 'level', 'major']}
    }, [user, years])
    useEffect(() => {
        dispatch(getClassrooms(params())) && dispatch(resetClassroom());
        dispatch(getYears({institution_id: user.institution.id}));
        dispatch(getLevels({type: 'select', ladder_id: user.institution.ladder_id}));
        dispatch(getMajors({type: 'select', ladder_id: user.institution.ladder_id}));
    }, [loadData, dispatch]);

    useEffect(() => {
        success && toastSuccess(success)
    }, [success]);

    useEffect(() => {
        error && toastError(error);
        dispatch(resetClassroom())
    }, [error, dispatch]);

    return (
        <>
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
                <Add user={user} years={years} levels={levels} majors={majors}/>
                <Edit user={user} years={years} levels={levels} majors={majors}/>
            </Content>
        </>
    )
}
export default Classroom;