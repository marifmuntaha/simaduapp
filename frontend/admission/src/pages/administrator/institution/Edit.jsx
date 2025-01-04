import React, {useEffect, useState} from "react";
import {Button, Label, Modal, ModalBody, ModalHeader, Spinner} from "reactstrap";
import {Col, Row, RSelect, toastError, toastSuccess} from "../../../components";
import {Controller, useForm} from "react-hook-form";
import {update as updateInstitution} from "../../../utils/api/institution";

const Edit = ({...props}) => {
    const [loading, setLoading] = useState(false);
    const onSubmit = async () => {
        setLoading(true);
        const params = {
            id: getValues('id'),
            user: getValues('user'),
            ladder: getValues('ladder'),
            name: getValues('name'),
            alias: getValues('alias'),
            nsm: getValues('nsm'),
            npsn: getValues('npsn'),
            headmaster: getValues('headmaster'),
            logo: getValues('logo'),
        }
        updateInstitution(params).then(resp => {
            setLoading(false);
            toastSuccess(resp.data.message);
            props.setLoadData(true);
        }).catch(err => {
            toastError(err)
            setLoading(false);
        });
    }
    const {
        register,
        handleSubmit,
        formState: { errors},
        getValues,
        setValue,
        control,
        reset
    } = useForm();
    const toggle = () => {
        reset();
        props.setModal(false);
    }

    useEffect(() => {
        props.institution && Object.entries(props.institution).map((institution) => {
            return setValue(institution[0], institution[1])
        });
        props.institution && setValue('user', props.institution.user && props.institution.user.id);
        props.institution && setValue('ladder', props.institution.ladder && props.institution.ladder.id);
    }, [props.institution, setValue]);

    return (
        <>
            <Modal isOpen={props.modal === 'edit'} toggle={toggle}>
                <ModalHeader>UBAH</ModalHeader>
                <ModalBody>
                    <form className="form-validate is-alter" onSubmit={handleSubmit(onSubmit)}>
                        <Row className="gy-2">
                            <Col className="col-md-6">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="user">
                                        Operator
                                    </label>
                                    <div className="form-control-wrap">
                                        <input type="hidden" className="form-control"/>
                                        <Controller
                                            control={control}
                                            className="form-control"
                                            name="user"
                                            rules={{required: true}}
                                            render={({field: {onChange, value, ref}}) => (
                                                <RSelect
                                                    inputRef={ref}
                                                    options={props.users}
                                                    value={props.users.find((c) => c.value === value)}
                                                    onChange={(val) => onChange(val.value)}
                                                    placeholder="Pilih Pengguna"
                                                />
                                            )}/>
                                        {errors.user && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                    </div>
                                </div>
                            </Col>
                            <Col className="col-md-6">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="ladder">
                                        Jenjang
                                    </label>
                                    <div className="form-control-wrap">
                                        <input type="hidden" className="form-control"/>
                                        <Controller
                                            control={control}
                                            className="form-control"
                                            name="ladder"
                                            rules={{required: true}}
                                            render={({field: {onChange, value, ref}}) => (
                                                <RSelect
                                                    inputRef={ref}
                                                    options={props.ladders}
                                                    value={props.ladders.find((c) => c.value === value)}
                                                    onChange={(val) => onChange(val.value)}
                                                    placeholder="Pilih Jenjang"
                                                />
                                            )}/>
                                        {errors.ladder && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                    </div>
                                </div>
                            </Col>
                            <Col className="col-md-12">
                                <div className="form-group">
                                    <Label htmlFor="name" className="form-label">Nama Institusi</Label>
                                    <div className="form-control-wrap">
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="name"
                                            placeholder="Ex. Darul Hikmah"
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
                                            placeholder="Ex. MADH"
                                            {...register('alias', {required: true})}
                                        />
                                        {errors.alias && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                    </div>
                                </div>
                            </Col>
                            <Col className="col-md-6">
                                <div className="form-group">
                                    <Label htmlFor="nsm" className="form-label">NSM</Label>
                                    <div className="form-control-wrap">
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="nsm"
                                            placeholder="Ex. 1234567890"
                                            {...register('nsm', {required: true})}
                                        />
                                        {errors.nsm && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                    </div>
                                </div>
                            </Col>
                            <Col className="col-md-6">
                                <div className="form-group">
                                    <Label htmlFor="npsn" className="form-label">NPSN</Label>
                                    <div className="form-control-wrap">
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="npsn"
                                            placeholder="Ex. 1234567890"
                                            {...register('npsn', {required: true})}
                                        />
                                        {errors.npsn && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                    </div>
                                </div>
                            </Col>


                            <Col className="col-md-12">
                                <div className="form-group">
                                    <Label htmlFor="headmaster" className="form-label">Kepala Madrasah</Label>
                                    <div className="form-control-wrap">
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="headmaster"
                                            placeholder="Ex. Sholihin, S.Ag."
                                            {...register('headmaster', {required: true})}
                                        />
                                        {errors.headmaster &&
                                            <span className="invalid">Kolom tidak boleh kosong.</span>}
                                    </div>
                                </div>
                            </Col>
                            <Col className="col-md-12">
                                <div className="form-group">
                                    <div className="form-control-wrap">
                                        <Label htmlFor="image" className="form-label">
                                            Foto
                                        </Label>
                                        <input
                                            className="form-control"
                                            type="file"
                                            id="image"
                                        />
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