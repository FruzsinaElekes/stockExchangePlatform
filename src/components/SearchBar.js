import React from 'react'
import styled, { css } from 'styled-components';

export default function SearchBar() {
    return (
        <WrapperDiv>
            <SearchDiv>
                <SearchField type="text" placeholder="Wich stock are you looking for?"/>
                <SearchButton type="submit">
                <i className="fa fa-search"></i>
                </SearchButton>
            </SearchDiv>
        </WrapperDiv>
    )
}

const WrapperDiv = styled.div`
    width: max(30%, 400px);
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