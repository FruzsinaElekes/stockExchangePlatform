import React, {useState} from 'react';
import {Route, BrowserRouter as Router} from 'react-router-dom';
import Favourites from './components/Favourites';
import Navbar from './components/Navbar';


function App() {
  //fetch list of symbols (limit 200?)


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
