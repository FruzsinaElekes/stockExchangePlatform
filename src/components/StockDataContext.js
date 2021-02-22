import React, { createContext, useState, useEffect } from 'react';
import SockJsClient from 'react-stomp';
import axios from 'axios';

export const StockDataContext = createContext();

export const StockDataProvider = (props) => {
    const [stockList, setStockList] = useState([]);
    const [stockData, setStockData] = useState([]);
    const [sockJsclient, setClient] = useState()
    const stockBaseRoute = process.env.REACT_APP_ORIGIN + process.env.REACT_APP_STOCK_BASE_ROUTE
    const websocketRoute = process.env.REACT_APP_WEBSOCKET_ROUTE
    const stockListTopic = process.env.REACT_APP_STOMP_STOCKLIST
    const stockDataTopic = process.env.REACT_APP_STOMP_STOCKDATA


    useEffect(() => {
        axios.get(stockBaseRoute)
        .then(data => setStockList(data.data))
    }, [])

    function getStock(symbol) {
        const [stock] = stockData.filter(s => s.symbol === symbol)
        return stock
    }

    function getStockName(symbol) {
        const [stock] = stockList.filter(s => s.symbol === symbol)
        return stock.companyName
    }

    function onMessageHandler(data, topic) {
        if (topic === stockListTopic) {
            setStockData(data)
        }
        if (topic === stockDataTopic) {
            setStockData(prevState =>
                prevState.map(element => element.symbol === data.symbol ? data : element))
        }
    }

    return (
        <StockDataContext.Provider value={[getStockName, stockData, getStock, stockList.map(s => s.symbol)]}>
        <SockJsClient url={ websocketRoute } topics={[stockListTopic, stockDataTopic]}
          onMessage={ onMessageHandler } ref={ (client) => { setClient(client) }} />
            {props.children}
        </StockDataContext.Provider>
    )
}