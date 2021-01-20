import React, { createContext, useState } from 'react';

export const FavContext = createContext();

export const FavProvider = (props) => {
    const [favourites, setFavourites] = useState([])

    const addToFav = (stockData) => {
        setFavourites(prev => [...prev, stockData])
    }

    const removeFromFav = (stockData) => {
        const filteredFav = favourites.filter(f => f.symbol !== stockData.symbol)
        setFavourites(filteredFav)
    }

    return (
        <FavContext.Provider value = {[favourites, addToFav, removeFromFav]}>
            {props.children}
        </FavContext.Provider>
    )
}
