import React, {useEffect} from "react";
import {Button, Label, Modal, ModalBody, ModalHeader, Spinner} from "reactstrap";
import {Col, Row, toastSuccess} from "../../../components";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {addLadder, getLadders, resetLadder, storeLadder} from "../../../redux/master/ladder/actions";

const Add = () => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state.ladder);
    const {loading, modal, success} = selector
    const onSubmit = () => {
        dispatch(storeLadder({
            formData: getValues([
                'name',
                'alias',
                'description',
            ])
        }));
    }
    const {
        register,
        handleSubmit,
        formState: {errors},
        getValues,
        reset
    } = useForm();
    const toggle = () => {
        reset();
        dispatch(addLadder(false));
    }

    useEffect(() => {
        success &&
        dispatch(addLadder(false));
        reset();
    }, [success, reset, dispatch])

    return (
        <>
            <Modal isOpen={modal.add} toggle={toggle}>
                <ModalHeader>TAMBAH</ModalHeader>
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
                                            placeholder="Ex. Madrasah Aliyah"
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
                                            placeholder="Ex. MA"
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
                                            placeholder="Ex. Jenjang Madrasah Aliyah"
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