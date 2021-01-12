import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

export default function ListItem(props) {
    const [symbolData, setSymbolData] = useState(null)

    const theme = {
        color: (symbolData && symbolData.change >= 0) ? "green" : "red"
    }

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
                <Link to={`/stock/${symbolData.symbol}`} >{symbolData.symbol}</Link>
                <div>{symbolData.latestPrice}</div>
                <div style={theme}>{symbolData.change} ({Math.round(symbolData.changePercent * 1000)/1000})</div>
            </div>}
        </React.Fragment>
    )
}
