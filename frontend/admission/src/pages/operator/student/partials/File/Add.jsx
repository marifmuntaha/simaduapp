import React, {useEffect, useState} from "react";
import Dropzone from "react-dropzone";
import {Badge, Button, Label, Modal, ModalBody, ModalHeader, Spinner} from "reactstrap";
import {Col, Row, RSelect, toastError, toastSuccess} from "../../../../../components";
import {Controller, useForm} from "react-hook-form";
import {useSetting} from "../../../../../layout/provider/Setting";
import {useInstitution} from "../../../../../layout/provider/Institution";
import {store as storeFile} from "../../../../../utils/api/studentFile";
import {get as getFiles} from '../../../../../utils/api/master/file';
import {components} from "react-select";

const Add = ({...props}) => {
    const setting = useSetting();
    const institution = useInstitution();
    const [loading, setLoading] = useState(false);
    const [fileOption, setFileOption] = useState([]);
    const [file, setFile] = useState([]);
    const {Option} = components;
    const onSubmit = async () => {
        setLoading(true);
        const params = {
            student_id: props.studentID,
            file_id: getValues('file'),
            number: getValues('number'),
            image: getValues('image'),
        }
        await storeFile(params).then(resp => {
            setLoading(false);
            toggle();
            toastSuccess(resp.data.message);
        }).catch(err => {
            toastError(err);
            setLoading(false);
        })
    }
    const {
        register,
        handleSubmit,
        formState: {errors},
        getValues,
        setValue,
        reset,
        control} = useForm();
    const toggle = () => {
        reset();
        props.setLoadData(true);
        props.setModal('');
        props.setLoadData(true);
        setFile([]);
    }
    const handleDropChange = (acceptedFiles, set) => {
        set(
            acceptedFiles.map((file) =>
                Object.assign(file, {
                    preview: URL.createObjectURL(file),
                })
            )
        );
        setValue('image', acceptedFiles[0]);
    }

    const BadgeOption = props => (
        <Option {...props}> {props.data.label} {props.data.status === '1' && (<Badge color="danger" pill>Wajib</Badge>)}</Option>
    );

    useEffect(() => {
        getFiles({institution_id: institution.id, year_id: setting.year_id}).then(resp => {
            setFileOption(resp.data.result.map(item => {
                return {value: item.id, label: item.name, status: item.status};
            }));
        }).catch(err => {
            toastError(err);
        })
    }, []);

    return (
        <>
            <Modal isOpen={props.modal === 'add'} toggle={toggle}>
                <ModalHeader>TAMBAH</ModalHeader>
                <ModalBody>
                    <form className="form-validate is-alter" onSubmit={handleSubmit(onSubmit)}>
                        <Row className="gy-2">
                            <Col className="col-md-12">
                                <div className="form-group">
                                    <Label htmlFor="file" className="form-label">Jenis Berkas</Label>
                                    <div className="form-control-wrap">
                                        <Controller
                                            control={control}
                                            className="form-control"
                                            name="file"
                                            rules={{required: true}}
                                            render={({field: {onChange, value, ref}}) => (
                                                <RSelect
                                                    inputRef={ref}
                                                    options={fileOption}
                                                    value={fileOption !== undefined && fileOption.find((c) => c.value === value)}
                                                    onChange={(val) => onChange(val.value)}
                                                    placeholder="Pilih Jenis Berkas"
                                                    components={{Option: BadgeOption}}
                                                />
                                            )}/>
                                        <input type="hidden" id="file" className="form-control" />
                                        {errors.file && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                    </div>
                                </div>
                            </Col>
                            <Col className="col-md-12">
                                <div className="form-group">
                                    <Label htmlFor="number" className="form-label">Nomor Berkas</Label>
                                    <div className="form-control-wrap">
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="number"
                                            placeholder="Ex. 12345678"
                                            {...register('number', {required: true})}
                                        />
                                        {errors.number && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                    </div>
                                </div>
                            </Col>
                            <Col className="col-md-12">
                                <label className="form-label">Unggah Berkas</label>
                                <Dropzone
                                    onDrop={(acceptedFiles) => handleDropChange(acceptedFiles, setFile)}
                                    accept={[".jpg", ".png", ".jpeg"]}
                                >
                                    {({getRootProps, getInputProps}) => (
                                        <section>
                                            <div {...getRootProps()} className="dropzone upload-zone dz-clickable">
                                                <input {...getInputProps()}/>

                                                {file.length === 0 && (
                                                    <div className="dz-message">
                                                        <span
                                                            className="dz-message-text">Tarik dan Letakkan Disini</span>
                                                        <span className="dz-message-or">atau</span>
                                                        <Button color="primary">PILIH BERKAS</Button>
                                                    </div>
                                                )}
                                                {file.map((file) => (
                                                    <div
                                                        key={file.name}
                                                        className="dz-preview dz-processing dz-image-preview dz-error dz-complete"
                                                    >
                                                        <div className="dz-image">
                                                            <img src={file.preview} alt="preview"/>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </section>
                                    )}
                                </Dropzone>
                            </Col>
                            <div className="form-group">
                            <Button size="lg" className="btn-block" type="submit" color="primary">
                                    {loading ? <Spinner size="sm" color="light"/> : "SIMPAN"}
                                </Button>
                            </div>
                        </Row>
                    </form>
                </ModalBody>
            </Modal>
        </>
    )
}
export default Add;