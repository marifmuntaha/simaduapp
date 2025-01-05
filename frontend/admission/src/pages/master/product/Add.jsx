import React, {useEffect, useState} from "react";
import {Button, Label, Modal, ModalBody, ModalHeader, Spinner} from "reactstrap";
import {Col, Row, RSelect, toastError, toastSuccess} from "../../../components";
import {Controller, useForm} from "react-hook-form";
import {useSetting} from "../../../layout/provider/Setting";
import {useInstitution} from "../../../layout/provider/Institution";
import {store as storeProduct} from "../../../utils/api/master/product";

const Add = ({...props}) => {
    const setting = useSetting();
    const institution = useInstitution();
    const [loading, setLoading] = useState(false);
    const [optionPrograms, setOptionPrograms] = useState([]);
    const optionBoarding = [
        {value: '1', label: 'Boarding'},
        {value: '2', label: 'Non Boarding'},
    ]
    const onSubmit = async () => {
        setLoading(true);
        const params = {
            institution_id: institution.id,
            year_id: setting.year_id,
            name: getValues('name'),
            alias: getValues('alias'),
            price: getValues('price'),
            gender: JSON.stringify(getValues('gender')),
            program: JSON.stringify(getValues('program')),
            boarding: getValues('boarding')
        }
        await storeProduct(params).then(resp => {
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
        control} = useForm();

    const toggle = () => {
        reset();
        props.setModal('');
    }
    const optionGender = [
        {value: 'L', label: 'Laki-laki'},
        {value: 'P', label: 'Perempuan'},
    ]

    useEffect(() => {
        setOptionPrograms(() => {
            return props.programs.map((program) => {
                return {value: program.id, label: program.name};
            });
        })
    }, [props.programs]);

    return (
        <>
            <Modal isOpen={props.modal === 'add'} toggle={toggle}>
                <ModalHeader>TAMBAH</ModalHeader>
                <ModalBody>
                    <form className="form-validate is-alter" onSubmit={handleSubmit(onSubmit)}>
                        <Row className="gy-2">
                            <Col className="col-md-12">
                                <div className="form-group">
                                    <Label htmlFor="name" className="form-label">Nama</Label>
                                    <div className="form-control-wrap">
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="name"
                                            placeholder="Ex. Seragam Putra"
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
                                            placeholder="Ex. SRGP"
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
                                            placeholder="Ex. 4500000"
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
                                                    value={value && value.map((item) => {
                                                        return optionGender.find((c) => c.value === item);
                                                    })}
                                                    onChange={(val) => {
                                                        const value = val.map((item) => {
                                                            return item.value
                                                        })
                                                        onChange(value);
                                                    }}
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
                                                    options={optionBoarding}
                                                    value={optionBoarding.find((c) => c.value === value)}
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