import React, { createContext, useState, useEffect } from 'react';

export const StockDataContext = createContext();

export const StockDataProvider = (props) => {
    const init = new Date();
    const [stockData, setStockData] = useState(init.getFullYear().toString())


    useEffect(() => {
        const interval = setInterval(() => {
            const date = new Date();
            setStockData(date.getSeconds().toString())
        }, 5000);
        return () => clearInterval(interval)
    }, [])


    return (
        <StockDataContext.Provider value={stockData}>
            {props.children}
        </StockDataContext.Provider>
    )
}