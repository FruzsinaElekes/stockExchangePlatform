
import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import StockData from './detailedView/StockData';
import Video from './detailedView/Video';
import News from './detailedView/News';
import Graph from './detailedView/Graph';


export default function DetailedView() {
    const [details, setDetails] = useState({});
    const {symbol} = useParams();
    
    //TODO: when switching between stocks it renders the previous stock page again
    // would a Context solve this?
    useEffect(() => {
        const cached = JSON.parse(sessionStorage.getItem(symbol))
        if (cached) setDetails(cached)
        else {
            axios.get(`https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=${process.env.REACT_APP_IEX_API_KEY}`)
            .then (res => {
                console.log("fetching")
                setDetails(res.data)
                sessionStorage.setItem(symbol, JSON.stringify(res.data))
            })
        }
    }, [symbol])

    return (
        <div>
            {details &&
            <React.Fragment>
            <StockDiv>
                <StyledStockData data={details}></StyledStockData>
                <StyledGraph></StyledGraph>
            </StockDiv>
            <Video></Video>
            <News data={details}></News>
            </React.Fragment>
            }
        </div>
    )
}

const StockDiv = styled.div`
    display: grid;
    margin: auto;
    width: 85vw;
    grid-template-columns: auto auto;
`

const StyledStockData = styled(StockData)`
    width: 40vw;
`

const StyledGraph = styled(Graph)`
    width: 40vw;
`