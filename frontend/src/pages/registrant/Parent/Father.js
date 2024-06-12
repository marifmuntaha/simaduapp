import React, {useState} from "react";
import {Row, RSelect} from "../../../components";
import {Col} from "reactstrap";
import DatePicker from "react-datepicker";
import {setDateForPicker} from "../../../utils/Utils";
import moment from "moment";
const Father = ({statusOption, jobOption, formData, setFormData, handleFormInput}) => {
    const [statusSelected, setStatusSelected] = useState([]);
    const [jobSelected, setJobSelected] = useState([]);
    const [birthDay, setBirthDay] = useState(moment().toDate());
    return <>
        <Row className="gy-4">
            <Col md="12">
                <div className="form-group">
                    <label className="form-label" htmlFor="father_status">
                        Status Ayah
                    </label>
                    <div className="form-control-wrap">
                        <RSelect
                            options={statusOption}
                            onChange={(e) => {
                                setFormData({...formData, father_status: e.value});
                                setStatusSelected(e);
                            }}
                            value={statusSelected}
                            placeholder="Pilih Status Ayah"
                        />
                    </div>
                </div>
            </Col>
            <Col md="12">
                <div className="form-group">
                    <label className="form-label" htmlFor="father_name">
                        Nama Ayah
                    </label>
                    <div className="form-control-wrap">
                        <input
                            type="text"
                            id="father_name"
                            name="father_name"
                            className="form-control"
                            onChange={(e) => handleFormInput(e)}
                            value={formData.father_name}
                            placeholder="Ex. Parjono"/>
                    </div>
                </div>
            </Col>
            <Col md="12">
                <div className="form-group">
                    <label className="form-label" htmlFor="father_nik">
                        NIK Ayah
                    </label>
                    <div className="form-control-wrap">
                        <input
                            type="text"
                            id="father_nik"
                            name="father_nik"
                            className="form-control"
                            onChange={(e) => handleFormInput(e)}
                            value={formData.father_nik}
                            disabled={formData.father_status !== 1}
                            placeholder="Ex. 1234512345123456"/>
                    </div>
                </div>
            </Col>
            <Col md="6">
                <div className="form-group">
                    <label className="form-label" htmlFor="father_birthplace">
                        Tempat Lahir Ayah
                    </label>
                    <div className="form-control-wrap">
                        <input
                            type="text"
                            id="father_birthplace"
                            name="father_birthplace"
                            className="form-control"
                            onChange={(e) => handleFormInput(e)}
                            value={formData.father_birthplace}
                            disabled={formData.father_status !== 1}
                            placeholder="Ex. Jepara"/>
                    </div>
                </div>
            </Col>
            <Col md="6">
                <div className="form-group">
                    <label className="form-label" htmlFor="father_birthday">
                        Tanggal Lahir Ayah
                    </label>
                    <div className="form-control-wrap">
                        <div className="form-file">
                            <DatePicker
                                dateFormat="dd/MM/yyyy"
                                selected={birthDay}
                                onChange={(e) => {
                                    setBirthDay(e);
                                    setFormData({
                                        ...formData, father_birthday: setDateForPicker(e)
                                    })
                                }}
                                disabled={formData.father_status !== 1}
                                className="form-control date-picker"/>{" "}
                        </div>
                    </div>
                </div>
            </Col>
            <Col md="12">
                <div className="form-group">
                    <label className="form-label" htmlFor="father_job">
                        Pekerjaan Ayah
                    </label>
                    <div className="form-control-wrap">
                        <RSelect
                            options={jobOption}
                            onChange={(e) => {
                                setFormData({...formData, father_job: e.value});
                                setJobSelected(e);
                            }}
                            value={jobSelected}
                            isDisabled={formData.father_status !== 1}
                            placeholder="Pilih Pekerjaan Ayah"
                        />
                    </div>
                </div>
            </Col>
            <Col md="12">
                <div className="form-group">
                    <label className="form-label" htmlFor="father_phone">
                        Nomor Whatsapp Ayah
                    </label>
                    <div className="form-control-wrap">
                        <input
                            type="text"
                            id="father_phone"
                            name="father_phone"
                            className="form-control"
                            onChange={(e) => handleFormInput(e)}
                            value={formData.father_phone}
                            disabled={formData.father_status !== 1}
                            placeholder="Ex. 6282229366506"/>
                    </div>
                </div>
            </Col>
        </Row>
    </>
}
export default Father;