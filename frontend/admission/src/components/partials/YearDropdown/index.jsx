import React, {Suspense, useEffect, useState} from "react";
import {DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from "reactstrap";
import {Icon} from "../../index";
import {get as getYears} from "../../../utils/api/master/year";
import {useInstitution} from "../../../layout/provider/Institution";
import {useSetting} from "../../../layout/provider/Setting";

const YearDropdown = ({...params}) => {
    const institution = useInstitution();
    const setting = useSetting();
    const [years, setYears] = useState([]);

    useEffect(() => {
        if (institution.id !== undefined && setting.year_id !== undefined) {
            getYears({institution_id: institution.id}).then(resp => {
                let year = resp.data.result.filter((year) => {
                    return year.id === setting.year_id
                })
                setYears(resp.data.result);
                params.setYearSelected(year[0]);
                params.setLoadData(true);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [institution]);

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <UncontrolledDropdown>
                <DropdownToggle
                    tag="a"
                    className="dropdown-toggle btn btn-white btn-dim btn-outline-light">
                    <Icon className="d-none d-sm-inline" name="calender-date"/>
                    <span><span className="d-none d-md-inline">TP </span> {params.yearSelected && params.yearSelected.name}</span>
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
                                        params.setYearSelected(year);
                                        params.setLoadData(true);
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
        </Suspense>
    )
}

export default YearDropdown;