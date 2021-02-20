import React, { useState, useEffect, useContext, Fragment } from 'react';
import PortfolioItem from './PortfolioItem';
import Summary from './Summary';
import { UserContext } from '../UserContext';
import styled from 'styled-components';


export default function Portfolio() {
    const userData = useContext(UserContext)[0]
    const [user, setUser] = useState(0)
    const userRoute = process.env.REACT_APP_ORIGIN + process.env.REACT_APP_USER_ROUTE

    useEffect(()=>{
        if (document.cookie) {
            const token = document.cookie.split('; ').find(row => row.startsWith('access_token=')).split('=')[1];
            fetch(userRoute, {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/json;charset=utf-8'
                    }
                })
                .then(resp => resp.json())
                .then(data => setUser(data))
                .catch(e => console.log(e))
        }
    }, [])

    return (

        <Fragment>
        {userData.loggedIn &&
            <PortfolioDiv>
                {user !== 0 ? <Summary user={user}></Summary> : "Loading"}
                {user !== 0 ? user.portfolio.map(s => <PortfolioItem 
                    key={s.id} 
                    item={s} 
                    currency={user.account.currency}
                    transactions={user.userHistoryList.filter(o => o.symbol === s.symbol)}></PortfolioItem>)
                    : "Loading"}
            </PortfolioDiv>}
        </Fragment>
    )
}


const PortfolioDiv = styled.div`
    margin: auto;
    width: 50%
`