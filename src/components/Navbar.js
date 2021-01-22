import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components';

export function Navbar(props) {

    return (
        <NavDiv className="navbar">
            <StyledLink to="/">Home</StyledLink>
            <StyledLink to="/favourites">Favourites</StyledLink>
        </NavDiv>
    )
}

const NavDiv = styled.div`
    height: 60px;
    background-color:#21255e;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
`

const StyledLink = styled(Link)`
    display: inline-block;
    font-family: source_sans_prosemibold, Helvetica, Arial, sans-serif;
    text-align: center;
    box-sizing: border-box; 
    text-decoration: none;
    font-size: 21px;
    font-weight: 500;
    width: 140px;
    color: #fff;
    padding-top: 1rem;
    padding-bottom: 1rem;
    height: 100%;
    align-content: center;
    text-shadow: 0px 2px 3px rgba(0,0,0,0.4),
                0px 6px 11px rgba(0,0,0,0.1),
                0px 12px 21px rgba(0,0,0,0.1);

    :hover {
        color:#21255e;
        background-color:#fff;
        transition-duration: 0.4s;
        transition-timing-function: ease;
        text-shadow: 0px 2px 3px rgba(0,0,0,0.4),
                0px 8px 13px rgba(0,0,0,0.1),
                0px 18px 23px rgba(0,0,0,0.1);
    }
`
