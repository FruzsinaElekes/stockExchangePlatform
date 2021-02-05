import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const StockDataContext = createContext();

export const StockDataProvider = (props) => {
    const availableStocks = props.symbols
    const [stockData, setStockData] = useState([])


    useEffect(() => {
        fetchAll(availableStocks)
        setInterval(() => {
            fetchAll(availableStocks)
        }, 5000)
    }, [])


    async function fetchAll (symbols) {
        const data = await Promise.all(symbols.map(symbol => fetchStockData(symbol)))
        setStockData(data)
    }

    async function fetchStockData (symbol) {
        const symbolData = await axios.get(`http://localhost:8080/quote/${symbol}`)
        return symbolData.data
    } 


    return (
        <StockDataContext.Provider value={[availableStocks, stockData]}>
            {props.children}
        </StockDataContext.Provider>
    )
}