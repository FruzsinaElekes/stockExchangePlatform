import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import History from './History';
import styled from 'styled-components';
import { Link } from 'react-router-dom';



export default function PortfolioItem(props) {
    const tradeLink = process.env.REACT_APP_TRADE_PAGE + '/' + props.item.symbol
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

    return (
        <PortfolioFlex>
            <h2>{props.item.symbol}</h2> 
            <p>Amount: {props.item.amount}</p>
            <Buttons>
                <StyledeButton onClick={handleOpen}>History</StyledeButton>
                <StyledeButton><StyledLink to={tradeLink}>TRADE</StyledLink></StyledeButton>
            </Buttons>
            <Modal open={open} onClose={handleClose}>
                <History transactions={props.transactions} currency={props.currency} symbol={props.item.symbol} />
            </Modal>

        </PortfolioFlex>
    )
}

const PortfolioFlex = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin: 3em auto;
    border: 1px solid #21255e;
    box-shadow: 5px 10px 5px #21255e;
    align-items: center
`

const Buttons = styled.div`
    width: 30%;
    display:flex;
    flex-direction: row;
    justify-content: space-evenly
`

const StyledLink = styled(Link)`
    color: white;
    text-decoration: none;
    & :visited{
        color: white;
        text-decoration: none
    }
`
const StyledeButton = styled.button`
    background-color: #21255e;
    color: white;
    font-weight: bolder;
    font-size: 1.2em;
    cursor: pointer;
    margin: 5px;
`