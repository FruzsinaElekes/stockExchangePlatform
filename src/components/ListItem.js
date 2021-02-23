import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function ListItem(props) {
    const symbolData = props.symbol
    const stockRoute = process.env.REACT_APP_STOCK_PAGE

    const theme = {
        color: (symbolData && symbolData.changePercent >= 0) ? "green" : "red"
    }

    return (
        <React.Fragment>
            <Summary>
                <DetailsLink to={stockRoute + symbolData.symbol} >{symbolData.symbol}</DetailsLink>
                <div>{symbolData.latestPrice}</div>
                <div style={theme}>{Math.round(symbolData.changePercent * 10000)/100 + "%"}</div>
                <Tip className="tip">{symbolData.companyName}</Tip>
            </Summary>
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