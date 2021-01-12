import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import StockData from './detailedView/StockData';
import Video from './detailedView/Video';
import News from './detailedView/News';
import Graph from './detailedView/Graph';

export default function DetailedView(props) {
    const {symbol} = useParams();
    const [isLoading, setLoading] = useState(true)
    const [stockData, setStockData] = useState(null)

    useEffect(()=> {
        if (!JSON.parse(sessionStorage.getItem(symbol))){
            axios.get(`https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=${process.env.REACT_APP_IEX_API_KEY}`)
            .then (res => {
                setStockData(res.data)
                sessionStorage.setItem(symbol, JSON.stringify(res.data))
            })
        }
        else {
            setStockData(JSON.parse(sessionStorage.getItem(symbol)))
        }
        setLoading(false)
    },[symbol])

    return (
        isLoading ? <div>Loading...</div> :
        <div>
            <StockDiv>
                <StyledStockData data={stockData}></StyledStockData>
                <StyledGraph></StyledGraph>
            </StockDiv>
            <Video></Video>
            <News></News>
        </div>
    )
}

const StockDiv = styled.div`
    display: grid;
    margin: auto;
    width: 80vw;
    grid-template-columns: auto auto;
`

const StyledStockData = styled(StockData)`
    width: 40vw;
`

const StyledGraph = styled(Graph)`
    width: 40vw;
`