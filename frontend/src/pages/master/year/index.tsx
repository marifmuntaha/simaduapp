import React, {useEffect} from "react";
import {FormInput, PageBreadcrumb} from "@/components";
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
                <div className="lg:col-span-9">
                    <div className="card">
                        <div className="card-header">
                            <div className="flex justify-between items-center">
                                <h4 className="card-title">DATA TAHUN PELAJARAN</h4>
                            </div>
                        </div>
                        <div className="p-6">
                            <Grid data={[]} pagination={{limit: 10}} search={true} sort={true}/>
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-3">
                    <div className="card">
                        <div className="card-header">
                            <div className="flex justify-between items-center">
                                <h4 className="card-title">TAMBAH</h4>
                            </div>
                            <div className="mt-4">
                                <form>
                                    <FormInput label="Nama Tahun Pelajaran" labelClassName="mb-2" type="text" name="text" className="form-input" containerClass="mb-3" key="text"/>
                                    <FormInput label="Diskripsi" labelClassName="mb-2" type="text" name="text" className="form-input" containerClass="mb-3" key="text"/>
                                    <FormInput name="select" label="Input Select" type="select" containerClass="mb-3" labelClassName="mb-2" className="form-select" key="select" >
                                        <option defaultValue="selected">1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </FormInput>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Year;