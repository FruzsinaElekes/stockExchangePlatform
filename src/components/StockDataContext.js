import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const StockDataContext = createContext();

export const StockDataProvider = (props) => {
    const availableStocks = props.symbols
    const [stockData, setStockData] = useState([])


    useEffect(() => {
        fetchAll(availableStocks)
        const interval = setInterval(() => {
            fetchAll(availableStocks)
        }, 5000)
        return () => clearInterval(interval);
    }, [availableStocks])


    async function fetchAll (symbols) {
        const data = await Promise.all(symbols.map(symbol => fetchStockData(symbol)))
        setStockData(data)
    }

    async function fetchStockData (symbol) {
        const symbolData = await axios.get(`http://localhost:8080/quote/${symbol}`)
        return symbolData.data
    } 


    function getStock(symbol) {
        const [stock] = stockData.filter(s => s.symbol === symbol)
        return stock
    }

    return (
        <StockDataContext.Provider value={[availableStocks, stockData, getStock]}>
            {props.children}
        </StockDataContext.Provider>
    )
}