import React, {Suspense, useCallback, useEffect, useState} from "react";
import Head from "../../../layout/head";
import {
    BackTo,
    BlockBetween,
    BlockHead,
    BlockHeadContent,
    BlockTitle,
    Icon,
    PreviewCard,
    ReactDataTable, Row, RSelect, toastError
} from "../../../components";
import Content from "../../../layout/content";
import {
    Button,
    Card, Col,
    DropdownItem,
    DropdownMenu,
    DropdownToggle, UncontrolledDropdown
} from "reactstrap";
import {useNavigate} from "react-router-dom";
import {get as getYears} from "../../../utils/api/master/year";
import {get as getStudents} from "../../../utils/api/student";
import {get as getPrograms} from "../../../utils/api/master/program";
import {useInstitution} from "../../../layout/provider/Institution";
import {useSetting} from "../../../layout/provider/Setting";
import moment from "moment/moment";

const Report = () => {
    const institution = useInstitution();
    const setting = useSetting();
    const navigate = useNavigate();
    const [sm, updateSm] = useState(false);
    const [years, setYears] = useState([]);
    const [yearSelected, setYearSelected] = useState([]);
    const [students, setStudents] = useState([]);
    const [loadData, setLoadData] = useState(false);
    const [genderSelected, setGenderSelected] = useState([]);
    const [programOptions, setProgramOptions] = useState([{value: undefined, label: 'Semua'}]);
    const [programSelected, setProgramSelected] = useState([]);
    const [boardingSelected, setBoardingSelected] = useState([]);
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
            name: "Status",
            selector: (row) => row.id,
            sortable: false,
        }
    ];
    const genderOptions = [
        {value: 'L', label: 'Laki-laki'},
        {value: 'P', label: 'Perempuan'},
        {value: undefined, label: 'Semua'},
    ];
    const boardingOption = [
        {value: '1', label: 'Boarding'},
        {value: '2', label: 'Non Boarding'},
        {value: undefined, label: 'Semua'},
    ]
    const params = useCallback(() => {
        let data = students;
        if (genderSelected.value !== undefined && programSelected.value !== ''){
            data = students.filter((student) => {
                return student.gender === genderSelected.value
            })
        }
        if (programSelected.value !== undefined && programSelected.value !== '') {
            data = students.filter((student) => {
                return student.program && student.program.program_id === programSelected.value
            })
        }
        if (boardingSelected.value !== undefined && boardingSelected.value !== '') {
            data = students.filter((student) => {
                return student.program && student.program.boarding === boardingSelected.value
            })
        }
        return data;
    }, [students, yearSelected, genderSelected, programSelected, boardingSelected]);
    useEffect(() => {
        getPrograms({institution_id: institution.id, year_id: setting.year_id, type: 'select'}).then((resp) => {
            const programs = resp.data.result.concat([{value: undefined, label: 'Semua'}]);
            setProgramOptions(programs);
        }).then(err => {
            toastError(err);
        })
    }, []);
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
        loadData && getStudents({
            institution_id: institution.id,
            year_id: setting.year_id,
            with: 'parent,address,program'}).then(resp => {
            setStudents(resp.data.result);
            setLoadData(false);
        });
    }, [loadData])

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Head title="Laporan"/>
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
                            <BlockTitle tag="h4">LAPORAN</BlockTitle>
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
                                            onClick={() => {
                                                alert("Cetak")
                                            }}
                                        >
                                            <Button color="secondary">
                                                <Icon name="printer"/>
                                                <span> CETAK</span>
                                            </Button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </BlockHeadContent>
                    </BlockBetween>
                </BlockHead>
                <Card className="p-2">
                    <Row>
                        <Col className="col-md-3">
                            <RSelect
                                options={genderOptions}
                                value={genderSelected}
                                onChange={(val) => {
                                    setGenderSelected(val)
                                }}
                                placeholder="Pilih Jenis Kelamin"
                            />
                        </Col>
                        <Col className="col-md-3">
                            <RSelect
                                options={programOptions}
                                value={programSelected}
                                onChange={(val) => {
                                    setProgramSelected(val)
                                }}
                                placeholder="Pilih Program"
                            />
                        </Col>
                        <Col className="col-md-3">
                            <RSelect
                                options={boardingOption}
                                value={boardingSelected}
                                onChange={(val) => {
                                    setBoardingSelected(val)
                                }}
                                placeholder="Pilih Boarding"
                            />
                        </Col>
                        <Col className="col-md-3">
                            <RSelect
                                options={[]}
                                value=''
                                onChange={(val) => {
                                    alert('asdad')
                                }}
                                placeholder="Pilih Status"
                            />
                        </Col>
                    </Row>
                </Card>
                <PreviewCard>
                    <ReactDataTable data={params()} columns={Columns} pagination className="nk-tb-list"/>
                </PreviewCard>
            </Content>
        </Suspense>
    )
}

export default Report;