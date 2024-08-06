import React, {useEffect} from "react";
import {Button, Label, Modal, ModalBody, ModalHeader, Spinner} from "reactstrap";
import {Col, Row, RSelect} from "../../../components";
import {Controller, useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {getInstitutions} from "../../../redux/institution/actions";
import {
    resetClassroom, setClassroom,
    updateClassroom
} from "../../../redux/institute/classroom/actions";

const Edit = ({user, years, levels, majors}) => {
    const dispatch = useDispatch();
    const {institutions} = useSelector((state) => state.institution);
    const {classroom, loading, modal, success} = useSelector((state) => state.classroom);
    const onSubmit = () => {
        dispatch(updateClassroom({
            formData: getValues([
                'id',
                'institution_id',
                'year_id',
                'level_id',
                'major_id',
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
        setValue,
        reset,
        control,
    } = useForm();
    const toggle = () => {
        reset();
        dispatch(setClassroom({}, false));
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
        classroom && Object.entries(classroom).map((classroom) => {
            return setValue(classroom[0], classroom[1])
        });

    }, [classroom, user, yearActive, setValue]);

    useEffect(() => {
        success && dispatch(setClassroom({}, false)) && dispatch(resetClassroom());
        reset();
    }, [success, reset, dispatch]);

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
                                            <label className="form-label" htmlFor="institution_id">
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
                                            <label className="form-label" htmlFor="year_id">
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
                            <Col className="col-md-6">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="level">
                                        Tingkat
                                    </label>
                                    <div className="form-control-wrap">
                                        <Controller
                                            control={control}
                                            className="form-control"
                                            name="level_id"
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
                                            name="major_id"
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
export default Edit;