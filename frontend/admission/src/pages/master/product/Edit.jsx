import React, {useEffect, useState} from "react";
import {Button, Label, Modal, ModalBody, ModalHeader, Spinner} from "reactstrap";
import {Col, Row, RSelect, toastError, toastSuccess} from "../../../components";
import {Controller, useForm} from "react-hook-form";
import {update as updateProduct} from "../../../utils/api/master/product"

const Edit = ({...props}) => {
    const [loading, setLoading] = useState(false);
    const [optionPrograms, setOptionPrograms] = useState([]);
    const optionGender = [
        {value: 'L', label: "Laki-laki"},
        {value: 'P', label: "Perempuan"},
    ]
    const onSubmit = async () => {
        setLoading(true);
        const params = {
            id: getValues('id'),
            name: getValues('name'),
            alias: getValues('alias'),
            price: getValues('price'),
            gender: JSON.stringify(getValues('gender')),
            program: JSON.stringify(getValues('program')),
        }
        await updateProduct(params).then(resp => {
            toastSuccess(resp.data.message);
            setLoading(false);
            toggle();
            props.setLoadData(true);
        }).catch(err => {
            setLoading(false);
            toastError(err);
        });
    }
    const {
        register,
        handleSubmit,
        formState: {errors},
        getValues,
        setValue,
        reset,
        control} = useForm();
    const toggle = () => {
        reset();
        props.setModal('');
    }

    useEffect(() => {
        const product = props.product;
        setValue('id', product ? product.id : null);
        setValue('name', product ? product.name : null);
        setValue('alias', product ? product.alias : null);
        setValue('price', product ? product.price : null);
        setValue('gender', product.gender !== undefined ? JSON.parse(product.gender) : []);
        setValue('program', product.program !== undefined ? JSON.parse(product.program) : []);
    }, [props.product, setValue]);

    useEffect(() => {
        setOptionPrograms(() => {
            return props.programs.map((program) => {
                return {value: program.id, label: program.name};
            });
        })
    }, [props.programs]);

    return (
        <>
            <Modal isOpen={props.modal === 'edit'} toggle={toggle}>
                <ModalHeader>UBAH</ModalHeader>
                <ModalBody>
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
                                            placeholder="Ex. Tahfidz"
                                            {...register('name', {required: true})}
                                        />
                                        {errors.name && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                    </div>
                                </div>
                            </Col>
                            <Col className="col-md-12">
                                <div className="form-group">
                                    <Label htmlFor="alias" className="form-label">Singkatan</Label>
                                    <div className="form-control-wrap">

                                        <input
                                            className="form-control"
                                            type="text"
                                            id="alias"
                                            placeholder="Ex. TFZ"
                                            {...register('alias', {required: true})}
                                        />
                                        {errors.alias && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                    </div>
                                </div>
                            </Col>
                            <Col className="col-md-12">
                                <div className="form-group">
                                    <Label htmlFor="price" className="form-label">Harga</Label>
                                    <div className="form-control-wrap">
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="price"
                                            placeholder="Ex. 450000"
                                            {...register('price', {required: false})}
                                        />
                                        {errors.price &&
                                            <span className="invalid">Kolom tidak boleh kosong.</span>}
                                    </div>
                                </div>
                            </Col>
                            <Col className="col-md-12">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="gender">Jenis Kelamin</label>
                                    <div className="form-control-wrap">
                                        <Controller
                                            control={control}
                                            className="form-control"
                                            name="gender"
                                            rules={{required: true}}
                                            render={({field: {onChange, value, ref}}) => (
                                                <RSelect
                                                    isMulti
                                                    inputRef={ref}
                                                    options={optionGender}
                                                    value={value && value.map((item) => {
                                                        return optionGender.find((c) => c.value === item);
                                                    })}
                                                    onChange={(val) => {
                                                        const values = val.map((item) => {
                                                            return item.value
                                                        })
                                                        onChange(values);
                                                    }}
                                                    placeholder="Pilih Jenis Kelamin"
                                                />
                                            )}/>
                                        {errors.gender && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                    </div>
                                </div>
                            </Col>
                            <Col className="col-md-12">
                                <div className="form-group">
                                    <Label htmlFor="program" className="form-label">Program</Label>
                                    <div className="form-control-wrap">
                                        <Controller
                                            control={control}
                                            className="form-control"
                                            name="program"
                                            rules={{required: true}}
                                            render={({field: {onChange, value, ref}}) => (
                                                <RSelect
                                                    isMulti
                                                    inputRef={ref}
                                                    options={optionPrograms}
                                                    value={value && value.map((item) => {
                                                        return optionPrograms.find((c) => c.value === item);
                                                    })}
                                                    onChange={(val) => {
                                                        const value = val.map((item) => {
                                                            return item.value
                                                        })
                                                        onChange(value);
                                                    }}
                                                    placeholder="Pilih Program"
                                                />
                                            )}/>
                                        <input type="hidden" id="program" className="form-control" />
                                        {errors.program && <span className="invalid">Kolom tidak boleh kosong.</span>}
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
export default Edit;