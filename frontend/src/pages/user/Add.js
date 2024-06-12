import React, {useState} from "react";
import {Button, Label, Modal, ModalBody, ModalHeader, Spinner} from "reactstrap";
import {Col, Row, RSelect} from "../../components";
import {useForm} from "react-hook-form";

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

    const roleOption = [
        {value: 1, label: 'Administrator'},
        {value: 2, label: 'Kepala Madrasah'},
        {value: 3, label: 'Wakil Kepala'},
        {value: 4, label: 'Guru'},
        {value: 5, label: 'Operator'},
        {value: 6, label: 'Bendahara'},
        {value: 7, label: 'Teller'},
        {value: 8, label: 'Siswa'},
        {value: 9, label: 'Orang Tua'}
    ];
    const onSubmit = () => {

    }
    const {
        register,
        handleSubmit,
        formState: {errors},
        getValues
    } = useForm()

    return (
        <>
            <Modal isOpen={open} toggle={toggle}>
                <ModalHeader>TAMBAH</ModalHeader>
                <ModalBody>
                    <form className="form-validate is-alter">
                        <Row className="gy-2">
                            <Col className="col-md-12">
                                <div className="form-group">
                                    <div className="form-control-wrap">
                                        <Label htmlFor="fullname" className="form-label">Nama Lengkap</Label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="fullname"
                                            placeholder="Ex. Arif Muntaha"
                                            {...register('fullname', {required: true})}
                                        />
                                    </div>
                                </div>
                            </Col>
                            <Col className="col-md-6">
                                <div className="form-group">
                                    <div className="form-control-wrap">
                                        <Label htmlFor="username" className="form-label">
                                            Nama Pengguna
                                        </Label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="username"
                                            placeholder="Ex. marifmuntaha"
                                        />
                                    </div>
                                </div>
                            </Col>
                            <Col className="col-md-6">
                                <div className="form-group">
                                    <div className="form-control-wrap">
                                        <Label htmlFor="email" className="form-label">
                                            Alamat Email
                                        </Label>
                                        <input
                                            className="form-control"
                                            type="email"
                                            id="email"
                                            placeholder="Ex. marifmuntaha@gmail.com"
                                        />
                                    </div>
                                </div>
                            </Col>
                            <Col className="col-md-6">
                                <div className="form-group">
                                    <div className="form-control-wrap">
                                        <Label htmlFor="password" className="form-label">
                                            Kata Sandi
                                        </Label>
                                        <input
                                            className="form-control"
                                            type="password"
                                            id="password"
                                            placeholder="Ex. *********"
                                        />
                                    </div>
                                </div>
                            </Col>
                            <Col className="col-md-6">
                                <div className="form-group">
                                    <div className="form-control-wrap">
                                        <Label htmlFor="repassword" className="form-label">
                                            Ulangi Sandi
                                        </Label>
                                        <input
                                            className="form-control"
                                            type="password"
                                            id="repassword"
                                            placeholder="Ex. *********"
                                        />
                                    </div>
                                </div>
                            </Col>
                            <Col className="col-md-6">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="role">
                                        Hak Akses
                                    </label>
                                    <div className="form-control-wrap">
                                        <RSelect
                                            options={roleOption}
                                            onChange={(e) => {
                                                setFormData({...formData, boarding: e.value});
                                                setBoardingSelected(e);
                                            }}
                                            value={boardingSelected}
                                            placeholder="Pilih Hak Akses"
                                        />
                                    </div>
                                </div>
                            </Col>
                            <Col className="col-md-6">
                                <div className="form-group">
                                    <div className="form-control-wrap">
                                        <Label htmlFor="phone" className="form-label">
                                            Nomor Handphone
                                        </Label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="phone"
                                            placeholder="082229366505"
                                        />
                                    </div>
                                </div>
                            </Col>
                            <Col className="col-md-12">
                                <div className="form-group">
                                    <div className="form-control-wrap">
                                        <Label htmlFor="image" className="form-label">
                                            Foto
                                        </Label>
                                        <input
                                            className="form-control"
                                            type="file"
                                            id="image"
                                        />
                                    </div>
                                </div>
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