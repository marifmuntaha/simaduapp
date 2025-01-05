import React, {useEffect, useState} from "react";
import {Button, Label, Modal, ModalBody, ModalHeader, Spinner} from "reactstrap";
import {Col, Row, RSelect, toastSuccess} from "../../../components";
import {Controller, useForm} from "react-hook-form";
import {update as updateProgram} from "../../../utils/api/master/program"

const Edit = ({...props}) => {
    const [loading, setLoading] = useState(false);
    const boardingOption = [
        {value: '1', label: "Boarding"},
        {value: '2', label: "Opsional"},
    ]
    const onSubmit = async () => {
        setLoading(true);
        const params = {
            id: getValues('id'),
            institution_id: getValues('institution_id'),
            year_id: getValues('year_id'),
            name: getValues('name'),
            alias: getValues('alias'),
            description: getValues('description'),
            boarding: getValues('boarding'),
        }
        await updateProgram(params).then(resp => {
            toastSuccess(resp.data.message);
            setLoading(false);
            toggle();
            props.setLoadData(true);
        });
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
        props.setModal('');
    }

    useEffect(() => {
        Object.entries(props.program).map((program) => {
            return setValue(program[0], program[1])
        });
    }, [props.program, setValue]);

    return (
        <>
            <Modal isOpen={props.modal === 'edit'} toggle={toggle}>
                <ModalHeader>UBAH</ModalHeader>
                <ModalBody>
                    <form className="form-validate is-alter" onSubmit={handleSubmit(onSubmit)}>
                        <Row className="gy-2">
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