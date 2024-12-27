import React, {useEffect, useState} from "react";
import Add from "./Add";
import {Col, Icon, PreviewCard, ReactDataTable, Row, toastError, toastSuccess, ImageContainer} from "../../../../../components";
import {Button, ButtonGroup, Spinner} from "reactstrap";
import {get as getFiles, destroy as destroyFile} from "../../../../../utils/api/studentFile"

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
            selector: (row) => row.value,
            sortable: false,
            cell: (row) => (
                <div className={{textAlign: "center"}}>
                    <ImageContainer img={row.value} icon="file-img" />
                </div>
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
                        color="outline-danger"
                        onClick={() => {
                            setLoading(row.id);
                            destroyFile(row.id).then(resp => {
                                toastSuccess(resp.data.message);
                                setLoading(false);
                                setLoadData(true);
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