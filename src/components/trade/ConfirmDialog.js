import React from 'react';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Dialog } from '@material-ui/core';

export default function ConfirmDialog(props) {
    let { confirmClose, handleSubmit, confirmIsOpen, symbol, direction, count, limitPrice } = props;
    

    return (
        <div>
            <Dialog open={confirmIsOpen} onClose={confirmClose}>
                <DialogTitle id="alert-dialog-title">{"Do you want to place the following order?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <span>Symbol: {symbol}</span><br/>
                        <span>Action: {direction}</span><br/>
                        <span>Amount: {count}</span><br/>
                        <span>Limit Price: {limitPrice} USD</span><br/>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={confirmClose} color="primary">Disagree</Button>
                    <Button onClick={handleSubmit} color="primary" autoFocus>Agree</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
