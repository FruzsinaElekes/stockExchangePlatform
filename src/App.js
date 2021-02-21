import React, {useState } from 'react';
import {Route, BrowserRouter as Router} from 'react-router-dom';
import {ThemeProvider} from 'styled-components';
import {DetailedView, ListMain, Navbar, SearchBar, StockDataProvider, UserProvider} from './components';
import { FavProvider } from './components/favourites/FavContext';
import { Favourites } from './components/favourites/Favourites';
import {themes} from './themes/themes';
import './App.css';
import Trade from './components/trade/Trade';
import Portfolio from './components/portfolio/Portfolio';
import LoginForm from './components/authentication/LoginForm';
import RegistrationForm from './components/authentication/RegistrationForm';
import AboutPage from './components/AboutPage';


function App() {
  const [theme, setTheme] = useState('light')

  return (
    <ThemeProvider theme={themes[theme]}>
    <UserProvider>
    <FavProvider>
    <StockDataProvider>
      <Router>
        <div className="App">
          <Navbar currentTheme={theme} setTheme={setTheme}></Navbar>
          <ListMain></ListMain>
          <Route path={process.env.REACT_APP_FAVOURITES_PAGE} component={Favourites}></Route>
          <Route exact path={process.env.REACT_APP_HOME_PAGE} component={SearchBar}></Route>
          <Route path={process.env.REACT_APP_STOCK_PAGE} component={DetailedView}></Route>
          <Route path={process.env.REACT_APP_STOCK_TRADE_PAGE} component={Trade}></Route>
          <Route path={process.env.REACT_APP_PORTFOLIO_PAGE} component={Portfolio}></Route>
          <Route path={process.env.REACT_APP_REGISTER_PAGE} component={RegistrationForm}></Route>
          <Route path={process.env.REACT_APP_LOGIN_PAGE} component={LoginForm}></Route>
          <Route path={process.env.REACT_APP_ABOUT_PAGE} component={AboutPage}></Route>
        </div>
      </Router>
    </StockDataProvider>
    </FavProvider>
    </UserProvider>
    </ThemeProvider>
  );
}

export default App;
