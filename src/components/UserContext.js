import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = (props) => {
    const [userData, setUserData] = useState({
        loggedIn: false,
        userName: undefined
    })

    useEffect(() => {
        if (document.cookie) {
            const token = document.cookie.split('; ').find(row => row.startsWith('access_token=')).split('=')[1];
            if (token) {
                setUserData({loggedIn: true, userName: undefined})
            }
        }
    }, [])

    return (
        <UserContext.Provider value={[userData, setUserData]}>
            {props.children}
        </UserContext.Provider>
    )
}