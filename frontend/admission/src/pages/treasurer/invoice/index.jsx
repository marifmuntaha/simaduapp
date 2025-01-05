import React, {Suspense, useState} from "react";
import Head from "../../../layout/head";
import {BackTo, BlockBetween, BlockHead, BlockHeadContent, BlockTitle, Icon} from "../../../components";
import {Button} from "reactstrap";
import Content from "../../../layout/content";

const Invoice = () => {
    const [sm, updateSm] = useState(false);
    const [modal, setModal] = useState('initState');
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Head title="Data Tagihan"/>
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
                            <BlockTitle tag="h4">DATA TAGIHAN</BlockTitle>
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
                                            onClick={() => setModal('add')}
                                        >
                                            <Button color="danger">
                                                <Icon name="reload-alt"/>
                                                <span>Generate</span>
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

export default Invoice;