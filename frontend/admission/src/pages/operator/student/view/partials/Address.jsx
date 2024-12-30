import React, {useEffect, useState} from "react";
import {Block, BlockHead, BlockTitle, toastError} from "../../../../../components";

const Address = ({address}) => {
    const [province, setProvince] = useState([]);
    const [district, setDistrict] = useState([]);
    const [subdistrict, setSubdistrict] = useState([]);
    const [village, setVillage] = useState([]);
    useEffect(() => {
        fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/province/${address.province_id}.json`).then(response => response.json())
            .then(resp => {
                setProvince(resp);
            }).catch(err => {
            toastError(err)
        });
        fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regency/${address.district_id}.json`).then(response => response.json())
            .then(resp => {
                setDistrict(resp);
            }).catch(err => {
            toastError(err)
        });
        fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/district/${address.subdistrict_id}.json`).then(response => response.json())
            .then(resp => {
                setSubdistrict(resp);
            }).catch(err => {
            toastError(err)
        });
        fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/village/${address.village_id}.json`).then(response => response.json())
            .then(resp => {
                setVillage(resp);
            }).catch(err => {
            toastError(err)
        })
    }, [address]);
    return (
        <Block>
            <BlockHead>
                <BlockTitle tag="h5">Informasi Tempat Tinggal</BlockTitle>
                <p>Info ayah kandung, ibu kandung dan wali siswa.</p>
            </BlockHead>
            <div className="profile-ud-list">
                <div className="profile-ud-item">
                    <div className="profile-ud wider">
                        <span className="profile-ud-label">Provinsi</span>
                        <span className="profile-ud-value">{province && province.name}</span>
                    </div>
                </div>
                <div className="profile-ud-item">
                    <div className="profile-ud wider">
                        <span className="profile-ud-label">Kabupaten/Kota</span>
                        <span className="profile-ud-value">{district && district.name}</span>
                    </div>
                </div>
                <div className="profile-ud-item">
                    <div className="profile-ud wider">
                        <span className="profile-ud-label">Kecamatan</span>
                        <span
                            className="profile-ud-value">{subdistrict && subdistrict.name}</span>
                    </div>
                </div>
                <div className="profile-ud-item">
                    <div className="profile-ud wider">
                        <span className="profile-ud-label">Desa/Kelurahan</span>
                        <span className="profile-ud-value">{village && village.name}</span>
                    </div>
                </div>
                <div className="profile-ud-item">
                    <div className="profile-ud wider">
                        <span className="profile-ud-label">Alamat</span>
                        <span className="profile-ud-value">{address && address.address}</span>
                    </div>
                </div>
            </div>
        </Block>
    )
}

export default Address;