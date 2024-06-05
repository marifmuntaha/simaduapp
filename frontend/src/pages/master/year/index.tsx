import React, {useEffect} from "react";
import {PageBreadcrumb} from "@/components";
import {Grid} from "gridjs-react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/redux/store";
import {getYear} from "@/redux/year/actions.ts";

const Year = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {years} = useSelector((state: RootState) => ({
        years: state.Year
    }))
    const Column = [
        'Nama',
        'Diskripsi',
        'Aksi'
    ];
    useEffect(() => {
        dispatch(getYear())
        console.log(years);
    }, []);
    return (
        <>
            <PageBreadcrumb title="Tahun Pelajaran" subName="Master"/>
            <div className="grid lg:grid-cols-12 gap-4">
                <div className="lg:col-span-8">
                    <div className="card">
                        <div className="card-header">
                            <div className="flex justify-between items-center">
                                <h4 className="card-title">Data Tahun Pelajaran</h4>
                            </div>
                        </div>
                        <div className="p-6">
                            {/*<Grid data={dataTableRecords} pagination={{limit: 10}} search={true} sort={true}/>*/}
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-4">
                    <div className="card">
                        <div className="card-header">
                            <div className="flex justify-between items-center">
                                <h4 className="card-title">Tambah</h4>
                            </div>
                            <div className="p-6">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Year;