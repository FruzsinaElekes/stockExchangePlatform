import React from 'react'
import styled from 'styled-components';


export default function Card(props) {
    return <CardDiv>{props.children}</CardDiv>
}

const CardDiv = styled.div`
    display: flex;
    box-sizing: border-box;
    height: 100%;
    padding: 20px;
    border-radius: 2px;
    background: #fff;
    border-bottom: 5px solid #cfcfcf;
`