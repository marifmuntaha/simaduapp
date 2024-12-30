import React, {Suspense, useCallback, useEffect, useState} from "react";
import Head from "../../../layout/head";
import Content from "../../../layout/content";
import Add from "./Add";
import Edit from "./Edit";
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
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Spinner,
    UncontrolledDropdown
} from "reactstrap";
import {Role} from "../../../utils/Utils";
import {get as getUsers, destroy as destroyUser} from '../../../utils/api/user';

const User = () => {
    const [sm, updateSm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [roleSelected, setRoleSelected] = useState([]);
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState([]);
    const [modal, setModal] = useState('');
    const [loadData, setLoadData] = useState(true);
    const roleOptions = [
        {value: undefined, name: 'Semua'},
        {value: '1', name: "Administrator"},
        {value: '2', name: "Kepala Madrasah"},
        {value: '3', name: "Wakil Kepala"},
        {value: '4', name: "Guru"},
        {value: '5', name: "Operator"},
        {value: '6', name: "Bendahara"},
        {value: '7', name: "Teller"},
        {value: '8', name: "Siswa"},
        {value: '9', name: "Orang Tua"},
    ]
    const Columns = [
        {
            name: "Nama",
            selector: (row) => row.name,
            sortable: false,
            hide: "sm",
        },
        {
            name: "Alamat Email",
            selector: (row) => row.email,
            sortable: false,
        },
        {
            name: "Nama Pengguna",
            selector: (row) => row.username,
            sortable: false,
        },
        {
            name: "Hak Akses",
            selector: (row) => row.role,
            sortable: false,
            hide: "sm",
            cell: (row) => (
                Role(row.role)
            )
        },
        {
            name: "Nomor Telepon",
            selector: (row) => row.phone,
            sortable: false,
            hide: "sm"
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
                            setModal('edit');
                            setUser(row);
                        }}>
                        <Icon name="edit"/>
                    </Button>
                    <Button
                        color="outline-danger"
                        onClick={() => {
                            setLoading(row.id);
                            destroyUser(row.id).then(resp => {
                                toastSuccess(resp.data.message);
                                setLoadData(true);
                                setLoading(false);
                            }).catch(err => {
                                toastError(err);
                                setLoading(false);
                            });
                        }}
                        disabled={row.id === loading}>
                        {row.id === loading ? <Spinner size="sm" color="danger"/> : <Icon name="trash"/>}
                    </Button>
                </ButtonGroup>
            )
        },
    ];
    const data = useCallback(() => {
        let data = users;
        if (roleSelected.value !== undefined) {
            data = data.filter((user) => {
                return user.role === roleSelected.value;
            })
        }
        return data;
    }, [users, roleSelected]);

    useEffect(() => {
        loadData && getUsers().then(resp => {
            setUsers(resp.data.result);
            setLoadData(false);
        }).catch(error => {
            toastError(error);
        })
    }, [loadData]);

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Head title="Data Pengguna"/>
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
                            <BlockTitle tag="h4">Data Pengguna</BlockTitle>
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
                                                    <Icon className="d-none d-sm-inline" name="lock-alt"/>
                                                    <span><span
                                                        className="d-none d-md-inline"></span>{roleSelected.value !== undefined ? roleSelected.name : 'Hak Akses'}</span>
                                                    <Icon className="dd-indc" name="chevron-right"/>
                                                </DropdownToggle>
                                                <DropdownMenu end>
                                                    <ul className="link-list-opt no-bdr">
                                                        {roleOptions && roleOptions.map((role, idx) => (
                                                            <li key={idx}>
                                                                <DropdownItem
                                                                    tag="a"
                                                                    onClick={(ev) => {
                                                                        ev.preventDefault();
                                                                        setRoleSelected(role);
                                                                    }}
                                                                    href="#!"
                                                                >
                                                                    <span>{role.name}</span>
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
                    <ReactDataTable data={data()} columns={Columns} pagination className="nk-tb-list"/>
                </PreviewCard>
                <Add modal={modal} setModal={setModal} setLoadData={setLoadData} />
                <Edit modal={modal} setModal={setModal} setLoadData={setLoadData} user={user} setUser={setUser}/>
            </Content>
        </Suspense>
    )
}
export default User