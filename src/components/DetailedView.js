
import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import StockData from './detailedView/StockData';
import Video from './detailedView/Video';
import News from './detailedView/News';
import Graph from './detailedView/Graph';


export default function DetailedView() {
    const [symbolDetails, setDetails] = useState({});
    const [chartData, setData] = useState({});
    const [isChartLoading, setChartLoading] = useState(true);
    const {symbol} = useParams();
    
    //TODO: when switching between stocks it renders the previous stock page again
    // would a Context solve this?
    useEffect(() => {
        const symbolCache = JSON.parse(sessionStorage.getItem(symbol))
        const chartCache = JSON.parse(sessionStorage.getItem(symbol + "ChartData"))
        if (symbolCache) setDetails(symbolCache)
        else {
            axios.get(`https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=${process.env.REACT_APP_IEX_API_KEY}`)
            .then (res => {
                setDetails(res.data)
                sessionStorage.setItem(symbol, JSON.stringify(res.data))
            })
        }
        if (chartCache) setData(chartCache)
        else {
            axios.get(`https://cloud.iexapis.com/stable/stock/${symbol}/chart/1m?token=${process.env.REACT_APP_IEX_API_KEY}`)
            .then (res => {
                const data = res.data.map(daily => ({x: new Date(daily.date), y: daily.close}))
                setData(data)
                setChartLoading(false)
                console.log(data)
                sessionStorage.setItem(symbol + "ChartData", JSON.stringify(data))
            })
        }
    }, [symbol])

    return (
        <div>
            {symbolDetails &&
            <React.Fragment>
            <StockDiv>
                <StyledStockData data={symbolDetails}></StyledStockData>
                {isChartLoading ? "" : <StyledGraph timeseries={chartData}></StyledGraph>}
            </StockDiv>
            <Video></Video>
            <News data={symbolDetails}></News>
            </React.Fragment>
            }
        </div>
    )
}

const StockDiv = styled.div`
    display: grid;
    margin: auto;
    width: 85vw;
    grid-template-columns: auto auto;
`

const StyledStockData = styled(StockData)`
    width: 40vw;
`

const StyledGraph = styled(Graph)`
    width: 40vw;
`