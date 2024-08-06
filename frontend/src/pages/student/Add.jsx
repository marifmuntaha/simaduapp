import {useDispatch} from "react-redux";
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
    PreviewCard, Row, RSelect
} from "../../components";
import DatePicker from "react-datepicker";
import {Label, Nav, NavItem, NavLink, TabContent, TabPane} from "reactstrap";
import classnames from "classnames";
import {Controller, useForm} from "react-hook-form";

const AddStudent = () => {
    const dispatch = useDispatch();
    const api = new APICore();
    const user = api.getLoggedInUser();
    const [activeIconTab, setActiveIconTab] = useState("1");
    const [provinceOptions, setProvinceOptions] = useState([]);
    const [districtOptions, setDistrictOptions] = useState([]);
    const [subDistrictOptions, setSubDistrictOptions] = useState([]);
    const [villageOptions, setVillageOptions] = useState([]);
    const genderOption = [
        {value: 'L', label: 'Laki-laki'},
        {value: 'P', label: 'Perempuan'},
    ]
    const parentStatusOption = [
        {value: 1, label: 'Masih Hidup'},
        {value: 2, label: 'Meninggal'},
        {value: 3, label: 'Tidak Diketahui'},
    ]
    const guardStatusOption = [
        {value: 1, label: 'Sama dengan Ayah Kandung'},
        {value: 2, label: 'Sama dengan Ibu Kandung'},
        {value: 3, label: 'Lainnya'}
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
        handleProvince()
    }, []);

    useEffect(() => {
        const subscription = watch((value) => {
            value['province_id'] && handleDistrict(value['province_id']);
            value['district_id'] && handleSubistrict(value['district_id']);
            value['subdistrict_id'] && handleVillage(value['subdistrict_id']);
        })
        return () => subscription.unsubscribe()
    }, [watch]);
    return (
        <>
            <Head title="Tambah Siswa"/>
            <Content>
                <BlockHead size="lg" wide="sm">
                    <BlockHeadContent>
                        <BackTo link="/operator/kesiswaan/data-siswa/tambah" icon="arrow-left">
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
                                <Icon name="user-fill"/> <span>Data Wali</span>
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
                                                            {errors.nisn && <span className="invalid">Kolom tidak boleh kosong.</span>}
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
                                                            {errors.nism && <span className="invalid">Kolom tidak boleh kosong.</span>}
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
                                                            {errors.nik && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col className="col-md-12">
                                                    <div className="form-group">
                                                        <Label htmlFor="name" className="form-label">Nama
                                                            Lengkap</Label>
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
                                                        <Label htmlFor="birthplace" className="form-label">Tempat
                                                            Lahir</Label>
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
                                                        <Label htmlFor="birthday" className="form-label">Tanggal
                                                            Lahir</Label>
                                                        <div className="form-control-wrap">
                                                            <DatePicker
                                                                selected={new Date()}
                                                                className="form-control date-picker"
                                                                onChange={() => {
                                                                    alert('')
                                                                }}
                                                            />
                                                            {errors.birthday && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col className="col-md-4">
                                                    <div className="form-group">
                                                        <Label htmlFor="gender" className="form-label">Jenis
                                                            Kelamin</Label>
                                                        <div className="form-control-wrap">
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
                                                        <Label htmlFor="orderborn" className="form-label">Anak
                                                            Ke</Label>
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
                                                        <Label htmlFor="sibling" className="form-label">Jumlah
                                                            Saudara</Label>
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
                                                        <Label htmlFor="phone" className="form-label">Nomor
                                                            Whatsapp</Label>
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
                                                        <Label htmlFor="email" className="form-label">Alamat
                                                            Email</Label>
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
                            </TabPane>
                            <TabPane tabId="2">
                                <PreviewCard>
                                    <Row className="gy-2">
                                        <Col className="col-md-8">
                                            <Row className="gy-2">
                                                <Col className="col-md-6">
                                                    <Row className="gy-2">
                                                        <Col className="col-md-12">
                                                            <div className="form-group">
                                                                <Label htmlFor="father_status" className="form-label">Status
                                                                    Ayah Kandung</Label>
                                                                <div className="form-control-wrap">
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
                                                                    {errors.father_status &&
                                                                        <span className="invalid">Kolom tidak boleh kosong.</span>}
                                                                </div>
                                                            </div>
                                                        </Col>
                                                        <Col className="col-md-12">
                                                        <div className="form-group">
                                                            <Label htmlFor="father_name" className="form-label">Nama
                                                                Ayah
                                                                Kandung</Label>
                                                            <div className="form-control-wrap">
                                                                <input
                                                                    className="form-control"
                                                                    type="text"
                                                                    id="father_name"
                                                                    placeholder="Ex. Ngadimin"
                                                                    {...register('father_name', {required: true})}
                                                                />
                                                                {errors.father_name && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                                            </div>
                                                        </div>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col className="col-md-6">
                                                    <Row className="gy-2">
                                                        <Col className="col-md-12">
                                                            <div className="form-group">
                                                                <Label htmlFor="mother_status" className="form-label">Status
                                                                    Ibu Kandung</Label>
                                                                <div className="form-control-wrap">
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
                                                                    {errors.mother_status &&
                                                                        <span className="invalid">Kolom tidak boleh kosong.</span>}
                                                                </div>
                                                            </div>
                                                        </Col>
                                                        <Col className="col-md-12">
                                                            <div className="form-group">
                                                                <Label htmlFor="mother_name" className="form-label">Nama
                                                                    Ibu
                                                                    Kandung</Label>
                                                                <div className="form-control-wrap">
                                                                    <input
                                                                        className="form-control"
                                                                        type="text"
                                                                        id="motherr_name"
                                                                        placeholder="Ex. Ngadijah"
                                                                        {...register('mother_name', {required: true})}
                                                                    />
                                                                    {errors.mother_name &&
                                                                        <span className="invalid">Kolom tidak boleh kosong.</span>}
                                                                </div>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col className="col-md-12">
                                                    <div className="form-group">
                                                        <Label htmlFor="guard_status" className="form-label">Wali
                                                            Siswa</Label>
                                                        <div className="form-control-wrap">
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
                                                            {errors.guard_status && <span className="invalid">Kolom tidak boleh kosong.</span>}
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
                                                                id="motherr_name"
                                                                placeholder="Ex. Ngadijah"
                                                                {...register('mother_name', {required: true})}
                                                            />
                                                            {errors.mother_name && <span className="invalid">Kolom tidak boleh kosong.</span>}
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
                                                            {errors.guard_name && <span className="invalid">Kolom tidak boleh kosong.</span>}
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
                                                            {errors.guard_email && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </PreviewCard>
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
                                            </Row>
                                        </Col>
                                    </Row>
                                </PreviewCard>
                            </TabPane>
                            <TabPane tabId="4">
                                <p>
                                    Eu dolore ea ullamco dolore Lorem id cupidatat excepteur reprehenderit consectetur
                                    elit id dolor
                                    proident in cupidatat officia. Voluptate excepteur commodo labore nisi cillum duis
                                    aliqua do. Aliqua
                                    amet qui mollit consectetur nulla mollit velit aliqua veniam nisi id do Lorem
                                    deserunt amet. Culpa
                                    ullamco sit adipisicing labore officia magna elit nisi in aute tempor commodo
                                    eiusmod.
                                </p>
                            </TabPane>
                        </TabContent>
                        <Button>asdadad</Button>
                    </form>
                </PreviewCard>
            </Content>
        </>
    )
}
export default AddStudent;