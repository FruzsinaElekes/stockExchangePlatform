
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

export default function Trade(props) {

    const [symbol , setSymbol] = useState(props.match.params.symbol ? props.match.params.symbol : "");
    const [limitPrice, setLimitPrice] = useState(0);
    const [direction, setDirection] = useState("-");
    const [count, setCount] = useState(0);
    const [redirect, setRedirect] = useState(false);

    const handleSubmit = () => {
        const body = {
            user_id: 242,
            symbol: symbol,
            limitPrice: limitPrice,
            direction: direction,
            status: "PENDING",
            count: count
        }

        if (window.confirm(createConfirmMessage(body))){
            fetch("http://localhost:8080/trade", {
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
                else window.alert(JSON.stringify(data))
            })
            .catch(e => console.log(e))
        }

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

    const createConfirmMessage = (body) => {
        return `You are about to place the following order:
        \nSymbol: ${body.symbol}\nAction: ${body.direction}\nCount: ${body.count}\nLimit Price: ${body.limitPrice}\n\nClick OK to confirm!`
    }

    return (
        <div>
            {redirect === true 
            ? <Redirect to="/portfolio" /> 
            : <React.Fragment> 
            Place an order by filling in the form below.

            <form onSubmit={handleSubmit}>
                <div><label>
                    Symbol: 
                    <input name="symbol" type="text" value={symbol} onChange={handleChange}></input>
                </label></div>
                <div><label>
                    Action: 
                    <select name="direction" value={direction} onChange={handleChange}>
                        <option value="SELL">SELL</option>
                        <option value="BUY">BUY</option>
                        <option value="-">---</option>
                    </select>
                </label></div>
                <div><label>
                    Stock Count: 
                    <input name="count" type="number" value={count} onChange={handleChange}></input>
                </label></div>
                <div><label>
                    Limit Price: 
                    <input name="price" type="number" value={limitPrice} onChange={handleChange}></input>
                </label></div>


                <button onClick={handleSubmit}>Trade!</button>

            </form>
            </React.Fragment>
            }

        </div>
    )
}
