import React, {Suspense, useEffect, useState} from "react";
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
import {useInstitution} from "../../../layout/provider/Institution";
import {useSetting} from "../../../layout/provider/Setting";
import {useNavigate} from "react-router-dom";
import {get as getYears} from "../../../utils/api/master/year"
import {get as getStudents} from "../../../utils/api/student";
import moment from "moment";
import "moment/locale/id"

const Student = () => {
    const institution = useInstitution();
    const setting = useSetting();
    const [sm, updateSm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [years, setYears] = useState([]);
    const [yearSelected, setYearSelected] = useState([]);
    const [students, setStudents] = useState([]);
    const [loadData, setLoadData] = useState(false);
    const navigate = useNavigate();
    const Columns = [
        {
            name: "NISN",
            selector: (row) => row.nisn,
            sortable: false,
            width: '130px'
        },
        {
            name: "Nama Lengkap",
            selector: (row) => row.name,
            sortable: false,
        },
        {
            name: "Tempat, Tanggal Lahir",
            selector: (row) => row.birthplace,
            sortable: false,
            cell: row => (
                row.birthplace + ', ' + moment(row.birthdate).locale('id').format("D MMMM Y")
            )
        },
        {
            name: "L/P",
            selector: (row) => row.gender,
            sortable: false,
            width: '110px',
            cell: row => (
                row.gender === 'L' ? "Laki-laki" : "Perempuan"
            )
        },
        {
            name: "Nama Wali",
            selector: (row) => row.parent,
            sortable: false,
            cell: row => (
                row.parent && row.parent.guard_name
            )
        },
        {
            name: "Alamat",
            selector: (row) => row.address,
            sortable: false,
            cell: row => (
                row.address && row.address.address
            )
        },
        {
            name: "Program",
            selector: (row) => row.program,
            sortable: false,
            width: '110px',
            cell: row => (
                row.program && row.program.program.name
            )
        },
        {
            name: "Boarding",
            selector: (row) => row.program,
            sortable: false,
            width: '90px',
            cell: row => (
                row.program && row.program.boarding === "1"
                    ? <span className="text-success"><Icon name="check-thick"/></span>
                    : <span className="text-danger"><Icon name="cross"/></span>
            )
        },
        {
            name: "Aksi",
            selector: (row) => row.id,
            sortable: false,
            cell: (row) => (
                <ButtonGroup size="sm">
                    <Button
                        color="outline-info"
                        onClick={() => {
                            navigate(`/operator/pendaftar/${row.id}/detail`);
                        }}>
                        <Icon name="eye"/>
                    </Button>
                    <Button
                        color="outline-warning"
                        onClick={() => {
                            navigate(`/operator/pendaftar/${row.id}/ubah`);
                        }}>
                        <Icon name="edit"/>
                    </Button>
                    <Button
                        color="outline-danger"
                        onClick={() => {

                        }}
                        disabled={row.id === loading}>
                        {row.id === loading ? <Spinner size="sm" color="danger"/> : <Icon name="trash"/>}
                    </Button>
                </ButtonGroup>
            )
        },
    ];

    useEffect(() => {
        institution && getYears({institution_id: institution.id}). then(resp => {
            let year = resp.data.result.filter((year) => {
                return year.id === setting.year_id
            })
            setYears(resp.data.result);
            setYearSelected(year[0]);
            setLoadData(true);
        });
    }, [institution]);

    useEffect(() => {
        loadData && getStudents({institution_id: institution.id, year_id: yearSelected.id, with: 'parent,address,program'}).then(resp => {
            setStudents(resp.data.result);
            setLoadData(false);
        })
    }, [loadData])
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Head title="Data Pendaftar"/>
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
                            <BlockTitle tag="h4">Data Pendaftar</BlockTitle>
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
                                                    <span><span className="d-none d-md-inline">TP</span> {yearSelected && yearSelected.name}</span>
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
                                            onClick={() => navigate('tambah')}
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
                    <ReactDataTable data={students} columns={Columns} pagination className="nk-tb-list"/>
                </PreviewCard>
            </Content>
        </Suspense>
    )
}

export default Student;