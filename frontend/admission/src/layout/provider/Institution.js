import React, {createContext, useContext, useEffect, useState} from "react";
import {show as showInstitution} from "../../utils/api/institution";


const InstitutionContext = createContext();
export function useInstitution() {
    return useContext(InstitutionContext);
}

const InstitutionProvider = ({ ...props }) => {
    const [institution, setInstitution] = useState([]);

    useEffect(() => {
        showInstitution({id: process.env.REACT_APP_SERVICE_INSTITUTION}).then(resp => {
            setInstitution(resp.data.result);
        }).catch(err => console.log(err));
    }, []);

    return (
        <InstitutionContext.Provider value={institution}>
            {props.children}
        </InstitutionContext.Provider>
    )
}
export default InstitutionProvider