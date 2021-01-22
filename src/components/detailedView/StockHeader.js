import React, {useContext} from 'react'
import styled, { css } from 'styled-components';
import Card from './Card';
import { FavContext } from '../favourites/FavContext'


function FavouriteDiv(props) {
    const [favourites, addToFav, removeFromFav] = useContext(FavContext)
    return (
        <div>{(favourites.length === 0 | favourites.filter(f => f.symbol === props.symbol).length === 0) 
                    ? <FavButton onClick={()=>addToFav(props.stockdata)}>Follow</FavButton>
                    : <UnFavButton onClick={()=>removeFromFav(props.stockdata)}>Unfollow</UnFavButton>}
        </div>)
}

export function StockHeader(props) {
    const stockData = props.data
    const stockList = props.names

    return (
        <Card>
            <SymbolHeader>
                <Symbol>{stockList[stockData.symbol]} {" (" + stockData.symbol + ")"}</Symbol>
                <FavouriteDiv stockdata={stockData} symbol={stockData.symbol}/>
                <FloatDiv>{stockData.latestPrice}</FloatDiv>
                <FloatDiv>
                <ChangeDiv up={stockData.change >= 0}>
                    {(stockData.change >= 0 ? "+" : "") + stockData.change + " "}
                    {Math.round(stockData.changePercent * 10000)/100 + "%"}
                </ChangeDiv>
                </FloatDiv>
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

const Name = styled.span`
    font-size: 15px;
    color: grey;
    padding-top: 1rem;
    padding-bottom: 1rem;
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