import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Landing from './components/Landing.js';
import Header from './components/Header.js';
import Routes from './components/Routes.js';
import './css/style.css';
import SideMenu from './SideMenu.js';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <SideMenu />
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route exact path='/routes' component={Routes} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;