import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewsItem from './NewsItem';

export function News(props) {
    const [newsState, setNewsState] = useState([])

    useEffect(() => {
        if (props.data.symbol && !sessionStorage.getItem(props.data.symbol + "_news")){
            axios.get(`https://cloud.iexapis.com/stable/stock/${props.data.symbol}/news/last/10?token=${process.env.REACT_APP_IEX_API_KEY}`)
            .then(res => {
                const filtered = res.data.filter(news => news.lang==="en")
                setNewsState(filtered)
                sessionStorage.setItem(props.data.symbol + "_news", JSON.stringify(filtered))
                })
        } else {
            setNewsState(JSON.parse(sessionStorage.getItem(props.data.symbol + "_news")))
        }
    }, [props.data.symbol])

    return (
        <div>
            {newsState? newsState.map(n => <NewsItem symbol= {props.data.symbol} news = {n}></NewsItem>)
            : "Loading"}
        </div>
    )
}
