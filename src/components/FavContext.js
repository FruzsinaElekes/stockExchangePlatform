import React, { createContext, useState } from 'react';

export const FavContext = createContext();

export const FavProvider = (props) => {
    const [favourites, setFavourites] = useState([])

    const addToFav = (symbol) => {
        setFavourites(prev => [...prev, JSON.parse(sessionStorage.getItem(symbol))])
    }

    return (
        <FavContext.Provider value = {[favourites, addToFav]}>
            {props.children}
        </FavContext.Provider>
    )
}
