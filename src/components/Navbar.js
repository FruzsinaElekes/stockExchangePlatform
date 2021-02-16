import React, { useContext, Fragment } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components';
import { UserContext } from './UserContext';

export function Navbar(props) {
    const [userData, setUserData] = useContext(UserContext)

    const handleLogout = () => {
        setUserData({
            loggedIn: false,
            username: undefined
        })
        removeCookie("access_token")
    }

    const removeCookie = (name) => {
        document.cookie = `${name}= ; expires = Thu, 01 Jan 1970 00:00:00 GMT`
    }

    return (
        <NavDiv className="navbar">
            <StyledLink to="/">Home</StyledLink>
            <StyledLink to="/favourites">Favourites</StyledLink>
            {userData.loggedIn &&
            <Fragment>
                <StyledLink to="/trade">Trade</StyledLink>
                <StyledLink to="/portfolio">Portfolio</StyledLink>
                <StyledLink to="/register">Register</StyledLink>
                <StyledLink to="/logout" onClick={handleLogout}>Logout</StyledLink>
            </Fragment>
            }
            {!userData.loggedIn &&
                <StyledLink to="/login">Login</StyledLink>
            }
        </NavDiv>
    )
}

const NavDiv = styled.div`
    height: 60px;
    background-color:#21255e;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
    @media(max-width: 768px){
        font-size:1.5em;
    }
`

const StyledLink = styled(Link)`
    display: inline-block;
    font-family: source_sans_prosemibold, Helvetica, Arial, sans-serif;
    text-align: center;
    box-sizing: border-box; 
    text-decoration: none;
    font-size: 1.2em;
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
