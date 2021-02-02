import React from 'react';
import {Link} from 'react-router-dom'


export default function PortfolioItem(props) {
    return (
        <div>
            <p>Symbol: {props.item.symbol}</p>
            <p>Amount: {props.item.amount}</p>
            <button><Link to={`/history/${props.item.symbol}`}>History</Link></button>
        </div>
    )
}
