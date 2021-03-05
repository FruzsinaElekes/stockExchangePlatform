import React, { useContext} from 'react';
import { FavContext } from './FavContext'
import FavItem from "./FavItem";



export function Favourites() {
    const [ favourites ] = useContext(FavContext)
    return (
        <div style={favDivStyle}>
            {favourites.length === 0? 
            <p style ={messageStyle}>No items added to the favourites yet</p>
            :favourites.map(f => <FavItem data={f} key={f.symbol}/>)}
        </div>
    )
}

const favDivStyle = {
    maxWidth: "1000px",
    margin: "4em auto"
}

const messageStyle = {
    margin: "4em auto",
    textAlign:"center"
}