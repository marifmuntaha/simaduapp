import React, {useEffect} from "react";
import {Button, Label, Modal, ModalBody, ModalHeader, Spinner} from "reactstrap";
import {Col, Row, RSelect} from "../../../components";
import {Controller, useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {addMajor, storeMajor} from "../../../redux/master/major/actions";

const Add = () => {
    const dispatch = useDispatch();
    const majorSelector = useSelector((state) => state.major);
    const { loading, modal, success } = majorSelector
    const ladderSelector = useSelector((state) => state.ladder);
    const { ladders } = ladderSelector
    const onSubmit = () => {
        dispatch(storeMajor({
            formData: getValues([
                'ladder',
                'name',
                'alias',
                'description'
            ])
        }));
    }
    const {
        register,
        handleSubmit,
        formState: {errors},
        getValues,
        reset,
        control
    } = useForm();
    const toggle = () => {
        reset();
        dispatch(addMajor(false));
    }
    useEffect(() => {
        success &&
        dispatch(addMajor(false));
        reset();
    }, [success, reset, dispatch]);
    return (
        <>
            <Modal isOpen={modal.add} toggle={toggle}>
                <ModalHeader>TAMBAH</ModalHeader>
                <ModalBody>
                    <form className="form-validate is-alter" onSubmit={handleSubmit(onSubmit)}>
                        <Row className="gy-2">
                            <Col className="col-md-12">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="ladder">
                                        Jenjang
                                    </label>
                                    <div className="form-control-wrap">
                                        <Controller
                                            control={control}
                                            className="form-control"
                                            name="ladder"
                                            rules={{required: true}}
                                            render={({field: {onChange, value, ref}}) => (
                                                <RSelect
                                                    inputRef={ref}
                                                    options={ladders}
                                                    value={ladders.find((c) => c.value === value)}
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
                                    <Label htmlFor="fullname" className="form-label">Nama</Label>
                                    <div className="form-control-wrap">
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="name"
                                            placeholder="Ex. Ilmu Pengetahuan Alam"
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
                                            placeholder="Ex. IPA"
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
                                            placeholder="Ex. Jurusan IPA"
                                            {...register('description', {required: false})}
                                        />
                                        {errors.description && <span className="invalid">Kolom tidak boleh kosong.</span>}
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