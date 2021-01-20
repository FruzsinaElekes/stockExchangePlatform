import React, { useContext } from 'react'
import { FavContext } from './FavContext'
import { StockHeader } from '../detailedView/StockHeader'
import styled from 'styled-components'

export default function FavItem(props) {
    const [favourites, addToFav, removeFromFav] = useContext(FavContext)
    
    return (
        <React.Fragment>{favourites.length > 0 &&
            <Fav>
                <div>
                    <Symbol>{props.data.symbol}</Symbol>
                    <UnFavButton onClick={()=>removeFromFav(props.data)}>Unfollow</UnFavButton>
                </div>
                <Details>
                    <Cell>
                        <p>Latest price</p>
                        <p style={changeStyle}>{props.data.latestPrice}</p>
                    </Cell>
                    <Cell>
                        <p>Change (%)</p>
                        <p>{props.data.changePercent}</p>
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
    margin: 2em auto;
    border-left: 2px solid gray;
    padding-left: 20px;
    /* display: flex;
    flex-direction:row */
`

const Symbol = styled.div`
    font-size: 2em;
    font-weight: bold;
    margin: 5px;
    float:left
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

