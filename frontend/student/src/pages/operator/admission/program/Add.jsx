import React, {useEffect} from "react";
import {Button, Label, Modal, ModalBody, ModalHeader, Spinner} from "reactstrap";
import {Col, Row, RSelect} from "../../../../components";
import {Controller, useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {addAdmissionProgram, resetAdmissionProgram, storeAdmissionProgram} from "../../../../redux/admission/program/actions";
import {getInstitutions} from "../../../../redux/institution/actions";

const Add = ({user, years}) => {
    const {institutions} = useSelector((state) => state.institution);
    const {loading, modal, success} = useSelector((state) => state.admissionProgram);
    const dispatch = useDispatch();
    const onSubmit = () => {
        dispatch(storeAdmissionProgram({
            formData: getValues([
                'institution_id',
                'year_id',
                'name',
                'alias',
                'description',
            ])
        }));
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
        dispatch(addAdmissionProgram(false));
    }
    const optionYear = years && years.map((year) => {
        return {value: year.id, label: year.name};
    })
    const yearActive = years && years.filter((year) => {
        return year.active === '1'
    });

    useEffect(() => {
        dispatch(getInstitutions({type: 'select'}));
    }, [dispatch]);

    useEffect(() => {
        user.role !== '1' && setValue('institution_id', user.institution.id);
        user.role !== '1' && setValue('year_id', yearActive && yearActive[0].id)
    }, [user, yearActive, setValue]);

    useEffect(() => {
        success && dispatch(addAdmissionProgram(false)) && dispatch(resetAdmissionProgram());
        reset();
    }, [success, dispatch, reset]);

    return (
        <>
            <Modal isOpen={modal.add} toggle={toggle}>
                <ModalHeader>TAMBAH</ModalHeader>
                <ModalBody>
                    <form className="form-validate is-alter" onSubmit={handleSubmit(onSubmit)}>
                        <Row className="gy-2">
                            {user.role === '1' && (
                                <>
                                    <Col className="col-md-6">
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="institution">
                                                Lembaga
                                            </label>
                                            <div className="form-control-wrap">
                                                <Controller
                                                    control={control}
                                                    className="form-control"
                                                    name="institution_id"
                                                    rules={{required: true}}
                                                    render={({field: {onChange, value, ref}}) => (
                                                        <RSelect
                                                            inputRef={ref}
                                                            options={institutions}
                                                            value={institutions.find((c) => c.value === value)}
                                                            onChange={(val) => onChange(val.value)}
                                                            placeholder="Pilih Lembaga"
                                                        />
                                                    )}/>
                                                {errors.institution &&
                                                    <span className="invalid">Kolom tidak boleh kosong.</span>}
                                            </div>
                                        </div>
                                    </Col>
                                    <Col className="col-md-6">
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="year">
                                                Tahun Pelajaran
                                            </label>
                                            <div className="form-control-wrap">
                                                <Controller
                                                    control={control}
                                                    className="form-control"
                                                    name="year_id"
                                                    rules={{required: true}}
                                                    render={({field: {onChange, value, ref}}) => (
                                                        <RSelect
                                                            inputRef={ref}
                                                            options={optionYear}
                                                            value={optionYear.find((c) => c.value === value)}
                                                            onChange={(val) => onChange(val.value)}
                                                            placeholder="Pilih Tahun Pelajaran"
                                                        />
                                                    )}/>
                                                {errors.year && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                            </div>
                                        </div>
                                    </Col>
                                </>
                            )}
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
                                    <Label htmlFor="description" className="form-label">Diskripsi</Label>
                                    <div className="form-control-wrap">
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="description"
                                            placeholder="Ex. Program Tahfidz"
                                            {...register('description', {required: false})}
                                        />
                                        {errors.description &&
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
                </ModalBody>
            </Modal>
        </>
    )
}
export default Add;