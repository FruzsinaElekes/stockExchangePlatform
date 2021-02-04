
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import Modal from '@material-ui/core/Modal';
import TradeForm from './TradeForm';
import { Dialog } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


export default function Trade(props) {

    const [symbol , setSymbol] = useState(props.match.params.symbol ? props.match.params.symbol : "");
    const [limitPrice, setLimitPrice] = useState(0);
    const [direction, setDirection] = useState("-");
    const [count, setCount] = useState(0);
    const [redirect, setRedirect] = useState(false);
    const [open, setOpen] = useState(false);
    const [error, setError] = useState("");
    const [confirmIsOpen, setConfirmOpen] = useState(false);

    const errorOpen = () => setOpen(true);
    const errorClose = () => setOpen(false);
    const confirmOpen = () => setConfirmOpen(true);
    const confirmClose = () => setConfirmOpen(false);
    

    const handleSubmit = () => {
        const body = {
            user_id: process.env.REACT_APP_USER_ID,
            symbol: symbol,
            limitPrice: limitPrice,
            direction: direction,
            status: "PENDING",
            count: count
        }
        
        fetch(`http://localhost:8080/trade/${body.user_id}`, {
            method: "post",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Access-Control-Allow-Origin' : 'http://localhost:8080/trade'
                },
        })
        .then(resp => resp.json())
        .then(data => {
            if (data === "COMPLETED") setRedirect(true)
            else {
                createFeedbackMessage(data)
                errorOpen();
            }
        })
        .catch(e => console.log(e))

    }

    const handleChange = (e) => {
        const data = e.target.value;
        switch (e.target.name){
            case "price":
                setLimitPrice(data);
                break;
            case "symbol":
                setSymbol(data);
                break;
            case "direction":
                setDirection(data);
                break;
            case "count":
                setCount(data);
                break;
        }
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

    return (
        <TradeDiv>
            {redirect === true 
            ? <Redirect to="/portfolio" /> 
            : <React.Fragment> 
                Place an order by filling in the form below.
                <TradeForm symbol={symbol} limitPrice={limitPrice} cout={count} direction={direction} 
                            handleChange={handleChange} handleSubmit={confirmOpen} />
            </React.Fragment>
            }
            <Modal open={open} onClose={errorClose}>
                <ModalContent>{error}</ModalContent>
            </Modal>
            <Dialog open={confirmIsOpen} onClose={confirmClose}>
                <DialogTitle id="alert-dialog-title">{"Do you want to place the following order?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <p>Symbol: {symbol}</p>
                        <p>Action: {direction}</p>
                        <p>Amount: {count}</p>
                        <p>Limit Price: {limitPrice} USD</p>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={confirmClose} color="primary">Disagree</Button>
                    <Button onClick={handleSubmit} color="primary" autoFocus>Agree</Button>
                </DialogActions>
            </Dialog>
        </TradeDiv>
    )
}


const TradeDiv = styled.div`
    display: block;
    margin: auto;
    border: 2px solid black;
    width: 50vw
`


const ModalContent = styled.div`
    padding: 2em;
    background-color:white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`