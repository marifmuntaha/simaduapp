import React, {useEffect, useState} from "react";
import {Col, PreviewCard, Row, RSelect} from "../../../components";
import {Label} from "reactstrap";
import {Controller} from "react-hook-form";

const Parent = ({control, errors, register, watch, setValue, getValues}) => {
    const [fatherStatus, setFatherStatus] = useState(true);
    const [motherStatus, setMotherStatus] = useState(true);
    const [guardStatus, setGuardStatus] = useState(0);
    const parentStatusOption = [
        {value: 1, label: 'Masih Hidup'},
        {value: 2, label: 'Meninggal'},
        {value: 3, label: 'Tidak Diketahui'},
    ];
    const guardStatusOption = [
        {value: 1, label: 'Sama dengan Ayah Kandung'},
        {value: 2, label: 'Sama dengan Ibu Kandung'},
        {value: 3, label: 'Lainnya'}
    ];

    useEffect(() => {
        switch (guardStatus) {
            case 1 :
                setValue('guard_nik', getValues('father_nik'));
                setValue('guard_name', getValues('father_name'));
                setValue('guard_email', getValues('father_email'));
                break;
            case 2 :
                setValue('guard_nik', getValues('mother_nik'));
                setValue('guard_name', getValues('mother_name'));
                setValue('guard_email', getValues('mother_email'));
                break;
            default :
                setValue('guard_nik', '');
                setValue('guard_name', '');
                setValue('guard_email', '');
        }
    }, [guardStatus]);

    useEffect(() => {
        const subscription = watch((value) => {
            value['father_status'] !== 1 ? setFatherStatus(false) : setFatherStatus(true);
            value['mother_status'] !== 1 ? setMotherStatus(false) : setMotherStatus(true);
            value['guard_status'] && setGuardStatus(value['guard_status']);
        })
        return () => subscription.unsubscribe()
    }, [watch]);

    return <>
        <PreviewCard>
            <Row className="gy-2">
                <Col className="col-md-8">
                    <Row className="gy-2">
                        <Col className="col-md-6">
                            <div className="form-group">
                                <Label htmlFor="father_status" className="form-label">Status Ayah Kandung</Label>
                                <div className="form-control-wrap">
                                    <input type="hidden" id="father_status" className="form-control" />
                                    <Controller
                                        control={control}
                                        className="form-control"
                                        name="father_status"
                                        rules={{required: true}}
                                        render={({field: {onChange, value, ref}}) => (
                                            <RSelect
                                                inputRef={ref}
                                                options={parentStatusOption}
                                                value={parentStatusOption.find((c) => c.value === value)}
                                                onChange={(val) => onChange(val.value)}
                                                placeholder="Pilih Status Ayah Kandung"
                                            />
                                        )}/>
                                    {errors['father_status'] && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                </div>
                            </div>
                        </Col>
                        <Col className="col-md-6">
                            <div className="form-group">
                                <Label htmlFor="mother_status" className="form-label">Status Ibu Kandung</Label>
                                <div className="form-control-wrap">
                                    <input type="hidden" id="mother_status" className="form-control"/>
                                    <Controller
                                        control={control}
                                        className="form-control"
                                        name="mother_status"
                                        rules={{required: true}}
                                        render={({field: {onChange, value, ref}}) => (
                                            <RSelect
                                                inputRef={ref}
                                                options={parentStatusOption}
                                                value={parentStatusOption.find((c) => c.value === value)}
                                                onChange={(val) => onChange(val.value)}
                                                placeholder="Pilih Status Ibu Kandung"
                                            />
                                        )}/>
                                    {errors['mother_status'] && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                </div>
                            </div>
                        </Col>
                        <Col className="col-md-6">
                            <div className="form-group">
                                <Label htmlFor="father_name" className="form-label">Nama Ayah Kandung</Label>
                                <div className="form-control-wrap">
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="father_name"
                                        placeholder="Ex. Ngadimin"
                                        {...register('father_name', {required: true})}
                                    />
                                    {errors['father_name'] && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                </div>
                            </div>
                        </Col>
                        <Col className="col-md-6">
                            <div className="form-group">
                                <Label htmlFor="mother_name" className="form-label">Nama Ibu Kandung</Label>
                                <div className="form-control-wrap">
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="mother_name"
                                        placeholder="Ex. Ngadijah"
                                        {...register('mother_name', {required: true})}
                                    />
                                    {errors['mother_name'] && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                </div>
                            </div>
                        </Col>
                        <Col className="col-md-6">
                            <div className="form-group">
                                <Label htmlFor="father_nik" className="form-label">NIK Ayah Kandung</Label>
                                <div className="form-control-wrap">
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="father_nik"
                                        placeholder="Ex. 1234512345123456"
                                        disabled={!fatherStatus}
                                        {...register('father_nik', {required: fatherStatus})}
                                    />
                                    {errors['father_nik'] && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                </div>
                            </div>
                        </Col>
                        <Col className="col-md-6">
                            <div className="form-group">
                                <Label htmlFor="mother_nik" className="form-label">NIK Ibu Kandung</Label>
                                <div className="form-control-wrap">
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="mother_nik"
                                        placeholder="Ex. 1234512345123456"
                                        disabled={!motherStatus}
                                        {...register('mother_nik', {required: fatherStatus})}
                                    />
                                    {errors['mother_nik'] && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                </div>
                            </div>
                        </Col>
                        <Col className="col-md-6">
                            <div className="form-group">
                                <Label htmlFor="father_email" className="form-label">Email Ayah Kandung</Label>
                                <div className="form-control-wrap">
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="father_email"
                                        placeholder="Ex. namaayahkandung@gmail.com"
                                        disabled={!fatherStatus}
                                        {...register('father_email', {required: fatherStatus})}
                                    />
                                    {errors['father_email'] && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                </div>
                            </div>
                        </Col>
                        <Col className="col-md-6">
                            <div className="form-group">
                                <Label htmlFor="mother_email" className="form-label">Email Ibu Kandung</Label>
                                <div className="form-control-wrap">
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="mother_email"
                                        disabled={!motherStatus}
                                        placeholder="Ex. namaayahkandung@gmail.com"
                                        {...register('mother_email', {required: motherStatus})}
                                    />
                                    {errors['mother_email'] && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                </div>
                            </div>
                        </Col>
                        <Col className="col-md-12">
                            <div className="form-group">
                                <Label htmlFor="guard_status" className="form-label">Wali Siswa</Label>
                                <div className="form-control-wrap">
                                    <input type="hidden" id="guard_status" className="form-control"/>
                                    <Controller
                                        control={control}
                                        className="form-control"
                                        name="guard_status"
                                        rules={{required: true}}
                                        render={({field: {onChange, value, ref}}) => (
                                            <RSelect
                                                inputRef={ref}
                                                options={guardStatusOption}
                                                value={guardStatusOption.find((c) => c.value === value)}
                                                onChange={(val) => onChange(val.value)}
                                                placeholder="Pilih Status Wali"
                                            />
                                        )}/>
                                    {errors['guard_status'] && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                </div>
                            </div>
                        </Col>
                        <Col className="col-md-6">
                            <div className="form-group">
                                <Label htmlFor="guard_nik" className="form-label">NIK Wali</Label>
                                <div className="form-control-wrap">
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="guard_nik"
                                        placeholder="Ex. Ngadijah"
                                        {...register('guard_nik', {required: true})}
                                    />
                                    {errors['guard_nik'] && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                </div>
                            </div>
                        </Col>
                        <Col className="col-md-6">
                            <div className="form-group">
                                <Label htmlFor="guard_name" className="form-label">Nama Wali</Label>
                                <div className="form-control-wrap">
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="guard_name"
                                        placeholder="Ex. Ngadijah"
                                        {...register('guard_name', {required: true})}
                                    />
                                    {errors['guard_name'] && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                </div>
                            </div>
                        </Col>
                        <Col className="col-md-6">
                            <div className="form-group">
                                <Label htmlFor="guard_email" className="form-label">Email Wali</Label>
                                <div className="form-control-wrap">
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="guard_email"
                                        placeholder="Ex. Ngadijah"
                                        {...register('guard_email', {required: true})}
                                    />
                                    {errors['guard_email'] && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </PreviewCard>
    </>
}

export default Parent;