import React, {useEffect, useState} from "react";
import {Button, Col, PreviewCard, Row, toastError, toastSuccess} from "../../../../components";
import {Form, Label, Spinner} from "reactstrap";
import {useForm} from "react-hook-form";
import {update as updateSchool} from "../../../../utils/api/studentSchool";

const School = ({school}) => {
    const {formState: {errors}, register, handleSubmit, setValue, getValues} = useForm();
    const [loading, setLoading] = useState(false);
    const handleSubmitForm = async () => {
        setLoading(true);
        const schoolParam = {
            id: school.id,
            npsn: getValues("npsn"),
            name: getValues("name"),
            address: getValues("address")
        }
        await updateSchool(schoolParam).then(resp => {
            toastSuccess(resp.data.message);
            setLoading(false);
        }).catch(error => {
            toastError(error);
            setLoading(false);
        });
    }
    useEffect(() => {
        setValue('id', school.id);
        setValue('npsn', school.npsn);
        setValue('name', school.name);
        setValue('address', school.address);
    })
    return (
        <PreviewCard>
            <Row className="gy-2">
                <Col className="col-md-8">
                    <Form className="is-alter" onSubmit={handleSubmit(handleSubmitForm)}>
                        <Row className="gy-2">
                            <Col className="col-md-6">
                                <div className="form-group">
                                    <Label htmlFor="npsn" className="form-label">NPSN Sekolah Asal</Label>
                                    <div className="form-control-wrap">
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="npsn"
                                            placeholder="Ex. 298763"
                                            {...register('npsn', {required: true})}
                                        />
                                        {errors.npsn && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                    </div>
                                </div>
                            </Col>
                            <Col className="col-md-6">
                                <div className="form-group">
                                    <Label htmlFor="name" className="form-label">Nama Sekolah Asal</Label>
                                    <div className="form-control-wrap">
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="name"
                                            placeholder="Ex. MI Mafatihul Huda Mlonggo"
                                            {...register('name', {required: true})}
                                        />
                                        {errors.name && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                    </div>
                                </div>
                            </Col>
                            <Col className="col-md-12">
                                <div className="form-group">
                                    <Label htmlFor="address" className="form-label">Alamat Sekolah</Label>
                                    <div className="form-control-wrap">
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="address"
                                            placeholder="Ex. Jl. Raya Jepara - Mlonggo"
                                            {...register('address', {required: true})}
                                        />
                                        {errors.address && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                    </div>
                                </div>
                            </Col>
                            <Col className="col-md-12 d-flex justify-content-end">
                                <Button className="col-3 text-center justify-content-center" type="submit" color="primary" size="md" disabled={loading}>
                                    {loading ? <Spinner size="sm" color="light"/> : <span>Simpan</span>}
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </PreviewCard>
    )
}

export default School;