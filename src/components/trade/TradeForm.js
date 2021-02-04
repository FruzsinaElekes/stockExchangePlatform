import React from 'react';
import styled from 'styled-components';


export default function TradeForm(props) {
    let {symbol, limitPrice, count, direction, handleChange, handleSubmit} = props
    return (
        <StyledForm>
            <label>Symbol:</label>
            <input name="symbol" type="text" value={symbol} onChange={handleChange}></input>
            <label>Action:</label> 
            <select name="direction" value={direction} onChange={handleChange}>
                <option value="SELL">SELL</option>
                <option value="BUY">BUY</option>
                <option value="-">---</option>
            </select>
            <label>Stock Count:</label>
            <input name="count" type="number" min="0" value={count} onChange={handleChange}></input>
            <label>Limit Price:</label>
            <input name="price" type="number" min="0" value={limitPrice} onChange={handleChange}></input>
            <TradeButton type="button" onClick={handleSubmit}>Trade!</TradeButton>

        </StyledForm>
    )
}


const StyledForm = styled.form`
    display: grid;
    grid-template-columns: 4fr 1fr;
    gap: 1em;
    padding: 2em;
`

const TradeButton = styled.button`
    grid-row: 5 / 6;
    grid-column: 1 / 3;
    background-color: #47485e;
    color: white;
    font-weight: bolder;
    font-size: 1.2em;
    cursor: pointer;
    margin: 5px;
    width: 30%;
    justify-self: center
`