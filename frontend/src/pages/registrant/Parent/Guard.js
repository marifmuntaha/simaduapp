/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from "react";
import {Row, RSelect} from "../../../components";
import {Col} from "reactstrap";
import DatePicker from "react-datepicker";
import {setDateForPicker} from "../../../utils/Utils";
import moment from "moment";
const Mother = ({jobOption, formData, setFormData, handleFormInput}) => {
    const [jobSelected, setJobSelected] = useState([]);
    const [birthDay, setBirthDay] = useState(moment().toDate());
    const [statusSelected, setStatusSelected] = useState([]);
    const statusOption = [
        {value: 1, label: 'Sama dengan Ayah Kandung'},
        {value: 2, label: 'Sama dengan Ibu Kandung'},
        {value: 3, label: 'Lainnya'},
    ];
    useEffect(() => {
        if (statusSelected.value === 1){
            setFormData({...formData,
                guard_name: formData.father_name,
                guard_nik: formData.father_nik,
                guard_birthplace: formData.father_birthplace,
                guard_birthday: formData.father_birthday,
                guard_job: formData.father_job,
                guard_phone: formData.father_phone,
            })
        }
    }, [formData, statusSelected])
    return <>
        <Row className="gy-4">
            <Col md="6">
                <div className="form-group">
                    <label className="form-label" htmlFor="guard_status">
                        Status Wali
                    </label>
                    <div className="form-control-wrap">
                        <RSelect
                            options={statusOption}
                            onChange={(e) => {
                                setStatusSelected(e);
                            }}
                            value={statusSelected}
                            placeholder="Pilih Status Wali"
                        />
                    </div>
                </div>
            </Col>
            <Col md="6">
                <div className="form-group">
                    <label className="form-label" htmlFor="guard_name">
                        Nama Wali
                    </label>
                    <div className="form-control-wrap">
                        <input
                            type="text"
                            id="guard_name"
                            name="guard_name"
                            className="form-control"
                            onChange={(e) => handleFormInput(e)}
                            value={formData.guard_name}
                            disabled={statusSelected.value !== 3}
                            placeholder="Ex. Rukayah"/>
                    </div>
                </div>
            </Col>
            <Col md="6">
                <div className="form-group">
                    <label className="form-label" htmlFor="guard_nik">
                        NIK Wali
                    </label>
                    <div className="form-control-wrap">
                        <input
                            type="text"
                            id="guard_nik"
                            name="guard_nik"
                            className="form-control"
                            onChange={(e) => handleFormInput(e)}
                            value={formData.guard_nik}
                            placeholder="Ex. 1234512345123456"/>
                    </div>
                </div>
            </Col>
            <Col md="3">
                <div className="form-group">
                    <label className="form-label" htmlFor="guard_birthplace">
                        Tempat Lahir Wali
                    </label>
                    <div className="form-control-wrap">
                        <input
                            type="text"
                            id="guard_birthplace"
                            name="guard_birthplace"
                            className="form-control"
                            onChange={(e) => handleFormInput(e)}
                            value={formData.guard_birthplace}
                            placeholder="Ex. Jepara"/>
                    </div>
                </div>
            </Col>
            <Col md="3">
                <div className="form-group">
                    <label className="form-label" htmlFor="guard_birthday">
                        Tanggal Lahir Wali
                    </label>
                    <div className="form-control-wrap">
                        <div className="form-file">
                            <DatePicker
                                dateFormat="dd/MM/yyyy"
                                selected={birthDay}
                                onChange={(e) => {
                                    setBirthDay(e);
                                    setFormData({
                                        ...formData, guard_birthday: setDateForPicker(e)
                                    })
                                }}
                                className="form-control date-picker"/>{" "}
                        </div>
                    </div>
                </div>
            </Col>
            <Col md="6">
                <div className="form-group">
                    <label className="form-label" htmlFor="guard_job">
                        Pekerjaan Ibu
                    </label>
                    <div className="form-control-wrap">
                        <RSelect
                            options={jobOption}
                            onChange={(e) => {
                                setFormData({...formData, guard_job: e.value});
                                setJobSelected(e);
                            }}
                            value={jobSelected}
                            placeholder="Pilih Pekerjaan Ibu"
                        />
                    </div>
                </div>
            </Col>
            <Col md="6">
                <div className="form-group">
                    <label className="form-label" htmlFor="guard_phone">
                        Nomor Whatsapp Ibu
                    </label>
                    <div className="form-control-wrap">
                        <input
                            type="text"
                            id="guard_phone"
                            name="guard_phone"
                            className="form-control"
                            onChange={(e) => handleFormInput(e)}
                            value={formData.guard_phone}
                            placeholder="Ex. 6282229366506"/>
                    </div>
                </div>
            </Col>
        </Row>
    </>
}
export default Mother;