import React, {useState} from 'react';
import {Route, BrowserRouter as Router} from 'react-router-dom';
import Favourites from './components/Favourites';
import Navbar from './components/Navbar';
import axios from 'axios';


function App() {
  //fetch list of symbols (limit 200?)
  axios.get(`https://cloud.iexapis.com/stable/stock/AAPL/company?token=${process.env.REACT_APP_IEX_API_KEY}`)
  .then(res => console.log(res.data))


  return (
    <Router>
    <div className="App">
      <Navbar></Navbar>
      {/* <ListMain></ListMain> */}
      <Route path="/favourites" component={Favourites}></Route>
      <Route exact path="/" ></Route>
      {/* <Route path="/stock/:quote" component={DetailedView}></Route> */}
    </div>
    </Router>
  );
}

export default App;
