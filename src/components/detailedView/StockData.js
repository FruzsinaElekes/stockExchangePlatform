import React from 'react'
import styled, { css } from 'styled-components';
import Card from './Card';

export function StockData(props) {
    const stockData = props.data
    return (
        <Card>
            <table>
                <tbody>
                    <tr><td>Current price</td><TdRight>{stockData.latestPrice}</TdRight></tr>
                    <tr><td>Previous close</td><TdRight>{stockData.previousClose}</TdRight></tr>
                    <tr><td>Market cap</td><TdRight>{stockData.marketCap}</TdRight></tr>
                    <tr><td>52 Week Range</td><TdRight>{stockData.week52Low + " - "  + stockData.week52High}</TdRight></tr>
                    <tr><td>Average volume</td><TdRight>{stockData.avgTotalVolume}</TdRight></tr>
                </tbody>
            </table>
        </Card>
    )
}

const TdRight = styled.td`
    text-align: right;
`
