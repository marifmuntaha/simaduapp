import React, {useCallback, useEffect, useState} from "react";
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
    ReactDataTable
} from "../../../components";
import {Badge, Button, ButtonGroup, Spinner} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {addYear, destroyYear, getYears, resetYear, setYear} from "../../../redux/master/year/actions";
import Add from "./Add";
import Edit from "./Edit";
import {APICore} from "../../../utils/api/APICore";

const Year = () => {
    const dispatch = useDispatch();
    const {loading, years, success} = useSelector((state) => state.year);
    const [sm, updateSm] = useState(false);
    const Columns = [
        {
            name: "Nama",
            selector: (row) => row.name,
            sortable: false,
            hide: "sm",
        },
        {
            name: "Diskripsi",
            selector: (row) => row.description,
            sortable: false,
        },
        {
            name: "Aktif",
            selector: (row) => row.active,
            sortable: false,
            cell: row => (
                row.active === '2' ? <Badge className="badge-dot" color="danger">Tidak</Badge> :
                    <Badge className="badge-dot" color="success">Aktif</Badge>
            )
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
                            dispatch(setYear(row, true));
                        }}>
                        <Icon name="edit"/>
                    </Button>
                    <Button
                        color="outline-danger"
                        onClick={() => {
                            dispatch(destroyYear(row.id));
                        }}
                        disabled={row.id === loading}>
                        {row.id === loading ? <Spinner size="sm" color="danger"/> : <Icon name="trash"/>}
                    </Button>
                </ButtonGroup>
            )
        },
    ];
    const api = new APICore();
    const user = api.getLoggedInUser();
    const params = useCallback(() => {
        return user.role !== '1'
            ? {institution_id: process.env.REACT_APP_SERVICE_INSTITUTION}
            : ''
    }, [user]);

    useEffect(() => {
        dispatch(getYears(params())) && dispatch(resetYear());
    }, [dispatch, success]);
    return (
        <>
            <Head title="Tahun Pelajaran"/>
            <Content page="component">
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
                            <BlockTitle tag="h4">Tahun Pelajaran</BlockTitle>
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
                                        <li
                                            className="nk-block-tools-opt"
                                            onClick={() => dispatch(addYear(true))}
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
                    <ReactDataTable data={years} columns={Columns} pagination className="nk-tb-list"/>
                </PreviewCard>
                <Add user={user}/>
                <Edit user={user}/>
            </Content>
        </>
    )
}
export default Year;