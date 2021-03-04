import React, { useState} from 'react'
import styled from 'styled-components';
import { slide as Menu } from 'react-burger-menu';
import '../../Nav.css'
import NavLinks from './NavLinks'
import useWindowSize from './useWindowSize';

export function Navbar(props) {
    const [width, height] = useWindowSize();
    const [isOpen, setIsOpen] = useState(false)
    
    const closeMenu = () => setIsOpen(false)
    const handleStateChange = (state) => { setIsOpen(state.isOpen)} 

    return (
        <Container>
            {width > 768? 
            <NavDiv className="navbar"><NavLinks menuType="nav"/></NavDiv>
            :<Menu onStateChange={state => handleStateChange(state)} 
            isOpen={isOpen} 
            className="burger">
                <NavLinks menuType="burger" closeMenu={closeMenu}/>
            </Menu>
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

