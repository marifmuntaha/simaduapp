import React from "react";
import {Col, PreviewCard, Row, RSelect} from "../../../components";
import {Label} from "reactstrap";
import {Controller} from "react-hook-form";
import DatePicker from "react-datepicker";

const Personal = ({register, errors, control}) => {
    const genderOption = [
        {value: 'L', label: 'Laki-laki'},
        {value: 'P', label: 'Perempuan'},
    ]
    return <>
        <PreviewCard>
            <Row className="gy-2">
                <Col className="col-md-8">
                    <Row className="gy-2">
                        <Col className="col-md-4">
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
                        <Col className="col-md-4">
                            <div className="form-group">
                                <Label htmlFor="nism" className="form-label">NISM</Label>
                                <div className="form-control-wrap">
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="nism"
                                        placeholder="Ex. 110339"
                                        {...register('nism', {required: true})}
                                    />
                                    {errors['nism'] && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                </div>
                            </div>
                        </Col>
                        <Col className="col-md-4">
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
                                    {errors['birthplace'] && <span className="invalid">Kolom tidak boleh kosong.</span>}
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
                                    {errors['birthday'] && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                </div>
                            </div>
                        </Col>
                        <Col className="col-md-4">
                            <div className="form-group">
                                <Label htmlFor="gender" className="form-label">Jenis Kelamin</Label>
                                <div className="form-control-wrap">
                                    <input type="hidden" id="gender" className="form-control" />
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
                                    {errors['orderborn'] && <span className="invalid">Kolom tidak boleh kosong.</span>}
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
                                    {errors['sibling'] && <span className="invalid">Kolom tidak boleh kosong.</span>}
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
                    </Row>
                </Col>
                <Col className="col-md-4">
                    Testing
                </Col>
            </Row>
        </PreviewCard>
    </>
}
export default Personal;