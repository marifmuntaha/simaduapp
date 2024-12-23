import React, {useState} from "react";
import {Button, Label, Modal, ModalBody, ModalHeader, Spinner} from "reactstrap";
import {Col, Row, RSelect, toastError, toastSuccess} from "../../../components";
import {Controller, useForm} from "react-hook-form";
import {useSetting} from "../../../layout/provider/Setting";
import {useInstitution} from "../../../layout/provider/Institution";
import {store as storeProgram} from "../../../utils/api/master/program";

const Add = ({...props}) => {
    const setting = useSetting();
    const institution = useInstitution();
    const [loading, setLoading] = useState(false);
    const onSubmit = async () => {
        setLoading(true);
        const params = {
            institution_id: institution.id,
            year_id: setting.year_id,
            name: getValues('name'),
            alias: getValues('alias'),
            description: getValues('description'),
            boarding: getValues('boarding'),
        }
        await storeProgram(params).then(resp => {
            toastSuccess(resp.data.message);
            setLoading(false);
            toggle();
            props.loadData(true);
        }).catch(err => {
            toastError(err);
            setLoading(false);
        });
    }
    const {
        register,
        handleSubmit,
        formState: {errors},
        getValues,
        reset,
        control} = useForm();

    const toggle = () => {
        reset();
        props.setModal('');
        props.setLoadData(true);
    }
    const optionBoarding = [
        {value: 1, label: 'Boarding'},
        {value: 2, label: 'Opsional'},
    ]

    return (
        <>
            <Modal isOpen={props.modal === 'add'} toggle={toggle}>
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
                                            {...register('description', {required: true})}
                                        />
                                        {errors.description && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                    </div>
                                </div>
                            </Col>
                            <Col className="col-md-12">
                                <div className="form-group">
                                    <Label htmlFor="boarding" className="form-label">Boarding</Label>
                                    <div className="form-control-wrap">
                                        <Controller
                                            control={control}
                                            className="form-control"
                                            name="boarding"
                                            rules={{required: true}}
                                            render={({field: {onChange, value, ref}}) => (
                                                <RSelect
                                                    inputRef={ref}
                                                    options={optionBoarding}
                                                    value={optionBoarding !== undefined && optionBoarding.find((c) => c.value === value)}
                                                    onChange={(val) => onChange(val.value)}
                                                    placeholder="Pilih Boarding"
                                                />
                                            )}/>
                                        <input type="hidden" id="boarding" className="form-control" />
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
export default Add;