import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewsItem from './NewsItem';

export function News(props) {

    return (
        <div style={newsDivStyle}>
            {props.data.map((n, i) => <NewsItem symbol={props.symbol} key = {i} news = {n}></NewsItem>)}
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
    margin: "4em auto",
    maxWidth: "1400px",
    minWidth: "768px",
}