import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import Card from './Card';
import { FavContext } from '../favourites/FavContext'
import { StockDataContext } from '../StockDataContext';


function FavouriteDiv(props) {
    const [favourites, addToFav, removeFromFav] = useContext(FavContext)
    return (
        <div>{(favourites.length === 0 | favourites.filter(f => f.symbol === props.symbol).length === 0) 
                    ? <FavButton onClick={()=>addToFav(props.stockdata)}>Follow</FavButton>
                    : <UnFavButton onClick={()=>removeFromFav(props.stockdata)}>Unfollow</UnFavButton>}
                    <TradeButton><StyledLink to={`/trade/${props.symbol}`}>TRADE</StyledLink></TradeButton>
        </div>)
}

export function StockHeader(props) {
    
    const stockData = props.data
    const getStockName = useContext(StockDataContext)[0]
    const getData = useContext(StockDataContext)[2]
    const companyName = getStockName(stockData.symbol);
    const priceData = getData(stockData.symbol)

    return (
        <Card>
            <SymbolHeader>
                {companyName &&
                <Symbol>{companyName} {" (" + stockData.symbol + ")"}</Symbol>}
                <FavouriteDiv stockdata={stockData} symbol={stockData.symbol}/>
                {priceData && <>
                <FloatDiv>{priceData.latestPrice}</FloatDiv>
                <FloatDiv>
                <ChangeDiv up={priceData.change >= 0}>
                    {(priceData.change >= 0 ? "+" : "") + Math.round(priceData.change * 100)/100 + " "}
                    {Math.round(priceData.changePercent * 10000)/100 + "%"}
                </ChangeDiv>
                </FloatDiv> </>}
            </SymbolHeader>
        </Card>
        )
    }


const SymbolHeader = styled.div`
    display: inline-block;
    float: none;
`

const Symbol = styled.div`
    font-size: 1.8em;
    font-weight: bold;
    margin: 5px;
`

const FloatDiv = styled.div`
    font-size: 1.2em;
    font-weight: bold;
    float: left;
    margin: 5px;
`
const ChangeDiv = styled.div`
    padding-top: 0.2em;
    font-size: 0.8em;
    color: green;
    vertical-align: bottom;

    ${({up}) => up === false && css`
        color: red;
    `}
`


const FavButton = styled.button`
    background-color: #21255e;
    color: white;
    font-weight: bolder;
    font-size: 1.2em;
    cursor: pointer;
`

const UnFavButton = styled.button`
    background-color: #47485e;
    color: white;
    font-weight: bolder;
    font-size: 1.2em;
    cursor: pointer;
`

const TradeButton = styled.button`
    background-color: #21255e;
    color: white;
    font-weight: bolder;
    font-size: 1.2em;
    cursor: pointer;
    margin: 5px;
`

const StyledLink = styled(Link)`
    color: white;
    text-decoration: none;
    & :visited{
        color: white;
        text-decoration: none
    }
`