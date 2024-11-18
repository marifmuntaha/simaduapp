import React, {useEffect} from "react";
import {Button, Label, Modal, ModalBody, ModalHeader, Spinner} from "reactstrap";
import {Col, Row, RSelect} from "../../../components";
import {useDispatch, useSelector} from "react-redux";
import {Controller, useForm} from "react-hook-form";
import {setProgram, updateProgram} from "../../../redux/master/program/actions";
import {getInstitutions} from "../../../redux/institution/actions";
import {getYears} from "../../../redux/master/year/actions";
import {resetProgram} from "../../../redux/master/program/actions";

const Edit = ({user, years}) => {
    const dispatch = useDispatch();
    const {institutions} = useSelector((state) => state.institution);
    const {loading, modal, program} = useSelector((state) => state.program);
    const boardingOption = [
        {value: '1', label: "Boarding"},
        {value: '2', label: "Opsional"},
    ]
    const onSubmit = () => {
        dispatch(updateProgram({
            formData: getValues([
                'id',
                'institution_id',
                'year_id',
                'name',
                'alias',
                'description',
                'boarding'
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
        dispatch(setProgram({}, false));
    }
    const yearOption = years && years.map((year) => {
        return {value: year.id, label: year.name};
    })
    useEffect(() => {
        user.role === '1' && dispatch(getInstitutions({type: 'select'}));
        dispatch(getYears({type: 'select'}));
        dispatch(resetProgram());
    }, [dispatch]);
    useEffect(() => {
        program && Object.entries(program).map((program) => {
            return setValue(program[0], program[1])
        });
    }, [program, setValue]);

    return (
        <>
            <Modal isOpen={modal.edit} toggle={toggle}>
                <ModalHeader>UBAH</ModalHeader>
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
                                                            options={yearOption}
                                                            value={yearOption.find((c) => c.value === value)}
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
                            <Col className="col-md-12">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="boarding">
                                        Boarding
                                    </label>
                                    <div className="form-control-wrap">
                                        <Controller
                                            control={control}
                                            className="form-control"
                                            name="boarding"
                                            rules={{required: true}}
                                            render={({field: {onChange, value, ref}}) => (
                                                <RSelect
                                                    inputRef={ref}
                                                    options={boardingOption}
                                                    value={boardingOption.find((c) => c.value === value)}
                                                    onChange={(val) => onChange(val.value)}
                                                    placeholder="Pilih Boarding"
                                                />
                                            )}/>
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
export default Edit;