import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewsItem from './NewsItem';

export function News(props) {
    const [newsState, setNewsState] = useState([])

    useEffect(() => {
        if (shouldFetchNews(props)){
            axios.get(`https://cloud.iexapis.com/stable/stock/${props.data.symbol}/news/last/10?token=${process.env.REACT_APP_IEX_API_KEY}`)
            .then(res => {
                console.log("fetching news")
                const filtered = res.data.filter(news => news.lang==="en").map(f => ({...f, timestamp: Date.now()}))
                setNewsState(filtered)
                sessionStorage.setItem(props.data.symbol + "_news", JSON.stringify(filtered))
                })
        } else {
            setNewsState(JSON.parse(sessionStorage.getItem(props.data.symbol + "_news")))
        }
    }, [props.data.symbol])

    return (
        <div style={newsDivStyle}>
            {newsState? newsState.map((n, i) => <NewsItem symbol= {props.data.symbol} key = {i} news = {n}></NewsItem>)
            : "Loading"}
        </div>
    )
}

function shouldFetchNews(props){
    // fetches news if not found in session storage or data was cached more than 1 hour ago

    let fromCache = sessionStorage.getItem(props.data.symbol + "_news")
    let now = Date.now()
    return props.data.symbol && (!fromCache || now - fromCache.timestamp > 3600000)
}

const newsDivStyle = {
    margin: "auto",
    maxWidth: "1400px",
    minWidth: "768px",
    margin: "2em auto"
}