import {useContext, useEffect, useState} from "react";
import {Button, Col, Row, Spinner} from "reactstrap";
import {actionType, Dispatch} from "../../../reducer";
import {UserContext} from "../../user/UserContext";
import Father from "./Father";
import Mother from "./Mother";
import Guard from "./Guard";

const Parent = (props) => {
    const user = useContext(UserContext);
    const [formData, setFormData] = useState({
        step: 3,
        id: 0,
        user: user.id,
        kk_number: '',
        kk_head: '',
        father_status: 0,
        father_name: '',
        father_nik: '',
        father_birthplace: '',
        father_birthday: '',
        father_job: 0,
        father_phone: '',
        mother_status: 0,
        mother_name: '',
        mother_nik: '',
        mother_birthplace: '',
        mother_birthday: '',
        mother_job: 0,
        mother_phone: '',
        guard_status: 0,
        guard_name: '',
        guard_nik: '',
        guard_birthplace: '',
        guard_birthday: '',
        guard_job: 0,
        guard_phone: '',
    });
    const [, setRegistrant] = useState([]);
    const [loading, setLoading] = useState(false);
    const statusOption = [
        {value: 1, label: 'Masih Hidup'},
        {value: 2, label: 'Meninggal Dunia'},
        {value: 3, label: 'Tidak Diketahui'},
    ];
    const jobOption = [
        {value: 1, label: 'Tidak Bekerja'},
        {value: 2, label: 'Pensiunan'},
        {value: 3, label: 'PNS'},
        {value: 4, label: 'TNI/Polisi'},
        {value: 5, label: 'Guru/Dosen'},
        {value: 6, label: 'Pegawai Swasta'},
        {value: 7, label: 'Wiraswasta'},
        {value: 8, label: 'Pengacara/Jaksa/Hakim/Notaris'},
        {value: 9, label: 'Seniman/Pelukis/Artis/Sejenis'},
        {value: 10, label: 'Dokter/Bidan/Perawat'},
        {value: 11, label: 'Pilot/Pramugara'},
        {value: 12, label: 'Pedagang'},
        {value: 13, label: 'Petani/Peternak'},
        {value: 14, label: 'Nelayan'},
        {value: 15, label: 'Buruh (Tani/Pabrik/Bangunan)'},
        {value: 16, label: 'Sopir/Masinis/Kondektur'},
        {value: 17, label: 'Politikus'},
        {value: 18, label: 'Lainnya'},
    ];
    const handleFormInput = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };
    useEffect(() => {
        Dispatch(actionType.REGISTRANT_GET, {setData: setRegistrant}, {user: user.id}).then((registrant) => {
            setFormData({
                step: 3,
                id: registrant[0] ? registrant[0].id : 0,
                user: registrant[0] ? registrant[0].user : user.id,
                kk_number: registrant[0] ? registrant[0].kk_number : '',
                kk_head: registrant[0] ? registrant[0].kk_head : '',
                father_status: registrant[0] ? registrant[0].father_status : 0,
                father_name: registrant[0] ? registrant[0].father_name : '',
                father_nik: registrant[0] ? registrant[0].father_nik : '',
                father_birthplace: registrant[0] ? registrant[0].father_birthplace : '',
                father_birthday: registrant[0] ? registrant[0].father_birthday : '',
                father_job: registrant[0] ? registrant[0].father_job : 0,
                father_phone: registrant[0] ? registrant[0].father_phone : '',
                mother_status: registrant[0] ? registrant[0].mother_status : 0,
                mother_name: registrant[0] ? registrant[0].mother_name : '',
                mother_nik: registrant[0] ? registrant[0].mother_nik : '',
                mother_birthplace: registrant[0] ? registrant[0].mother_birthplace : '',
                mother_birthday: registrant[0] ? registrant[0].mother_birthday : '',
                mother_job: registrant[0] ? registrant[0].mother_job : 0,
                mother_phone: registrant[0] ? registrant[0].mother_phone : '',
                guard_status: registrant[0] ? registrant[0].guard_status : 0,
                guard_name: registrant[0] ? registrant[0].guard_name : '',
                guard_nik: registrant[0] ? registrant[0].guard_nik : '',
                guard_birthplace: registrant[0] ? registrant[0].guard_birthplace : '',
                guard_birthday: registrant[0] ? registrant[0].guard_birthday : '',
                guard_job: registrant[0] ? registrant[0].guard_job : 0,
                guard_phone: registrant[0] ? registrant[0].guard_phone : '',
            })
        })
    }, []);
    useEffect(() => {
        console.log(formData);
    }, [formData]);
    return (
        <form
            className="content clearfix"
            onSubmit={(e) => {
                e.preventDefault();
                Dispatch(actionType.REGISTRANT_UPDATE, {formData: formData, setLoading: setLoading})
                    .then((resp) => {
                        // eslint-disable-next-line no-unused-expressions
                        resp && props.next();
                    });
            }}>
            <Row className="gy-4">
                <Col md="6">
                    <div className="form-group">
                        <label className="form-label" htmlFor="kk_number">
                            Nomor Kartu Keluarga
                        </label>
                        <div className="form-control-wrap">
                            <input
                                type="text"
                                id="kk_number"
                                name="kk_number"
                                className="form-control"
                                onChange={(e) => handleFormInput(e)}
                                value={formData.kk_number}
                                placeholder="Ex. 1234512345123456"/>
                        </div>
                    </div>
                </Col>
                <Col md="6">
                    <div className="form-group">
                        <label className="form-label" htmlFor="kk_head">
                            Nama Kepala Keluarga
                        </label>
                        <div className="form-control-wrap">
                            <input
                                type="text"
                                id="kk_head"
                                name="kk_head"
                                className="form-control"
                                onChange={(e) => handleFormInput(e)}
                                value={formData.kk_head}
                                placeholder="Ex. Parjono"/>
                        </div>
                    </div>
                </Col>
                <Col md="6">
                    <Father
                        statusOption={statusOption}
                        jobOption={jobOption}
                        formData={formData}
                        setFormData={setFormData}
                        handleFormInput={handleFormInput}
                    />
                </Col>
                <Col md="6">
                    <Mother
                        statusOption={statusOption}
                        jobOption={jobOption}
                        formData={formData}
                        setFormData={setFormData}
                        handleFormInput={handleFormInput}
                    />
                </Col>
            </Row>
            <hr/>
            <Row className="gy-4">
                <Col md="12">
                    <Guard
                        jobOption={jobOption}
                        formData={formData}
                        setFormData={setFormData}
                        handleFormInput={handleFormInput}
                    />
                </Col>
            </Row>
            <div className="actions clearfix">
                <ul>
                    <li>
                        <Button color="primary" type="submit" disabled={loading}>
                            {loading ? <Spinner size="sm"/> : 'Selanjutnya'}
                        </Button>
                    </li>
                </ul>
            </div>
        </form>
    );
};
export default Parent;