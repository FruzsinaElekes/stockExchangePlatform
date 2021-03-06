import React from 'react';
import NewsItem from './NewsItem';

export function News(props) {

    return (
        <div style={newsDivStyle}>
            {props.data.map((n, i) => <NewsItem symbol={props.symbol} key = {i} news = {n}></NewsItem>)}
        </div>
    )
}

const newsDivStyle = {
    margin: "4em auto",
    maxWidth: "1400px",
    minWidth: "768px",
}