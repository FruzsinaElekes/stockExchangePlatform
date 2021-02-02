import axios from 'axios';
import React, { useState, useEffect } from 'react';
import PortfolioItem from './PortfolioItem';
import Summary from './Summary';

export default function Portfolio() {
    const userId = 401;
    const [portfolioItems, setPortfolioItems] = useState([]);
    const [account, setAccount] = useState();

    useEffect(()=>{
        fetch(`http://localhost:8080/portfolio-items/${userId}`, {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Access-Control-Allow-Origin' : 'http://localhost:8080/portfolio-items'
                  }
            })
            .then(resp => resp.json())
            .then(data => setPortfolioItems(data))
            .catch(e => console.log(e))
        
        
        fetch(`http://localhost:8080/account/user/${userId}`, {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Access-Control-Allow-Origin' : 'http://localhost:8080/account/user'
                }
        })
        .then(resp => resp.json())
        .then(data => setAccount(data))
        .catch(e => console.log(e))

    }, [])

    return (
        <div>
            {account && <Summary account={account}></Summary>}
            {portfolioItems && portfolioItems.map(s => <PortfolioItem key={s.id} item={s}></PortfolioItem>)}
        </div>
    )
}
