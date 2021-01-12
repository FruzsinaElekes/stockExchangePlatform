import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

export default function StockData(props) {

    const [stockData, setStockData] = useState(null)
    const {symbol} = useParams();

    // const theme = {
    //     color: (symbolData && symbolData.change >= 0) ? "green" : "red"
    // }

    useEffect(()=> {
        if (!sessionStorage.getItem(symbol) || !stockData){
            axios.get(`https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=${process.env.REACT_APP_IEX_API_KEY}`)
            .then (res => {
                setStockData(res.data)
                sessionStorage.setItem(symbol, res.data)
            })
        }
    })

    return (
        <DataHolder>
            {stockData &&
            <div>
                {stockData.symbol}
                <div>{stockData.latestPrice}</div>
                <div>{stockData.previousClose}</div>
                <div>{stockData.marketCap}</div>
                <div>{stockData.week52High}</div>
                <div>{stockData.week52Low}</div>
                <div>{stockData.avgTotalVolume}</div>
            </div>
            }
        </DataHolder>
    )
}

const DataHolder = styled.div`
    position: relative;
    display: block;
    margin-bottom: 20px;
    padding: 24px;
    border-radius: 2px;
    background: #fff;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, .2), 0 2px 2px 0 rgba(0, 0, 0, .14), 0 1px 5px 0 rgba(0, 0, 0, .12);
`