import React from "react";
import {Block, BlockHead, BlockTitle} from "../../../../../components";
import moment from "moment";

const Parent = ({parent}) => {
    return (
        <Block>
            <BlockHead>
                <BlockTitle tag="h5">Informasi Orangtua</BlockTitle>
                <p>Info ayah kandung, ibu kandung dan wali siswa.</p>
            </BlockHead>
            <div className="profile-ud-list">
                <div className="profile-ud-item">
                    <div className="profile-ud wider">
                        <span className="profile-ud-label">Nomor KK</span>
                        <span className="profile-ud-value">{parent && parent.number_kk}</span>
                    </div>
                </div>
                <div className="profile-ud-item">
                    <div className="profile-ud wider">
                        <span className="profile-ud-label">Kepala Keluarga</span>
                        <span className="profile-ud-value">{parent && parent.head_family}</span>
                    </div>
                </div>
                <div className="profile-ud-item">
                    <div className="profile-ud wider">
                        <span className="profile-ud-label">Nama Ayah</span>
                        <span
                            className="profile-ud-value">{parent && parent.father_name}</span>
                    </div>
                </div>
                <div className="profile-ud-item">
                    <div className="profile-ud wider">
                        <span className="profile-ud-label">Nama Ibu</span>
                        <span className="profile-ud-value">{parent && parent.mother_name}</span>
                    </div>
                </div>
                <div className="profile-ud-item">
                    <div className="profile-ud wider">
                        <span className="profile-ud-label">NIK Ayah</span>
                        <span className="profile-ud-value">{parent && parent.father_nik}</span>
                    </div>
                </div>
                <div className="profile-ud-item">
                    <div className="profile-ud wider">
                        <span className="profile-ud-label">NIK Ibu</span>
                        <span className="profile-ud-value">{parent && parent.mother_nik}</span>
                    </div>
                </div>
                <div className="profile-ud-item">
                    <div className="profile-ud wider">
                        <span className="profile-ud-label">Tempat Lahir Ayah</span>
                        <span
                            className="profile-ud-value">{parent && parent.father_birthplace}</span>
                    </div>
                </div>
                <div className="profile-ud-item">
                    <div className="profile-ud wider">
                        <span className="profile-ud-label">Tempat Lahir Ibu</span>
                        <span
                            className="profile-ud-value">{parent && parent.mother_birthplace}</span>
                    </div>
                </div>
                <div className="profile-ud-item">
                    <div className="profile-ud wider">
                        <span className="profile-ud-label">Tanggal Lahir Ayah</span>
                        <span
                            className="profile-ud-value">{parent && moment(parent.father_birthdate).locale('id').format("D MMMM Y")}</span>
                    </div>
                </div>
                <div className="profile-ud-item">
                    <div className="profile-ud wider">
                        <span className="profile-ud-label">Tanggal Lahir Ibu</span>
                        <span
                            className="profile-ud-value">{parent && moment(parent.mother_birthdate).locale('id').format("D MMMM Y")}</span>
                    </div>
                </div>
                <div className="profile-ud-item">
                    <div className="profile-ud wider">
                        <span className="profile-ud-label">Telepon Ayah</span>
                        <span
                            className="profile-ud-value">{parent && parent.father_phone}</span>
                    </div>
                </div>
                <div className="profile-ud-item">
                    <div className="profile-ud wider">
                        <span className="profile-ud-label">Telepon Ibu</span>
                        <span
                            className="profile-ud-value">{parent && parent.mother_phone}</span>
                    </div>
                </div>
                <div className="profile-ud-item">
                    <div className="profile-ud wider">
                        <span className="profile-ud-label">Email Ayah</span>
                        <span
                            className="profile-ud-value">{parent && parent.father_email}</span>
                    </div>
                </div>
                <div className="profile-ud-item">
                    <div className="profile-ud wider">
                        <span className="profile-ud-label">Email Ibu</span>
                        <span
                            className="profile-ud-value">{parent && parent.mother_email}</span>
                    </div>
                </div>
            </div>
        </Block>
    )
}

export default Parent;