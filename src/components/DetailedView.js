
import React, {useState, useEffect, useContext} from 'react'
import {useParams} from 'react-router-dom';
import styled from 'styled-components';
import {Chart, News, StockData, StockHeader, Video} from './detailedView';
import { StockDataContext } from './StockDataContext';


export function DetailedView() {
    const [stockInfo, setStockInfo] = useState(0)
    const {symbol} = useParams();
    const stockRoute = process.env.REACT_APP_ORIGIN + process.env.REACT_APP_STOCK_ROUTE
    
    useEffect(() => {
        fetch(stockRoute + symbol, {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                }
            })
            .then(resp => resp.json())
            .then(data => setStockInfo(data))
            .catch(e => console.log(e))
    }, [symbol])


    return (
        <DetailedContainer className="detailedContainer">
            {stockInfo !== 0 ?
                <React.Fragment>
                    <StockDiv>
                        <HeaderDiv>
                            <StockHeader data={stockInfo}></StockHeader>                          
                        </HeaderDiv>
                        <DataDiv><StockData data={stockInfo}></StockData></DataDiv>
                        <ChartDiv>
                            <Chart symbol={symbol} chartdata={stockInfo.stockPrices}></Chart>
                        </ChartDiv>
                    </StockDiv>
                    <Video videos={stockInfo.videoLinkList}></Video>
                    <News symbol={symbol} data={stockInfo.newsList}></News>
                </React.Fragment>
                : <React.Fragment>Loading</React.Fragment>
            }
        </DetailedContainer>
    )
}

const DetailedContainer = styled.div`
    width: 100%;
    display: block;
`

const StockDiv = styled.div`
    display: grid;
    margin: 2em auto;
    width: 84%;
    grid-template-columns: 50% 50%;
    grid-template-rows: auto auto;
    @media (max-width: 768px){
        grid-template-columns: 30% 70%;
    }
`

const HeaderDiv = styled.div`
    grid-row: 1 / 2;
    grid-column: 1 / 3;
    @media (max-width: 768px){
        margin-right:auto;
        grid-row: 2 / 3;
        grid-column: 1 / 2;
    }
`


const DataDiv = styled.div`
    grid-row: 2 / 3;
    grid-column: 1 / 2;
    @media (max-width: 768px){
        grid-row: 2 / 3;
        grid-column: 2 / 3;
    }
`

const ChartDiv = styled.div`
    grid-row: 2 / 3;
    grid-column: 2 / 3;
    @media (max-width: 768px){
        grid-row: 3 / 4;
        grid-column: 1 / 3;
    }
`