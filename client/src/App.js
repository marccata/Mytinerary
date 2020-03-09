import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Landing from './components/Landing.js';
import Cities from './components/Cities.js';
import './css/style.css';
import SideMenu from './SideMenu.js';
import LogIn from './components/LogIn.js';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <SideMenu />
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route exact path='/cities' component={Cities} />
          <Route exact path='/login' component={LogIn} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;