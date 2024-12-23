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
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Spinner,
    UncontrolledDropdown
} from "reactstrap";
import Add from "./Add";
import Edit from "./Edit";
import {useInstitution} from "../../../layout/provider/Institution";
import {useSetting} from "../../../layout/provider/Setting";
import {get as getYears} from "../../../utils/api/master/year"
import {get as getFiles, destroy as destroyFile} from "../../../utils/api/master/file"

const File = () => {
    const institution = useInstitution();
    const setting = useSetting();
    const [sm, updateSm] = useState(false);
    const [years, setYears] = useState([]);
    const [yearSelected, setYearSelected] = useState([]);
    const [modal, setModal] = useState('');
    const [loading, setLoading] = useState(false);
    const [loadData, setLoadData] = useState(true);
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
        getYears({institution_id: institution.id, order: 'DESC', limit: 5}).then(resp => {
            const years = resp.data.result;
            const active = years.filter((year) => {
                return year.id === setting.year_id;
            })
            setYearSelected(active[0]);
            setYears(years);
        })
    }, []);

    useEffect(() => {
        yearSelected !== undefined && loadData && getFiles({institution_id: institution.id, year_id: yearSelected.id}).then(resp => {
            setFiles(resp.data.result);
            setLoadData(false)
        }).catch(error => {
            toastError(error);
            setLoadData(false);
        })
    }, [loadData, yearSelected]);
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
                                            <UncontrolledDropdown>
                                                <DropdownToggle
                                                    tag="a"
                                                    className="dropdown-toggle btn btn-white btn-dim btn-outline-light">
                                                    <Icon className="d-none d-sm-inline" name="calender-date"/>
                                                    <span><span
                                                        className="d-none d-md-inline">TP</span> {yearSelected && yearSelected.name}</span>
                                                    <Icon className="dd-indc" name="chevron-right"/>
                                                </DropdownToggle>
                                                <DropdownMenu end>
                                                    <ul className="link-list-opt no-bdr">
                                                        {years && years.map((year, idx) => (
                                                            <li key={idx}>
                                                                <DropdownItem
                                                                    tag="a"
                                                                    onClick={(ev) => {
                                                                        ev.preventDefault();
                                                                        setYearSelected(year);
                                                                        setLoadData(true);
                                                                    }}
                                                                    href="#!"
                                                                >
                                                                    <span>TP {year.name}</span>
                                                                </DropdownItem>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
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