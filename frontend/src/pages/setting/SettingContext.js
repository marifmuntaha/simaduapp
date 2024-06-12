import React, { useState, createContext } from "react";
import { Outlet } from "react-router-dom";

export const SettingContext= createContext({});

export const MemberProvider = () => {
    const [setting, setSetting] = useState([]);

    return <SettingContext.Provider value={{setting, setSetting}}>
        <Outlet />
    </SettingContext.Provider>;
};
