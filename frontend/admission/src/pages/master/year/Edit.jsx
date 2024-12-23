import React, {useEffect, useState} from "react";
import {Button, Label, Modal, ModalBody, ModalHeader, Spinner} from "reactstrap";
import {Col, Row, RSelect, toastError, toastSuccess} from "../../../components";
import {Controller, useForm} from "react-hook-form";
import {update as updateYear} from "../../../utils/api/master/year"

const Edit = ({...props}) => {
    const [loading, setLoading] = useState(false);
    const activeOption = [
        {value: '2', label: 'Tidak'},
        {value: '1', label: 'Aktif'}
    ]
    const onSubmit = async () => {
        setLoading(true);
        const params = {
            id: getValues('id'),
            institution_id: getValues('institution_id'),
            name: getValues('name'),
            description: getValues('description'),
            active: getValues('active'),
        }
        await updateYear(params).then(resp => {
            toastSuccess(resp.data.message);
            setLoading(false);
            props.setLoadData(true);
            toggle();
        }).then(error => {
            toastError(error);
            setLoading(false);
        })
    }
    const {
        register, handleSubmit, formState: {errors}, setValue, getValues, reset, control
    } = useForm()
    const toggle = () => {
        reset();
        props.setYear([]);
        props.setModal('');
    }
    useEffect(() => {
        const year = props.year;
        year && Object.entries(year).map((year) => {
            return setValue(year[0], year[1])
        });
    }, [setValue, props.year]);

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
                                    <Label htmlFor="description" className="form-label">Diskripsi</Label>
                                    <div className="form-control-wrap">

                                        <input
                                            className="form-control"
                                            type="text"
                                            id="description"
                                            {...register('description', {required: false})}
                                        />
                                        {errors.description &&
                                            <span className="invalid">Kolom tidak boleh kosong.</span>}
                                    </div>
                                </div>
                            </Col>
                            <Col className="col-md-12">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="user">
                                        Status
                                    </label>
                                    <div className="form-control-wrap">
                                        <Controller
                                            control={control}
                                            className="form-control"
                                            name="active"
                                            rules={{required: true}}
                                            render={({field: {onChange, value, ref}}) => (
                                                <RSelect
                                                    inputRef={ref}
                                                    options={activeOption}
                                                    value={activeOption.find((c) => c.value === value)}
                                                    onChange={(val) => onChange(val.value)}
                                                    placeholder="Pilih Status"
                                                />
                                            )}/>
                                        {errors.active && <span className="invalid">Kolom tidak boleh kosong.</span>}
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