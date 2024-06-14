import React, {useEffect} from "react";
import {Button, Label, Modal, ModalBody, ModalHeader, Spinner} from "reactstrap";
import {Col, Row, RSelect} from "../../../components";
import {useDispatch, useSelector} from "react-redux";
import {Controller, useForm} from "react-hook-form";
import {setYear, updateYear} from "../../../redux/year/actions";

const Edit = () => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state.year)
    const {loading, modal, year} = selector;
    const activeOption = [
        {value: 0, label: 'Tidak'},
        {value: 1, label: 'Aktif'}
    ]
    const onSubmit = () => {
        dispatch(updateYear({
            formData: getValues([
                'id',
                'name',
                'description',
                'active'
            ])
        }))
    }
    const {
        register,
        handleSubmit,
        formState: {errors},
        setValue,
        getValues,
        reset,
        control
    } = useForm()
    const toggle = () => {
        dispatch(setYear({}, false))
        reset()
    }
    useEffect(() => {
        year && Object.entries(year).map((year) => {
            return setValue(year[0], year[1])
        });
    }, [setValue, year]);
    return (
        <>
            <Modal isOpen={modal.edit} toggle={toggle}>
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
                                    <Label htmlFor="description" className="form-label">Singkatan</Label>
                                    <div className="form-control-wrap">

                                        <input
                                            className="form-control"
                                            type="text"
                                            id="description"
                                            {...register('description', {required: false})}
                                        />
                                        {errors.description && <span className="invalid">Kolom tidak boleh kosong.</span>}
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