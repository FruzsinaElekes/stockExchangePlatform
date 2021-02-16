import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = (props) => {
    const [userData, setUserData] = useState([{
        loggedIn: false,
        userName: undefined
    }])


    useEffect(() => {
    }, [])

    return (
        <UserContext.Provider value={[userData, setUserData]}>
            {props.children}
        </UserContext.Provider>
    )
}