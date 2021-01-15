import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components';

export function Navbar(props) {

    const changeTheme = () => {
        if (props.currentTheme === 'light') {
            props.setTheme('dark')
        }
        else {
            props.setTheme('light')
        }
    }

    return (
        <NavDiv className="navbar">
            <Link to="/">Home</Link> | 
            <Link to="/favourites">Favourites</Link>
            <button onClick={changeTheme}>Change theme</button>
        </NavDiv>
    )
}

const NavDiv = styled.div`
    background-color: ${props => props.theme.color}
`
