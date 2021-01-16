import React, { useContext} from 'react';
import { FavContext } from './FavContext'



export function Favourites() {
    const [favourites, addToFav] = useContext(FavContext)
    return (
        <div>
            {favourites.map(f => <p>{f.symbol}</p>)}
        </div>
    )
}
