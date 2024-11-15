import {createContext, useContext, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getSetting} from "../../redux/setting/actions";

const SettingContext = createContext();
export function useSetting() {
    return useContext(SettingContext);
}

const SettingProvider = ({...props}) => {
    const dispatch = useDispatch();
    const {settings} = useSelector((state) => state.setting);
    const [setting, setSetting] = useState([]);

    useEffect(() => {
        dispatch(getSetting({institution_id: process.env.REACT_APP_SERVICE_INSTITUTION}))
    }, [])

    useEffect(() => {
        setSetting(settings && settings[0]);
    }, [settings]);

    return (
        <SettingContext.Provider value={setting}>
            {props.children}
        </SettingContext.Provider>
    )
}

export default SettingProvider