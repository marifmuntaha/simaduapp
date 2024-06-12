import React, {useEffect, useState} from "react";
import Content from "../../layout/content";
import Head from "../../layout/head";
import {
    Block,
    BlockBetween,
    BlockHead,
    BlockHeadContent,
    BlockTitle,
    Col,
    Icon,
    Row
} from "../../components";
import {Card} from "reactstrap";
import {actionType, Dispatch} from "../../reducer";

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [teachers, setTeachers] = useState({});
    const [supervisi, setSupervisi] = useState({});
    return (
        <>
            <Head title="Dashboard"/>
            <Content>
                <BlockHead size="sm">
                    <BlockBetween>
                        <BlockHeadContent>
                            <BlockTitle page tag="h3">
                                Dashboard
                            </BlockTitle>
                        </BlockHeadContent>
                    </BlockBetween>
                </BlockHead>
                <Block>
                    <Row className="g-gs">
                        <Col xxl="4" sm="6">
                            <Card>
                                <div className="nk-ecwg nk-ecwg6">
                                    <div className="card-inner">
                                        <div className="card-title-group">
                                            <div className="card-title">
                                                <h6 className="title">Data Pengguna</h6>
                                            </div>
                                        </div>
                                        <div className="data">
                                            <div className="data-group">
                                                <div className="amount">{users.length} Pengguna</div>
                                            </div>
                                            <div className="info">
                                                <span className="change up text-success">
                                                    <Icon name="arrow-long-up"/>
                                                </span>
                                                <span> vs. last week</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                        <Col xxl="4" sm="6">
                            <Card>
                                <div className="nk-ecwg nk-ecwg6">
                                    <div className="card-inner">
                                        <div className="card-title-group">
                                            <div className="card-title">
                                                <h6 className="title">Data Guru</h6>
                                            </div>
                                        </div>
                                        <div className="data">
                                            <div className="data-group">
                                                <div className="amount">{teachers.length} Guru</div>
                                            </div>
                                            <div className="info">
                                                <span className="change up text-success">
                                                    <Icon name="arrow-long-up"/>
                                                </span>
                                                <span> vs. last week</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                        <Col xxl="4" sm="6">
                            <Card>
                                <div className="nk-ecwg nk-ecwg6">
                                    <div className="card-inner">
                                        <div className="card-title-group">
                                            <div className="card-title">
                                                <h6 className="title">Data Supervisi</h6>
                                            </div>
                                        </div>
                                        <div className="data">
                                            <div className="data-group">
                                                <div className="amount">{supervisi.length} Supervisi</div>
                                            </div>
                                            <div className="info">
                                                <span className="change up text-success">
                                                    <Icon name="arrow-long-up"/>
                                                </span>
                                                <span> vs. last week</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </Block>
            </Content>
        </>
    );
};

export default Dashboard;
