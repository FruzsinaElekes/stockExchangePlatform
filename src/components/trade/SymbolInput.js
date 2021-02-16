import React from 'react';
import styled from 'styled-components';

export default function SymbolInput(props) {
    return (
        <React.Fragment>
            <div>
                <SearchDiv>
                    <input name="symbol" type="text" value={props.value} onChange={props.handleChange}></input>
                </SearchDiv>
                <DropDownDiv>
                    <DropDownList>
                        {props.results && props.results.map(symbol => <Choice onClick={()=>props.selectSymbol(symbol)}>{symbol}</Choice>)}
                    </DropDownList>
                </DropDownDiv>
            </div>
        </React.Fragment>
    )
}

const Choice = styled.li`
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
    display: block;
    position: absolute;
    background-color: rgba(255, 255, 255);
    width: 150px;
    display: inline-block;
    /* border: 2px solid #21255e;
    border-radius: 0 0 3px 3px; */

 `