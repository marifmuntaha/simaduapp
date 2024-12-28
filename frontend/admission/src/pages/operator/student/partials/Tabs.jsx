import {Nav, NavItem, NavLink} from "reactstrap";
import classnames from "classnames";
import {Icon} from "../../../../components";
import React from "react";

const Tabs = ({activeIconTab, toggleIconTab}) => {
    return (
        <Nav tabs>
            <NavItem>
                <NavLink
                    tag="a"
                    href="#tab"
                    className={classnames({active: activeIconTab === "1"})}
                    onClick={(ev) => {
                        ev.preventDefault();
                        toggleIconTab("1");
                    }}
                >
                    <Icon name="user"/> <span>Data Pribadi</span>
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink
                    tag="a"
                    href="#tab"
                    className={classnames({active: activeIconTab === "2"})}
                    onClick={(ev) => {
                        ev.preventDefault();
                        toggleIconTab("2");
                    }}
                >
                    <Icon name="user-fill"/> <span>Data Orangtua</span>
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink
                    tag="a"
                    href="#tab"
                    className={classnames({active: activeIconTab === "3"})}
                    onClick={(ev) => {
                        ev.preventDefault();
                        toggleIconTab("3");
                    }}
                >
                    <Icon name="map"/> <span>Data Alamat</span>
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink
                    tag="a"
                    href="#tab"
                    className={classnames({active: activeIconTab === "4"})}
                    onClick={(ev) => {
                        ev.preventDefault();
                        toggleIconTab("4");
                    }}
                >
                    <Icon name="list"/> <span>Data Program</span>
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink
                    tag="a"
                    href="#tab"
                    className={classnames({active: activeIconTab === "5"})}
                    onClick={(ev) => {
                        ev.preventDefault();
                        toggleIconTab("5");
                    }}
                >
                    <Icon name="building"/> <span>Data Sekolah Asal</span>
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink
                    tag="a"
                    href="#tab"
                    className={classnames({active: activeIconTab === "6"})}
                    onClick={(ev) => {
                        ev.preventDefault();
                        toggleIconTab("6");
                    }}
                >
                    <Icon name="file"/> <span>Data Berkas</span>
                </NavLink>
            </NavItem>
        </Nav>
    )
}
export default Tabs