import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Landing from './views/Landing.js';
import Cities from './views/Cities.js';
import './css/style.css';
import SideMenu from './components/SideMenu.js';
import LogIn from './views/LogIn.js';
import Itineraries from './views/Itineraries.js';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <SideMenu />
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route exact path='/cities' component={Cities} />
          <Route exact path='/itineraries/:city_id' component={Itineraries} />
          <Route exact path='/login' component={LogIn} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;