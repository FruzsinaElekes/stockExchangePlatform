import React from 'react'
import styled, { css } from 'styled-components';
import Card from './Card';

export function StockHeader(props) {
    const stockData = props.data
    return (
        <Card>
            <SymbolHeader>
                <Symbol>{stockData.symbol}</Symbol>
                <FloatDiv>{stockData.latestPrice}</FloatDiv>
                <FloatDiv>
                <ChangeDiv up={stockData.change >= 0}>
                    {stockData.change + " "}
                    {Math.round(stockData.changePercent * 10000)/100 + "%"}
                </ChangeDiv>
                </FloatDiv>
            </SymbolHeader>
        </Card>
        )
    }


const SymbolHeader = styled.div`
    display: inline-block;
    float: none;
`

const Symbol = styled.div`
    font-size: 2em;
    font-weight: bold;
    margin: 5px;
`

const FloatDiv = styled.div`
    font-size: 1.2em;
    font-weight: bold;
    float: left;
    margin: 5px;
`
const ChangeDiv = styled.div`
    padding-top: 0.2em;
    font-size: 0.8em;
    color: green;
    vertical-align: bottom;

    ${({up}) => up === false && css`
        color: red;
    `}
`