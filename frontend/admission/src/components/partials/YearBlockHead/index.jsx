import React, {useState} from "react";
import {Button, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from "reactstrap";
import {BlockHeadContent, Icon} from "../../index";

const YearBlockHead = ({...params}) => {
    const [sm, updateSm] = useState(false);
    return (
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
                                    <span><span className="d-none d-md-inline">TP </span> {params.yearSelected && params.yearSelected.name}</span>
                                    <Icon className="dd-indc" name="chevron-right"/>
                                </DropdownToggle>
                                <DropdownMenu end>
                                    <ul className="link-list-opt no-bdr">
                                        {params.years && params.years.map((year, idx) => (
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
                        </li>
                        <li
                            className="nk-block-tools-opt"
                            onClick={() => params.setModal('add')}
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
    )
}

export default YearBlockHead;