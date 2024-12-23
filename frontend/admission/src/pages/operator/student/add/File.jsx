import React, {useState} from "react";
import {Col, Icon, PreviewCard, ReactDataTable, Row, toastError, toastSuccess} from "../../../../components";
import {Badge, Button, ButtonGroup, Spinner} from "reactstrap";

const File = ({studentID}) => {
    const [loading, setLoading] = useState(false);
    const [files, setFiles] = useState([]);

    const Columns = [
        {
            name: "Nama",
            selector: (row) => row.name,
            sortable: false,
            hide: "sm",
        },
        {
            name: "Singkatan",
            selector: (row) => row.alias,
            sortable: false,
        },
        {
            name: "Status",
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
                    <ReactDataTable data={[]} columns={Columns} pagination className="nk-tb-list"/>
                </Col>
            </Row>
        </PreviewCard>
    )
}

export default File;