import React from 'react'

export default function History(props) {
    return (
        <div>
            History page for {props.match.params.symbol}
        </div>
    )
}
