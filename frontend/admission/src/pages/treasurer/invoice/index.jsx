import React, {Suspense, useEffect, useState} from "react";
import Head from "../../../layout/head";
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
import Content from "../../../layout/content";
import moment from "moment/moment";
import YearDropdown from "../../../components/partials/YearDropdown";
import {Button} from "reactstrap";
import {get as getStudents} from '../../../utils/api/student';
import {get as getInvoices, store as storeInvoice} from '../../../utils/api/invoice';
import {get as getProducts} from '../../../utils/api/master/product';
import {useInstitution} from "../../../layout/provider/Institution";
import {Currency} from "../../../utils/Utils";

const Invoice = () => {
    const institution = useInstitution();
    const [sm, updateSm] = useState(false);
    const [modal, setModal] = useState('initState');
    const [yearSelected, setYearSelected] = useState({});
    const [loadData, setLoadData] = useState(true);
    const [products, setProducts] = useState([]);
    const [students, setStudents] = useState([]);
    const [invoices, setInvoices] = useState([]);
    const [invoice, setInvoice] = useState([]);
    const Columns = [
        {
            name: "Nomor",
            selector: (row) => row.number,
            sortable: false,
            width: '200px',
        },
        {
            name: "Nama Lengkap",
            selector: (row) => row.student.name,
            sortable: false,
        },
        {
            name: "Tanggal",
            selector: (row) => moment(new Date(row.created_at)).format('DD-MM-YYYY hh:mm'),
            sortable: false,
        },
        {
            name: "Jumlah",
            selector: (row) => Currency(row.amount),
            sortable: false,
            width: '180px',
        },
        {
            name: "Status",
            selector: (row) => row.status,
            sortable: false,
            width: '90px',
            cell: row => (
                row.status && row.status === "1"
                    ? <span className="text-success"><Icon name="check-thick"/></span>
                    : <span className="text-danger"><Icon name="cross"/></span>
            )
        }
    ];
    const generateInvoice = async () => {
        await getStudents({institution_id: institution.id, year_id: yearSelected.id, with: 'program'}).then(resp => {
            const students = resp.data.result;
            students.map((student, idx) => {
                const data = products.map((value) => {
                    let product;
                    const gender = JSON.parse(value.gender);
                    const program = JSON.parse(value.program);
                    if (student.program.boarding === '2' && value.boarding === "2") {
                        if (gender.includes(student.gender) && program.includes(student.program.program.id)) {
                            product =  {id: value.id, name: value.name, price: parseInt(value.price)}
                        }
                    }
                    if (student.program.boarding === '1') {
                        if (gender.includes(student.gender) && program.includes(student.program.program.id)) {
                            product =  {id: value.id, name: value.name, price: parseInt(value.price)}
                        }
                    }
                    return product;
                })
                const item = data.filter((element) => {
                    return element !== undefined
                });
                const amount = item.reduce((n, {price}) => n + price, 0);
                const param = {
                    institution_id: institution.id,
                    year_id: yearSelected.id,
                    student_id: student.id,
                    number: 'INV-' + student.nisn,
                    amount: amount,
                    discount: '0',
                    discount_description: '',
                    total: amount,
                    item: JSON.stringify(item),
                    status: '2',
                }
                storeInvoice(param).then(resp => {
                    toastSuccess(resp.data.result)
                }).catch(err => {
                    toastError(err)
                })
            })
        }).catch(err => {
            toastError(err);
        });
    }
    useEffect(() => {
        if (loadData && institution !== undefined && yearSelected.id !== undefined) {
            getInvoices({institution_id: institution.id, year_id: yearSelected.id, with: 'student'}).then(resp => {
                setInvoices(resp.data.result)
            }).catch(error => {
                toastError(error);
            });
            getProducts({institution_id: institution.id, year_id: yearSelected.id}).then(resp => {
                setProducts(resp.data.result);
            }).catch(error => {
                toastError(error);
            })
        }
        setLoadData(false);
    }, [loadData]);
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Head title="Data Tagihan"/>
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
                                        <li>
                                            <YearDropdown yearSelected={yearSelected} setYearSelected={setYearSelected} setLoadData={setLoadData}/>
                                        </li>
                                        <li
                                            className="nk-block-tools-opt"
                                            onClick={() => {
                                                generateInvoice().then(() => {
                                                    setLoadData(true);
                                                })
                                            }}
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
                <PreviewCard>
                    <ReactDataTable data={invoices} columns={Columns} pagination className="nk-tb-list"/>
                </PreviewCard>
            </Content>
        </Suspense>
    )
}

export default Invoice;