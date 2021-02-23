import React, { createContext, useState, useEffect } from 'react';
import { Client, Message } from '@stomp/stompjs';
import axios from 'axios';

export const StockDataContext = createContext()

export const StockDataProvider = (props) => {
    const [stockList, setStockList] = useState([])
    const [stockData, setStockData] = useState([])
    const [stomClient, setStompClient] = useState()
    const stockBaseRoute = process.env.REACT_APP_ORIGIN + process.env.REACT_APP_STOCK_BASE_ROUTE
    const websocketRoute = process.env.REACT_APP_WEBSOCKET_ROUTE
    const stockListTopic = process.env.REACT_APP_STOMP_STOCKLIST
    const stockDataTopic = process.env.REACT_APP_STOMP_STOCKDATA

    useEffect(() => {
        axios.get(stockBaseRoute)
        .then(data => setStockList(data.data))
    }, [])

    useEffect(() => {
        const client = new Client()
        client.brokerURL = websocketRoute
        client.onConnect = frame => {
            client.subscribe(stockListTopic, onMessageHandler)
            client.subscribe(stockDataTopic, onMessageHandler)
        }
        client.activate()
        setStompClient(client)
        return () => client.deactivate()
    }, [])

    function onMessageHandler(message) {
        const destination = message.headers.destination
        const data = JSON.parse(message.body)
        if (destination === stockListTopic) {
            setStockData(data)
        }
        if (destination === stockDataTopic) {
            setStockData(prevState => prevState.map(
                element => element.symbol === data.symbol ? data : element))
        }
    }

    function getStock(symbol) {
        const [stock] = stockData.filter(s => s.symbol === symbol)
        return stock
    }

    function getStockName(symbol) {
        const [stock] = stockList.filter(s => s.symbol === symbol)
        return stock && stock.companyName
    }
    
    return (
        <StockDataContext.Provider value={[getStockName, stockData, getStock, stockList.map(s => s.symbol)]}>
            {props.children}
        </StockDataContext.Provider>
    )
}