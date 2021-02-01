
import React, { useState } from 'react'

export default function Trade(props) {

    const [symbol , setSymbol] = useState(props.match.params.symbol ? props.match.params.symbol : "");

    const handleSubmit = () => {
        console.log("send post request to backend, with body of form info");
    }

    const handleChange = (e) => {
        setSymbol(e.target.value);
    }

    return (
        <div>
            This is the trading page!

            <form onSubmit={handleSubmit}>
                <label>
                    Symbol: 
                    <input type="text" value={symbol} onChange={handleChange}></input>
                </label>
                <input type="submit" value="Submit" />

            </form>

        </div>
    )
}
