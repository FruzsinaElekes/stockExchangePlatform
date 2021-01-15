
import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import {Chart, News, StockData, StockHeader, Video} from './detailedView';

export function DetailedView() {
    const [stockData, setStockData] = useState({});
    const [chartData, setChartData] = useState({});
    const {symbol} = useParams();
    
    //TODO: when switching between stocks it renders the previous stock page again
    // would a Context solve this?
    useEffect(() => {
        fetchStockData()
        fetchChartData()
    }, [symbol])

    function fetchStockData() {
        const stockCache = JSON.parse(sessionStorage.getItem(symbol))
        if (stockCache) setStockData(stockCache)
        else {
            axios.get(`https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=${process.env.REACT_APP_IEX_API_KEY}`)
            .then (res => {
                setStockData(res.data)
                sessionStorage.setItem(symbol, JSON.stringify(res.data))
            })
        }
    }

    function fetchChartData() {
        const chartCache = JSON.parse(sessionStorage.getItem(symbol + "ChartData"))
        if (chartCache) {
            setChartData({
                symbol: symbol,
                timeseries: chartCache.map(data => ({x: new Date(data.x), y: data.y}))
            })
        }
        else {
            axios.get(`https://cloud.iexapis.com/stable/stock/${symbol}/chart/1m?token=${process.env.REACT_APP_IEX_API_KEY}`)
            .then (res => {
                const data = res.data.map(daily => ({x: new Date(daily.date), y: daily.close}))
                setChartData({
                    symbol: symbol,
                    timeseries: data
                })
                sessionStorage.setItem(symbol + "ChartData", JSON.stringify(data))
            })
        }
    }

    return (
        <div>
            {stockData &&
                <React.Fragment>
                    <StockDiv>
                        <HeaderDiv><StockHeader data={stockData}></StockHeader></HeaderDiv>
                        <DataDiv><StockData data={stockData}></StockData></DataDiv>
                        <ChartDiv>
                            {chartData && <Chart chartdata={chartData}></Chart>}
                        </ChartDiv>
                    </StockDiv>
                    <Video symbol={symbol}></Video>
                    <News data={stockData}></News>
                </React.Fragment>
            }
        </div>
    )
}

const StockDiv = styled.div`
    display: grid;
    margin: auto;
    margin-top: 30px;
    width: 84vw;
    grid-template-columns: 42vw 42vw;
    grid-template-rows: auto auto;
`

const HeaderDiv = styled.div`
    grid-row: 1 / 2;
    grid-column: 1 / 3;
`

const DataDiv = styled.div`
    grid-row: 2 / 3;
    grid-column: 1 / 2;
`

const ChartDiv = styled.div`
    grid-row: 2 / 3;
    grid-column: 2 / 3;
`