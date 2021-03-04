import React, { useState, useContext, createRef } from 'react';
import Modal from '@material-ui/core/Modal';
import History from './History';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { StockDataContext } from '../StockDataContext';


export default function PortfolioItem(props) {
    const tradeLink = process.env.REACT_APP_TRADE_PAGE + '/' + props.item.symbol
    const stockRoute = process.env.REACT_APP_STOCK_PAGE
    const getData = useContext(StockDataContext)[2]
    const priceData = getData(props.item.symbol)
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const latest = React.useMemo(() => {
        const dates = props.transactions.map(t => Date.parse(t.transactionTime))
        return new Date(dates.reduce((a, b) => Math.max(a, b))).toISOString();
    }, [props.transactions]);
    const ref = createRef();

    return (
        <Fav>
            <Content>
                <div>
                    <Symbol to={stockRoute + props.item.symbol}>{props.item.symbol}</Symbol>
                    <BlueButtonRight><StyledLink to={tradeLink}>TRADE</StyledLink></BlueButtonRight>
                    <BlueButtonRight onClick={handleOpen}>History</BlueButtonRight>
                </div>
                <Details>
                    <Cell>
                        <p>Last Transaction</p>
                        {latest && latest.replace("T", " ").substring(0, latest.indexOf("."))}
                    </Cell>
                    <Cell>
                        <p>Total Owned</p>
                        <p>{props.item.amount}</p>
                    </Cell>
                    <Cell>
                        <p>Total Value</p>
                        <p>{(props.item.amount * priceData.latestPrice).toFixed(2)}</p>
                    </Cell>
                    <Cell>
                        <p>Latest Price</p>
                        <p>{priceData.latestPrice}</p>
                    </Cell>
                </Details>
                <Modal open={open} onClose={handleClose}>
                    <History ref={ref} transactions={props.transactions} currency={props.currency} symbol={props.item.symbol} />
                </Modal>
            </Content>
        </Fav>
    )
}

const Fav = styled.div`
    margin: 3em auto;
    border: 1px solid #21255e;
    box-shadow: 5px 10px 5px #21255e;
    display: flex;
    flex-direction: row;
    @media (max-width: 768px) {
        font-size: 1.3em;
        width: 100%;
        margin: 3em auto;
    }
`

const Content = styled.div`
    padding-left: 20px;
    width: 100%
`

const Symbol = styled(Link)`
    font-size: 2em;
    font-weight: bold;
    float:left;
    text-decoration:none;
    color: black;
`

const BlueButtonRight = styled.button`
    background-color: #21255e;
    color: white;
    font-weight: bolder;
    font-size: 1.2em;
    cursor: pointer;
    float: right;
    margin: 5px;
`

const Cell = styled.div`
    text-align:center;
    width: 25%;
    @media (max-width: 768px) {
        width: 85%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        > p {
            margin: 3px;
        }
    }
`

const Details = styled.div`
    display: flex;
    flex-direction:row;
    justify-content: space-evenly;
    width: 100%;
    @media (max-width: 768px) {
        flex-direction: column;
    }
`

const StyledLink = styled(Link)`
    color: white;
    text-decoration: none;
    & :visited{
        color: white;
        text-decoration: none
    }
`
