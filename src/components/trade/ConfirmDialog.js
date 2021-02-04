import React, { useState } from 'react';
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
        </div>
    )
}
