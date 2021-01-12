import React from 'react'
import styled from 'styled-components';
import Card from './Card';

export default function StockData(props) {
    const stockData = props.data

    return (
        <Card>
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
        </Card>
    )
}