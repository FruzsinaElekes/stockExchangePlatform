
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import Modal from '@material-ui/core/Modal';
import TradeForm from './TradeForm';
import ConfirmDialog from './ConfirmDialog';


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
                confirmClose();
                createFeedbackMessage(data);
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