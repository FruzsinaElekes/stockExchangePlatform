
import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import {Chart, News, StockData, StockHeader, Video} from './detailedView';
import {stockList} from '../stocks';


export function DetailedView() {
    const [stockInfo, setStockInfo] = useState(0)
    const {symbol} = useParams();

    
    useEffect(() => {
        fetch(`http://localhost:8080/stock/${symbol}`, {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Access-Control-Allow-Origin' : 'http://localhost:8080/'
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
                            <StockHeader data={stockInfo} names={stockList}></StockHeader>                          
                        </HeaderDiv>
                        <DataDiv><StockData data={stockInfo}></StockData></DataDiv>
                        <ChartDiv>
                            <Chart symbol={symbol} chartdata={stockInfo.stockPrices}></Chart>
                        </ChartDiv>
                    </StockDiv>
                    <Video symbol={symbol}></Video>
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