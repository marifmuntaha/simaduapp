import React, {useEffect} from "react";
import Head from "../../../layout/head";
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
} from "../../../components";
import Content from "../../../layout/content";
import {useDispatch, useSelector} from "react-redux";
import {getSetting, resetSetting, updateSetting} from "../../../redux/setting/actions";
import {Controller, useForm} from "react-hook-form";
import {getYears} from "../../../redux/master/year/actions";
import {Spinner} from "reactstrap";

const Setting = () => {
    const dispatch = useDispatch();
    const {loading, settings} = useSelector((state) => state.setting);
    const {years} = useSelector((state) => state.year);
    const statusOption = [
        {value: '1', label: 'Dibuka'},
        {value: '2', label: 'Tutup'},
    ]
    const onSubmit = () => {
        dispatch(updateSetting({
            formData: getValues([
                'id', 'institution_id', 'name', 'alias', 'year_id', 'brochure', 'status', 'youtube'
            ])
        }))
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
        dispatch(getYears({type: 'select', order: 'DESC'}));
        dispatch(getSetting({institution_id: process.env.REACT_APP_SERVICE_INSTITUTION}));
    }, [dispatch]);
    useEffect(() => {
        setValue('id', settings ? settings[0].id : null);
        setValue('institution_id', process.env.REACT_APP_SERVICE_INSTITUTION);
        setValue('name', settings ? settings[0].name : null);
        setValue('alias', settings ? settings[0].alias : null);
        setValue('year_id', settings ? settings[0].year_id : null);
        setValue('status', settings ? settings[0].status : null);
        setValue('youtube', settings ? settings[0].youtube : null);
        resetSetting();
    }, [settings]);

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
                                                    options={years}
                                                    value={years !== undefined && years.find((c) => c.value === value)}
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
                                    <Button className="col-3 text-center align-content-center" type="submit" color="primary" size="md" disabled={loading}>
                                        {loading === undefined ? <Spinner size="sm" color="light"/> : <span>Simpan</span> }
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