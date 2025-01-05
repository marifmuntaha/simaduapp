import {createContext, useContext, useEffect, useState} from "react";
import {get as getSetting} from "../../utils/api/setting";
import {toastError} from "../../components";

const SettingContext = createContext();
export function useSetting() {
    return useContext(SettingContext);
}

const SettingProvider = ({...props}) => {
    const [setting, setSetting] = useState({});

    useEffect(() => {
        getSetting({institution_id: process.env.REACT_APP_SERVICE_INSTITUTION})
            .then(resp => {
                const setting = resp.data.result[0];
                setting.year_id === undefined && alert('Silahkan mengatur tahun pelajaran terlebih dahulu.')
                setSetting(setting);
            }).catch(err => {
                toastError(err)
        }
    )}, []);

    return (
        <SettingContext.Provider value={setting}>
            {props.children}
        </SettingContext.Provider>
    )
}

export default SettingProvider