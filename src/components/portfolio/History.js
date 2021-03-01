import React from 'react';
import styled from 'styled-components';
import HistoryItem from './HistoryItem';
import { Link } from 'react-router-dom';

export default History = React.forwardRef((props, ref) => (
    <ModalContent>
        <Title>Transaction history for stock: <Symbol to={process.env.REACT_APP_STOCK_PAGE + props.symbol}>{props.symbol}</Symbol></Title>
        <HistoryTable>
            <Header>
                <tr>
                <HeaderCell>Date</HeaderCell>
                <HeaderCell>Action</HeaderCell>
                <HeaderCell>Amount</HeaderCell>
                <HeaderCell>Stock Price</HeaderCell>
                <HeaderCell>Balance change ({props.currency})</HeaderCell>
                <HeaderCell>Stock Count After</HeaderCell>
                <HeaderCell>Balance After ({props.currency})</HeaderCell>
                </tr>
            </Header>
            <tbody>
                {props.transactions && props.transactions.sort(compare).map(h => <HistoryItem key={h.id} transaction={h}></HistoryItem>)}
            </tbody>
        </HistoryTable>
        </ModalContent>
))

const compare = (a, b) => Date.parse(a.transactionTime) > Date.parse(b.transactionTime) ? -1 : 1;

const ModalContent = styled.div`
    overflow: auto;
    max-height: 50vh;
    padding: 2em;
    background-color:white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

const Header = styled.thead`
    border-bottom: 2px solid black;
    border-top: 2px solid black;

`

const HistoryTable = styled.table`
    margin: 2em auto 0;
    border-collapse: collapse;
    padding: 0 3em;
    &:last-child{
        border-bottom: 2px solid black;
    }

`

const Title = styled.div`
    font-size: 1.5em;
    font-weight: bold;
    text-align: center
`

const HeaderCell = styled.th`
    text-align: center;
    padding: 1em 2em;
    border-bottom: 1px solid black;
    border-top: 1px solid black;
    border-collapse: collapse;
`

const Symbol = styled(Link)`
    color: #21255e;
    &:visited{
        color: #21255e;
    }
`