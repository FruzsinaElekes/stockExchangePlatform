import React from 'react'

export default function HistoryItem({transaction}) {
    return (
        <div>
            <p>Symbol: {transaction.symbol}</p>
            <p>Action: {transaction.stockChange < 0 ? "SELL": "BUY"}</p>
            <p>Amount: {Math.abs(transaction.stockChange)}</p>
            <p>Price: {transaction.stockPrice}</p>
            <p>Balance change: {transaction.accountBalanceChange}</p>
            <p>Date: {transaction.transactionTime}</p>
            <p></p>
        </div>
    )
}
