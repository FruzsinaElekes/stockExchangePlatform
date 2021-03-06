import React, { useContext } from 'react'
import { StockDataContext } from '../StockDataContext';
import styled from 'styled-components';

export default function Summary(props) {

    const stockData = useContext(StockDataContext)[1]
    const accountBalance = props.user.account.balance
    let stockValue = 0
    
    const getStockPrice = (symbol) => {
        const [stock] = stockData.filter(s => s.symbol === symbol)
        return stock.latestPrice
    }

    if (stockData.length !== 0) {
        stockValue = props.user.portfolio.map(item => item.amount * getStockPrice(item.symbol)).reduce((a,b) => a + b, 0)
    }

    return (
        <Table>
            <tbody>
                <StyledTr><TdLeft>Name: </TdLeft><TdRight>{props.user.firstName} {props.user.lastName}</TdRight></StyledTr>
                <StyledTr><TdLeft>Balance: </TdLeft><TdRight>{accountBalance.toFixed(2)} {props.user.account.currency}</TdRight></StyledTr>
                <StyledTr><TdLeft>Stock: </TdLeft><TdRight>{stockValue.toFixed(2)} USD</TdRight></StyledTr>
                <StyledTr><TdLeft>Total worth: </TdLeft><TdRight>{(stockValue + accountBalance).toFixed(2)} USD</TdRight></StyledTr>
            </tbody>
        </Table>
    )
}


const TdLeft = styled.td`
    border-bottom: 1px solid #ddd;
    padding: 10px 10px 10px 0;
    text-align: left;
`

const TdRight = styled.td`
    border-bottom: 1px solid #ddd;
    padding: 10px;
    text-align: right;
`

const StyledTr = styled.tr`
`

const Table = styled.table`
    margin: 2em 0;
    @media (max-width: 768px){
        font-size: 1.3em;
        margin-right: auto;
    }
`