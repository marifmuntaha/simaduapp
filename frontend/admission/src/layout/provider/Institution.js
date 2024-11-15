import React, {createContext, useContext, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getInstitutions} from "../../redux/institution/actions";


const InstitutionContext = createContext();
export function useInstitution() {
    return useContext(InstitutionContext);
}

const InstitutionProvider = ({ ...props }) => {
    const dispatch = useDispatch();
    const {institutions} = useSelector((state) => state.institution);
    const [institution, setInstitution] = useState([]);

    useEffect(() => {
        dispatch(getInstitutions({id: process.env.REACT_APP_SERVICE_INSTITUTION}));
    }, []);

    useEffect(() => {
        setInstitution(institutions);
    }, [institutions]);
    return (
        <InstitutionContext.Provider value={institution}>
            {props.children}
        </InstitutionContext.Provider>
    )
}
export default InstitutionProvider