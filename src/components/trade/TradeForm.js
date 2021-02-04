import React from 'react'

export default function TradeForm(props) {
    let {symbol, limitPrice, count, direction, handleChange, handleSubmit} = props
    return (
        <form>
            <div><label>
                Symbol: 
                <input name="symbol" type="text" value={symbol} onChange={handleChange}></input>
            </label></div>
            <div><label>
                Action: 
                <select name="direction" value={direction} onChange={handleChange}>
                    <option value="SELL">SELL</option>
                    <option value="BUY">BUY</option>
                    <option value="-">---</option>
                </select>
            </label></div>
            <div><label>
                Stock Count: 
                <input name="count" type="number" value={count} onChange={handleChange}></input>
            </label></div>
            <div><label>
                Limit Price: 
                <input name="price" type="number" value={limitPrice} onChange={handleChange}></input>
            </label></div>

            <button type="button" onClick={handleSubmit}>Trade!</button>

        </form>
    )
}
