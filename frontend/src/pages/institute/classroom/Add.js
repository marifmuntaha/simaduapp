import React, {useEffect} from "react";
import {Button, Label, Modal, ModalBody, ModalHeader, Spinner} from "reactstrap";
import {Col, Row, RSelect} from "../../../components";
import {Controller, useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {getInstitutions} from "../../../redux/institution/actions";
import {getYears} from "../../../redux/master/year/actions";
import {addClassroom, resetClassroom, storeClassroom} from "../../../redux/institute/classroom/actions";
import {getLevels} from "../../../redux/master/level/actions";
import {getMajors} from "../../../redux/master/major/actions";

const Add = () => {
    const dispatch = useDispatch();
    const institutionSelector = useSelector((state) => state.institution);
    const {institutions} = institutionSelector;
    const yearSelector = useSelector((state) => state.year);
    const {years} = yearSelector;
    const levelSelector = useSelector((state) => state.level);
    const {levels} = levelSelector;
    const majorSelector = useSelector((state) => state.major);
    const {majors} = majorSelector
    const classroomSelector = useSelector((state) => state.classroom);
    const {loading, modal} = classroomSelector;
    const onSubmit = () => {
        dispatch(storeClassroom({
            formData: getValues([
                'institution',
                'year',
                'level',
                'major',
                'name',
                'fullname',
            ])
        }));
    }
    const {
        register,
        handleSubmit,
        formState: {errors},
        getValues,
        reset,
        control,
        watch
    } = useForm();
    const toggle = () => {
        reset();
        dispatch(addClassroom(false));
    }
    const institution = watch('institution');
    useEffect(() => {
        dispatch(getInstitutions({type: 'select'}));
        dispatch(getYears({type: 'select'}));
        dispatch(resetClassroom());
    }, [dispatch, getValues]);

    useEffect(() => {
        dispatch(getLevels({type: 'select', institution: institution}));
        dispatch(getMajors({type: 'select', institution: institution}));
    }, [institution, dispatch])

    return (
        <>
            <Modal isOpen={modal.add} toggle={toggle}>
                <ModalHeader>TAMBAH</ModalHeader>
                <ModalBody>
                    <form className="form-validate is-alter" onSubmit={handleSubmit(onSubmit)}>
                        <Row className="gy-2">
                            <Col className="col-md-6">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="institution">
                                        Lembaga
                                    </label>
                                    <div className="form-control-wrap">
                                        <Controller
                                            control={control}
                                            className="form-control"
                                            name="institution"
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
                                            name="year"
                                            rules={{required: true}}
                                            render={({field: {onChange, value, ref}}) => (
                                                <RSelect
                                                    inputRef={ref}
                                                    options={years}
                                                    value={years.find((c) => c.value === value)}
                                                    onChange={(val) => onChange(val.value)}
                                                    placeholder="Pilih Tahun Pelajaran"
                                                />
                                            )}/>
                                        {errors.year && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                    </div>
                                </div>
                            </Col>
                            <Col className="col-md-6">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="level">
                                        Tingkat
                                    </label>
                                    <div className="form-control-wrap">
                                        <Controller
                                            control={control}
                                            className="form-control"
                                            name="level"
                                            rules={{required: true}}
                                            render={({field: {onChange, value, ref}}) => (
                                                <RSelect
                                                    inputRef={ref}
                                                    options={levels}
                                                    value={levels.find((c) => c.value === value)}
                                                    onChange={(val) => onChange(val.value)}
                                                    placeholder="Pilih Tingkat"
                                                />
                                            )}/>
                                        {errors.level && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                    </div>
                                </div>
                            </Col>
                            <Col className="col-md-6">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="major">
                                        Jurusan
                                    </label>
                                    <div className="form-control-wrap">
                                        <Controller
                                            control={control}
                                            className="form-control"
                                            name="major"
                                            rules={{required: true}}
                                            render={({field: {onChange, value, ref}}) => (
                                                <RSelect
                                                    inputRef={ref}
                                                    options={majors}
                                                    value={majors.find((c) => c.value === value)}
                                                    onChange={(val) => onChange(val.value)}
                                                    placeholder="Pilih Jurusan"
                                                />
                                            )}/>
                                        {errors.major && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                    </div>
                                </div>
                            </Col>
                            <Col className="col-md-12">
                                <div className="form-group">
                                    <Label htmlFor="fullname" className="form-label">Nama</Label>
                                    <div className="form-control-wrap">
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="name"
                                            placeholder="Ex. 1"
                                            {...register('name', {required: true})}
                                        />
                                        {errors.name && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                    </div>
                                </div>
                            </Col>
                            <Col className="col-md-12">
                                <div className="form-group">
                                    <Label htmlFor="fullname" className="form-label">Alias</Label>
                                    <div className="form-control-wrap">

                                        <input
                                            className="form-control"
                                            type="text"
                                            id="fullname"
                                            placeholder="Ex. X IPA 1"
                                            {...register('fullname', {required: true})}
                                        />
                                        {errors.fullname && <span className="invalid">Kolom tidak boleh kosong.</span>}
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