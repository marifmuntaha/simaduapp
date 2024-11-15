import React, {useEffect} from "react";
import {Col, PreviewCard, Row, RSelect} from "../../../components";
import {Label} from "reactstrap";
import {Controller} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {getLevels} from "../../../redux/master/level/actions";

const Activity = ({control, errors, user}) => {
    const dispatch = useDispatch();
    const {levels} = useSelector((state) => state.level);
    const statusOption = [
        {value: 1, label: 'YA'},
        {value: 2, label: 'TIDAK'}
    ]
    useEffect(() => {
        dispatch(getLevels({ladder_id: user.institution.ladder_id, type: 'select'}))
    }, []);
    return <>
        <PreviewCard>
            <Row className="gy-2">
                <Col className="col-md-8">
                    <Row className="gy-2">
                        <Col className="col-md-6">
                            <div className="form-group">
                                <Label htmlFor="level_id" className="form-label">Tingkat</Label>
                                <div className="form-control-wrap">
                                    <input type="hidden" className="form-control" id="level_id"/>
                                    <Controller
                                        control={control}
                                        className="form-control"
                                        name="level_id"
                                        rules={{required: true}}
                                        render={({field: {onChange, value, ref}}) => (
                                            <RSelect
                                                inputRef={ref}
                                                options={levels}
                                                value={levels && levels.find((c) => c.value === value)}
                                                onChange={(val) => onChange(val.value)}
                                                placeholder="Pilih Tingkat"
                                            />
                                        )}/>
                                    {errors['level_id'] && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                </div>
                            </div>
                        </Col>
                        <Col className="col-md-6">
                            <div className="form-group">
                                <Label htmlFor="onemis" className="form-label">Masuk EMIS</Label>
                                <div className="form-control-wrap">
                                    <input type="hidden" className="form-control" id="onemis"/>
                                    <Controller
                                        control={control}
                                        className="form-control"
                                        name="onemis"
                                        rules={{required: true}}
                                        render={({field: {onChange, value, ref}}) => (
                                            <RSelect
                                                inputRef={ref}
                                                options={statusOption}
                                                value={statusOption.find((c) => c.value === value)}
                                                onChange={(val) => onChange(val.value)}
                                                placeholder="Pilih Provinsi"
                                            />
                                        )}/>
                                    {errors['onemis'] && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </PreviewCard>
    </>
}

export default Activity;