import React from 'react'
import styled from 'styled-components';


export default function Card(props) {
    return <CardDiv>{props.children}</CardDiv>
}

const CardDiv = styled.div`
    display: flex;
    box-sizing: border-box;
    height: 90%;
    margin: 20px;
    padding: 20px;
    border-radius: 2px;
    background: #fff;
    box-shadow: 0 1px 1px -1px rgba(0, 0, 0, .2), 0 2px 2px 0 rgba(0, 0, 0, .14), 0 1px 5px 0 rgba(0, 0, 0, .12);
`