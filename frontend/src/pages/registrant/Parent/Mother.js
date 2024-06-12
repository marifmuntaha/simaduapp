import React, {useState} from "react";
import {Row, RSelect} from "../../../components";
import {Col} from "reactstrap";
import DatePicker from "react-datepicker";
import {setDateForPicker} from "../../../utils/Utils";
import moment from "moment";
const Mother = ({statusOption, jobOption, formData, setFormData, handleFormInput}) => {
    const [statusSelected, setStatusSelected] = useState([]);
    const [jobSelected, setJobSelected] = useState([]);
    const [birthDay, setBirthDay] = useState(moment().toDate());
    return <>
        <Row className="gy-4">
            <Col md="12">
                <div className="form-group">
                    <label className="form-label" htmlFor="mother_status">
                        Status Ibu
                    </label>
                    <div className="form-control-wrap">
                        <RSelect
                            options={statusOption}
                            onChange={(e) => {
                                setFormData({...formData, mother_status: e.value});
                                setStatusSelected(e);
                            }}
                            value={statusSelected}
                            placeholder="Pilih Status Ibu"
                        />
                    </div>
                </div>
            </Col>
            <Col md="12">
                <div className="form-group">
                    <label className="form-label" htmlFor="mother_name">
                        Nama Ibu
                    </label>
                    <div className="form-control-wrap">
                        <input
                            type="text"
                            id="mother_name"
                            name="mother_name"
                            className="form-control"
                            onChange={(e) => handleFormInput(e)}
                            value={formData.mother_name}
                            placeholder="Ex. Rukayah"/>
                    </div>
                </div>
            </Col>
            <Col md="12">
                <div className="form-group">
                    <label className="form-label" htmlFor="mother_nik">
                        NIK Ibu
                    </label>
                    <div className="form-control-wrap">
                        <input
                            type="text"
                            id="mother_nik"
                            name="mother_nik"
                            className="form-control"
                            onChange={(e) => handleFormInput(e)}
                            value={formData.mother_nik}
                            disabled={formData.mother_status !== 1}
                            placeholder="Ex. 1234512345123456"/>
                    </div>
                </div>
            </Col>
            <Col md="6">
                <div className="form-group">
                    <label className="form-label" htmlFor="mother_birthplace">
                        Tempat Lahir Ibu
                    </label>
                    <div className="form-control-wrap">
                        <input
                            type="text"
                            id="mother_birthplace"
                            name="mother_birthplace"
                            className="form-control"
                            onChange={(e) => handleFormInput(e)}
                            value={formData.mother_birthplace}
                            disabled={formData.mother_status !== 1}
                            placeholder="Ex. Jepara"/>
                    </div>
                </div>
            </Col>
            <Col md="6">
                <div className="form-group">
                    <label className="form-label" htmlFor="mother_birthday">
                        Tanggal Lahir Ibu
                    </label>
                    <div className="form-control-wrap">
                        <div className="form-file">
                            <DatePicker
                                dateFormat="dd/MM/yyyy"
                                selected={birthDay}
                                onChange={(e) => {
                                    setBirthDay(e);
                                    setFormData({
                                        ...formData, mother_birthday: setDateForPicker(e)
                                    })
                                }}
                                disabled={formData.mother_status !== 1}
                                className="form-control date-picker"/>{" "}
                        </div>
                    </div>
                </div>
            </Col>
            <Col md="12">
                <div className="form-group">
                    <label className="form-label" htmlFor="mother_job">
                        Pekerjaan Ibu
                    </label>
                    <div className="form-control-wrap">
                        <RSelect
                            options={jobOption}
                            onChange={(e) => {
                                setFormData({...formData, mother_job: e.value});
                                setJobSelected(e);
                            }}
                            value={jobSelected}
                            isDisabled={formData.mother_status !== 1}
                            placeholder="Pilih Pekerjaan Ibu"
                        />
                    </div>
                </div>
            </Col>
            <Col md="12">
                <div className="form-group">
                    <label className="form-label" htmlFor="mother_phone">
                        Nomor Whatsapp Ibu
                    </label>
                    <div className="form-control-wrap">
                        <input
                            type="text"
                            id="mother_phone"
                            name="mother_phone"
                            className="form-control"
                            onChange={(e) => handleFormInput(e)}
                            value={formData.mother_phone}
                            disabled={formData.mother_status !== 1}
                            placeholder="Ex. 6282229366506"/>
                    </div>
                </div>
            </Col>
        </Row>
    </>
}
export default Mother;