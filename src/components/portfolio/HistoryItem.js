import React from 'react';
import styled from 'styled-components';

export default function HistoryItem({transaction}) {
    return (
        <React.Fragment>
            <tr>
                <DataCell>{transaction.transactionTime.slice(0, transaction.transactionTime.indexOf(".")).replace("T", " ")}</DataCell>
                <DataCell>{transaction.stockChange < 0 ? "SELL": "BUY"}</DataCell>
                <DataCell>{Math.abs(transaction.stockChange)}</DataCell>
                <DataCell>{transaction.stockPrice}</DataCell>
                <DataCell>{transaction.accountBalanceChange}</DataCell>
            </tr>
        </React.Fragment>
    )
}


const DataCell = styled.td`
    text-align: center;
    padding: 1em 2em;
`