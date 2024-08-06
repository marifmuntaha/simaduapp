import {useDispatch, useSelector} from "react-redux";
import {APICore} from "../../utils/api/APICore";
import React, {useEffect, useState} from "react";
import Head from "../../layout/head";
import Content from "../../layout/content";
import {
    BackTo, BlockBetween,
    BlockHead,
    BlockHeadContent,
    BlockTitle, Button, Col,
    Icon,
    PreviewCard, Row, RSelect, toastError, toastSuccess
} from "../../components";
import {Label, Nav, NavItem, NavLink, TabContent, TabPane} from "reactstrap";
import classnames from "classnames";
import {Controller, useForm} from "react-hook-form";
import {getLevels} from "../../redux/master/level/actions";
import {storeUser} from "../../redux/user/actions";
import Personal from "./add/Personal";
import Parent from "./add/Parent";

const AddStudent = () => {
    const dispatch = useDispatch();
    const api = new APICore();
    const user = api.getLoggedInUser();
    const {levels} = useSelector((state) => state.level);
    const {success, error} = useSelector((state) => state.user);
    const [activeIconTab, setActiveIconTab] = useState("1");
    const [provinceOptions, setProvinceOptions] = useState([]);
    const [districtOptions, setDistrictOptions] = useState([]);
    const [subDistrictOptions, setSubDistrictOptions] = useState([]);
    const [villageOptions, setVillageOptions] = useState([]);
    const statusOption = [
        {value: 1, label: 'YA'},
        {value: 2, label: 'TIDAK'}
    ]
    const toggleIconTab = (icontab) => {
        if (activeIconTab !== icontab) setActiveIconTab(icontab);
    }
    const handleProvince = () => {
        fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json`)
            .then(response => {
                response.json().then((resp) => {
                    setProvinceOptions(() => {
                        return resp.map((province) => {
                            return {value: province.id, label: province.name};
                        })
                    })
                });
            })
    }
    const handleDistrict = (province) => {
        fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${province}.json`)
            .then(response => {
                response.json().then((resp) => {
                    setDistrictOptions(() => {
                        return resp.map((district) => {
                            return {value: district.id, label: district.name};
                        })
                    })
                })
            })
    }
    const handleSubistrict = (district) => {
        fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${district}.json`)
            .then(response => {
                response.json().then((resp) => {
                    setSubDistrictOptions(() => {
                        return resp.map((subdistrict) => {
                            return {value: subdistrict.id, label: subdistrict.name};
                        })
                    })
                })
            })
    }
    const handleVillage = (subdistrict) => {
        fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/villages/${subdistrict}.json`)
            .then(response => {
                response.json().then((resp) => {
                    setVillageOptions(() => {
                        return resp.map((village) => {
                            return {value: village.id, label: village.name};
                        })
                    })
                })
            })
    }
    const onSubmit = () => {
        setValue('password', 'password');
        setValue('role', 8);
        setValue('image', '');
        dispatch(storeUser({
            formData: getValues([
                'name',
                'email',
                'nisn',
                'nisn',
                'role',
                'phone',
                'image'
            ])
        }))
    }
    const {
        handleSubmit,
        register,
        formState: {errors},
        control,
        getValues,
        setValue,
        watch
    } = useForm();

    useEffect(() => {
        handleProvince();
        dispatch(getLevels({ladder_id: user.institution.ladder_id, type: 'select'}))
    }, []);

    useEffect(() => {
        const subscription = watch((value) => {
            value['province_id'] && handleDistrict(value['province_id']);
            value['district_id'] && handleSubistrict(value['district_id']);
            value['subdistrict_id'] && handleVillage(value['subdistrict_id']);
        })
        return () => subscription.unsubscribe()
    }, [watch]);

    useEffect(() => {
        success && toastSuccess(success);
    }, [success]);

    useEffect(() => {
        error && toastError(error)
    }, [error]);
    return (
        <>
            <Head title="Tambah Siswa"/>
            <Content>
                <BlockHead size="lg" wide="sm">
                    <BlockHeadContent>
                        <BackTo link="/operator/kesiswaan/data-siswa" icon="arrow-left">
                            DATA SISWA
                        </BackTo>
                    </BlockHeadContent>
                </BlockHead>
                <BlockHead>
                    <BlockBetween>
                        <BlockHeadContent>
                            <BlockTitle tag="h4">TAMBAH SISWA</BlockTitle>
                            <p>
                                Just import <code>ReactDataTable</code> from <code>components</code>, it is built in for
                                react dashlite.
                            </p>
                        </BlockHeadContent>
                    </BlockBetween>
                </BlockHead>
                <PreviewCard>
                    <Nav tabs>
                        <NavItem>
                            <NavLink
                                tag="a"
                                href="#tab"
                                className={classnames({active: activeIconTab === "1"})}
                                onClick={(ev) => {
                                    ev.preventDefault();
                                    toggleIconTab("1");
                                }}
                            >
                                <Icon name="user"/> <span>Data Pribadi</span>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                tag="a"
                                href="#tab"
                                className={classnames({active: activeIconTab === "2"})}
                                onClick={(ev) => {
                                    ev.preventDefault();
                                    toggleIconTab("2");
                                }}
                            >
                                <Icon name="user-fill"/> <span>Data Orangtua</span>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                tag="a"
                                href="#tab"
                                className={classnames({active: activeIconTab === "3"})}
                                onClick={(ev) => {
                                    ev.preventDefault();
                                    toggleIconTab("3");
                                }}
                            >
                                <Icon name="map"/> <span>Data Alamat</span>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                tag="a"
                                href="#tab"
                                className={classnames({active: activeIconTab === "4"})}
                                onClick={(ev) => {
                                    ev.preventDefault();
                                    toggleIconTab("4");
                                }}
                            >
                                <Icon name="list"/> <span>Data Akademik</span>
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <form className="form-validate is-alter" onSubmit={handleSubmit(onSubmit)}>
                        <TabContent activeTab={activeIconTab}>
                            <TabPane tabId="1">
                                <Personal register={register} errors={errors} control={control}/>
                            </TabPane>
                            <TabPane tabId="2">
                                <Parent control={control} errors={errors} register={register} watch={watch} setValue={setValue} getValues={getValues}/>
                            </TabPane>
                            <TabPane tabId="3">
                                <PreviewCard>
                                    <Row className="gy-2">
                                        <Col className="col-md-8">
                                            <Row className="gy-2">
                                                <Col className="col-md-6">
                                                    <div className="form-group">
                                                        <Label htmlFor="province_id" className="form-label">Provinsi</Label>
                                                        <div className="form-control-wrap">
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
                                                            {errors.province_id &&
                                                                <span
                                                                    className="invalid">Kolom tidak boleh kosong.</span>}
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
                                                                <span className="invalid">Kolom tidak boleh kosong.</span>}
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </PreviewCard>
                            </TabPane>
                            <TabPane tabId="4">
                                <PreviewCard>
                                    <Row className="gy-2">
                                        <Col className="col-md-8">
                                            <Row className="gy-2">
                                                <Col className="col-md-6">
                                                    <div className="form-group">
                                                        <Label htmlFor="level_id" className="form-label">Tingkat</Label>
                                                        <div className="form-control-wrap">
                                                            <Controller
                                                                control={control}
                                                                className="form-control"
                                                                name="level_id"
                                                                rules={{required: true}}
                                                                render={({field: {onChange, value, ref}}) => (
                                                                    <RSelect
                                                                        inputRef={ref}
                                                                        options={levels}
                                                                        value={levels && levels.find((c) => c.value === value)}
                                                                        onChange={(val) => onChange(val.value)}
                                                                        placeholder="Pilih Tingkat"
                                                                    />
                                                                )}/>
                                                            {errors.level_id && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col className="col-md-6">
                                                    <div className="form-group">
                                                        <Label htmlFor="onemis" className="form-label">Masuk EMIS</Label>
                                                        <div className="form-control-wrap">
                                                            <Controller
                                                                control={control}
                                                                className="form-control"
                                                                name="onemis"
                                                                rules={{required: true}}
                                                                render={({field: {onChange, value, ref}}) => (
                                                                    <RSelect
                                                                        inputRef={ref}
                                                                        options={statusOption}
                                                                        value={statusOption.find((c) => c.value === value)}
                                                                        onChange={(val) => onChange(val.value)}
                                                                        placeholder="Pilih Provinsi"
                                                                    />
                                                                )}/>
                                                            {errors.onemis && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </PreviewCard>
                            </TabPane>
                        </TabContent>
                        <Button color="primary">SIMPAN</Button>
                    </form>
                </PreviewCard>
            </Content>
        </>
    )
}
export default AddStudent;