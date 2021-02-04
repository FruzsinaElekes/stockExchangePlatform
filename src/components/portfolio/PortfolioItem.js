import React, { useState } from 'react';
// import {Link} from 'react-router-dom';
import Modal from '@material-ui/core/Modal';
import History from './History';
// import { makeStyles } from '@material-ui/core/styles';


export default function PortfolioItem(props) {

    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

    return (
        <div>
            <p>Symbol: {props.item.symbol}</p>
            <p>Amount: {props.item.amount}</p>
            {/* <button><Link to={`/history/${props.item.symbol}`}>History</Link></button> */}
            <button onClick={handleOpen}>History</button>

            <Modal open={open} onClose={handleClose}>
                <History transactions={props.transactions} symbol={props.item.symbol}>This is the transaction history modal</History>
            </Modal>

        </div>
    )
}
