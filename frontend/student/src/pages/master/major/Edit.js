import React, {useEffect} from "react";
import {Button, Label, Modal, ModalBody, ModalHeader, Spinner} from "reactstrap";
import {Col, Row, RSelect} from "../../../components";
import {useDispatch, useSelector} from "react-redux";
import {Controller, useForm} from "react-hook-form";
import {setMajor, updateMajor} from "../../../redux/master/major/actions";

const Edit = () => {
    const dispatch = useDispatch();
    const majorSelector = useSelector((state) => state.major);
    const { loading, modal, major, success} = majorSelector
    const ladderSelector = useSelector((state) => state.ladder)
    const { ladders } = ladderSelector;
    const onSubmit = () => {
        dispatch(updateMajor({
            formData: getValues([
                'id',
                'ladder',
                'name',
                'alias',
                'description'
            ])
        }))
    }
    const {register, handleSubmit, formState: {errors}, setValue, getValues, reset, control} = useForm()
    const toggle = () => {
        dispatch(setMajor({}, false));
        reset();
    }
    useEffect(() => {
        major && Object.entries(major).map((major) => {
            return setValue(major[0], major[1])
        });
        major && setValue('ladder', major.ladder ? major.ladder.id : 0);
    }, [setValue, major]);
    useEffect(() => {
        success &&
        dispatch(setMajor({}, false));
        reset();
    }, [success, reset, dispatch]);
    return (
        <>
            <Modal isOpen={modal.edit} toggle={toggle}>
                <ModalHeader>UBAH</ModalHeader>
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
                                            placeholder="Ex. 11"
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
                                            placeholder="Ex. XI"
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
export default Edit;