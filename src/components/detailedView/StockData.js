import React from 'react'
import styled, { css } from 'styled-components';
import Card from './Card';

export default function StockData(props) {
    const stockData = props.data
    return (
        <Card>
            <SymbolHeader>
                <FloatDiv>
                    <div>{stockData.symbol}</div>
                    <div>{stockData.latestPrice}</div>
                </FloatDiv>
                <FloatDiv>
                    <ChangeDiv up={stockData.change >= 0}>{stockData.change}</ChangeDiv>
                    <ChangeDiv up={stockData.change >= 0}>{Math.round(stockData.changePercent * 10000)/100 + "%"}</ChangeDiv>
                </FloatDiv>
            </SymbolHeader>
            <div>
                <table>
                    <tr><td>Current price</td><TdRight>{stockData.latestPrice}</TdRight></tr>
                    <tr><td>Previous close</td><TdRight>{stockData.previousClose}</TdRight></tr>
                    <tr><td>Market cap</td><TdRight>{stockData.marketCap}</TdRight></tr>
                    <tr><td>52 Week Range</td><TdRight>{stockData.week52Low + " - "  + stockData.week52High}</TdRight></tr>
                    <tr><td>Average volume</td><TdRight>{stockData.avgTotalVolume}</TdRight></tr>
                </table>
            </div>
        </Card>
    )
}

const TdRight = styled.td`
    text-align: right;
`

const SymbolHeader = styled.div`
    display: inline-block;
    float: none;
`

const FloatDiv = styled.div`
    font-size: 1em;
    font-weight: bold;
    float: left;
    margin: 5px;
`

const ChangeDiv = styled.div`
    color: green;

    ${({up}) => up === false && css`
        color: red;
    `}
`