import React, {Fragment, useContext} from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';



export default function NavLinks() {
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
        <React.Fragment>
            <StyledLink to={process.env.REACT_APP_HOME_PAGE}>Home</StyledLink>
                <StyledLink to={process.env.REACT_APP_FAVOURITES_PAGE}>Favourites</StyledLink>
                {userData.loggedIn
                ?   <Fragment>
                        <StyledLink to={process.env.REACT_APP_TRADE_PAGE}>Trade</StyledLink>
                        <StyledLink to={process.env.REACT_APP_PORTFOLIO_PAGE}>Portfolio</StyledLink>
                        <StyledLink to={process.env.REACT_APP_HOME_PAGE} onClick={handleLogout}>Logout</StyledLink>
                    </Fragment>
                :   <Fragment>
                        <StyledLink to={process.env.REACT_APP_REGISTER_PAGE}>Register</StyledLink>
                        <StyledLink to={process.env.REACT_APP_LOGIN_PAGE}>Login</StyledLink>
                    </Fragment>
                }
                <StyledLink to={process.env.REACT_APP_ABOUT_PAGE}>About</StyledLink>
        </React.Fragment>
    )
}

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
    @media(max-width: 768px){
        height: 50px;
    }
`