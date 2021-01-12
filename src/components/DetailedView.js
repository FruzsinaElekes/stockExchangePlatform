import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import StockData from './detailedView/StockData';
import Video from './detailedView/Video';
import News from './detailedView/News';
import Graph from './detailedView/Graph';

export default function DetailedView(props) {
    const {symbol} = useParams();
    const [stockData, setStockData] = useState(null)

    useEffect(()=> {
        if (!JSON.parse(sessionStorage.getItem(symbol))){
            axios.get(`https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=${process.env.REACT_APP_IEX_API_KEY}`)
            .then (res => {
                setStockData(res.data)
                sessionStorage.setItem(symbol, JSON.stringify(res.data))
            })
            console.log(1)
        }
        else {
            setStockData(JSON.parse(sessionStorage.getItem(symbol)))
            console.log(2)
        }
    },[symbol])

    return (
        <div>
            <StockData data={stockData}></StockData>
            <Graph></Graph>
            <Video></Video>
            <News></News>
        </div>
    )
}
