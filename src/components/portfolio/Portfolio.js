import React, { useState, useEffect, useContext, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import PortfolioItem from './PortfolioItem';
import Summary from './Summary';
import { UserContext } from '../UserContext';
import styled from 'styled-components';


export default function Portfolio() {
    const userData = useContext(UserContext)[0]
    const [redirect, setRedirect] = useState(false)
    const [user, setUser] = useState(0)
    const userRoute = process.env.REACT_APP_ORIGIN + process.env.REACT_APP_USER_ROUTE
    const loginRoute = process.env.REACT_APP_LOGIN_PAGE


    useEffect(()=>{
        if (document.cookie) {
            const token = document.cookie.split('; ').find(row => row.startsWith('access_token=')).split('=')[1];
            fetch(userRoute, {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/json;charset=utf-8'
                    }
                })
                .then(handleBadRequest)
                .then(resp => resp.json())
                .then(data => setUser(data))
                .catch(e => console.log(e))
        }
    }, [])

    const handleBadRequest = (response) => {
        if (!response.ok) {
            if (response.status === 403) {
                setRedirect(true)
            }
            throw Error(response.statusText)
        }
        else {
            return response
        }
    }

    return (

        <Fragment>
        {redirect && <Redirect to={loginRoute} />}
        {userData.loggedIn &&
            <PortfolioDiv>
                {user !== 0 ? 
                <React.Fragment>
                    <Summary user={user} />
                    {user.portfolio.filter(p => p.amount > 0).map(s => 
                        <PortfolioItem 
                            key={s.id} 
                            item={s} 
                            currency={user.account.currency}
                            transactions={user.userHistoryList.filter(o => o.symbol === s.symbol)} />)
                        }
                    {user.portfolio.filter(item => item.amount === 0).length >= 1 ? 
                        <React.Fragment> 
                            <h2>Previously owned items</h2>
                            {user.portfolio.filter(p => p.amount === 0).map(s => 
                                <PortfolioItem 
                                    key={s.id} 
                                    item={s} 
                                    currency={user.account.currency}
                                    transactions={user.userHistoryList.filter(o => o.symbol === s.symbol)} />)
                                }
                        </React.Fragment> : <React.Fragment/>}
                </React.Fragment> : "Loading"}
            </PortfolioDiv>}
        </Fragment>
    )
}


const PortfolioDiv = styled.div`
    margin: auto;
    width: 50%
`