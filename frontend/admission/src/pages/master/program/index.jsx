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
    ReactDataTable
} from "../../../components";
import {Badge, Button, ButtonGroup, Spinner} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import Add from "./Add";
// import Edit from "./Edit";
import {APICore} from "../../../utils/api/APICore";
import {getYears} from "../../../redux/master/year/actions";
import {addProgram, destroyProgram, getPrograms, setProgram} from "../../../redux/master/program/actions";
import {useSetting} from "../../../layout/provider/Setting";
import {useInstitution} from "../../../layout/provider/Institution";

const Program = () => {
    const dispatch = useDispatch();
    const institution = useInstitution();
    const setting = useSetting();
    const api = new APICore();
    const user = api.getLoggedInUser();
    const {loading, programs, success} = useSelector((state) => state.program);
    const {years} = useSelector((state) => state.year);
    const [sm, updateSm] = useState(false);
    const [optionYear, setOptionYear] = useState([]);
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
        }
    ]
    const ColumnOther = [
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
    ]
    const Columns = user.role === '1' ? [...ColumnAdministrator, ...ColumnOther] : ColumnOther;
    useEffect(() => {
       dispatch(getYears())
    }, [setting]);

    useEffect(() => {
        setOptionYear(() => years.map((year) => {
            return {value: year.id, label: year.name};
        }))
    }, [years]);
    useEffect(() => {
        dispatch(getPrograms({institution_id: institution.id, year_id: setting.year_id}));
    }, [dispatch, success]);

    return (
        <>
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
                <Add user={user} years={years}/>
                {/*<Edit user={user} years={years}/>*/}
            </Content>
        </>
    )
}
export default Program;