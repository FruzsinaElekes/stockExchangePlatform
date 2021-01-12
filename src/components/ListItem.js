import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ListItem(props) {
    const [symbolData, setSymbolData] = useState(null)

    useEffect(()=> {
        if (!sessionStorage.getItem(props.symbol)){
            axios.get(`https://cloud.iexapis.com/stable/stock/${props.symbol}/quote?token=${process.env.REACT_APP_IEX_API_KEY}`)
            .then (res => {
                console.log("fetching")
                setSymbolData(res.data)
                sessionStorage.setItem(props.symbol, res.data)
            })
        }
    }, [])

    return (
        <React.Fragment>
            {symbolData && 
            <div>
                <div>{symbolData.symbol}</div>
                <div>{symbolData.latestPrice}</div>
                <div>{symbolData.change} ({Math.round(symbolData.changePercent * 1000)/1000})</div>
            </div>}
        </React.Fragment>
    )
}
