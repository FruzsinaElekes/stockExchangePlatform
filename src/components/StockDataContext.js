import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const StockDataContext = createContext();

export const StockDataProvider = (props) => {
    const [stockList, setStockList] = useState([]);
    const [stockData, setStockData] = useState([]);
    const stockBaseRoute = process.env.REACT_APP_ORIGIN + process.env.REACT_APP_STOCK_BASE_ROUTE
    const stockChangeRoute = process.env.REACT_APP_ORIGIN + process.env.REACT_APP_STOCK_CHANGE_ROUTE

    useEffect(() => {
        axios.get(stockBaseRoute)
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
        const symbolData = await axios.get(stockChangeRoute + symbol)
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