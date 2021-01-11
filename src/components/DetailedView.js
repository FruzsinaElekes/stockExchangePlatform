import React from 'react';
import StockData from './detailedView/StockData';
import Video from './detailedView/Video';
import News from './detailedView/News';
import Graph from './detailedView/Graph';

export default function DetailedView() {
    return (
        <div>
            <StockData></StockData>
            <Graph></Graph>
            <Video></Video>
            <News></News>
        </div>
    )
}
