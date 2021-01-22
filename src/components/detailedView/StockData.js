import React from 'react'
import styled from 'styled-components';
import Card from './Card';

export function StockData(props) {
    const stockData = props.data
    const lastTrade = new Date(stockData.lastTradeTime)
    const marketCap = new Intl.NumberFormat().format(stockData.marketCap)
    const avgVolume = new Intl.NumberFormat().format(stockData.avgTotalVolume)
    return (
        <Card>
            <Table>
                <tbody>
                    <StyledTr><TdLeft>Current price</TdLeft><TdRight>{stockData.latestPrice}</TdRight></StyledTr>
                    <StyledTr><TdLeft>Previous close</TdLeft><TdRight>{stockData.previousClose}</TdRight></StyledTr>
                    <StyledTr><TdLeft>Market cap</TdLeft><TdRight>{marketCap}</TdRight></StyledTr>
                    <StyledTr><TdLeft>52 Week range</TdLeft><TdRight>{stockData.week52Low + " - "  + stockData.week52High}</TdRight></StyledTr>
                    <StyledTr><TdLeft>Average volume</TdLeft><TdRight>{avgVolume}</TdRight></StyledTr>
                    <StyledTr><TdLeft>P/E ratio</TdLeft><TdRight>{stockData.peRatio}</TdRight></StyledTr>
                    <StyledTr><TdLeft>Year-to-Date change</TdLeft><TdRight>{Math.round(stockData.ytdChange * 10000)/100 + "%"}</TdRight></StyledTr>
                    <StyledTr><TdLeft>Last trade time</TdLeft><TdRight>{lastTrade.toLocaleDateString() + " " + lastTrade.toLocaleTimeString()}</TdRight></StyledTr>
                </tbody>
            </Table>
        </Card>
    )
}

const TdLeft = styled.td`
    border-bottom: 1px solid #ddd;
    padding: 10px;
    text-align: left;
`

const TdRight = styled.td`
    border-bottom: 1px solid #ddd;
    text-align: right;
`
const StyledTr = styled.tr`

`
const Table = styled.table`
    @media (max-width: 768px){
        font-size: 1.2em;
        margin-left: auto;
    }
`
