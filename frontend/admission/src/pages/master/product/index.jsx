import React, {useEffect, useState} from "react";
import Head from "../../../layout/head";
import {
    BackTo,
    BlockBetween,
    BlockHead,
    BlockHeadContent,
    BlockTitle,
    Icon,
    PreviewCard, ReactDataTable,
    toastError, toastSuccess
} from "../../../components";
import {Badge, Button, ButtonGroup, Spinner} from "reactstrap";
import YearDropdown from "../../../components/partials/YearDropdown";
import Content from "../../../layout/content";
import {useInstitution} from "../../../layout/provider/Institution";
import Add from "./Add";
import Edit from "./Edit";
import {get as getProducts, destroy as destroyProduct} from "../../../utils/api/master/product";
import {get as getPrograms} from "../../../utils/api/master/program";
import {Currency} from "../../../utils/Utils";


const Product = () => {
    const institution = useInstitution();
    const [sm, updateSm] = useState(false);
    const [yearSelected, setYearSelected] = useState([]);
    const [loadData, setLoadData] = useState(false);
    const [modal, setModal] = useState('');
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(false);
    const [programs, setPrograms] = useState([]);
    const Columns = [
        {
            name: "Nama Item",
            selector: (row) => row.name,
            sortable: false,
            width: '300px',
        },
        {
            name: "Singkatan",
            selector: (row) => row.alias,
            sortable: false,
            width: '150px',
        },
        {
            name: "Harga",
            selector: (row) => Currency(row.price),
            sortable: false,
            width: '150px',
        },
        {
            name: "Jenis Kelamin",
            selector: (row) => row.gender,
            sortable: false,
            width: '150px',
            cell: (row) => {
                const gender = JSON.parse(row.gender);
                return gender.map((item, idx) => (
                    <Badge pill color={item === "L" ? 'info' : 'warning'} size="sm" key={idx} className="m-sm-1">{item}</Badge>
                ))
            }
        },
        {
            name: "Program",
            selector: (row) => row.program,
            sortable: false,
            cell: (row) => {
                const program = JSON.parse(row.program);
                return program.map((item, idx) => {
                    let value = programs.filter((val) => {
                        return val.id === item;
                    })
                    return <Badge pill color={color(idx)} size="sm" key={idx} className="m-sm-1">{value[0].name}</Badge>
                })
            }
        },
        {
            name: "Boarding",
            selector: (row) => row.boarding,
            sortable: false,
            width: '150px',
            cell: (row) => {
                return row.boarding === '1'
                    ? <Icon name="check" className="text-success fw-bold" /> : <Icon name="cross" className="text-danger fw-bold"/>
            }
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
                            setProduct(row);
                            setModal('edit')
                        }}>
                        <Icon name="edit"/>
                    </Button>
                    <Button
                        color="outline-danger"
                        onClick={() => {
                            setLoading(row.id)
                            destroyProduct(row.id).then(resp => {
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
    ]
    const color = (id) => {
        switch (id) {
            case 0:
                return "danger"
            case 1:
                return "info"
            case 2:
                return "warning"
            case 3:
                return "danger"
            default:
                return "primary"

        }
    }
    useEffect(() => {
        loadData && yearSelected && yearSelected.id !== undefined &&
        getPrograms({ institution_id: institution.id, year_id: yearSelected.id}).then(resp => {
            setPrograms(resp.data.result);
        }).then(() => {
            getProducts({
                institution_id: institution.id,
                year_id: yearSelected.id
            }).then(resp => {
                setLoadData(false);
                setProducts(resp.data.result);
            }).catch(err => {
                toastError(err);
                setLoadData(false);
            });
        });
    }, [loadData]);

    return (
        <>
            <Head title="Item Pembayaran"/>
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
                            <BlockTitle tag="h4">Data Item</BlockTitle>
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
                                            <YearDropdown yearSelected={yearSelected} setYearSelected={setYearSelected} setLoadData={setLoadData}/>
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
                    <ReactDataTable data={products} columns={Columns} pagination className="nk-tb-list"/>
                </PreviewCard>
                <Add modal={modal} setModal={setModal} setLoadData={setLoadData} programs={programs}/>
                <Edit modal={modal} setModal={setModal} setLoadData={setLoadData} product={product} programs={programs}/>
            </Content>
        </>
    )
}

export default Product;