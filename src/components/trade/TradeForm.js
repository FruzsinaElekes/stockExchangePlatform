import React from 'react';
import styled from 'styled-components';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { InputLabel } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';


export default function TradeForm(props) {
    let {symbol, symbolList, limitPrice, count, direction, handleChange, handleSubmit, selectSymbol} = props
    const [value, setValue] = React.useState(symbol? symbol : symbolList[0]);

    return (
        <StyledForm autoComplete="off">
            <label>Symbol:</label>
            
            <Autocomplete 
            options={symbolList}
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
                selectSymbol(newValue)
            }}

            renderInput={(params) => (
                <TextField
                {...params}
                label="Symbol"
                variant="outlined"
                name="symbol"
                />
            )}/>
            
            <label>Action:</label> 
            <FormControl>
                <InputLabel >Action</InputLabel>
                <Select label="Action" name="direction" value={direction} onChange={handleChange}>
                    <MenuItem value="-">-</MenuItem>
                    <MenuItem value="BUY">BUY</MenuItem>
                    <MenuItem value="SELL">SELL</MenuItem>
                </Select>
            </FormControl>
            <label>Stock Count:</label>
            <TextField 
                label="Stock Count" 
                id="standard-number" 
                name="count" 
                type="number" 
                value={count} 
                onChange={handleChange} 
                InputProps={{ inputProps: { min: 1, step: 1 } }}/>

            <label>Limit Price:</label>
            <TextField 
                label="Limit Price" 
                id="standard-number" 
                name="price" 
                type="number" 
                value={limitPrice} 
                onChange={handleChange} 
                InputProps={{ inputProps: { min: 0.01, step: 0.01 } }}/>
            {/* <input name="price" type="number" min="0" step="0.01" value={limitPrice} onChange={handleChange}></input> */}
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