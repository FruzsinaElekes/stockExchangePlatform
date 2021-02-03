import React, { useEffect, useState } from 'react';
import HistoryItem from './HistoryItem';

export default function History(props) {

    const [history, setHistory] = useState([])
    let user_id = process.env.REACT_APP_USER_ID;
    const symbol = props.match.params.symbol;

    useEffect(() => {
        fetch(`http://localhost:8080//transactions/user/${user_id}/symbol/${symbol}/`, {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Access-Control-Allow-Origin' : 'http://localhost:8080/'
                  },
            })
        .then(resp => resp.json())
        .then(data => setHistory(data))
        .catch(e => console.log(e))
    }, [])


    return (
        <div>
            History page for {symbol}
            {history && history.map(h => <HistoryItem key={h.id} transaction={h}></HistoryItem>)}
        </div>
    )
}