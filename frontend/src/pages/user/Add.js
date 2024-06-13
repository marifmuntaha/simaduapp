import React, {useEffect, useState} from "react";
import {Button, Label, Modal, ModalBody, ModalHeader, Spinner} from "reactstrap";
import {Col, Row, RSelect} from "../../components";
import {Controller, useForm} from "react-hook-form";

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

    const [programSelected, setProgramSelected] = useState([]);

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
        getValues,
        control
    } = useForm();

    useEffect(() => {
        console.log(getValues('role'))
    }, [getValues])
    return (
        <>
            <Modal isOpen={open} toggle={toggle}>
                <ModalHeader>TAMBAH</ModalHeader>
                <ModalBody>
                    <form className="form-validate is-alter" onSubmit={handleSubmit(onSubmit)}>
                        <Row className="gy-2">
                            <Col className="col-md-12">
                                <div className="form-group">
                                    <Label htmlFor="fullname" className="form-label">Nama Lengkap</Label>
                                    <div className="form-control-wrap">
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="fullname"
                                            placeholder="Ex. Arif Muntaha"
                                            {...register('fullname', {required: true})}
                                        />
                                        {errors.fullname && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                    </div>
                                </div>
                            </Col>
                            <Col className="col-md-6">
                                <div className="form-group">
                                    <Label htmlFor="username" className="form-label">Nama Pengguna</Label>
                                    <div className="form-control-wrap">

                                        <input
                                            className="form-control"
                                            type="text"
                                            id="username"
                                            placeholder="Ex. marifmuntaha"
                                            {...register('email', {
                                                required: true,
                                                pattern: {
                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                    message: "Alamat email tidak valid.",
                                                },
                                            })}
                                        />
                                        {errors.email && errors.email.type === "required" && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                        {errors.email && errors.email.type === "pattern" && (
                                            <span className="invalid">{errors.email.message}</span>
                                        )}
                                    </div>
                                </div>
                            </Col>
                            <Col className="col-md-6">
                                <div className="form-group">
                                    <Label htmlFor="email" className="form-label">Alamat Email</Label>
                                    <div className="form-control-wrap">
                                        <input
                                            className="form-control"
                                            type="email"
                                            id="email"
                                            placeholder="Ex. marifmuntaha@gmail.com"
                                            {...register('email', {required: true})}
                                        />
                                        {errors.username && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                    </div>
                                </div>
                            </Col>
                            <Col className="col-md-6">
                                <div className="form-group">
                                    <Label htmlFor="password" className="form-label">Kata Sandi</Label>
                                    <div className="form-control-wrap">
                                        <input
                                            className="form-control"
                                            type="password"
                                            id="password"
                                            placeholder="Ex. *********"
                                            {...register('password', {required: true})}
                                        />
                                        {errors.password && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                    </div>
                                </div>
                            </Col>
                            <Col className="col-md-6">
                                <div className="form-group">
                                    <Label htmlFor="repassword" className="form-label">Ulangi Sandi</Label>
                                    <div className="form-control-wrap">
                                        <input
                                            className="form-control"
                                            type="password"
                                            id="repassword"
                                            placeholder="Ex. *********"
                                            {...register('repassword', {
                                                required: true,
                                                validate: (val) => {
                                                    if (getValues('password') !== val){
                                                        return 'Sandi tidak sama.'
                                                    }
                                                }
                                            })}
                                        />
                                        {errors.repassword && errors.repassword.type === "required" && <span className="invalid">Kolom tidak boleh kosong.</span>}
                                        {errors.repassword && errors.repassword.type === "validate" && (
                                            <span className="invalid">{errors.repassword.message}</span>
                                        )}
                                    </div>
                                </div>
                            </Col>
                            <Col className="col-md-6">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="role">
                                        Hak Akses
                                    </label>
                                    <div className="form-control-wrap">
                                        <div className="form-control-select">
                                        <Controller
                                            control={control}
                                            name="role"
                                            render={({ field: {onChange, value, ref, name}}) => (
                                            <RSelect
                                                inputRef={ref}
                                                options={roleOption}
                                                value={roleOption.find((c) => c.value === value)}
                                                onChange={(val) => onChange(val.value)}
                                                placeholder="Pilih Hak Akses"
                                            />
                                        )}/>
                                        </div>
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