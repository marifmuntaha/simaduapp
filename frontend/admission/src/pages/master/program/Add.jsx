import React, {useEffect} from "react";
import {Button, Label, Modal, ModalBody, ModalHeader, Spinner} from "reactstrap";
import {Col, Row, RSelect} from "../../../components";
import {Controller, useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {addProgram, resetProgram, storeProgram} from "../../../redux/master/program/actions";
import {getInstitutions} from "../../../redux/institution/actions";
import {useSetting} from "../../../layout/provider/Setting";
import {useInstitution} from "../../../layout/provider/Institution";

const Add = ({user, years}) => {
    const setting = useSetting();
    const institution = useInstitution();
    const {institutions} = useSelector((state) => state.institution);
    const {loading, modal, success} = useSelector((state) => state.program);
    const dispatch = useDispatch();
    const onSubmit = () => {
        setValue('institution_id', institution.id);
        setValue('year_id', setting.year_id);
        dispatch(storeProgram({
            formData: getValues([
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
        dispatch(addProgram(false));
    }
    const optionYear = years && years.map((year) => {
        return {value: year.id, label: year.name};
    })
    const optionBoarding = [
        {value: 1, label: 'Boarding'},
        {value: 2, label: 'Opsional'},
    ]

    useEffect(() => {
        parseInt(user.role) === 1 && institution && dispatch(getInstitutions({id: institution.id, type: 'select'}));
    }, [dispatch, user]);

    useEffect(() => {
        success && dispatch(addProgram(false)) && dispatch(resetProgram());
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
                                                {errors.institution && <span className="invalid">Kolom tidak boleh kosong.</span>}
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
                                            {...register('description', {required: true})}
                                        />
                                        {errors.description && <span className="invalid">Kolom tidak boleh kosong.</span>}
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
                                                    value={optionBoarding !== undefined && optionBoarding.find((c) => c.value === value)}
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