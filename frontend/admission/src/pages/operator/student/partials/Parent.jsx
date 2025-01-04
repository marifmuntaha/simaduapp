import React, {useEffect, useState} from "react";
import DatePicker from "react-datepicker";
import {Button, Col, PreviewCard, Row, RSelect, toastError, toastSuccess} from "../../../../components";
import {Form, Label, Spinner} from "reactstrap";
import {Controller, useForm} from "react-hook-form";
import {store as storeUser, destroy as destroyUser} from "../../../../utils/api/user";
import {store as storeParent, update as updateParent} from "../../../../utils/api/studentParent"
import {useInstitution} from "../../../../layout/provider/Institution";

const Parent = ({parent, studentID}) => {
    const institution = useInstitution();
    const storeSubmit = async () => {
        const userParentParam = {
            institution_id: institution.id,
            fullname: getValues('guard_name'),
            email: getValues('guard_email'),
            username: getValues('guard_nik'),
            password: getValues('guard_nik'),
            role: 9,
            phone: getValues('guard_phone'),
            image: ''
        }
        await storeUser(userParentParam).then(resp => {
            const user = resp.data.result;
            const parentParam = {
                user_id: user.id,
                student_id: studentID,
                number_kk: getValues('number_kk'),
                head_family: getValues('head_family'),
                father_status: getValues('father_status'),
                father_name: getValues('father_name'),
                father_nik: getValues('father_nik'),
                father_birthplace: getValues('father_birthplace'),
                father_birthdate: getValues('father_birthdate'),
                father_email: getValues('father_email'),
                father_phone: getValues('father_phone'),
                mother_status: getValues('mother_status'),
                mother_name: getValues('mother_name'),
                mother_nik: getValues('mother_nik'),
                mother_birthplace: getValues('mother_birthplace'),
                mother_birthdate: getValues('mother_birthdate'),
                mother_email: getValues('mother_email'),
                mother_phone: getValues('mother_phone'),
                guard_status: getValues('guard_status'),
                guard_name: getValues('guard_name'),
                guard_nik: getValues('guard_nik'),
                guard_birthplace: getValues('guard_birthplace'),
                guard_birthdate: getValues('guard_birthdate'),
                guard_email: getValues('guard_email'),
                guard_phone: getValues('guard_phone'),
            }
            storeParent(parentParam).then(resp => {
                toastSuccess(resp.data.message);
                setLoading(false);
            }).catch(err => {
                toastError(err);
                destroyUser(user.id);
                setLoading(false);
            })
        }).catch(err => {
            toastError(err);
            setLoading(false);
        });
    }
    const updateSubmit = async () => {
        const parentParam = {
            id: getValues('id'),
            number_kk: getValues('number_kk'),
            head_family: getValues('head_family'),
            father_status: getValues('father_status'),
            father_name: getValues('father_name'),
            father_nik: getValues('father_nik'),
            father_birthplace: getValues('father_birthplace'),
            father_birthdate: getValues('father_birthdate'),
            father_email: getValues('father_email'),
            father_phone: getValues('father_phone'),
            mother_status: getValues('mother_status'),
            mother_name: getValues('mother_name'),
            mother_nik: getValues('mother_nik'),
            mother_birthplace: getValues('mother_birthplace'),
            mother_birthdate: getValues('mother_birthdate'),
            mother_email: getValues('mother_email'),
            mother_phone: getValues('mother_phone'),
            guard_status: getValues('guard_status'),
            guard_name: getValues('guard_name'),
            guard_nik: getValues('guard_nik'),
            guard_birthplace: getValues('guard_birthplace'),
            guard_birthdate: getValues('guard_birthdate'),
            guard_email: getValues('guard_email'),
            guard_phone: getValues('guard_phone'),
        }
        updateParent(parentParam).then(resp => {
            toastSuccess(resp.data.message);
            setLoading(false);
        }).catch(err => {
            toastError(err);
            setLoading(false);
        })
    }
    const handleSubmitForm = async () => {
        setLoading(true);
        parent.id !== undefined ? await updateSubmit() : await storeSubmit();
    }
    const {control,formState: {errors}, register, handleSubmit, watch, setValue, getValues} = useForm();
    const [loading, setLoading] = useState();
    const [fatherStatus, setFatherStatus] = useState(true);
    const [motherStatus, setMotherStatus] = useState(true);
    const [guardStatus, setGuardStatus] = useState(0);
    const parentStatusOption = [
        {value: '1', label: 'Masih Hidup'},
        {value: '2', label: 'Meninggal'},
        {value: '3', label: 'Tidak Diketahui'},
    ];
    const guardStatusOption = [
        {value: '1', label: 'Sama dengan Ayah Kandung'},
        {value: '2', label: 'Sama dengan Ibu Kandung'},
        {value: '3', label: 'Lainnya'}
    ];
    useEffect(() => {
        parent && setValue('id', parent.id)
        parent && setValue('number_kk', parent.number_kk);
        parent && setValue('head_family', parent.head_family);
        parent && setValue('father_status', parent.father_status);
        parent && setValue('father_name', parent.father_name);
        parent && setValue('father_nik', parent.father_nik);
        parent && setValue('father_birthplace', parent.father_birthplace);
        parent && setValue('father_birthdate', parent.father_birthdate && new Date(parent.father_birthdate));
        parent && setValue('father_email', parent.father_email);
        parent && setValue('father_phone', parent.father_phone);
        parent && setValue('mother_status', parent.mother_status);
        parent && setValue('mother_name', parent.mother_name);
        parent && setValue('mother_nik', parent.mother_nik);
        parent && setValue('mother_birthplace', parent.mother_birthplace);
        parent && setValue('mother_birthdate', parent.mother_birthdate && new Date(parent.mother_birthdate));
        parent && setValue('mother_email', parent.mother_email);
        parent && setValue('mother_phone', parent.mother_phone);
        parent && setValue('guard_status', parent.guard_status);
        parent && setValue('guard_name', parent.guard_name);
        parent && setValue('guard_nik', parent.guard_nik);
        parent && setValue('guard_birthplace', parent.guard_birthplace);
        parent && setValue('guard_birthdate', parent.guard_birthdate && new Date(parent.guard_birthdate));
        parent && setValue('guard_email', parent.guard_email);
        parent && setValue('guard_phone', parent.guard_phone);
    }, [parent]);
    useEffect(() => {
        switch (guardStatus) {
            case '1' :
                setValue('guard_nik', getValues('father_nik'));
                setValue('guard_name', getValues('father_name'));
                setValue('guard_email', getValues('father_email'));
                setValue('guard_birthplace', getValues('father_birthplace'));
                setValue('guard_birthdate', getValues('father_birthdate'));
                setValue('guard_phone', getValues('father_phone'));
                break;
            case '2' :
                setValue('guard_nik', getValues('mother_nik'));
                setValue('guard_name', getValues('mother_name'));
                setValue('guard_email', getValues('mother_email'));
                setValue('guard_birthplace', getValues('mother_birthplace'));
                setValue('guard_birthdate', getValues('mother_birthdate'));
                setValue('guard_phone', getValues('mother_phone'));
                break;
            default :
                setValue('guard_nik', '');
                setValue('guard_name', '');
                setValue('guard_email', '');
                setValue('guard_birthplace', '');
                setValue('guard_birthdate', '');
                setValue('guard_phone', '');
        }
    }, [guardStatus]);
    useEffect(() => {
        const subscription = watch((value) => {
            value['father_status'] !== '1' ? setFatherStatus(false) : setFatherStatus(true);
            value['mother_status'] !== '1' ? setMotherStatus(false) : setMotherStatus(true);
            value['guard_status'] && setGuardStatus(value['guard_status']);
        })
        return () => subscription.unsubscribe()
    }, [watch]);

    return <>
        <PreviewCard>
            <Row className="gy-2">
                <Col className="col-md-8">
                    <Form className="is-alter" onSubmit={handleSubmit(handleSubmitForm)}>
                        <Row className="gy-2">
                            <Col className="col-md-6">
                                <div className="form-group">
                                    <Label htmlFor="number_kk" className="form-label">Nomor Kartu Keluarga</Label>
                                    <div className="form-control-wrap">
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="number_kk"
                                            placeholder="Ex. 1234512345123456"
                                            {...register('number_kk', {required: true})}
                                        />
                                        {errors['number_kk'] && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                    </div>
                                </div>
                            </Col>
                            <Col className="col-md-6">
                                <div className="form-group">
                                    <Label htmlFor="head_family" className="form-label">Nama Kepala Keluarga</Label>
                                    <div className="form-control-wrap">
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="head_family"
                                            placeholder="Ex. Ngadimin"
                                            {...register('head_family', {required: true})}
                                        />
                                        {errors['head_family'] && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                    </div>
                                </div>
                            </Col>
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
                                            {...register('mother_nik', {required: motherStatus})}
                                        />
                                        {errors['mother_nik'] && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                    </div>
                                </div>
                            </Col>
                            <Col className="col-md-3">
                                <div className="form-group">
                                    <Label htmlFor="father_birthplace" className="form-label">Tempat Lahir Ayah Kandung</Label>
                                    <div className="form-control-wrap">
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="father_birthplace"
                                            placeholder="Ex. JEPARA"
                                            disabled={!fatherStatus}
                                            {...register('father_birthplace', {required: fatherStatus})}
                                        />
                                        {errors['father_birthplace'] && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                    </div>
                                </div>
                            </Col>
                            <Col className="col-md-3">
                                <div className="form-group">
                                    <Label htmlFor="birthdate" className="form-label">Tanggal Lahir</Label>
                                    <div className="form-control-wrap">
                                        <input type="hidden" id="father_birthdate" className="form-control"/>
                                        <Controller
                                            control={control}
                                            name="father_birthdate"
                                            render={({field: {onChange, value, ref}}) => (
                                                <DatePicker
                                                    inputRef={ref}
                                                    selected={value}
                                                    className="form-control date-picker"
                                                    onChange={(val) => onChange(val)}
                                                    dateFormat="dd/MM/yyyy"
                                                />
                                            )}/>
                                        {errors.father_birthdate && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                    </div>
                                </div>
                            </Col>
                            <Col className="col-md-3">
                                <div className="form-group">
                                    <Label htmlFor="mother_birthplace" className="form-label">Tempat Lahir Ibu Kandung</Label>
                                    <div className="form-control-wrap">
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="mother_birthplace"
                                            placeholder="Ex. JEPARA"
                                            disabled={!motherStatus}
                                            {...register('mother_birthplace', {required: motherStatus})}
                                        />
                                        {errors['mother_birthplace'] && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                    </div>
                                </div>
                            </Col>
                            <Col className="col-md-3">
                                <div className="form-group">
                                    <Label htmlFor="birthdate" className="form-label">Tanggal Lahir</Label>
                                    <div className="form-control-wrap">
                                        <input type="hidden" id="mother_birthdate" className="form-control"/>
                                        <Controller
                                            control={control}
                                            name="mother_birthdate"
                                            render={({field: {onChange, value, ref}}) => (
                                                <DatePicker
                                                    inputRef={ref}
                                                    selected={value}
                                                    className="form-control date-picker"
                                                    onChange={(val) => onChange(val)}
                                                    dateFormat="dd/MM/yyyy"
                                                />
                                            )}/>
                                        {errors.mother_birthdate && <span className="invalid">Kolom tidak boleh kosong.</span>}
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
                            <Col className="col-md-6">
                                <div className="form-group">
                                    <Label htmlFor="father_phone" className="form-label">Nomor WA Ayah Kandung</Label>
                                    <div className="form-control-wrap">
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="father_phone"
                                            disabled={!fatherStatus}
                                            placeholder="Ex. namaayahkandung@gmail.com"
                                            {...register('father_phone', {required: fatherStatus})}
                                        />
                                        {errors['father_phone'] && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                    </div>
                                </div>
                            </Col>
                            <Col className="col-md-6">
                                <div className="form-group">
                                    <Label htmlFor="mother_phone" className="form-label">Nomor WA Ibu Kandung</Label>
                                    <div className="form-control-wrap">
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="mother_phone"
                                            disabled={!motherStatus}
                                            placeholder="Ex. namaayahkandung@gmail.com"
                                            {...register('mother_phone', {required: motherStatus})}
                                        />
                                        {errors['mother_phone'] && <span className="invalid">Kolom tidak boleh kosong.</span>}
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
                                    <Label htmlFor="guard_birthplace" className="form-label">Tempat Lahir Wali</Label>
                                    <div className="form-control-wrap">
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="guard_birthplace"
                                            placeholder="Ex. JEPARA"
                                            {...register('guard_birthplace', {required: true})}
                                        />
                                        {errors['guard_birthplace'] && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                    </div>
                                </div>
                            </Col>
                            <Col className="col-md-6">
                                <div className="form-group">
                                    <Label htmlFor="birthdate" className="form-label">Tanggal Lahir</Label>
                                    <div className="form-control-wrap">
                                        <input type="hidden" id="guard_birthdate" className="form-control"/>
                                        <Controller
                                            control={control}
                                            name="guard_birthdate"
                                            render={({field: {onChange, value, ref}}) => (
                                                <DatePicker
                                                    inputRef={ref}
                                                    selected={value}
                                                    className="form-control date-picker"
                                                    onChange={(val) => onChange(val)}
                                                    dateFormat="dd/MM/yyyy"
                                                />
                                            )}/>
                                        {errors.guard_birthdate && <span className="invalid">Kolom tidak boleh kosong.</span>}
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
                            <Col className="col-md-6">
                                <div className="form-group">
                                    <Label htmlFor="guard_email" className="form-label">Nomor WA Wali</Label>
                                    <div className="form-control-wrap">
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="guard_wa"
                                            placeholder="Ex. 6282229366506"
                                            {...register('guard_phone', {required: true})}
                                        />
                                        {errors.guard_wa && <span className="invalid">Kolom tidak boleh kosong.</span>}
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
    </>
}

export default Parent;