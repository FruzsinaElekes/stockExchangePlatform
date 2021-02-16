import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = (props) => {
    const data = props.symbols
    const [userData, setUserData] = useState([{
        loggedIn: false,
        userName: undefined
    }])


    useEffect(() => {
    }, [])

    return (
        <UserContext.Provider value={[data]}>
            {props.children}
        </UserContext.Provider>
    )
}