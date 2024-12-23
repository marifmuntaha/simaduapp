import React, {useEffect, useState} from "react";
import {Button, Label, Modal, ModalBody, ModalHeader, Spinner} from "reactstrap";
import {Col, Row, RSelect, toastError, toastSuccess} from "../../../components";
import {Controller, useForm} from "react-hook-form";
import {update as updateFile} from "../../../utils/api/master/file"

const Edit = ({...props}) => {
    const [loading, setLoading] = useState(false);
    const statusOption = [
        {value: '1', label: 'Wajib'},
        {value: '2', label: 'Optional'},
    ];
    const onSubmit = async () => {
        setLoading(true);
        const params = {
            id: getValues('id'),
            institution_id: getValues('institution_id'),
            year_id: getValues('year_id'),
            name: getValues('name'),
            alias: getValues('alias'),
            status: getValues('status'),
        }
        await updateFile(params).then(resp => {
            toastSuccess(resp.data.message);
            setLoading(false);
            toggle();
            props.setLoadData(true);
        }).catch(err => {
            toastError(err);
            setLoading(false)
        });
    }
    const {
        register, control, handleSubmit, formState: {errors}, setValue, getValues, reset} = useForm()
    const toggle = () => {
        reset();
        props.setModal('')
    }
    useEffect(() => {
        Object.entries(props.file).map((file) => {
            return setValue(file[0], file[1])
        });
    }, [setValue, props.file]);

    return (
        <>
            <Modal isOpen={props.modal === 'edit'} toggle={toggle}>
                <ModalHeader>UBAH</ModalHeader>
                <ModalBody>
                    <form className="form-validate is-alter" onSubmit={handleSubmit(onSubmit)}>
                        <Row className="gy-2">
                            <Col className="col-md-12">
                                <div className="form-group">
                                    <Label htmlFor="name" className="form-label">Nama</Label>
                                    <div className="form-control-wrap">
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="name"
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
                                            {...register('alias', {required: false})}
                                        />
                                        {errors.alias &&
                                            <span className="invalid">Kolom tidak boleh kosong.</span>}
                                    </div>
                                </div>
                            </Col>
                            <Col className="col-md-12">
                                <div className="form-group">
                                    <Label htmlFor="status" className="form-label">Status</Label>
                                    <div className="form-control-wrap">
                                        <Controller
                                            control={control}
                                            className="form-control"
                                            name="status"
                                            rules={{required: true}}
                                            render={({field: {onChange, value, ref}}) => (
                                                <RSelect
                                                    inputRef={ref}
                                                    options={statusOption}
                                                    value={statusOption !== undefined && statusOption.find((c) => c.value === value)}
                                                    onChange={(val) => onChange(val.value)}
                                                    placeholder="Pilih Status"
                                                />
                                            )}/>
                                        <input type="hidden" id="boarding" className="form-control" />
                                        {errors.boarding && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                    </div>
                                </div>
                            </Col>
                            <div className="form-group">
                                <Button size="lg" className="btn-block" type="submit" color="primary"
                                        disabled={loading}>
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