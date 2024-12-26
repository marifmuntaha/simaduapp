import React, {useEffect, useState} from "react";
import {Col, Icon, PreviewCard, ReactDataTable, Row, toastError, toastSuccess} from "../../../../../components";
import {Badge, Button, ButtonGroup, Spinner} from "reactstrap";
import {get as getFiles} from "../../../../../utils/api/studentFile"
import Add from "./Add";

const Index = ({studentID}) => {
    const [loading, setLoading] = useState(false);
    const [files, setFiles] = useState([]);
    const [loadData, setLoadData] = useState(true);
    const [modal, setModal] = useState('');

    useEffect(() => {
        loadData && getFiles({student_id: studentID, with: 'file'}).then(resp => {
            setFiles(resp.data.result)
            setLoadData(false);
        }).catch(err => {
            toastError(err);
            setLoadData(false);
        })
    }, [loadData]);

    const Columns = [
        {
            name: "Nama Dokumen",
            selector: (row) => row.file.name,
            sortable: false,
            hide: "sm",
        },
        {
            name: "Nomor",
            selector: (row) => row.number,
            sortable: false,
        },
        {
            name: "Berkas",
            selector: (row) => row.status,
            sortable: false,
            cell: (row) => (
                row.status === '1' ? <Badge color="success">Wajib</Badge> : <Badge color="warning">Opsional</Badge>
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

                        }}>
                        <Icon name="edit"/>
                    </Button>
                    <Button
                        color="outline-danger"
                        onClick={() => {

                        }}
                        disabled={row.id === loading}>
                        {row.id === loading ? <Spinner size="sm" color="danger"/> : <Icon name="trash"/>}
                    </Button>
                </ButtonGroup>
            )
        },
    ];
    return (
        <PreviewCard>
            <Row className="gy-2">
                <Col className="col-md-8">
                    <ReactDataTable data={files} columns={Columns} pagination className="nk-tb-list"/>
                </Col>
                <Col className="col-md-8">
                    <Button color="secondary" onClick={() => setModal('add')}>
                        <Icon name="plus"/>
                        <span>Tambah</span>
                    </Button>
                </Col>
            </Row>
            <Add modal={modal} setModal={setModal} setLoadData={setLoadData} studentID={studentID}/>
        </PreviewCard>
    )
}

export default Index;