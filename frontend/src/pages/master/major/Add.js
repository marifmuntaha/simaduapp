import React, {useState} from "react";
import {Button, Label, Modal, ModalBody, ModalHeader, Spinner} from "reactstrap";
import {actionType, Dispatch} from "../../../reducer";
import {RSelect} from "../../../components";

const Add = ({open, setOpen, setReload}) => {
    const [formData, setFormData] = useState({
        name: '',
        alias: '',
        desc: '',
        boarding: 0,
        program: ''
    });
    const [loading, setLoading] = useState(false);
    const [boardingSelected, setBoardingSelected] = useState([]);
    const boardingOption = [
        {value: 1, label: 'YA'},
        {value: 2, label: 'TIDAK'},
    ]
    const [programSelected, setProgramSelected] = useState([]);
    const programOption = [
        {value: 1, label: 'Tahfidz'},
        {value: 2, label: 'Kitab'},
    ]
    const handleFormInput = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }
    const toggle = () => {
        setOpen({
            add: false,
            edit: false
        });
        setFormData({
            name: '',
            alias: '',
            desc: '',
            boarding: 0,
            program: ''
        });
        setBoardingSelected([]);
        setProgramSelected([]);
    }
    return <>
        <Modal isOpen={open} toggle={toggle}>
            <ModalHeader>
                TAMBAH
            </ModalHeader>
            <ModalBody>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    Dispatch(actionType.MAJOR_STORE, {
                        formData: formData,
                        setLoading: setLoading,
                        setReload: setReload,
                        toggle: toggle
                    }).then()
                }}>
                    <div className="form-group">
                        <div className="form-control-wrap">
                            <Label htmlFor="name" className="form-label">
                                Nama
                            </Label>
                            <input
                                className="form-control"
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Ex. Ilmu Pengetahuan Alam"
                                onChange={(e) => handleFormInput(e)}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="form-control-wrap">
                            <Label htmlFor="alias" className="form-label">
                                Singkatan
                            </Label>
                            <input
                                className="form-control"
                                type="text"
                                id="alias"
                                name="alias"
                                placeholder="Ex. IPA"
                                onChange={(e) => handleFormInput(e)}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="form-control-wrap">
                            <Label htmlFor="desc" className="form-label">
                                Diskripsi
                            </Label>
                            <input
                                className="form-control"
                                type="text"
                                id="desc"
                                name="desc"
                                placeholder="Ex. Jurusan Ilmu Pengetahuan Alam"
                                onChange={(e) => handleFormInput(e)}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="boarding">
                            Boarding
                        </label>
                        <div className="form-control-wrap">
                            <RSelect
                                options={boardingOption}
                                onChange={(e) => {
                                    setFormData({...formData, boarding: e.value});
                                    setBoardingSelected(e);
                                }}
                                value={boardingSelected}
                                placeholder="Pilih Boarding"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="program">
                            Program Boarding
                        </label>
                        <div className="form-control-wrap">
                            <RSelect
                                isMulti
                                options={programOption}
                                onChange={(e) => {
                                    setFormData({...formData, program: JSON.stringify(e)});
                                    setProgramSelected(e);
                                }}
                                value={programSelected}
                                isDisabled={formData.boarding !== 1}
                                placeholder="Pilih Program"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <Button size="lg" className="btn-block" type="submit" color="primary">
                            {loading ? <Spinner size="sm" color="light"/> : "SIMPAN"}
                        </Button>
                    </div>
                </form>
            </ModalBody>
        </Modal>
    </>
}
export default Add;