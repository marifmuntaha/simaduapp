import React from "react";
import {Block, BlockHead, BlockTitle} from "../../../../../components";

const Program = ({program}) => {
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
                        <span className="profile-ud-value">{program && program.number_kk}</span>
                    </div>
                </div>
                <div className="profile-ud-item">
                    <div className="profile-ud wider">
                        <span className="profile-ud-label">Kepala Keluarga</span>
                        <span className="profile-ud-value">{program && program.head_family}</span>
                    </div>
                </div>
            </div>
        </Block>
    )
}

export default Program;