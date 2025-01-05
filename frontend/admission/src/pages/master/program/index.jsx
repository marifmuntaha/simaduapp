import React, {Suspense, useEffect, useState} from "react";
import Head from "../../../layout/head";
import Content from "../../../layout/content";
import YearDropdown from "../../../components/partials/YearDropdown";
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
import {
    Badge,
    Button,
    ButtonGroup,
    Spinner
} from "reactstrap";
import {useInstitution} from "../../../layout/provider/Institution";
import {useSetting} from "../../../layout/provider/Setting";
import {get as getPrograms, destroy as destroyProgram} from "../../../utils/api/master/program";

const Program = () => {
    const institution = useInstitution();
    const setting = useSetting();
    const [sm, updateSm] = useState(false);
    const [yearSelected, setYearSelected] = useState({});
    const [programs, setPrograms] = useState([]);
    const [program, setProgram] = useState([]);
    const [loadData, setLoadData] = useState(false);
    const [modal, setModal] = useState('');
    const [loading, setLoading] = useState(false);
    const Columns = [
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
            cell: (row) => {
                return row.boarding === '1' ? <Badge color="success" pill>Boarding</Badge> :
                    <Badge color="warning" pill>Opsional</Badge>;
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
                            setProgram(row);
                            setModal('edit')
                        }}>
                        <Icon name="edit"/>
                    </Button>
                    <Button
                        color="outline-danger"
                        onClick={() => {
                            setLoading(row.id)
                            destroyProgram(row.id).then(resp => {
                                toastSuccess(resp.data.message);
                                setLoadData(true);
                                setLoading(false);
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
        if (loadData && yearSelected.id !== undefined && institution.id !== undefined) {
            getPrograms({
                institution_id: institution.id,
                year_id: yearSelected.id
            }).then(resp => {
                setPrograms(resp.data.result);
                setLoadData(false);
            }).catch(err => {
                toastError(err);
                setLoadData(false);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loadData]);

    return (
        <Suspense fallback={<div>Loading...</div>}>
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
                                        <li>
                                            <YearDropdown yearSelected={yearSelected} setYearSelected={setYearSelected} setLoadData={setLoadData}/>
                                        </li>
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
                    <ReactDataTable data={programs} columns={Columns} pagination className="nk-tb-list"/>
                </PreviewCard>
                <Add modal={modal} setModal={setModal} setLoadData={setLoadData} institution={institution} setting={setting}/>
                <Edit modal={modal} setModal={setModal} setLoadData={setLoadData} program={program}/>
            </Content>
        </Suspense>
    )
}
export default Program;