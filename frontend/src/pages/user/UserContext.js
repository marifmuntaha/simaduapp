import React, { useState, createContext } from "react";
import { Outlet } from "react-router-dom";

export const UserContext= createContext({});

export const MemberProvider = () => {
    const [user, setUser] = useState([]);

    return <UserContext.Provider value={{user, setUser}}>
        <Outlet />
    </UserContext.Provider>;
};
