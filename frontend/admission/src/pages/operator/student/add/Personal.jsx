import React, {useEffect} from "react";
import {Button, Col, PreviewCard, Row, RSelect} from "../../../../components";
import {Form, Label, Spinner} from "reactstrap";
import {Controller, useForm} from "react-hook-form";
import DatePicker from "react-datepicker";
import {useDispatch, useSelector} from "react-redux";
import {useInstitution} from "../../../../layout/provider/Institution";
import {useSetting} from "../../../../layout/provider/Setting";
import {destroyUser, resetUser, storeUser} from "../../../../redux/user/actions";
import {resetStudent, storeStudent} from "../../../../redux/student/actions";

const Personal = () => {
    const dispatch = useDispatch();
    const institution = useInstitution();
    const setting = useSetting();
    const {successUser, errorUser, user} = useSelector((state) => ({
            successUser: state.user.success,
            errorUser: state.user.error,
            user: state.user.user
        }
    ));
    const {loading, success, student} = useSelector((state) => state.student);
    const {register, formState: {errors}, control, handleSubmit, getValues, setValue} = useForm()
    const genderOption = [
        {value: 'L', label: 'Laki-laki'},
        {value: 'P', label: 'Perempuan'},
    ]
    const handleFormSubmit = () => {
        const userFormData = {formData: [getValues('name'), getValues('email'), getValues('nisn'), getValues('nisn'), 8 , getValues('phone'), '']}
        dispatch(storeUser(userFormData));
        if (successUser) {
            setValue('user_id', user.id);
            setValue('institution_id', institution.id);
            setValue('year_id', setting.year_id);
            dispatch(storeStudent({
                formData: getValues(['user_id', 'institution_id', 'year_id', 'nisn', 'nik', 'name', 'birthplace', 'birthdate', 'gender', 'orderborn', 'sibling', 'phone', 'email'])
            }));
            if (success){
                console.log(student)
            }
            else {
                dispatch(destroyUser(user.id))
            }
        }
        else {
            console.log(errorUser)
        }
    }
    useEffect(() => {
        dispatch(resetUser());
        dispatch(resetStudent());
    }, [dispatch]);
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
                                        {errors['nisn'] && <span className="invalid">Kolom tidak boleh kosong.</span>}
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
                                        {errors['nik'] && <span className="invalid">Kolom tidak boleh kosong.</span>}
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
                                        {errors['name'] && <span className="invalid">Kolom tidak boleh kosong.</span>}
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
                                        {errors['birthplace'] &&
                                            <span className="invalid">Kolom tidak boleh kosong.</span>}
                                    </div>
                                </div>
                            </Col>
                            <Col className="col-md-6">
                                <div className="form-group">
                                    <Label htmlFor="birthday" className="form-label">Tanggal Lahir</Label>
                                    <div className="form-control-wrap">
                                        <input type="hidden" id="birthday" className="form-control"/>
                                        <Controller
                                            control={control}
                                            name="birthday"
                                            render={({field: {onChange, value, ref}}) => (
                                                <DatePicker
                                                    inputRef={ref}
                                                    selected={new Date()}
                                                    className="form-control date-picker"
                                                    onChange={(val) => onChange(val)}
                                                />
                                            )}/>
                                        {errors.birthday && <span className="invalid">Kolom tidak boleh kosong.</span>}
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
                                        {errors['gender'] && <span className="invalid">Kolom tidak boleh kosong.</span>}
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
                                        />
                                        {errors['orderborn'] &&
                                            <span className="invalid">Kolom tidak boleh kosong.</span>}
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
                                        />
                                        {errors['sibling'] &&
                                            <span className="invalid">Kolom tidak boleh kosong.</span>}
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
                    Testing
                </Col>
            </Row>
        </PreviewCard>
    </>
}
export default Personal;