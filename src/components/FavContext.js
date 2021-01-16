import React, { createContext, useState } from 'react';

export const FavContext = createContext();

export const FavProvider = (props) => {
    const [favourites, setFavourites] = useState([])

    const addToFav = (symbol) => {
        setFavourites(prev => [...prev, JSON.parse(sessionStorage.getItem(symbol))])
    }

    const removeFromFav = (symbol) => {
        const filteredFav = favourites.filter(f => f.symbol !== symbol)
        setFavourites(filteredFav)
    }

    return (
        <FavContext.Provider value = {[favourites, addToFav, removeFromFav]}>
            {props.children}
        </FavContext.Provider>
    )
}
