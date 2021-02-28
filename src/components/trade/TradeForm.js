import React from 'react';
import styled from 'styled-components';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { InputLabel } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';


export default function TradeForm(props) {
    let {symbol, symbolList, limitPrice, count, direction, handleChange, handleSubmit, selectSymbol, notAllValid} = props
    const [value, setValue] = React.useState(symbol? symbol : symbolList[0]);
    selectSymbol(value)
    

    return (
        <StyledForm autoComplete="off">
            <Autocomplete 
            className="item"
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
                name="symbol"
                />
            )}/>
            
            <FormControl className="item" >
                <InputLabel >Action</InputLabel>
                <Select label="Action" name="direction" value={direction} onChange = {handleChange}>
                    <MenuItem value="-">-</MenuItem>
                    <MenuItem value="BUY">BUY</MenuItem>
                    <MenuItem value="SELL">SELL</MenuItem>
                </Select>
            </FormControl>
            <TextField 
                className="item"
                label="Stock Count" 
                name="count" 
                type="number" 
                value={count} 
                onChange={handleChange}
                InputProps={{ inputProps: { min: 1, step: 1 } }}/>

            <TextField 
                className="item"
                label="Limit Price" 
                name="price" 
                type="number" 
                value={limitPrice} 
                onChange={handleChange}
                InputProps={{ inputProps: { min: 0.01, step: 0.01 } }}/>
            <Button disabled={notAllValid} onClick={handleSubmit} color="primary" variant="contained" >Trade!</Button>

        </StyledForm>
    )
}


const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    margin: -1em, auto;
    > .item {
        width: 80%;
        margin: 1em auto;
    }
`
