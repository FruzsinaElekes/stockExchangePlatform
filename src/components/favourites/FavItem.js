import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FavContext } from './FavContext';
import styled from 'styled-components';

export default function FavItem(props) {
    const [favourites, addToFav, removeFromFav] = useContext(FavContext)
    console.log(props.up)
    return (
        <React.Fragment>{favourites.length > 0 &&
            <Fav>
                <div>
                    <Symbol to={`/stock/${props.data.symbol}`}>{props.data.symbol}</Symbol>
                    {props.up? <Icon className="fa fa-caret-up fa-lg"></Icon> : <Icon className="fa fa-caret-down fa-lg"></Icon>}                    
                    <UnFavButton onClick={()=>removeFromFav(props.data)}>Unfollow</UnFavButton>
                </div>
                <Details>
                    <Cell>
                        <p>Latest price</p>
                        <p style={changeStyle}>{props.data.latestPrice}</p>
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
            </Fav>
        }    
        </React.Fragment>
    )
}

const Fav = styled.div`
    margin: 3em auto;
    border: 1px solid #21255e;
    padding-left: 20px;
    box-shadow: 5px 10px 5px #21255e;
`

const Symbol = styled(Link)`
    font-size: 2em;
    font-weight: bold;
    margin: 5px;
    float:left;
    text-decoration:none;
    color: black;
`

const Icon = styled.i`
    color: ${props => (!props.up) ? 'green' : 'darkred'};    
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
    /* text-align: center */
`

const changeStyle = {

}

const Details = styled.div`
    display: flex;
    flex-direction:row;
    justify-content: space-evenly;
    width: 100%
`

