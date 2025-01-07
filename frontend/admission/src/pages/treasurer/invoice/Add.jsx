import React, {useEffect, useState} from "react";
import {Button, Label, Modal, ModalBody, ModalHeader, Spinner} from "reactstrap";
import {Col, Row, RSelect, toastError, toastSuccess} from "../../../components";
import {Controller, useForm} from "react-hook-form";
import {store as storeProgram} from "../../../utils/api/master/program";
import {get as getProducts} from "../../../utils/api/master/product";

const Add = ({...props}) => {
    const [loading, setLoading] = useState(false);
    const [optionProducts, setOptionProducts] = useState([]);
    const onSubmit = async () => {
        setLoading(true);
        const params = {
            institution_id: props.institution.id,
            year_id: props.setting.year_id,
            name: getValues('name'),
            alias: getValues('alias'),
            description: getValues('description'),
            boarding: getValues('boarding'),
        }
        await storeProgram(params).then(resp => {
            toastSuccess(resp.data.message);
            setLoading(false);
            toggle();
            props.setLoadData(true);
        }).catch(err => {
            toastError(err);
            setLoading(false);
        });
    }
    const {
        register,
        handleSubmit,
        formState: {errors},
        getValues,
        reset,
        setValue,
        control} = useForm();
    const toggle = () => {
        reset();
        props.setModal('');

    }

    useEffect(() => {
        const invoice = props.invoice;
        if (invoice.student !== undefined) {
            setValue('id', invoice.id);
            setValue('name', invoice.student.name);
        }
        // eslint-disable-next-line
    }, [props.invoice]);
    useEffect(() => {
        props.institution !== undefined && props.yearSelected.id !== undefined && getProducts({institution_id: props.institution.id, year_id: props.yearSelected.id}).then(resp => {
            const products = resp.data.product;
            setOptionProducts(() => products && products.map((product) => {
                return {value: product.id, label: product.name};
            }));
        });
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <Modal isOpen={props.modal === 'add'} toggle={toggle}>
                <ModalHeader>TAMBAH</ModalHeader>
                <ModalBody>
                    <form className="form-validate is-alter" onSubmit={handleSubmit(onSubmit)}>
                        <Row className="gy-2">
                            <Col className="col-md-12">
                                <div className="form-group">
                                    <Label htmlFor="fullname" className="form-label">Nama Siswa</Label>
                                    <div className="form-control-wrap">
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="name"
                                            placeholder="Ex. Tahfidz"
                                            disabled
                                            {...register('name', {required: true})}
                                        />
                                        {errors.name && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                    </div>
                                </div>
                            </Col>
                            <Col className="col-md-12">
                                <div className="form-group">
                                    <Label htmlFor="boarding" className="form-label">Boarding</Label>
                                    <div className="form-control-wrap">
                                        <Controller
                                            control={control}
                                            className="form-control"
                                            name="boarding"
                                            rules={{required: true}}
                                            render={({field: {onChange, value, ref}}) => (
                                                <RSelect
                                                    inputRef={ref}
                                                    options={optionProducts}
                                                    value={optionProducts && optionProducts.find((c) => c.value === value)}
                                                    onChange={(val) => onChange(val.value)}
                                                    placeholder="Pilih Boarding"
                                                />
                                            )}/>
                                        <input type="hidden" id="boarding" className="form-control" />
                                        {errors.boarding && <span className="invalid">Kolom tidak boleh kosong.</span>}
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
                </ModalBody>
            </Modal>
        </>
    )
}
export default Add;