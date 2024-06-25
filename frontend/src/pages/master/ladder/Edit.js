import React, {useEffect} from "react";
import {Button, Label, Modal, ModalBody, ModalHeader, Spinner} from "reactstrap";
import {Col, Row} from "../../../components";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {addLadder, setLadder, updateLadder} from "../../../redux/master/ladder/actions";

const Edit = () => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state.ladder)
    const {loading, modal, ladder, success} = selector;
    const onSubmit = () => {
        dispatch(updateLadder({
            formData: getValues([
                'id',
                'name',
                'alias',
                'description',
            ])
        }))
    }
    const {
        register,
        handleSubmit,
        formState: {errors},
        setValue,
        getValues,
        reset
    } = useForm()
    const toggle = () => {
        dispatch(setLadder({}, false))
        reset()
    }
    useEffect(() => {
        ladder && Object.entries(ladder).map((ladder) => {
            return setValue(ladder[0], ladder[1])
        });
    }, [setValue, ladder])

    useEffect(() => {
        success &&
        dispatch(setLadder({}, false));
        reset();
    }, [success, reset, dispatch])
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
                                            placeholder="Ex. Arif Muntaha"
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
                                            placeholder="Ex. marifmuntaha"
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
                                            placeholder="Ex. marifmuntaha@gmail.com"
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