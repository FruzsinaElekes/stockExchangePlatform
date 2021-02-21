import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FavContext } from './FavContext';
import styled from 'styled-components';
import { StockDataContext } from '../StockDataContext';

export default function FavItem(props) {
    const [favourites, addToFav, removeFromFav, move] = useContext(FavContext)
    const getData = useContext(StockDataContext)[2]
    const priceData = getData(props.data.symbol)
    const up = priceData ? priceData.change >= 0 : false;
    const tradeRoute = process.env.REACT_APP_TRADE_PAGE
    const stockRoute = process.env.REACT_APP_STOCK_PAGE

    return (
        <React.Fragment>{favourites.length > 0 &&
            <Fav>
                <ButtonsUpDown>
                    <button onClick={() => move(props.data.symbol, -1)}><i className="fa fa-arrow-up"></i></button>
                    <button onClick={() => move(props.data.symbol, 1)}><i className="fa fa-arrow-down"></i></button>
                </ButtonsUpDown>
                <Content>
                    <div>
                        <Symbol to={stockRoute + props.data.symbol}>{props.data.symbol}</Symbol>
                        {up? <Icon up={up} className="fa fa-caret-up fa-lg"></Icon> : <Icon up={up} className="fa fa-caret-down fa-lg"></Icon>}                    
                        <UnFavButton onClick={()=>removeFromFav(props.data)}>Unfollow</UnFavButton>
                        <TradeButton><StyledLink to={tradeRoute + "/" + props.data.symbol}>TRADE</StyledLink></TradeButton>
                    </div>
                    { priceData &&
                    <Details>
                        <Cell>
                            <p>Latest price</p>
                            <p>{priceData.latestPrice}</p>
                        </Cell>
                        <Cell>
                            <p>Change (%)</p>
                            <p>{Math.round(priceData.changePercent * 10000)/100 + "%"}</p>
                        </Cell>
                        <Cell>
                            <p>Previous close</p>
                            <p>{props.data.previousClose}</p>
                        </Cell>
                        <Cell>
                            <p>Average volume</p>
                            <p>{props.data.avgTotalVolume}</p>
                        </Cell>
                        <Cell>
                            <p>Market cap</p>
                            <p>{props.data.marketCap}</p>
                        </Cell>
                    </Details>
                    }
                </Content>
            </Fav>
        }    
        </React.Fragment>
    )
}

const Fav = styled.div`
    margin: 3em auto;
    border: 1px solid #21255e;
    box-shadow: 5px 10px 5px #21255e;
    display: flex;
    flex-direction: row;
    @media (max-width: 768px) {
        font-size: 1.2em;
        width: 75%;
        margin: 3em auto;
    }
`

const ButtonsUpDown = styled.div`
    display:flex;
    padding: 20px;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly
`

const Content = styled.div`
    padding-left: 20px;
    width: 100%
`

const Symbol = styled(Link)`
    font-size: 2em;
    font-weight: bold;
    float:left;
    text-decoration:none;
    color: black;
`

const Icon = styled.i`
    color: ${props => props.up? 'green' : 'darkred'};    
`

const UnFavButton = styled.button`
    background-color: #47485e;
    color: white;
    font-weight: bolder;
    font-size: 1.2em;
    cursor: pointer;
    float: right;
    margin: 5px;
`

const TradeButton = styled.button`
    background-color: #21255e;
    color: white;
    font-weight: bolder;
    font-size: 1.2em;
    cursor: pointer;
    float: right;
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

const Cell = styled.div`
    width: 25%;
    @media (max-width: 768px) {
        width: 75%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        > p {
            margin: 3px;
        }
    }
`

const Details = styled.div`
    display: flex;
    flex-direction:row;
    justify-content: space-evenly;
    width: 100%;
    @media (max-width: 768px) {
        flex-direction: column;
    }
`

