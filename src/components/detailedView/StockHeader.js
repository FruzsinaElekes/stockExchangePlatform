import React from 'react'
import styled, { css } from 'styled-components';
import Card from './Card';

export function StockHeader(props) {
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
        </Card>
        )
    }


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