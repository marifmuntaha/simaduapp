import {Button, Col, PreviewCard, Row, RSelect, toastError, toastSuccess} from "../../../../components";
import {Form, Label, Spinner} from "reactstrap";
import {Controller, useForm} from "react-hook-form";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getPrograms} from "../../../../redux/master/program/actions";
import {useInstitution} from "../../../../layout/provider/Institution";
import {useSetting} from "../../../../layout/provider/Setting";
import {store as storeProgram} from "../../../../utils/api/studentProgram";

const Program = ({studentID}) => {
    const institution = useInstitution();
    const setting = useSetting();
    const dispatch = useDispatch();
    const {programs, success, error} = useSelector((state) => state.program);
    const {handleSubmit, formState: {errors}, control, watch, getValues, setValue} = useForm();
    const [programOptions, setProgramOptions] = useState([]);
    const [lockBoarding, setLockBoarding] = useState(false);
    const [loading, setLoading] = useState(false);
    const boardingOptions = [
        {value: "1", label: 'Boarding'},
        {value: "2", label: 'Non Boarding'},
    ]
    const handleSubmitForm = async () => {
        setLoading(true)
        const programParam = {
            student_id: studentID,
            program_id: getValues('program_id'),
            boarding: getValues('boarding'),
        }
        await storeProgram(programParam).then(resp => {
            toastSuccess(resp.data.message);
            setLoading(false);
        }).catch(error => {
            toastError(error);
            setLoading(false);
        });
    }

    useEffect(() => {
        dispatch(getPrograms({institution_id: institution && institution.id, year_id: setting.year_id}))
    }, []);

    useEffect(() => {
        setProgramOptions(programs.map(program => {
            return {value: program.id, label: program.name}
        }))
    }, [programs]);

    useEffect(() => {
        const program = programs.filter((program) => {
            return program.id === getValues('program_id');
        })
        if (program.length > 0 && program[0].boarding === "1") {
            setValue('boarding', "1");
            setLockBoarding(true);
        } else {
            setValue('boarding', 0);
            setLockBoarding(false);
        }
    }, [watch('program_id')])

    return (
        <PreviewCard>
            <Row className="gy-2">
                <Col className="col-md-8">
                    <Form className="is-alter" onSubmit={handleSubmit(handleSubmitForm)}>
                        <Row className="gy-2">
                            <Col className="col-md-6">
                                <div className="form-group">
                                    <Label htmlFor="program_id" className="form-label">Program Pilihan</Label>
                                    <div className="form-control-wrap">
                                        <input type="hidden" className="form-control" id="program_id"/>
                                        <Controller
                                            control={control}
                                            className="form-control"
                                            name="program_id"
                                            rules={{required: true}}
                                            render={({field: {onChange, value, ref}}) => (
                                                <RSelect
                                                    inputRef={ref}
                                                    options={programOptions}
                                                    value={programOptions.find((c) => c.value === value)}
                                                    onChange={(val) => onChange(val.value)}
                                                    placeholder="Pilih Program"
                                                />
                                            )}/>
                                        {errors.program_id && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                    </div>
                                </div>
                            </Col>
                            <Col className="col-md-6">
                                <div className="form-group">
                                    <Label htmlFor="boarding" className="form-label">Boarding</Label>
                                    <div className="form-control-wrap">
                                        <input type="hidden" className="form-control" id="boarding"/>
                                        <Controller
                                            control={control}
                                            className="form-control"
                                            name="boarding"
                                            rules={{required: true}}
                                            render={({field: {onChange, value, ref}}) => (
                                                <RSelect
                                                    inputRef={ref}
                                                    options={boardingOptions}
                                                    value={boardingOptions.find((c) => c.value === value)}
                                                    onChange={(val) => onChange(val.value)}
                                                    placeholder="Pilih Boarding"
                                                    isDisabled={lockBoarding}
                                                />
                                            )}/>
                                        {errors.boarding && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                    </div>
                                </div>
                            </Col>
                            <Col className="col-md-12 d-flex justify-content-end">
                                <Button className="col-3 text-center justify-content-center" type="submit" color="primary" size="md" disabled={loading}>
                                    {loading ? <Spinner size="sm" color="light"/> : <span>Simpan</span>}
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </PreviewCard>
    )
}

export default Program;