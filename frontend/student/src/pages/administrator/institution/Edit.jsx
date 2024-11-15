import React, {useEffect} from "react";
import {Button, Label, Modal, ModalBody, ModalHeader, Spinner} from "reactstrap";
import {Col, Row, RSelect} from "../../../components";
import {useDispatch, useSelector} from "react-redux";
import {Controller, useForm} from "react-hook-form";
import {setInstitution, updateInstitution} from "../../../redux/institution/actions";

const Edit = ({user}) => {
    const dispatch = useDispatch();
    const institutionSelector = useSelector((state) => state.institution);
    const { loading, modal, institution, success } = institutionSelector;
    const userSelector = useSelector((state) => state.user)
    const { users } = userSelector;
    const ladderSelector = useSelector((state) => state.ladder)
    const {ladders} = ladderSelector;
    const onSubmit = () => {
        dispatch(updateInstitution({
            formData: getValues([
                'id',
                'user',
                'ladder',
                'name',
                'alias',
                'nsm',
                'npsn',
                'headmaster',
                'logo',
            ])
        }));
    }
    const {
        register,
        handleSubmit,
        formState: { errors},
        getValues,
        setValue,
        control,
        reset
    } = useForm();
    const toggle = () => {
        reset();
        dispatch(setInstitution({}, false));
    }
    useEffect(() => {
        success &&
        dispatch(setInstitution({}, false));
        reset();
    }, [success, reset, dispatch])

    useEffect(() => {
        institution && Object.entries(institution).map((institution) => {
            return setValue(institution[0], institution[1])
        });
        institution && setValue('user', institution.user && institution.user.id);
        institution && setValue('ladder', institution.ladder && institution.ladder.id);
    }, [institution, setValue]);

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
                                            <label className="form-label" htmlFor="user">
                                                Operator
                                            </label>
                                            <div className="form-control-wrap">
                                                <input type="hidden" className="form-control"/>
                                                <Controller
                                                    control={control}
                                                    className="form-control"
                                                    name="user"
                                                    rules={{required: true}}
                                                    render={({field: {onChange, value, ref}}) => (
                                                        <RSelect
                                                            inputRef={ref}
                                                            options={users}
                                                            value={users.find((c) => c.value === value)}
                                                            onChange={(val) => onChange(val.value)}
                                                            placeholder="Pilih Pengguna"
                                                        />
                                                    )}/>
                                                {errors.user && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                            </div>
                                        </div>
                                    </Col>
                                    <Col className="col-md-6">
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="ladder">
                                                Jenjang
                                            </label>
                                            <div className="form-control-wrap">
                                                <input type="hidden" className="form-control"/>
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
                                </>
                            )}
                            <Col className="col-md-12">
                                <div className="form-group">
                                    <Label htmlFor="name" className="form-label">Nama Institusi</Label>
                                    <div className="form-control-wrap">
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="name"
                                            placeholder="Ex. Darul Hikmah"
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
                                            placeholder="Ex. MADH"
                                            {...register('alias', {required: true})}
                                        />
                                        {errors.alias && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                    </div>
                                </div>
                            </Col>
                            <Col className="col-md-6">
                                <div className="form-group">
                                    <Label htmlFor="nsm" className="form-label">NSM</Label>
                                    <div className="form-control-wrap">
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="nsm"
                                            placeholder="Ex. 1234567890"
                                            {...register('nsm', {required: true})}
                                        />
                                        {errors.nsm && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                    </div>
                                </div>
                            </Col>
                            <Col className="col-md-6">
                                <div className="form-group">
                                    <Label htmlFor="npsn" className="form-label">NPSN</Label>
                                    <div className="form-control-wrap">
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="npsn"
                                            placeholder="Ex. 1234567890"
                                            {...register('npsn', {required: true})}
                                        />
                                        {errors.npsn && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                    </div>
                                </div>
                            </Col>


                            <Col className="col-md-12">
                                <div className="form-group">
                                    <Label htmlFor="headmaster" className="form-label">Kepala Madrasah</Label>
                                    <div className="form-control-wrap">
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="headmaster"
                                            placeholder="Ex. Sholihin, S.Ag."
                                            {...register('headmaster', {required: true})}
                                        />
                                        {errors.headmaster &&
                                            <span className="invalid">Kolom tidak boleh kosong.</span>}
                                    </div>
                                </div>
                            </Col>
                            <Col className="col-md-12">
                                <div className="form-group">
                                    <div className="form-control-wrap">
                                        <Label htmlFor="image" className="form-label">
                                            Foto
                                        </Label>
                                        <input
                                            className="form-control"
                                            type="file"
                                            id="image"
                                        />
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