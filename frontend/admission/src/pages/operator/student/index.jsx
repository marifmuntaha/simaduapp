import React, {Suspense, useEffect, useState} from "react";
import Head from "../../../layout/head";
import Content from "../../../layout/content";
import YearDropdown from "../../../components/partials/YearDropdown";
import moment from "moment";
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
    Button,
    ButtonGroup,
    Spinner
} from "reactstrap";
import {useInstitution} from "../../../layout/provider/Institution";
import {useNavigate} from "react-router-dom";
import {get as getStudents, destroy as destroyStudent} from "../../../utils/api/student";
import {get as getFile, destroy as destroyFile} from "../../../utils/api/studentFile";
import {get as getSchool, destroy as destroySchool} from "../../../utils/api/studentSchool";
import {get as getProgram, destroy as destroyProgram} from "../../../utils/api/studentProgram";
import {get as getAddress, destroy as destroyAddress} from "../../../utils/api/studentAddress";
import {get as getParent, destroy as destroyParent} from "../../../utils/api/studentParent";
import {destroy as destroyUser} from "../../../utils/api/user";
import "moment/locale/id"

const Student = () => {
    const institution = useInstitution();
    const [sm, updateSm] = useState(false);
    const [loading, setLoading] = useState(false);
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
                            setLoadData(row.id);
                            destroyStudentSubmit(row.id).then(setLoading(false));
                        }}
                        disabled={row.id === loading}>
                        {row.id === loading ? <Spinner size="sm" color="danger"/> : <Icon name="trash"/>}
                    </Button>
                </ButtonGroup>
            )
        },
    ];

    const destroyStudentSubmit = async (id) => {
        await getFile({student_id: id}).then((resp) => {
            const files = resp.data.result;
            files.map((file) => {
                destroyFile(file.id).then().catch(err => toastError(err));
            })
        }).catch((err) => {
            toastError(err);
        }).then(() => {
            getSchool({student_id: id}).then((resp) => {
                const schools = resp.data.result;
                schools.map((school) => {
                    destroySchool(school.id).then().catch(err => toastError(err));
                })
            }).catch(err => toastError(err));
        }).then(() => {
            getProgram({student_id: id}).then((resp) => {
                const programs = resp.data.result;
                programs.map((program) => {
                    destroyProgram(program.id).then().catch(err => toastError(err));
                })
            })
        }).then(() => {
            getAddress({student_id: id}).then((resp) => {
                const address = resp.data.result;
                address.map((address) => {
                    destroyAddress(address.id).then().catch(err => toastError(err));
                })
            })
        }).then(() => {
            getParent({student_id: id}).then((resp) => {
                const parents = resp.data.result
                parents.map((parent) => {
                    destroyParent(parent.id).then(() => {
                        destroyUser(parent.user_id).then().catch(err => toastError(err));
                    }).catch(err => toastError(err));
                })
            })
        }).then(() => {
            destroyStudent(id).then((resp) => {
                const student = resp.data.result
                destroyUser(student.user_id).then(() => {
                    toastSuccess(resp.data.message);
                    setLoadData(true);
                }).catch(err => toastError(err));
            }).catch(err => toastError(err));
        });
    }

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
                                            <YearDropdown yearSelected={yearSelected} setYearSelected={setYearSelected} setLoadData={setLoadData}/>
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