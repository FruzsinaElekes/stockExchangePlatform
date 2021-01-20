import React, {useState} from 'react';
import {Link} from 'react-router-dom'
import styled, { css } from 'styled-components';

export function SearchBar(props) {
    const symbolList = props.symbols
    const [results, setResults] = useState([]);

    const ResultItem = (props) => (
        <ListItem to={`/stock/${props.symbol}`} key={props.symbol}>{props.symbol}</ListItem>
    )

    const handleOnChange = (event) => {
        const searchTerm = event.target.value.toLowerCase()
        if (!searchTerm) {
            setResults([])
            return;
        }
        setResults(symbolList.filter(item => item.toLowerCase().includes(searchTerm)).slice(0, 10))
    }

    return (
        <WrapperDiv>
            <SearchDiv>
                <SearchField type="text" placeholder="Which stock are you looking for?" onChange={(e) => handleOnChange(e)}/>
                <SearchButton type="submit">
                <i className="fa fa-search"></i>
                </SearchButton>
            </SearchDiv>
            <DropDownDiv>
                <DropDownList>
                    {results && results.map(symbol => <ResultItem symbol={symbol} />)}
                </DropDownList>
            </DropDownDiv>
        </WrapperDiv>
    )
}

const WrapperDiv = styled.div`
    min-width: max(30%, 400px);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

const SearchDiv = styled.div`
    width: 100%;
    position: relative;
    display: flex;
`

const SearchField = styled.input`
    font-size: 23px;
    width: 100%;
    border: 3px solid #21255e;
    border-right: none;
    padding: 5px;
    height: 25px;
    border-radius: 5px 0 0 5px;
    outline: none;
    color: #151728;

    :focus{
        color: #21255e;
    }
`

const SearchButton = styled.button`
    width: 45px;
    height: 41px;
    border: 1px solid #21255e;
    background: #21255e;
    text-align: center;
    color: #fff;
    border-radius: 0 5px 5px 0;
    cursor: pointer;
    font-size: 25px;
 `

const DropDownDiv = styled.div`
    position: relative;
    display: inline-block;
`

 const DropDownList = styled.div`
    display: block;
    position: absolute;
    background-color: #f6f6f6;
    min-width: max(30%, 400px);
 `

const ListItem = styled(Link)`
    color: #151728;
    padding: 12px 16px;
    text-decoration: none;
    display: block;

    :hover {
        color: #009cf0;
    }
  `