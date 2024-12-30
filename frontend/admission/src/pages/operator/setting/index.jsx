import React, {useEffect, useState} from "react";
import Head from "../../../layout/head";
import {
    BackTo,
    Block,
    BlockHead,
    BlockHeadContent,
    BlockTitle,
    Button,
    Col, Icon,
    PreviewCard,
    Row, RSelect, toastError, toastSuccess
} from "../../../components";
import Content from "../../../layout/content";
import {Controller, useForm} from "react-hook-form";
import {Spinner} from "reactstrap";
import {get as getYears} from "../../../utils/api/master/year";
import {get as getSetting} from "../../../utils/api/setting"
import {update as updateSetting} from "../../../utils/api/setting"
import {useInstitution} from "../../../layout/provider/Institution";

const Setting = () => {
    const institution = useInstitution();
    const [yearOptions, setYearOptions] = useState([]);
    const [setting, setSetting] = useState([]);
    const [loading, setLoading] = useState(false);
    const statusOption = [
        {value: '1', label: 'Dibuka'},
        {value: '2', label: 'Tutup'},
    ]
    const onSubmit = async () => {
        setLoading(true);
        const params = {
            id: getValues('id'),
            name: getValues('name'),
            alias: getValues('alias'),
            year_id: getValues('year_id'),
            brochure: getValues('brochure'),
            status: getValues('status'),
            youtube: getValues('youtube'),
        }
        updateSetting(params).then(resp => {
            toastSuccess(resp.data.message);
            setLoading(false);
        }).catch(err => {
            toastError(err);
            setLoading(false);
        });
    }
    const {
        register,
        handleSubmit,
        formState: {errors},
        getValues,
        setValue,
        control
    } = useForm();

    useEffect(() => {
        getYears({institution_id: institution.id, order: 'DESC', type: 'select'}).then(resp => {
            setYearOptions(resp.data.result);
        }).catch(error => {
            toastError((error))
        });
        getSetting({institution_id: institution.id}).then(resp => {
            setSetting(resp.data.result[0]);
        }).catch(error => {
            toastError((error))
        })
    }, []);
    useEffect(() => {
        setValue('id', setting ? setting.id : null);
        setValue('institution_id', institution.id);
        setValue('name', setting ? setting.name : null);
        setValue('alias', setting ? setting.alias : null);
        setValue('year_id', setting ? setting.year_id : null);
        setValue('status', setting ? setting.status : null);
        setValue('youtube', setting ? setting.youtube : null);
    }, [setting]);

    return <>
        <Head title="PPDB Penganturan"/>
        <Content page="component">
            <BlockHead size="lg" wide="sm">
                <BlockHeadContent>
                    <BackTo link="/" icon="arrow-left">
                        DASHBOARD
                    </BackTo>
                </BlockHeadContent>
            </BlockHead>
            <Block size="lg">
                <BlockHead>
                    <BlockHeadContent>
                        <BlockTitle tag="h5">Pengaturan PPDB</BlockTitle>
                        <p>You can make style out your setting related form as per below example.</p>
                    </BlockHeadContent>
                </BlockHead>
                <PreviewCard>
                    <form className="gy-3 form-validate is-alter" onSubmit={handleSubmit(onSubmit)}>
                        <Row className="g-3 align-center">
                            <Col lg="5">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="name">
                                        Nama Aplikasi
                                    </label>
                                    <span className="form-note">Specify the name of your website.</span>
                                </div>
                            </Col>
                            <Col lg="7">
                                <div className="form-group">
                                    <div className="form-control-wrap">
                                        <input
                                            type="text"
                                            name="name"
                                            className="form-control"
                                            {...register('name', {required: true})}
                                        />
                                        {errors.name && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row className="g-3 align-center">
                            <Col lg="5">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="alias">
                                        Nama Singkatan
                                    </label>
                                    <span className="form-note">Specify the name of your website.</span>
                                </div>
                            </Col>
                            <Col lg="7">
                                <div className="form-group">
                                    <div className="form-control-wrap">
                                        <input
                                            type="text"
                                            name="alias"
                                            className="form-control"
                                            {...register('alias', {required: true})}
                                        />
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row className="g-3 align-center">
                            <Col lg="5">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="year_id">
                                        Tahun Pelajaran
                                    </label>
                                    <span className="form-note">Specify the name of your website.</span>
                                </div>
                            </Col>
                            <Col lg="7">
                                <div className="form-group">
                                    <div className="form-control-wrap">
                                        <Controller
                                            control={control}
                                            className="form-control"
                                            name="year_id"
                                            rules={{required: true}}
                                            render={({field: {onChange, value, ref}}) => (
                                                <RSelect
                                                    inputRef={ref}
                                                    options={yearOptions}
                                                    value={yearOptions !== undefined && yearOptions.find((c) => c.value === value)}
                                                    onChange={(val) => onChange(val.value)}
                                                    placeholder="Pilih Tahun Pelajaran"
                                                />
                                            )}/>
                                        {errors.year_id && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row className="g-3 align-center">
                            <Col lg="5">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="brochure">Brosur PPDB</label>
                                    <span className="form-note">Specify the email address of your website.</span>
                                </div>
                            </Col>
                            <Col lg="7">
                                <div className="form-group">
                                    <div className="form-control-wrap">
                                        <input
                                            type="file"
                                            id="brochure"
                                            className="form-control"
                                            {...register('file', {required: false})}
                                        />
                                        {errors.file && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row className="g-3 align-center">
                            <Col lg="5">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="status">Status Pendaftaran</label>
                                    <span className="form-note">Enable or disable registration from site.</span>
                                </div>
                            </Col>
                            <Col lg="7">
                                <div className="form-group">
                                    <div className="form-control-wrap">
                                        <Controller
                                            control={control}
                                            className="form-control"
                                            name="status"
                                            rules={{required: true}}
                                            render={({field: {onChange, value, ref}}) => (
                                                <RSelect
                                                    inputRef={ref}
                                                    options={statusOption}
                                                    value={statusOption.find((c) => c.value === value)}
                                                    onChange={(val) => onChange(val.value)}
                                                    placeholder="Pilih Status"
                                                />
                                            )}/>
                                        {errors.status && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row className="g-3 align-center">
                            <Col lg="5">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="youtube">Link Tutorial</label>
                                    <span className="form-note">Specify the URL if your main website is external.</span>
                                </div>
                            </Col>
                            <Col lg="7">
                                <div className="form-group">
                                    <div className="form-control-wrap">
                                        <input
                                            type="text"
                                            name="youtube"
                                            className="form-control"
                                            {...register('youtube', {required: false})}
                                        />
                                        {errors.youtube && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row className="g-3">
                            <Col lg="7" className="offset-lg-5">
                                <div className="form-group mt-2">
                                    <Button type="submit" className="col-md-3" color="primary" disabled={loading}>
                                        {loading ? <Spinner size="sm" color="light"/> : <Icon name="save"/>} <span> SIMPAN < /span>
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </form>
                </PreviewCard>
            </Block>
        </Content>
    </>
}

export default Setting;