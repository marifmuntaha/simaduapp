import React, {useState} from "react";
import {DropdownToggle, DropdownMenu, Dropdown} from "reactstrap";
import {Icon, LinkList, LinkItem, UserAvatar} from "../../../../components";
import {APICore} from "../../../../utils/api/APICore";

const User = () => {
    const api = new APICore();
    const user = api.getLoggedInUser();
    const [open, setOpen] = useState(false);
    const toggle = () => setOpen((prevState) => !prevState);
    const role = (role) => {
        switch (role) {
            case '1':
                return 'Administrator'
            case '2':
                return 'Kepala Madrasah'
            case '3':
                return 'Wakil Kepala'
            case '4':
                return 'Guru'
            case '5':
                return 'Operator'
            case '6':
                return 'Bendahara'
            case '7':
                return 'Teller'
            case '8':
                return 'Siswa'
            case '9':
                return 'Orang Tua'
            default:
                return  ''
        }
    }
    return (
        <>
            <Dropdown isOpen={open} className="user-dropdown" toggle={toggle}>
                <DropdownToggle
                    tag="a"
                    href="#toggle"
                    className="dropdown-toggle"
                    onClick={(ev) => {
                        ev.preventDefault();
                    }}
                >
                    <div className="user-toggle">
                        <UserAvatar icon="user-alt" className="sm"/>
                        <div className="user-info d-none d-md-block">
                            <div className="user-status">{role(user.role)}</div>
                            <div className="user-name dropdown-indicator">{user.fullname}</div>
                        </div>
                    </div>
                </DropdownToggle>
                <DropdownMenu end className="dropdown-menu-md dropdown-menu-s1">
                    <div className="dropdown-inner user-card-wrap bg-lighter d-none d-md-block">
                        <div className="user-card sm">
                            <div className="user-avatar">
                                <span>AB</span>
                            </div>
                            <div className="user-info">
                                <span className="lead-text">{user.fullname}</span>
                                <span className="sub-text">{user.email}</span>
                            </div>
                        </div>
                    </div>
                    <div className="dropdown-inner">
                        <LinkList>
                            <LinkItem link="/user-profile-regular" icon="user-alt" onClick={toggle}>
                                Lihat Profil
                            </LinkItem>
                            <LinkItem link="/user-profile-setting" icon="setting-alt" onClick={toggle}>
                                Pengaturan
                            </LinkItem>
                        </LinkList>
                    </div>
                    <div className="dropdown-inner">
                        <LinkList>
                            <a href={`${process.env.PUBLIC_URL}/auth/keluar`}>
                                <Icon name="signout"></Icon>
                                <span>Keluar</span>
                            </a>
                        </LinkList>
                    </div>
                </DropdownMenu>
            </Dropdown>
        </>
    );
};

export default User;
