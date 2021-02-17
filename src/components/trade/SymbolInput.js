import React from 'react';
import styled from 'styled-components';

export default function SymbolInput(props) {
    return (
        <React.Fragment>
            <div>
                <SearchDiv>
                    <input name="symbol" type="text" placeholder="start typeing then select!" value={props.value} onChange={props.handleChange}></input>
                </SearchDiv>
                <DropDownDiv>
                    <DropDownList leng={props.results.length}>
                        {props.results && props.results.map(symbol => <Choice key={symbol} onClick={()=>props.selectSymbol(symbol)}>{symbol}</Choice>)}
                    </DropDownList>
                </DropDownDiv>
            </div>
        </React.Fragment>
    )
}

const Choice = styled.li`
    width: 100%;
    list-style-type: none;
    padding: 2px;
     :hover{
        color: blue;
    }
`

const SearchDiv = styled.div`
    position: relative;
`

const DropDownDiv = styled.div`
    position: relative;
`

 const DropDownList = styled.div`
    display: ${props => props.leng > 0? "inline-block" : "none"};
    position: absolute;
    background-color: aliceblue;
    width: 100%;
    border: 2px solid #21255e;
    border-radius: 0 0 5px 5px;

 `