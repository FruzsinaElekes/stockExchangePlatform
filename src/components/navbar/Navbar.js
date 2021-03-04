import React from 'react'
import styled from 'styled-components';
import { slide as Menu } from 'react-burger-menu';
import '../../Nav.css'
import NavLinks from './NavLinks'
import useWindowSize from './useWindowSize';

export function Navbar() {
    const [width, height] = useWindowSize();

    return (
        <Container>
            {width > 768? 
            <NavDiv className="navbar"><NavLinks/></NavDiv>
            :<Menu className="burger"><NavLinks/></Menu>
            }
        </Container>
    )
}


const Container = styled.div`
    height: 60px;
    width: 100%;
    background-color:#21255e;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
`

const NavDiv = styled.div`
    height: 100%;
    display: block;
    @media(max-width: 768px){
        display: none;
    }
`

