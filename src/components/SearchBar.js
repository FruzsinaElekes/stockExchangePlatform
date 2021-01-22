import React, {useState} from 'react';
import {Link} from 'react-router-dom'
import styled from 'styled-components';
import img1 from '../themes/modern-business-buildings.jpg';

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
        <BackGround>
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
        </BackGround>
    )
}

const WrapperDiv = styled.div`
    position: absolute;
    min-width: 768px;
    top: 50%;
    left: 50%;
    transform: translate(-25%, -50%);
    @media (max-width: 768px){
        top: 50%;
        left: 0%;
        transform: none;
    }
    
`

const SearchDiv = styled.div`
    position: relative;
    display: flex;
    width: max(30%, 400px);
    @media (max-width: 768px){
        left: 50%;
        transform: translate(-50%, 0%);
    }
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
    background-color: rgba(255, 255, 255, 0.8);
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

const BackGround = styled.div`
    display: flex;
    background-image: url(${img1});
    background-size: cover;
    background-repeat: no-repeat;
    min-width: 768px;
    height: 80vh;
    width: 100vw;
`