
import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import Modal from '@material-ui/core/Modal';
import TradeForm from './TradeForm';
import ConfirmDialog from './ConfirmDialog';
import {StockDataContext} from '../StockDataContext';
import { UserContext } from '../UserContext';

export default function Trade(props) {
    const [symbol , setSymbol] = useState(props.match.params.symbol ? props.match.params.symbol : "");
    const [limitPrice, setLimitPrice] = useState(0);
    const [direction, setDirection] = useState("-");
    const [count, setCount] = useState(1);
    const [redirect, setRedirect] = useState(false);
    const [open, setOpen] = useState(false);
    const [error, setError] = useState("");
    const [confirmIsOpen, setConfirmOpen] = useState(false);
    const [notAllValid, setNotAllValid] = useState(true)
    
    const symbolList = useContext(StockDataContext)[3]
    const setUserData = useContext(UserContext)[1]
    const tradeRoute = process.env.REACT_APP_ORIGIN + process.env.REACT_APP_TRADE_ROUTE
    const portfolioRoute = process.env.REACT_APP_PORTFOLIO_PAGE

    const errorOpen = () => setOpen(true);
    const errorClose = () => setOpen(false);
    const confirmOpen = () => setConfirmOpen(true);
    const confirmClose = () => setConfirmOpen(false);
    const allValid = () => setNotAllValid(!symbolList.includes(symbol) || count <=0 || limitPrice <= 0 || direction==="-")

    const selectSymbol = (symbol) => {
        setSymbol(symbol);
        allValid()
    }

    const handleSubmit = () => {
        const body = {
            symbol: symbol,
            limitPrice: limitPrice,
            direction: direction,
            status: "PENDING",
            count: count
        }

        if (!document.cookie) return
        const token = document.cookie.split('; ').find(row => row.startsWith('access_token=')).split('=')[1];
        
        fetch(tradeRoute, {
            method: "post",
            body: JSON.stringify(body),
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json;charset=utf-8',
                },
        })
        .then(handleBadRequest)
        .then(resp => resp.json())    
        .then(data => {
            if (data === "COMPLETED") setRedirect(true)
            else showError(createFeedbackMessage, data)
        })
        .catch(e => console.log(e))

    }

    const handleChange = (e) => {
        const data = e.target.value;
        switch (e.target.name){
            case "price":
                setLimitPrice(data);
                break;
            case "direction":
                setDirection(data);
                break;
            case "count":
                setCount(data);
                break;
            default:
                break;
        }
        allValid()
    }

    const createFeedbackMessage = (data) => {
        let msg = "Transaction failed.\n";
        switch (data){
            case "LIMIT_PRICE_MISMATCH":
                msg += "Limit price does not match current stock price";
                break;
            case "INSUFFICIENT_FUND":
                msg += "Balance not sufficient to execute transaction";
                break;
            case "INSUFFICIENT_STOCK":
                msg += "Owned stock not sufficient to execute transaction";
                break;
            case "DATABASE_PROBLEM":
                msg += "Transaction could not be finalized due to database problems";
                break;
            default:
                msg += "Invalid data sent in request"
        }
        setError(msg);
    }

    const handleBadRequest = (response) => {
        if (!response.ok) {
            if (response.status === 403) {
                setRedirect(true)
                setUserData({ loggedIn : false, userName : undefined })
            } else if (response.status === 400){
                response.json()
                    .then(err => showError(setError, err.message))
                    .catch(e => showError(setError, "Transaction failed, no action (BUY/SELL) specified"))
            }
            throw Error(response.statusText)
        }
        else {
            return response
        }
    }

    const showError = (func, data) => {
        confirmClose()
        func(data)
        errorOpen()
    }

    return (
        <TradeDiv>
            {redirect === true 
            ? <Redirect to={portfolioRoute} /> 
            : <React.Fragment> 
                <StyledH2>Place an order</StyledH2>
                <TradeForm symbol={symbol} symbolList={symbolList} limitPrice={limitPrice} count={count} direction={direction}
                 notAllValid={notAllValid} selectSymbol={selectSymbol} handleChange={handleChange} handleSubmit={confirmOpen} />
            </React.Fragment>
            }
            <Modal open={open} onClose={errorClose}><ModalContent>{error}</ModalContent></Modal>
            <ConfirmDialog 
                confirmClose={confirmClose}
                handleSubmit={handleSubmit}
                confirmIsOpen={confirmIsOpen} 
                symbol={symbol} 
                direction={direction} 
                count={count} 
                limitPrice={limitPrice}></ConfirmDialog>
        </TradeDiv>
    )
}


const TradeDiv = styled.div`
    display: block;
    margin: 5em auto;
    border: 2px solid #21255e;
    box-shadow: 5px 10px 5px #21255e;
    width: 30vw
`

const ModalContent = styled.div`
    padding: 2em;
    background-color:white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

const StyledH2 = styled.h2`
    text-align: center;
    color: #21255e
`