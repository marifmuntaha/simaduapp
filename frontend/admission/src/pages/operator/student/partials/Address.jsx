import React, {useEffect, useState} from "react";
import {Button, Col, PreviewCard, Row, RSelect, toastError, toastSuccess} from "../../../../components";
import {Form, Label, Spinner} from "reactstrap";
import {Controller, useForm} from "react-hook-form";
import {store as storeAddress, update as updateAddress} from "../../../../utils/api/studentAddress"

const Address = ({address, studentID}) => {
    const {register, watch, formState: {errors}, control, setValue, handleSubmit, getValues} = useForm();
    const [loading, setLoading] = useState(false);
    const [provinceOptions, setProvinceOptions] = useState([]);
    const [districtOptions, setDistrictOptions] = useState([]);
    const [subDistrictOptions, setSubDistrictOptions] = useState([]);
    const [villageOptions, setVillageOptions] = useState([]);
    const storeSubmit = async () => {
        const studentParam = {
            student_id: studentID,
            province_id: getValues('province_id'),
            district_id: getValues('district_id'),
            subdistrict_id: getValues('subdistrict_id'),
            village_id: getValues('village_id'),
            address: getValues('address'),
        }
        await storeAddress(studentParam).then(resp => {
            toastSuccess(resp.data.message);
            setLoading(false);
        }).catch(error => {
            toastError(error);
            setLoading(false);
        });
    }
    const updateSubmit = async () => {
        const studentParam = {
            id: getValues('id'),
            province_id: getValues('province_id'),
            district_id: getValues('district_id'),
            subdistrict_id: getValues('subdistrict_id'),
            village_id: getValues('village_id'),
            address: getValues('address'),
        }
        await updateAddress(studentParam).then(resp => {
            toastSuccess(resp.data.message);
            setLoading(false);
        }).catch(error => {
            toastError(error);
            setLoading(false);
        });
    }
    const handleSubmitForm = async () => {
        setLoading(true);
        address !== null ? await updateSubmit() : await storeSubmit();
    }
    useEffect(() => {
        address && setValue('id', address.id);
        address && setValue('province_id', String(address.province_id));
        address && setValue('district_id', String(address.district_id));
        address && setValue('subdistrict_id', String(address.subdistrict_id));
        address && setValue('village_id', String(address.village_id));
        address && setValue('address', address.address);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [address]);
    useEffect(() => {
        fetch("https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json").then(response => response.json())
            .then(resp => {
                const provinces = resp.map((province) => {
                    return {value: province.id, label: province.name}
                })
                setProvinceOptions(provinces);
            }).catch(err => {
            toastError(err)
        })
    }, [address]);
    useEffect(() => {
        getValues('province_id') !== undefined && getValues('province_id') !== 'undefined' && fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${getValues('province_id')}.json`)
            .then(response => response.json())
            .then(resp => {
                const regencies = resp.map((regency) => {
                    return {value: regency.id, label: regency.name}
                })
                setDistrictOptions(regencies);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [watch('province_id')]);
    useEffect(() => {
        getValues('province_id') !== undefined && getValues('province_id') !== 'undefined' && fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${getValues('district_id')}.json`)
            .then(response => response.json())
            .then(resp => {
                const districts = resp.map((district) => {
                    return {value: district.id, label: district.name}
                })
                setSubDistrictOptions(districts);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [watch('district_id')]);
    useEffect(() => {
        getValues('province_id') !== undefined && getValues('province_id') !== 'undefined' && fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/villages/${getValues('subdistrict_id')}.json`)
            .then(response => response.json())
            .then(resp => {
                const villages = resp.map((village) => {
                    return {value: village.id, label: village.name}
                })
                setVillageOptions(villages);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [watch('subdistrict_id')]);
    return <>
        <PreviewCard>
            <Row className="gy-2">
                <Col className="col-md-8">
                    <Form className="is-alter" onSubmit={handleSubmit(handleSubmitForm)}>
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
                                        {errors.province_id && <span className="invalid">Kolom tidak boleh kosong.</span>}
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
    </>
}

export default Address;