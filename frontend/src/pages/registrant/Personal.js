import {useContext, useEffect, useState} from "react";
import {Button, Col, Row, Spinner} from "reactstrap";
import {RSelect} from "../../components";
import {setDateForPicker} from "../../utils/Utils";
import DatePicker from "react-datepicker";
import moment from "moment";
import {actionType, Dispatch} from "../../reducer";
import {UserContext} from "../user/UserContext";

const Personal = (props) => {
    const user = useContext(UserContext)
    const [formData, setFormData] = useState({
        step: 1,
        id: 0,
        user: user.id,
        name: "",
        nisn: "",
        nik: "",
        gender: 0,
        birthplace: "",
        birthday: "",
        statusonfamily: 0,
        placechild: 0,
        siblings: 0,
        phone: ""
    });
    const [birthday, setBirthday] = useState(moment().toDate());
    const [loading, setLoading] = useState(false);
    const [registrant, setRegistrant] = useState([]);
    const [genderSelected, setGenderSelected] = useState({});
    const [statusFamilySelected, setStatusFamilySelected] = useState({});
    const genderOption = [
        {value: 1, label: 'Laki-laki'},
        {value: 2, label: 'Perempuan'},
    ];
    const statusFamilyOption = [
        {value: 1, label: 'Anak Kandung'},
        {value: 2, label: 'Anak Tiri'},
    ];
    const handleFormInput = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };
    useEffect(() => {
        Dispatch(actionType.REGISTRANT_GET, {setData: setRegistrant}, {user: user.id})
            .then((resp) => {
                setFormData({
                    step: 1,
                    id: resp[0] ? resp[0].id : 0,
                    user: resp[0] ? resp[0].user : user.id,
                    name: resp[0] ? resp[0].name : '',
                    nisn: resp[0] ? resp[0].nisn : '',
                    nik: resp[0] ? resp[0].nik : '',
                    gender: resp[0] ? resp[0].gender : 0,
                    birthplace: resp[0] ? resp[0].birthplace : '',
                    birthday: resp[0] ? resp[0].birthday : '',
                    statusonfamily: resp[0] ? resp[0].statusonfamily : 0,
                    placechild: resp[0] ? resp[0].placechild : 0,
                    siblings: resp[0] ? resp[0].siblings : 0,
                    phone: resp[0] ? resp[0].phone : '',
                });
                setGenderSelected(() => {
                    return genderOption.filter((gender) => {
                        return resp[0] && parseInt(resp[0].gender) === gender.value
                    });
                });
                setStatusFamilySelected(() => {
                    return statusFamilyOption.filter((status) => {
                        return resp[0] && parseInt(resp[0].statusonfamily) === status.value
                    });
                });
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <form className="content clearfix" onSubmit={(e) => {
            e.preventDefault();
            registrant.length !== 0
                ? Dispatch(actionType.REGISTRANT_UPDATE, {formData: formData, setLoading: setLoading})
                    .then((resp) => {
                        // eslint-disable-next-line no-unused-expressions
                        resp && props.next()
                    })
                : Dispatch(actionType.REGISTRANT_STORE, {formData: formData, setLoading: setLoading})
                    .then((resp) => {
                        // eslint-disable-next-line no-unused-expressions
                        resp && props.next()
                    });
        }}>
            <Row className="gy-4">
                <Col md="12">
                    <div className="form-group">
                        <label className="form-label" htmlFor="name">
                            Nama Lengkap
                        </label>
                        <div className="form-control-wrap">
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="form-control"
                                onChange={(e) => handleFormInput(e)}
                                value={formData.name}/>
                        </div>
                    </div>
                </Col>
                <Col md="4">
                    <div className="form-group">
                        <label className="form-label" htmlFor="nisn">
                            Nomor Induk Siswa Nasional (NISN)
                        </label>
                        <div className="form-control-wrap">
                            <input
                                type="text"
                                id="nisn"
                                name="nisn"
                                className="form-control"
                                onChange={(e) => handleFormInput(e)}
                                value={formData.nisn}/>
                        </div>
                    </div>
                </Col>
                <Col md="4">
                    <div className="form-group">
                        <label className="form-label" htmlFor="nik">
                            Nomor Induk Kependudukan (NIK)
                        </label>
                        <div className="form-control-wrap">
                            <input
                                type="text"
                                id="nik"
                                name="nik"
                                className="form-control"
                                onChange={(e) => handleFormInput(e)}
                                value={formData.nik}/>
                        </div>
                    </div>
                </Col>
                <Col md="4">
                    <div className="form-group">
                        <label className="form-label" htmlFor="gender">
                            Jenis Kelamin
                        </label>
                        <div className="form-control-wrap">
                            <RSelect
                                options={genderOption}
                                onChange={(e) => {
                                    setFormData({...formData, gender: e.value});
                                    setGenderSelected(e);
                                }}
                                value={genderSelected}
                                placeholder="Pilih Jenis Kelamin"
                            />
                        </div>
                    </div>
                </Col>
                <Col md="6">
                    <div className="form-group">
                        <label className="form-label" htmlFor="birthplace">
                            Tempat Lahir
                        </label>
                        <div className="form-control-wrap">
                            <input
                                type="text"
                                id="birthplace"
                                name="birthplace"
                                className="form-control"
                                onChange={(e) => handleFormInput(e)}
                                value={formData.birthplace}/>
                        </div>
                    </div>
                </Col>
                <Col md="6">
                    <div className="form-group">
                        <label className="form-label" htmlFor="birthday">
                            Tempat Lahir
                        </label>
                        <div className="form-control-wrap">
                            <div className="form-file">
                                <DatePicker
                                    dateFormat="dd/MM/yyyy"
                                    selected={birthday}
                                    onChange={(e) => {
                                        setBirthday(e);
                                        setFormData({
                                            ...formData, birthday: setDateForPicker(e)
                                        })
                                    }}
                                    className="form-control date-picker"/>{" "}
                            </div>
                        </div>
                    </div>
                </Col>
                <Col md="6">
                    <div className="form-group">
                        <label className="form-label" htmlFor="statusonfamily">
                            Status dalam Keluarga
                        </label>
                        <div className="form-control-wrap">
                            <RSelect
                                options={statusFamilyOption}
                                onChange={(e) => {
                                    setFormData({...formData, statusonfamily: e.value});
                                    setStatusFamilySelected(e);
                                }}
                                value={statusFamilySelected}
                                placeholder="Pilih Status"
                            />
                        </div>
                    </div>
                </Col>
                <Col md="6">
                    <div className="form-group">
                        <label className="form-label" htmlFor="placechild">
                            Anak Ke-
                        </label>
                        <div className="form-control-wrap">
                            <input
                                type="text"
                                id="placechild"
                                name="placechild"
                                className="form-control"
                                onChange={(e) => handleFormInput(e)}
                                value={formData.placechild}/>
                        </div>
                    </div>
                </Col>
                <Col md="6">
                    <div className="form-group">
                        <label className="form-label" htmlFor="siblings">
                            Jumlah Saudara
                        </label>
                        <div className="form-control-wrap">
                            <input
                                type="text"
                                id="siblings"
                                name="siblings"
                                className="form-control"
                                onChange={(e) => handleFormInput(e)}
                                value={formData.siblings}/>
                        </div>
                    </div>
                </Col>
                <Col md="6">
                    <div className="form-group">
                        <label className="form-label" htmlFor="phone">
                            Nomor Whatsapp
                        </label>
                        <div className="form-control-wrap">
                            <input
                                type="text"
                                id="phone"
                                name="phone"
                                className="form-control"
                                onChange={(e) => handleFormInput(e)}
                                value={formData.phone}/>
                        </div>
                    </div>
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
export default Personal;