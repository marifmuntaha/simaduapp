import Head from "../../../../layout/head";
import {
    BackTo,
    BlockBetween,
    BlockHead,
    BlockHeadContent,
    BlockTitle,
    Icon, PreviewCard,
    ReactDataTable
} from "../../../../components";
import React, {useEffect, useState} from "react";
import Content from "../../../../layout/content";
import {Button, ButtonGroup, Spinner} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {destroyLadder, getLadders, setLadder} from "../../../../redux/master/ladder/actions";


const Ladder = () => {
    const dispatch = useDispatch();
    const {ladders, loading, success, error} = useSelector((state) => state.ladder)
    const [sm, updateSm] = useState(false);
    const Columns = [
        {
            name: "Nama",
            selector: (row) => row.name,
            sortable: false,
            hide: "sm",
        },
        {
            name: "Alias",
            selector: (row) => row.alias,
            sortable: false,
        },
        {
            name: "Diskripsi",
            selector: (row) => row.description,
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
                            dispatch(setLadder(row, true));
                        }}>
                        <Icon name="edit"/>
                    </Button>
                    <Button
                        color="outline-danger"
                        onClick={() => {
                            dispatch(destroyLadder(row.id));
                        }}
                        disabled={row.id === loading}>
                        {row.id === loading ? <Spinner size="sm" color="danger"/> : <Icon name="trash"/>}
                    </Button>
                </ButtonGroup>
            )
        },
    ];
    useEffect(() => {
        dispatch(getLadders());
    }, []);
    return (
        <>
            <Head title="Data Jenjang"/>
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
                            <BlockTitle tag="h4">Data Jenjang</BlockTitle>
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
                                        <li className="nk-block-tools-opt" onClick={() => alert('testing')}>
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
                    <ReactDataTable data={ladders} columns={Columns} pagination className="nk-tb-list"/>
                </PreviewCard>
            </Content>
        </>
    )
}
export default Ladder