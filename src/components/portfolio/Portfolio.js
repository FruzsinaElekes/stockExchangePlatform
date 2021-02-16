import React, { useState, useEffect, useContext, Fragment } from 'react';
import PortfolioItem from './PortfolioItem';
import Summary from './Summary';
import { UserContext } from '../UserContext';
import styled from 'styled-components';


export default function Portfolio() {
    let userId = process.env.REACT_APP_USER_ID;
    const [userData, setUserData] = useContext(UserContext)
    const [user, setUser] = useState(0)

    useEffect(()=>{
        const token = document.cookie.split('; ').find(row => row.startsWith('access_token=')).split('=')[1];
        fetch(`http://localhost:8080/user/${userId}`, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json;charset=utf-8'
                  }
            })
            .then(resp => resp.json())
            .then(data => setUser(data))
            .catch(e => console.log(e))
    }, [])

    return (
        <Fragment>
        {userData.loggedIn &&
            <PortfolioDiv>
                {user !== 0 ? <Summary user={user}></Summary> : "Loading"}
                {user !== 0 ? user.portfolio.map(s => <PortfolioItem 
                    key={s.id} 
                    item={s} 
                    transactions={user.orders.filter(o => o.symbol === s.symbol && o.status === 'COMPLETED').map(o => o.stockTransaction)}></PortfolioItem>)
                    : "Loading"}
            </PortfolioDiv>}
        </Fragment>
    )
}


const PortfolioDiv = styled.div`
    margin: auto;
    width: 50%
`