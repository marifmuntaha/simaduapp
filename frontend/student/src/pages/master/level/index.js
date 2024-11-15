import React, {useEffect, useState} from "react";
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
    ReactDataTable,
    toastError, toastSuccess
} from "../../../components";
import {Button, ButtonGroup, Spinner} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {addLevel, destroyLevel, getLevels, resetLevel, setLevel} from "../../../redux/master/level/actions";
import Add from "./Add";
import Edit from "./Edit";
import {getLadders} from "../../../redux/master/ladder/actions";

const Level = () => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state.level)
    const {loading, levels, error, success, loadData} = selector;
    const [sm, updateSm] = useState(false);
    const Columns = [
        {
            name: "Jenjang",
            selector: (row) => row.ladder && row.ladder.alias,
            sortable: false,
            hide: "sm",
        },
        {
            name: "Nama",
            selector: (row) => row.name,
            sortable: false,
        },
        {
            name: "Alias",
            selector: (row) => row.alias,
            sortable: false,
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
                            dispatch(setLevel(row, true));
                        }}>
                        <Icon name="edit"/>
                    </Button>
                    <Button
                        color="outline-danger"
                        onClick={() => {
                            dispatch(destroyLevel(row.id));
                        }}
                        disabled={row.id === loading}>
                        {row.id === loading ? <Spinner size="sm" color="danger"/> : <Icon name="trash"/>}
                    </Button>
                </ButtonGroup>
            )
        },
    ];
    useEffect(() => {
        success && toastSuccess(success);
        error && toastError(error);
        (success || loadData) && dispatch(getLevels({with: 'ladder'})) && dispatch(getLadders({type: 'select'}));
        dispatch(resetLevel());
    }, [dispatch, success, error, loadData]);
    return (
        <>
            <Head title="Data Tingkat"/>
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
                            <BlockTitle tag="h4">Data Tingkat</BlockTitle>
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
                                            onClick={() => dispatch(addLevel(true))}
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
                    <ReactDataTable data={levels} columns={Columns} pagination className="nk-tb-list"/>
                </PreviewCard>
                <Add/>
                <Edit/>
            </Content>
        </>
    )
}
export default Level;