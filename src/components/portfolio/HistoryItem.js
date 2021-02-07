import React from 'react';
import styled from 'styled-components';

export default function HistoryItem({transaction}) {
    const stockChangeAbs = Math.abs(transaction.stockChange)
    return (
        <React.Fragment>
            <tr>
                <DataCell>{transaction.transactionTime.slice(0, transaction.transactionTime.indexOf(".")).replace("T", " ")}</DataCell>
                <DataCell>{transaction.stockChange < 0 ? "SELL": "BUY"}</DataCell>
                <DataCell>{stockChangeAbs}</DataCell>
                <DataCell>{transaction.stockPrice}</DataCell>
                <DataCell>{(transaction.stockPrice * transaction.stockChange).toFixed(2)}</DataCell>
                <DataCell>{transaction.stockCountAfter}</DataCell>
                <DataCell>{transaction.balanceAfter}</DataCell>
            </tr>
        </React.Fragment>
    )
}


const DataCell = styled.td`
    text-align: center;
    padding: 1em 2em;
`