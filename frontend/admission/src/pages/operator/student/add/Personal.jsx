import React, {useState} from "react";
import {Button, Col, PreviewCard, Row, RSelect, toastError, toastSuccess} from "../../../../components";
import {Form, Label, Spinner} from "reactstrap";
import {Controller, useForm} from "react-hook-form";
import DatePicker from "react-datepicker";
import {useInstitution} from "../../../../layout/provider/Institution";
import {useSetting} from "../../../../layout/provider/Setting";
import {store as storeUser, destroy as destroyUser} from "../../../../utils/api/user";
import {store as storeStudent} from "../../../../utils/api/student";

const Personal = ({setStudentID}) => {
    const institution = useInstitution();
    const setting = useSetting();
    const [loading, setLoading] = useState(false);
    const {register, formState: {errors}, control, handleSubmit, getValues} = useForm()
    const genderOption = [
        {value: 'L', label: 'Laki-laki'},
        {value: 'P', label: 'Perempuan'},
    ]
    const handleFormSubmit = async () => {
        setLoading(true);
        const userStudentParam = {
            fullname: getValues('name'),
            email: getValues('email'),
            username: getValues('nisn'),
            password: getValues('nisn'),
            role: 8,
            phone: getValues('phone'),
            image: ''
        }
        await storeUser(userStudentParam).then(resp => {
            const user = resp.data.result;
            const studentParam = {
                user_id: user.id,
                institution_id: institution.id,
                year_id: setting.year_id,
                nisn: getValues('nisn'),
                nik: getValues('nik'),
                name: getValues('name'),
                birthplace: getValues('birthplace'),
                birthdate: getValues('birthdate'),
                gender: getValues('gender'),
                orderborn: getValues('orderborn'),
                sibling: getValues('sibling'),
                phone: getValues('phone'),
                email: getValues('email'),
            }
            storeStudent(studentParam).then(resp => {
                const student = resp.data.result;
                setStudentID(student.id);
                toastSuccess(resp.data.message);
                setLoading(false);
            }).catch(err => {
                destroyUser(user.id);
                toastError(err);
                setLoading(false);
            });
        }).catch(err => {
            toastError(err);
            setLoading(false);
        });
    }
    return <>
        <PreviewCard>
            <Row className="gy-2">
                <Col className="col-md-8">
                    <Form className="is-alter" onSubmit={handleSubmit(handleFormSubmit)}>
                        <Row className="gy-2">
                            <Col className="col-md-6">
                                <div className="form-group">
                                    <Label htmlFor="nisn" className="form-label">NISN</Label>
                                    <div className="form-control-wrap">
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="nisn"
                                            placeholder="Ex. 1234567890"
                                            {...register('nisn', {required: true})}
                                        />
                                        {errors.nisn && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                    </div>
                                </div>
                            </Col>
                            <Col className="col-md-6">
                                <div className="form-group">
                                    <Label htmlFor="nik" className="form-label">NIK</Label>
                                    <div className="form-control-wrap">
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="nik"
                                            placeholder="Ex. 1234512345123456"
                                            {...register('nik', {required: true})}
                                        />
                                        {errors.nik && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                    </div>
                                </div>
                            </Col>
                            <Col className="col-md-12">
                                <div className="form-group">
                                    <Label htmlFor="name" className="form-label">Nama Lengkap</Label>
                                    <div className="form-control-wrap">
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="name"
                                            placeholder="Ex. ACHMAD WIKRAMAWARDHANA"
                                            {...register('name', {required: true})}
                                        />
                                        {errors.name && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                    </div>
                                </div>
                            </Col>
                            <Col className="col-md-6">
                                <div className="form-group">
                                    <Label htmlFor="birthplace" className="form-label">Tempat Lahir</Label>
                                    <div className="form-control-wrap">
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="birthplace"
                                            placeholder="Ex. KEBUMEN"
                                            {...register('birthplace', {required: true})}
                                        />
                                        {errors.birthplace && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                    </div>
                                </div>
                            </Col>
                            <Col className="col-md-6">
                                <div className="form-group">
                                    <Label htmlFor="birthdate" className="form-label">Tanggal Lahir</Label>
                                    <div className="form-control-wrap">
                                        <input type="hidden" id="birthdate" className="form-control"/>
                                        <Controller
                                            control={control}
                                            name="birthdate"
                                            render={({field: {onChange, value, ref}}) => (
                                                <DatePicker
                                                    inputRef={ref}
                                                    selected={value}
                                                    className="form-control date-picker"
                                                    onChange={(val) => onChange(val)}
                                                    dateFormat="dd/MM/yyyy"
                                                />
                                            )}/>
                                        {errors.birthdate && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                    </div>
                                </div>
                            </Col>
                            <Col className="col-md-4">
                                <div className="form-group">
                                    <Label htmlFor="gender" className="form-label">Jenis Kelamin</Label>
                                    <div className="form-control-wrap">
                                        <input type="hidden" id="gender" className="form-control"/>
                                        <Controller
                                            control={control}
                                            className="form-control"
                                            name="gender"
                                            rules={{required: true}}
                                            render={({field: {onChange, value, ref}}) => (
                                                <RSelect
                                                    inputRef={ref}
                                                    options={genderOption}
                                                    value={genderOption.find((c) => c.value === value)}
                                                    onChange={(val) => onChange(val.value)}
                                                    placeholder="Pilih Jenis Kelamin"
                                                />
                                            )}/>
                                        {errors.gender && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                    </div>
                                </div>
                            </Col>
                            <Col className="col-md-4">
                                <div className="form-group">
                                    <Label htmlFor="orderborn" className="form-label">Anak Ke</Label>
                                    <div className="form-control-wrap">
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="orderborn"
                                            placeholder="Ex. 1"
                                            {...register('orderborn', {required: true})}
                                        />
                                        {errors.orderborn && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                    </div>
                                </div>
                            </Col>
                            <Col className="col-md-4">
                                <div className="form-group">
                                    <Label htmlFor="sibling" className="form-label">Jumlah Saudara</Label>
                                    <div className="form-control-wrap">
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="sibling"
                                            placeholder="Ex. 3"
                                            {...register('sibling', {required: true})}
                                        />
                                        {errors.sibling && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                    </div>
                                </div>
                            </Col>
                            <Col className="col-md-6">
                                <div className="form-group">
                                    <Label htmlFor="phone" className="form-label">Nomor Whatsapp</Label>
                                    <div className="form-control-wrap">
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="phone"
                                            placeholder="Ex. 6282229366502"
                                            {...register('phone', {required: true})}
                                        />
                                        {errors.phone && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                    </div>
                                </div>
                            </Col>
                            <Col className="col-md-6">
                                <div className="form-group">
                                    <Label htmlFor="email" className="form-label">Alamat Email</Label>
                                    <div className="form-control-wrap">
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="email"
                                            placeholder="Ex. 3"
                                            {...register('email', {required: true})}
                                        />
                                        {errors.email && <span className="invalid">Kolom tidak boleh kosong.</span>}
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
                <Col className="col-md-4">

                </Col>
            </Row>
        </PreviewCard>
    </>
}
export default Personal;