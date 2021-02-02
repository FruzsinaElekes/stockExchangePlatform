import React from 'react';
import PortfolioItem from './PortfolioItem';
import Summary from './Summary';

export default function Portfolio() {
    const stock = ['s1', 's2', 's3']

    return (
        <div>
            This will be the portfolio page
            <Summary></Summary>
            {stock.map(s => <PortfolioItem stock={s}></PortfolioItem>)}
        </div>
    )
}
