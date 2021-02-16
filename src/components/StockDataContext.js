import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const StockDataContext = createContext();

export const StockDataProvider = (props) => {
    const [stockList, setStockList] = useState([]);
    const [stockData, setStockData] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/stock-base-data/list")
        .then(data => setStockList(data.data))
    }, [])

    useEffect(() => {
        fetchAll(stockList)
        const interval = setInterval(() => {
            fetchAll(stockList)
        }, 5000)
        return () => clearInterval(interval);
    }, [stockList])


    async function fetchAll (stockList) {
        const data = await Promise.all(stockList.map(stock => fetchStockData(stock.symbol)))
        setStockData(data)
    }

    async function fetchStockData (symbol) {
        const symbolData = await axios.get(`http://localhost:8080/stock-change/${symbol}`)
        return symbolData.data
    } 


    function getStock(symbol) {
        const [stock] = stockData.filter(s => s.symbol === symbol)
        return stock
    }

    return (
        <StockDataContext.Provider value={[stockList.map(s => s.symbol), stockData, getStock]}>
            {props.children}
        </StockDataContext.Provider>
    )
}