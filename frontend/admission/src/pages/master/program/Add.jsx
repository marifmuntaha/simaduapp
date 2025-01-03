import React, {useEffect, useState} from "react";
import {Button, Label, Modal, ModalBody, ModalHeader, Spinner} from "reactstrap";
import {Col, Row, RSelect, toastError, toastSuccess} from "../../../components";
import {Controller, useForm} from "react-hook-form";
import {useSetting} from "../../../layout/provider/Setting";
import {useInstitution} from "../../../layout/provider/Institution";
import {get as getPrograms} from "../../../utils/api/master/program";
import {store as storeProduct} from "../../../utils/api/master/product";

const Add = ({...props}) => {
    const setting = useSetting();
    const institution = useInstitution();
    const [loading, setLoading] = useState(false);
    const [optionProgram, setOptionProgram] = useState([]);
    const onSubmit = async () => {
        setLoading(true);
        const params = {
            institution_id: institution.id,
            year_id: setting.year_id,
            name: getValues('name'),
            alias: getValues('alias'),
            price: getValues('price'),
            gender: getValues('gender'),
            program: getValues('program'),
        }
        await storeProduct(params).then(resp => {
            toastSuccess(resp.data.message);
            setLoading(false);
            toggle();
            props.loadData(true);
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
        control} = useForm();

    const toggle = () => {
        reset();
        props.setModal('');
        props.setLoadData(true);
    }
    const optionGender = [
        {value: 'L', label: 'Laki-laki'},
        {value: 'P', label: 'Perempuan'},
    ]

    useEffect(() => {
        getPrograms({institution_id: institution.id, year_id: setting.year_id, type: 'select'}).then(resp => {
            setOptionProgram(resp.data.result);
        })
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
                                    <Label htmlFor="fullname" className="form-label">Nama Item</Label>
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
                                            placeholder="Ex. 160.000"
                                            {...register('price', {required: true})}
                                        />
                                        {errors.price && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                    </div>
                                </div>
                            </Col>
                            <Col className="col-md-12">
                                <div className="form-group">
                                    <Label htmlFor="gender" className="form-label">Jenis Kelamin</Label>
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
                                                    value={optionGender !== undefined && optionGender.find((c) => c.value === value)}
                                                    onChange={(val) => onChange(val.value)}
                                                    placeholder="Pilih Jenis Kelamin"
                                                />
                                            )}/>
                                        <input type="hidden" id="gender" className="form-control" />
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
                                                    options={optionProgram}
                                                    value={optionProgram !== undefined && optionProgram.find((c) => c.value === value)}
                                                    onChange={(val) => onChange(val.value)}
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
export default Add;