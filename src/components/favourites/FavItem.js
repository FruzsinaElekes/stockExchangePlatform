import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FavContext } from './FavContext';
import styled from 'styled-components';

export default function FavItem(props) {
    const [favourites, addToFav, removeFromFav, move] = useContext(FavContext)
    console.log(props.up)
    return (
        <React.Fragment>{favourites.length > 0 &&
            <Fav>
                <ButtonsUpDown>
                    <button onClick={() => move(props.data.symbol, -1)}><i class="fa fa-arrow-up"></i></button>
                    <button onClick={() => move(props.data.symbol, 1)}><i class="fa fa-arrow-down"></i></button>
                </ButtonsUpDown>
                <Content>
                    <div>
                        <Symbol to={`/stock/${props.data.symbol}`}>{props.data.symbol}</Symbol>
                        {props.up? <Icon up={props.up} className="fa fa-caret-up fa-lg"></Icon> : <Icon up={props.up} className="fa fa-caret-down fa-lg"></Icon>}                    
                        <UnFavButton onClick={()=>removeFromFav(props.data)}>Unfollow</UnFavButton>
                    </div>
                    <Details>
                        <Cell>
                            <p>Latest price</p>
                            <p>{props.data.latestPrice}</p>
                        </Cell>
                        <Cell>
                            <p>Change (%)</p>
                            <p>{Math.round(props.data.changePercent * 10000)/100 + "%"}</p>
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

const Cell = styled.div`
    width: 25%;
`

const Details = styled.div`
    display: flex;
    flex-direction:row;
    justify-content: space-evenly;
    width: 100%
`

