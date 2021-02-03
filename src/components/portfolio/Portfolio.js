import axios from 'axios';
import React, { useState, useEffect } from 'react';
import PortfolioItem from './PortfolioItem';
import Summary from './Summary';

export default function Portfolio() {
    const userId = 401;
    const [user, setUser] = useState(0)

    useEffect(()=>{
        fetch(`http://localhost:8080/user/${userId}`, {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Access-Control-Allow-Origin' : 'http://localhost:8080/user'
                  }
            })
            .then(resp => resp.json())
            .then(data => {
                setUser(data)
                let filtered = data.orders.filter(o => o.symbol === "BB" && o.status === 'COMPLETED').map(o => o.stockTransaction)
                console.log(typeof filtered)
                console.log(filtered)
            })
            .catch(e => console.log(e))
    }, [])

    return (
        <div>
            empty
            {user !== 0 ? <Summary user={user}></Summary> : "Loading"}
            {user !== 0 ? user.portfolio.map(s => <PortfolioItem 
                key={s.id} 
                item={s} 
                transactions={user.orders.filter(o => o.symbol === s.symbol && o.status === 'COMPLETED').map(o => o.stockTransaction)}></PortfolioItem>)
                : "Loading"}
        </div>
    )
}
