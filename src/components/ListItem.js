import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

export default function ListItem(props) {
    const [symbolData, setSymbolData] = useState(null)

    const theme = {
        color: (symbolData && symbolData.change >= 0) ? "green" : "red"
    }

    useEffect(()=> {
        if (!sessionStorage.getItem(props.symbol) || !symbolData){
            axios.get(`https://cloud.iexapis.com/stable/stock/${props.symbol}/quote?token=${process.env.REACT_APP_IEX_API_KEY}`)
            .then (res => {
                setSymbolData(res.data)
                sessionStorage.setItem(props.symbol, JSON.stringify(res.data))
            })
        }
    }, [])

    return (
        <React.Fragment>
            {symbolData &&
            <Summary>
                <DetailsLink to={`/stock/${symbolData.symbol}`} >{symbolData.symbol}</DetailsLink>
                <div>{symbolData.latestPrice}</div>
                <div style={theme}>{symbolData.change} ({Math.round(symbolData.changePercent * 10000)/100 + "%"})</div>
                <Tip className="tip">{symbolData.companyName}</Tip>
            </Summary>}
        </React.Fragment>
    )
}

const Tip = styled.span`
  visibility: hidden;
  width: 120px;
  background-color: #555;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;
  position: absolute;
  z-index: 1;
  bottom: 110%;
  left: 50%;
  margin-left: -60px;
  opacity: 0;
  transition: opacity 0.3s;
`

const Summary = styled.div`
    /* width: 100px; */
    margin: 1em;
    position: relative;
    display: inline-block;
    &:hover ${Tip} {
        visibility: visible;
        opacity: 1;
    }

`

const DetailsLink = styled(Link)`
    font-weight:bold;
    text-decoration: none;
    &:hover {
        text-decoration: underline
    }
    &:visited {
        color: blue;
    }
`