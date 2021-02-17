import React, { useContext } from 'react'
import { StockDataContext } from '../StockDataContext';
import styled from 'styled-components';

export default function Summary(props) {

    const stockData = useContext(StockDataContext)[1]
    const accountBalance = props.user.account.balance
    let stockValue
    
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
                <StyledTr><TdLeft>Balance: </TdLeft><TdRight>{accountBalance} {props.user.account.currency}</TdRight></StyledTr>
                {stockValue && <>
                <StyledTr><TdLeft>Stock: </TdLeft><TdRight>{stockValue} USD</TdRight></StyledTr>
                <StyledTr><TdLeft>Total worth: </TdLeft><TdRight>{stockValue + accountBalance} USD</TdRight></StyledTr>
                </>}
            </tbody>
        </Table>
    )
}


const TdLeft = styled.td`
    border-bottom: 1px solid #ddd;
    padding: 10px;
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
    border-spacing: 20px;
    @media (max-width: 768px){
        font-size: 1.2em;
        margin-left: auto;
    }
`