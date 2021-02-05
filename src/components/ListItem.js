import React, { useState, useEffect, useContext } from 'react';
import { StockDataContext } from './StockDataContext';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function ListItem(props) {
    const [symbolData, setSymbolData] = useState(null)
    const [stockData] = useContext(StockDataContext)

    const theme = {
        color: (symbolData && symbolData.change >= 0) ? "green" : "red"
    }

    useEffect(()=> {
        axios.get(`http://localhost:8080/quote/${props.symbol}`)
        .then (res => {
            setSymbolData(res.data)
        })
    }, [])

    return (
        <React.Fragment>
            {symbolData &&
            <Summary>
                <DetailsLink to={`/stock/${symbolData.symbol}`} >{symbolData.symbol}</DetailsLink>
                <div>{stockData}</div>
                <div>{symbolData.latestPrice}</div>
                <div style={theme}>{Math.round(symbolData.changePercent * 10000)/100 + "%"}</div>
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
    width: 100px;
    margin: 1em;
    position: relative;
    display: inline-block;
    &:hover ${Tip} {
        visibility: visible;
        opacity: 1;
    }

`

const DetailsLink = styled(Link)`
    text-decoration: none;
    font-weight:bold;
    color: #21255e;
    :hover {
        text-decoration: underline
    }
    :visited {
        color: #21255e;
    }
`