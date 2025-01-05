import React, {Suspense, useEffect, useState} from "react";
import {DropdownItem, DropdownMenu, DropdownToggle, Spinner, UncontrolledDropdown} from "reactstrap";
import {Icon, toastError} from "../../index";
import {get as getYears} from "../../../utils/api/master/year";
import {useInstitution} from "../../../layout/provider/Institution";
import {useSetting} from "../../../layout/provider/Setting";

const YearDropdown = ({...params}) => {
    const institution = useInstitution();
    const setting = useSetting();
    const [years, setYears] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        if (institution !== undefined && setting !== undefined) {
            getYears({institution_id: institution.id}).then(resp => {
                let year = resp.data.result.filter((year) => {
                    return year.id === setting.year_id
                });
                setLoading(false);
                setYears(resp.data.result);
                params.setYearSelected(year[0]);
                params.setLoadData(true);
            }).catch(err => {
                toastError(err);
                setLoading(false);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [institution, setting]);

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <UncontrolledDropdown>
                <DropdownToggle
                    tag="a"
                    className="dropdown-toggle btn btn-white btn-dim btn-outline-light">
                    {loading ? <Spinner size="sm"/> : (
                        <>
                            <Icon name="calendar-alt"/>
                            <span>TP {params.yearSelected && params.yearSelected.name}</span>
                            <Icon className="dd-indc" name="chevron-right"/>
                        </>
                    )}
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