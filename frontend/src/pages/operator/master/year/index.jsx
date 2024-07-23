import React, {useEffect, useState} from "react";
import Head from "../../../../layout/head";
import Content from "../../../../layout/content";
import {
    BackTo,
    BlockBetween,
    BlockHead,
    BlockHeadContent,
    BlockTitle, Col,
    Icon,
    PreviewCard,
    ReactDataTable, Row, RSelect,
    toastError, toastSuccess
} from "../../../../components";
import {Badge, Button, ButtonGroup, Label, Spinner} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {addYear, destroyYear, getYears, resetYear, setYear, storeYear} from "../../../../redux/master/year/actions";
import Add from "./Add";
import Edit from "./Edit";
import {APICore} from "../../../../utils/api/APICore";
import {Controller, useForm} from "react-hook-form";

const Year = () => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state.year)
    const {loading, years, error, success, loadData} = selector;
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
                row.active === 0 ? <Badge className="badge-dot" color="danger">Tidak</Badge> :
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
    // useEffect(() => {
    //     success && toastSuccess(success);
    //     error && toastError(error);
    //     (success || loadData) && dispatch(getYears({institution_id: user.institution.id}))
    //     dispatch(resetYear());
    // }, [dispatch, success, error, loadData, user]);
    const activeOption = [
        {value: 0, label: 'Tidak'},
        {value: 1, label: 'Aktif'}
    ]
    const onSubmit = () => {
        dispatch(storeYear({
            formData: getValues([
                'institution_id',
                'name',
                'description',
                'active'
            ])
        }));
    }
    const {register, handleSubmit, formState: {errors}, getValues, setValue, reset, control} = useForm();


    return (
        <>
            <Head title="Tahun Pelajaran"/>
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
                            <BlockTitle tag="h4">Tahun Pelajaran</BlockTitle>
                            <p>
                                Just import <code>ReactDataTable</code> from <code>components</code>, it is built in for
                                react dashlite.
                            </p>
                        </BlockHeadContent>
                    </BlockBetween>
                </BlockHead>
                <Row>
                    <Col lg="9" sm="12">
                        <PreviewCard>
                            <ReactDataTable data={years} columns={Columns} pagination className="nk-tb-list"/>
                        </PreviewCard>
                    </Col>
                    <Col lg="3" sm="12">
                        <PreviewCard >
                            <form className="form-validate is-alter" onSubmit={handleSubmit(onSubmit)}>
                                <Row className="gy-2">
                                    <Col className="col-md-12">
                                        <div className="form-group">
                                            <Label htmlFor="fullname" className="form-label">Nama</Label>
                                            <div className="form-control-wrap">
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    id="name"
                                                    placeholder="Ex. 2023/2024"
                                                    {...register('name', {required: true})}
                                                />
                                                {errors.name &&
                                                    <span className="invalid">Kolom tidak boleh kosong.</span>}
                                            </div>
                                        </div>
                                    </Col>
                                    <Col className="col-md-12">
                                        <div className="form-group">
                                            <Label htmlFor="description" className="form-label">Diskripsi</Label>
                                            <div className="form-control-wrap">
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    id="description"
                                                    placeholder="Ex. Tahun Pelajaran 2023/2024"
                                                    {...register('description', {required: false})}
                                                />
                                                {errors.description &&
                                                    <span className="invalid">Kolom tidak boleh kosong.</span>}
                                            </div>
                                        </div>
                                    </Col>
                                    <Col className="col-md-12">
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="user">
                                                Status
                                            </label>
                                            <div className="form-control-wrap">
                                                <input type="hidden" className="form-control"/>
                                                <Controller
                                                    control={control}
                                                    className="form-control"
                                                    name="active"
                                                    rules={{required: true}}
                                                    render={({field: {onChange, value, ref}}) => (
                                                        <RSelect
                                                            inputRef={ref}
                                                            options={activeOption}
                                                            value={activeOption.find((c) => c.value === value)}
                                                            onChange={(val) => onChange(val.value)}
                                                            placeholder="Pilih Status"
                                                        />
                                                    )}/>
                                                {errors.active &&
                                                    <span className="invalid">Kolom tidak boleh kosong.</span>}
                                            </div>
                                        </div>
                                    </Col>
                                    <div className="form-group">
                                        <Button size="lg" className="btn-block" type="submit" color="primary">
                                            {loading ? <Spinner size="sm" color="light"/> : "SIMPAN"}
                                        </Button>
                                    </div>
                                </Row>
                            </form>
                        </PreviewCard>
                    </Col>
                </Row>
            </Content>
        </>
    )
}
export default Year;