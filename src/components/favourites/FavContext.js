import React, { createContext, useState } from 'react';

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

    return (
        <FavContext.Provider value = {[favourites, addToFav, removeFromFav]}>
            {props.children}
        </FavContext.Provider>
    )
}
