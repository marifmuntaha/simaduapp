import {useContext, useEffect, useState} from "react";
import {Button, Col, Row, Spinner} from "reactstrap";
import {RSelect} from "../../components";
import {actionType, Dispatch} from "../../reducer";
import {UserContext} from "../user/UserContext";

const Program = (props) => {
    const user = useContext(UserContext);
    const [formData, setFormData] = useState({
        step: 2,
        id: 0,
        user: user.id,
        major: 1,
        boarding: 0,
        program: 0,
    });
    const [loading, setLoading] = useState(false);
    const [, setRegistrant] = useState([]);
    const [majorSelected, setMajorSelected] = useState({});
    const [majorOption, setMajorOption] = useState([]);
    const [boardingSelected, setBoardingSelected] = useState({});
    const boardingOption = [
        {value: 1, label: 'YA'},
        {value: 2, label: 'TIDAK'},
    ];
    const [programSelected, setProgramSelected] = useState([]);
    const [programOption, setProgramOption] = useState([]);
    useEffect(() => {
        Dispatch(actionType.REGISTRANT_GET, {setData: setRegistrant}, {user: user.id})
            .then((registrant) => {
                setFormData({
                    step: 2,
                    id: registrant[0] ? registrant[0].id : 0,
                    user: registrant[0] ? registrant[0].user : user.id,
                    major: registrant[0] ? registrant[0].major : 1,
                    boarding: registrant[0] ? registrant[0].boarding : 1,
                    program: registrant[0] ? registrant[0].program : 1,
                });
                Dispatch(actionType.MAJOR_GET,{})
                    .then((majors) => {
                        let major = majors.filter((major) => {
                            return parseInt(registrant[0].major) === major.id
                        });
                        let program = JSON.parse(major[0].program);
                        setMajorOption(() => {
                            return majors.map((item) => {
                                return {value: item.id, label: item.alias + ' - ' + item.name}
                            });
                        });
                        setMajorSelected(() => {
                            return major.map((item) => {
                                return {value: item.id, label: item.alias + ' - ' + item.name}
                            });
                        });
                        setProgramOption(program);
                        setProgramSelected(() => {
                            return program.filter((item) => {
                                return item.value === registrant[0].program
                            })
                        })
                    });
                setBoardingSelected(() => {
                    return boardingOption.filter((boarding) => {
                        return registrant[0] && parseInt(registrant[0].boarding) === boarding.value
                    });
                });
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <form className="content clearfix" onSubmit={(e) => {
            e.preventDefault();
            Dispatch(actionType.REGISTRANT_UPDATE, {formData: formData, setLoading: setLoading})
                .then((resp) => {
                    // eslint-disable-next-line no-unused-expressions
                    resp && props.next()
                });
        }}>
            <Row className="gy-4">
                <Col md="12">
                    <div className="form-group">
                        <label className="form-label" htmlFor="major">
                            Program Madrasah
                        </label>
                        <div className="form-control-wrap">
                            <RSelect
                                options={majorOption}
                                onChange={(e) => {
                                    setFormData({...formData, major: e.value});
                                    setMajorSelected(e);
                                    Dispatch(actionType.MAJOR_SHOW, {}, {id: e.value}).then(resp => {
                                        setProgramOption(JSON.parse(resp.program))
                                    })
                                }}
                                value={majorSelected}
                                placeholder="Pilih Program Madrasah"
                            />
                        </div>
                    </div>
                </Col>
                <Col md="6">
                    <div className="form-group">
                        <label className="form-label" htmlFor="boarding">
                            Boarding/Mondok
                        </label>
                        <div className="form-control-wrap">
                            <RSelect
                                options={boardingOption}
                                onChange={(e) => {
                                    setFormData({...formData, boarding: e.value, program: 0});
                                    setBoardingSelected(e);
                                    setProgramSelected([]);
                                }}
                                value={boardingSelected}
                                placeholder="Pilih Boarding"
                            />
                        </div>
                    </div>
                </Col>
                <Col md="6">
                    <div className="form-group">
                        <label className="form-label" htmlFor="program">
                            Program Boarding
                        </label>
                        <div className="form-control-wrap">
                            <RSelect
                                options={programOption}
                                onChange={(e) => {
                                    setFormData({...formData, program: e.value});
                                    setProgramSelected(e);
                                }}
                                value={programSelected}
                                placeholder="Pilih Program"
                            />
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
export default Program;