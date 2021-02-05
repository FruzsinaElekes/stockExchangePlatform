import React, {useState } from 'react';
import {Route, BrowserRouter as Router} from 'react-router-dom';
import {ThemeProvider} from 'styled-components';
import {DetailedView, ListMain, Navbar, SearchBar, StockDataProvider} from './components';
import { FavProvider } from './components/favourites/FavContext';
import { Favourites } from './components/favourites/Favourites';
import {themes} from './themes/themes';
import {symbolList} from './stocks';
import './App.css';
import Trade from './components/trade/Trade';
import Portfolio from './components/portfolio/Portfolio';


function App() {
  const [theme, setTheme] = useState('light')
  const availableStocks = symbolList.slice(0, 7)

  return (
    <ThemeProvider theme={themes[theme]}>
    <FavProvider>
    <StockDataProvider symbols={availableStocks}>
      <Router>
        <div className="App">
          <Navbar currentTheme={theme} setTheme={setTheme}></Navbar>
          <ListMain></ListMain>
          <Route path="/favourites" component={Favourites}></Route>
          <Route exact path="/" render={()=><SearchBar symbols={symbolList}/>}></Route>
          <Route exact path="/stock/:symbol" component={DetailedView}></Route>
          <Route path="/trade/:symbol?" component={Trade}></Route>
          <Route path="/portfolio" component={Portfolio}></Route>
        </div>
      </Router>
    </StockDataProvider>
    </FavProvider>
    </ThemeProvider>
  );
}

export default App;
