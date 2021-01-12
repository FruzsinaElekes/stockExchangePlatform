import React, { useState, useEffect, useMemo } from 'react';
import StockData from './detailedView/StockData';
import Video from './detailedView/Video';
import News from './detailedView/News';
import Graph from './detailedView/Graph';

export default function DetailedView() {
    const [details, setDetails] = useState({});
    const url = window.location.href;
    const symbol = url.slice(url.lastIndexOf('/')+1, url.length);
    
    //TODO: when switching between stocks it renders the previous stock page again
    // would a Context solve this?
    useEffect(() => {
        setDetails(JSON.parse(sessionStorage.getItem(symbol)))
    }, [symbol])

    return (
        <div>
            {details &&
            <React.Fragment>
            <StockData></StockData>
            <Graph></Graph>
            <Video></Video>
            <News data={details}></News>
            </React.Fragment>
            }
        </div>
    )
}
