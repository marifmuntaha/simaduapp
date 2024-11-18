import React, {Suspense, useEffect, useState} from "react";
import Head from "../../../layout/head";
import Content from "../../../layout/content";
import {BackTo, BlockBetween, BlockHead, BlockHeadContent, BlockTitle, Icon} from "../../../components";
import {Button, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {useInstitution} from "../../../layout/provider/Institution";
import {getYears} from "../../../redux/master/year/actions";
import {useSetting} from "../../../layout/provider/Setting";
import {getStudents} from "../../../redux/student/actions";
import {useNavigate} from "react-router-dom";

const Student = () => {
    const dispatch = useDispatch();
    const institution = useInstitution();
    const setting = useSetting();
    const {years} = useSelector((state) => state.year);
    const {loading, students, success} = useSelector((state) => state.student);
    const [sm, updateSm] = useState(false);
    const [yearSelected, setYearSelected] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        institution && dispatch(getYears({institution_id: institution.id}));
    }, [institution]);

    useEffect(() => {
        let year = years && years.filter((year) => {
            return year.id === setting.year_id;
        });
        year && setYearSelected(year[0]);
    }, [years]);

    useEffect(() => {
        (institution && yearSelected) && dispatch(getStudents({institution_id: institution.id, year_id: setting.year_id}));
    }, [institution, yearSelected])
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
                                                                        setYearSelected(year)
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
            </Content>
        </Suspense>
    )
}

export default Student;