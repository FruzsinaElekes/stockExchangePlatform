import React from 'react'

export default function Summary(props) {
    return (
        <div>
            <p>Name: John Doe</p>
            <p>Balance: {props.account.balance} {props.account.currency}</p>
            <p>Stock: y USD</p>
            <p>Total worth: x + y USD</p>
        </div>
    )
}
