import React, {useState} from "react";
import {Col, PreviewCard, Row, RSelect} from "../../../components";
import {Label} from "reactstrap";
import {Controller} from "react-hook-form";

const Address = ({register, control, errors, getValues}) => {
    const [provinceOptions, setProvinceOptions] = useState([]);
    const [districtOptions, setDistrictOptions] = useState([]);
    const [subDistrictOptions, setSubDistrictOptions] = useState([]);
    const [villageOptions, setVillageOptions] = useState([]);
    return <>
        <PreviewCard>
            <Row className="gy-2">
                <Col className="col-md-8">
                    <Row className="gy-2">
                        <Col className="col-md-6">
                            <div className="form-group">
                                <Label htmlFor="province_id" className="form-label">Provinsi</Label>
                                <div className="form-control-wrap">
                                    <input type="hidden" className="form-control" id="province_id"/>
                                    <Controller
                                        control={control}
                                        className="form-control"
                                        name="province_id"
                                        rules={{required: true}}
                                        render={({field: {onChange, value, ref}}) => (
                                            <RSelect
                                                inputRef={ref}
                                                options={provinceOptions}
                                                value={provinceOptions.find((c) => c.value === value)}
                                                onChange={(val) => onChange(val.value)}
                                                placeholder="Pilih Provinsi"
                                            />
                                        )}/>
                                    {errors['province_id'] && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                </div>
                            </div>
                        </Col>
                        <Col className="col-md-6">
                            <div className="form-group">
                                <Label htmlFor="district_id"
                                       className="form-label">Kabupaten/Kota</Label>
                                <div className="form-control-wrap">
                                    <Controller
                                        control={control}
                                        className="form-control"
                                        name="district_id"
                                        rules={{required: true}}
                                        render={({field: {onChange, value, ref}}) => (
                                            <RSelect
                                                inputRef={ref}
                                                options={districtOptions}
                                                value={districtOptions.find((c) => c.value === value)}
                                                onChange={(val) => onChange(val.value)}
                                                placeholder="Pilih Kabupaten/Kota"
                                                isDisabled={getValues('province_id') === undefined}
                                            />
                                        )}/>
                                    {errors.district_id && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                </div>
                            </div>
                        </Col>
                        <Col className="col-md-6">
                            <div className="form-group">
                                <Label htmlFor="subdistrict_id"
                                       className="form-label">Kecamatan</Label>
                                <div className="form-control-wrap">
                                    <Controller
                                        control={control}
                                        className="form-control"
                                        name="subdistrict_id"
                                        rules={{required: true}}
                                        render={({field: {onChange, value, ref}}) => (
                                            <RSelect
                                                inputRef={ref}
                                                options={subDistrictOptions}
                                                value={subDistrictOptions.find((c) => c.value === value)}
                                                onChange={(val) => onChange(val.value)}
                                                placeholder="Pilih Kecamatan"
                                                isDisabled={getValues('district_id') === undefined}
                                            />
                                        )}/>
                                    {errors.subdistrict_id && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                </div>
                            </div>
                        </Col>
                        <Col className="col-md-6">
                            <div className="form-group">
                                <Label htmlFor="village_id"
                                       className="form-label">Kelurahan/Desa</Label>
                                <div className="form-control-wrap">
                                    <Controller
                                        control={control}
                                        className="form-control"
                                        name="village_id"
                                        rules={{required: true}}
                                        render={({field: {onChange, value, ref}}) => (
                                            <RSelect
                                                inputRef={ref}
                                                options={villageOptions}
                                                value={villageOptions.find((c) => c.value === value)}
                                                onChange={(val) => onChange(val.value)}
                                                placeholder="Pilih Kelurahan/Desa"
                                                isDisabled={getValues('subdistrict_id') === undefined}
                                            />
                                        )}/>
                                    {errors.village_id && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                </div>
                            </div>
                        </Col>
                        <Col className="col-md-12">
                            <div className="form-group">
                                <Label htmlFor="address" className="form-label">Alamat</Label>
                                <div className="form-control-wrap">
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="address"
                                        placeholder="Ex. RT 01 RW 01"
                                        {...register('address', {required: true})}
                                    />
                                    {errors.address &&
                                        <span
                                            className="invalid">Kolom tidak boleh kosong.</span>}
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </PreviewCard>
    </>
}

export default Address;