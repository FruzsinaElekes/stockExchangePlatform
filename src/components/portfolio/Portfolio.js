import axios from 'axios';
import React, { useState, useEffect } from 'react';
import PortfolioItem from './PortfolioItem';
import Summary from './Summary';

export default function Portfolio() {
    const userId = 401;
    const [portfolioItems, setPortfolioItems] = useState([])

    useEffect(()=>{
        fetch(`http://localhost:8080/portfolio-items/${userId}`, {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Access-Control-Allow-Origin' : 'http://localhost:8080/portfolio-items'
                  },
            })
        .then(resp => resp.json())
        .then(data => setPortfolioItems(data))
        .catch()
    }, [])

    return (
        <div>
            <Summary></Summary>
            {portfolioItems.map(s => <PortfolioItem item={s}></PortfolioItem>)}
        </div>
    )
}
