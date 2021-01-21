import React, {useState } from 'react';
import {Route, BrowserRouter as Router} from 'react-router-dom';
import {ThemeProvider} from 'styled-components';
import {DetailedView, ListMain, Navbar, SearchBar} from './components';
import { FavProvider } from './components/favourites/FavContext';
import { Favourites } from './components/favourites/Favourites'
import {themes} from './themes/themes';
import {symbolList} from './stocks';
import './App.css';


function App() {
  const [theme, setTheme] = useState('light')

  return (
    <ThemeProvider theme={themes[theme]}>
    <FavProvider>
      <Router>
        <div className="App">
          <Navbar currentTheme={theme} setTheme={setTheme}></Navbar>
          <ListMain symbols={symbolList.slice(0, 10)}></ListMain>
          <Route path="/favourites" component={Favourites}></Route>
          <Route exact path="/" render={()=><SearchBar symbols={symbolList}/>}></Route>
          <Route exact path="/stock/:symbol" component={DetailedView}></Route>
        </div>
      </Router>
      </FavProvider>
    </ThemeProvider>
  );
}

export default App;
