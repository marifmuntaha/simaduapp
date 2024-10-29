import React, {useEffect, useState} from "react";
import Head from "../../../../layout/head";
import {
    BackTo,
    Block,
    BlockHead,
    BlockHeadContent,
    BlockTitle,
    Button,
    Col,
    PreviewCard,
    Row, RSelect
} from "../../../../components";
import Content from "../../../../layout/content";
import {useDispatch, useSelector} from "react-redux";
import {APICore} from "../../../../utils/api/APICore";
import {getSetting} from "../../../../redux/ppdb/setting/actions";
import {Controller, useForm} from "react-hook-form";
import {getYears} from "../../../../redux/master/year/actions";

const Setting = () => {
    const dispatch = useDispatch();
    const api = new APICore();
    const user = api.getLoggedInUser();
    const institution = user.institution;
    const {loading, settings, error, success, loadData} = useSelector((state) => state.PPDBSetting);
    const {years} = useSelector((state) => state.year);
    const statusOption = [
        {value: 1, label: 'Dibuka'},
        {value: 2, label: 'Tutup'},
    ]
    const {
        register,
        handleSubmit,
        formState: {errors},
        getValues,
        setValue,
        control
    } = useForm();

    useEffect(() => {
        dispatch(getYears({type: 'select'}))
        dispatch(getSetting({institution: institution.id}))
        setValue('name', settings !== undefined ? settings[0].name : null);
        setValue('alias', settings !== undefined? settings[0].alias : null);
        setValue('year', settings !== undefined? settings[0].year : null);
        setValue('status', settings !== undefined? settings[0].status : null);
    }, []);
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
                    <form className="gy-3 form-validate is-alter">
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
                                            id="name"
                                            className="form-control"
                                            {...register('name', {required: true})}
                                        />
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
                                            id="alias"
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
                                    <label className="form-label" htmlFor="site-name">
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
                                            name="ladder"
                                            rules={{required: true}}
                                            render={({field: {onChange, value, ref}}) => (
                                                <RSelect
                                                    inputRef={ref}
                                                    options={years}
                                                    value={years !== undefined && years.find((c) => c.value === value)}
                                                    onChange={(val) => onChange(val.value)}
                                                    placeholder="Pilih Tahun Pelajaran"
                                                />
                                            )}/>
                                        {errors.year && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row className="g-3 align-center">
                            <Col lg="5">
                                <div className="form-group">
                                    <label className="form-label">Brosur PPDB</label>
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
                                            {...register('file', {required: true})}
                                        />
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row className="g-3 align-center">
                            <Col lg="5">
                                <div className="form-group">
                                    <label className="form-label">Status Pendaftaran</label>
                                    <span className="form-note">Enable or disable registration from site.</span>
                                </div>
                            </Col>
                            <Col lg="7">
                                <div className="form-group">
                                    <div className="form-control-wrap">
                                        <Controller
                                            control={control}
                                            className="form-control"
                                            name="ladder"
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
                                        {errors.year && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row className="g-3 align-center">
                            <Col lg="5">
                                <div className="form-group">
                                    <label className="form-label">Link Tutorial</label>
                                    <span className="form-note">Specify the URL if your main website is external.</span>
                                </div>
                            </Col>
                            <Col lg="7">
                                <div className="form-group">
                                    <div className="form-control-wrap">
                                        <input
                                            type="text"
                                            name="site-url"
                                            className="form-control"
                                            defaultValue="https://www.softnio.com"
                                        />
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row className="g-3">
                            <Col lg="7" className="offset-lg-5">
                                <div className="form-group mt-2">
                                    <Button color="primary" size="lg" onClick={(e) => e.preventDefault()}>
                                        Update
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