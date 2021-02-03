import React from 'react'

export default function Summary(props) {
    return (
        <div>
            <p>Name: {props.user.firstName} {props.user.lastName}</p>
            <p>Balance: {props.user.account.balance} {props.user.account.currency}</p>
            <p>Stock: y USD</p>
            <p>Total worth: x + y USD</p>
        </div>
    )
}
