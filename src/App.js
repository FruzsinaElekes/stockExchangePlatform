import React, {useState, useEffect} from 'react';
import {Route, BrowserRouter as Router} from 'react-router-dom';
import ListMain from './components/ListMain';
import SearchBar from './components/SearchBar';
import DetailedView from './components/DetailedView';
import Favourites from './components/Favourites';
import Navbar from './components/Navbar';


function App() {
  const [symbolList, setSymbolList] = useState([])
      
  useEffect(() => {
    setSymbolList([
      "NIO", "TWTR", "PLUG", "TRXC", "TSLA", "BNGO", "SQ", "SNDL", "LMFA", "AAPL", "UBER", "MRO", "ZOM", "HYG", "BABA", "PFE", "CCL", "FCX", "FB", "F",
      "BP", "MU", "AMD", "LLY", "BAC", "JAGX", "INTC", "VALE", "MARA", "CSCO", "EEM", "GM", "VZ", "DDD", "ITUB", "XOM", "BIDU", "WFC", "EWJ", "GILD",
      "SIRI", "GOLD", "HAL", "PENN", "TSM", "GEVO", "PDD", "XLF", "KO", "MSFT", "FCEL", "GOVX", "C", "BILI", "STPK", "SPY", "AMAT", "RIOT", "IWB", "BA",
      "PCG", "GE", "DVN", "SNAP", "MRNA", "XPEV", "T", "VIPS", "STX", "JPM", "EXAS", "ZNGA", "UPS", "CX", "VEON", "WMT", "RIDE", "RUN", "CMCSA", "AVGR",
      "MCHI","QS","NVDA","GDX","DD","OXY","PACB","MPW","LI","AVTR","GME","JD","BMY","WBA","CRM","XLNX","NCR","SRPT","TLRY","BBBY","RIG","SLB","AZN","NKE",
      "BBD","IDEX","NVTA","HAPP","OEG","EWZ","X","LMT","AAL","APA","AMC","BMRN","CHNG","TELL","DKNG","BLNK","NOK","LYFT","PINS","MRVL","LVS","SESN","MRK",
      "WORK","CIEN","PSTH","BRK.B","EFA","SKLZ","ACIA","ON","ACST","BPYU","KMI","DISCK","IPOE","CLOV","CTRM","AVYA","CVS","VXX","FOXA","DIS","CAG","V","KR",
      "NCLH","MO","LMND","NCNO","PG","IRM","GIS","IFF","VICI","TNXP","XNET","AUPH","FTCH","PTON","ORCL","DBX","WYNN","ASRT","CRWD","BLDP","SAN","MIC","GPS",
      "PYPL","COP","BSX","GPRO","VIH","IWM","SABR","QQQ","XLE","EBAY","INFY","NTES","TME","TTM","NOV","PLTR","MS","HBAN","MCHP","TGT","MGM","CLF","CVX",
      "WORX","VVV","DDOG","TJX"])
    }, [])


  return (
    <Router>
    <div className="App">
      <Navbar></Navbar>
      <ListMain symbols={symbolList.slice(0, 10)}></ListMain>
      <Route path="/favourites" component={Favourites}></Route>
      <Route exact path="/" component={SearchBar}></Route>
      <Route exact path="/stock/:symbol" component={DetailedView}></Route>
    </div>
    </Router>
  );
}

export default App;
