import React, { useContext} from 'react';
import { FavContext } from './FavContext'
import FavItem from "./FavItem";



export function Favourites() {
    const [favourites, addToFav] = useContext(FavContext)
    return (
        <div style={favDivStyle}>
            {favourites.map(f => <FavItem data={f} key={f.symbol}/>)}
        </div>
    )
}

const favDivStyle = {
    maxWidth: "1000px",
    margin: "2em auto"
}