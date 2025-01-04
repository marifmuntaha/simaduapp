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
    ReactDataTable, toastError, toastSuccess
} from "../../../components";
import {
    Badge,
    Button,
    ButtonGroup,
    Spinner
} from "reactstrap";
import Add from "./Add";
import Edit from "./Edit";
import {useInstitution} from "../../../layout/provider/Institution";
import {get as getFiles, destroy as destroyFile} from "../../../utils/api/master/file"
import YearDropdown from "../../../components/partials/YearDropdown";

const File = () => {
    const institution = useInstitution();
    const [sm, updateSm] = useState(false);
    const [yearSelected, setYearSelected] = useState([]);
    const [modal, setModal] = useState('');
    const [loading, setLoading] = useState(false);
    const [loadData, setLoadData] = useState(false);
    const [files, setFiles] = useState([]);
    const [file, setFile] = useState([]);
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
            name: "Status",
            selector: (row) => row.status,
            sortable: false,
            cell: (row) => (
                row.status === '1' ? <Badge color="success">Wajib</Badge> : <Badge color="warning">Opsional</Badge>
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
                            setFile(row);
                            setModal('edit');
                        }}>
                        <Icon name="edit"/>
                    </Button>
                    <Button
                        color="outline-danger"
                        onClick={() => {
                            setLoading(row.id);
                            destroyFile(row.id).then(resp => {
                                toastSuccess(resp.data.message);
                                setLoadData(true);
                                setLoading(false);
                            }).catch(err => {
                                toastError(err);
                                setLoadData(false);
                            })
                        }}
                        disabled={row.id === loading}>
                        {row.id === loading ? <Spinner size="sm" color="danger"/> : <Icon name="trash"/>}
                    </Button>
                </ButtonGroup>
            )
        },
    ];

    useEffect(() => {
        if (yearSelected.id !== undefined && loadData && institution.id !== undefined) {
            getFiles({institution_id: institution.id, year_id: yearSelected.id}).then(resp => {
                setFiles(resp.data.result);
                setLoadData(false)
            }).catch(error => {
                toastError(error);
                setLoadData(false);
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loadData]);
    return (
        <>
            <Head title="Data Berkas"/>
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
                            <BlockTitle tag="h4">Data Berkas</BlockTitle>
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
                    <ReactDataTable data={files} columns={Columns} pagination className="nk-tb-list"/>
                </PreviewCard>
                <Add modal={modal} setModal={setModal} setLoadData={setLoadData} />
                <Edit modal={modal} setModal={setModal} setLoadData={setLoadData} file={file}/>
            </Content>
        </>
    )
}
export default File;