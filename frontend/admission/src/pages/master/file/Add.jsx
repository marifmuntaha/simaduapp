import React, {useState} from "react";
import {Button, Label, Modal, ModalBody, ModalHeader, Spinner} from "reactstrap";
import {Col, Row, RSelect, toastError, toastSuccess} from "../../../components";
import {Controller, useForm} from "react-hook-form";
import {useInstitution} from "../../../layout/provider/Institution";
import {useSetting} from "../../../layout/provider/Setting";
import {store as storeFile} from "../../../utils/api/master/file";

const Add = ({...props}) => {
    const institution = useInstitution();
    const setting = useSetting();
    const [loading, setLoading] = useState(false);
    const statusOption = [
        {value: '1', label: 'Wajib'},
        {value: '2', label: 'Optional'},
    ];
    const {register, handleSubmit, formState: {errors}, getValues, reset, control} = useForm();
    const onSubmit = async () => {
        setLoading(true);
        const params = {
            institution_id: institution.id,
            year_id: setting.year_id,
            name: getValues('name'),
            alias: getValues('alias'),
            status: getValues('status'),
        }
        await storeFile(params).then(resp => {
            toastSuccess(resp.data.message);
            setLoading(false);
            toggle();
            props.setLoadData(true);
        }).catch(err => {
            toastError(err);
            setLoading(false);
        })
    }
    const toggle = () => {
        reset();
        props.setModal(false);
    }

    return (
        <>
            <Modal isOpen={props.modal === 'add'} toggle={toggle}>
                <ModalHeader>TAMBAH</ModalHeader>
                <ModalBody>
                    <form className="form-validate is-alter" onSubmit={handleSubmit(onSubmit)}>
                        <Row className="gy-2">
                            <Col className="col-md-12">
                                <div className="form-group">
                                    <Label htmlFor="name" className="form-label">Nama Berkas</Label>
                                    <div className="form-control-wrap">
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="name"
                                            placeholder="Ex. Kartu Indonesia Pintar"
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
                                            placeholder="Ex. KIP"
                                            {...register('alias', {required: false})}
                                        />
                                        {errors.alias && <span className="invalid">Kolom tidak boleh kosong.</span>}
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