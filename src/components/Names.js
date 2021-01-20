import React, { useState, useEffect } from 'react';
import axios from 'axios';

export function Names() {
    const [list, setList] = useState([])
    const [names, setNames] = useState([])

    useEffect(() => {
        const nameList = []
        const name = []
        let data = []

        axios.get( `https://cloud.iexapis.com/stable/stock/market/list/iexvolume?listLimit=200&token=${process.env.REACT_APP_IEX_API_KEY}`)
        .then (res => {
            data = res.data
            data.map(d => {
                nameList.push({symbol: d.symbol, name: d.companyName})
                name.push(d.symbol)
                return ""
            })
            setNames(name)
            setList(nameList)
        })
        }, [])

    return (
        <div>
            <div>{JSON.stringify(list)}</div>
            <div>{JSON.stringify(names)}</div>
        </div>
    )
}