import React from "react";
import {Block, BlockHead, BlockTitle} from "../../../../../components";
import moment from "moment";

const Personal = ({student}) => {
    return (
        <Block>
            <BlockHead>
                <BlockTitle tag="h5">Informasi Pribadi</BlockTitle>
                <p>Info dasar, seperti nama dan alamat Anda Pendaftar.</p>
            </BlockHead>
            <div className="profile-ud-list">
                <div className="profile-ud-item">
                    <div className="profile-ud wider">
                        <span className="profile-ud-label">Nama Lengkap</span>
                        <span className="profile-ud-value">{student && student.name}</span>
                    </div>
                </div>
                <div className="profile-ud-item">
                    <div className="profile-ud wider">
                        <span className="profile-ud-label">NISN</span>
                        <span className="profile-ud-value">{student && student.nisn}</span>
                    </div>
                </div>
                <div className="profile-ud-item">
                    <div className="profile-ud wider">
                        <span className="profile-ud-label">Tempat</span>
                        <span
                            className="profile-ud-value">{student && student.birthplace}</span>
                    </div>
                </div>
                <div className="profile-ud-item">
                    <div className="profile-ud wider">
                        <span className="profile-ud-label">NIK</span>
                        <span className="profile-ud-value">{student && student.nik}</span>
                    </div>
                </div>
                <div className="profile-ud-item">
                    <div className="profile-ud wider">
                        <span className="profile-ud-label">Tanggal Lahir</span>
                        <span
                            className="profile-ud-value">{student && moment(student.birthdate).locale('id').format("D MMMM Y")}</span>
                    </div>
                </div>
                <div className="profile-ud-item">
                    <div className="profile-ud wider">
                        <span className="profile-ud-label">Email Address</span>
                        <span className="profile-ud-value">{student && student.email}</span>
                    </div>
                </div>
                <div className="profile-ud-item">
                    <div className="profile-ud wider">
                        <span className="profile-ud-label">Jenis Kelamin</span>
                        <span
                            className="profile-ud-value">{student && student.gender === "L" ? "Laki-laki" : "Perempuan"}</span>
                    </div>
                </div>
                <div className="profile-ud-item">
                    <div className="profile-ud wider">
                        <span className="profile-ud-label">Nomor Telepon</span>
                        <span
                            className="profile-ud-value">{student && student.phone}</span>
                    </div>
                </div>
                <div className="profile-ud-item">
                    <div className="profile-ud wider">
                        <span className="profile-ud-label">Anak Ke-</span>
                        <span
                            className="profile-ud-value">{student && student.orderborn}</span>
                    </div>
                </div>
                <div className="profile-ud-item">
                    <div className="profile-ud wider">
                        <span className="profile-ud-label">Jumlah Saudara</span>
                        <span
                            className="profile-ud-value">{student && student.sibling}</span>
                    </div>
                </div>
            </div>
        </Block>
    )
}

export default Personal;