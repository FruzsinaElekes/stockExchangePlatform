import React, { createContext, useState } from 'react';
import FavItem from './FavItem';

export const FavContext = createContext();

export const FavProvider = (props) => {
    const [favourites, setFavourites] = useState(localStorage.getItem("favourites")? JSON.parse(localStorage.getItem("favourites")) : [])

    const addToFav = (stockData) => {
        setFavourites(prev => {
            let updated = [...prev, stockData]
            localStorage.setItem("favourites", JSON.stringify(updated))
            return updated
        })
    }

    const removeFromFav = (stockData) => {
        const filteredFav = favourites.filter(f => f.symbol !== stockData.symbol)
        setFavourites(filteredFav)
        localStorage.setItem("favourites", JSON.stringify(filteredFav))
    }

    const move = (symbol, dir) => {
        let movedItem = favourites.filter(fav => fav.symbol === symbol)[0]
        let movedIdx = favourites.indexOf(movedItem)
        let moveTo;
        if (movedIdx + dir === favourites.length) moveTo = 0;
        else if (movedIdx + dir < 0) moveTo = favourites.length - 1
        else moveTo = movedIdx + dir
        let reordered = favourites.filter(fav => fav.symbol !== symbol)
        reordered.splice(moveTo, 0, movedItem)
        setFavourites(reordered)
        localStorage.setItem("favourites", JSON.stringify(reordered))
    }

    return (
        <FavContext.Provider value = {[favourites, addToFav, removeFromFav, move]}>
            {props.children}
        </FavContext.Provider>
    )
}
