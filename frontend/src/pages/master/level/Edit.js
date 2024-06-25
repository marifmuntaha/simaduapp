import React, {useEffect} from "react";
import {Button, Label, Modal, ModalBody, ModalHeader, Spinner} from "reactstrap";
import {Col, Row, RSelect} from "../../../components";
import {useDispatch, useSelector} from "react-redux";
import {Controller, useForm} from "react-hook-form";
import {setLevel, updateLevel} from "../../../redux/master/level/actions";

const Edit = () => {
    const dispatch = useDispatch();
    const levelSelector = useSelector((state) => state.level);
    const { loading, modal, level, success} = levelSelector
    const ladderSelector = useSelector((state) => state.ladder)
    const { ladders } = ladderSelector;
    const onSubmit = () => {
        dispatch(updateLevel({
            formData: getValues([
                'id',
                'ladder',
                'name',
                'alias',
            ])
        }))
    }
    const {register, handleSubmit, formState: {errors}, setValue, getValues, reset, control
    } = useForm()
    const toggle = () => {
        dispatch(setLevel({}, false));
        reset();
    }
    useEffect(() => {
        level && Object.entries(level).map((level) => {
            return setValue(level[0], level[1])
        });
        level && setValue('ladder', level.ladder ? level.ladder.id : 0);
    }, [setValue, level]);

    useEffect(() => {
        success &&
        dispatch(setLevel({}, false));
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