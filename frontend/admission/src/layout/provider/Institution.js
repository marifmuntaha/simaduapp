import React, {createContext, useContext, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {showInstitutions} from "../../redux/institution/actions";


const InstitutionContext = createContext();
export function useInstitution() {
    return useContext(InstitutionContext);
}

const InstitutionProvider = ({ ...props }) => {
    const dispatch = useDispatch();
    const {institution} = useSelector((state) => state.institution);
    const [institute, setInstitute] = useState()

    useEffect(() => {
        dispatch(showInstitutions({id: process.env.REACT_APP_SERVICE_INSTITUTION}));
    }, []);

    useEffect(() => {
        setInstitute(institution);
    }, [institution]);
    return (
        <InstitutionContext.Provider value={institute}>
            {props.children}
        </InstitutionContext.Provider>
    )
}
export default InstitutionProvider