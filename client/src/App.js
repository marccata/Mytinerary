import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Landing from './views/Landing.js';
import Cities from './views/Cities.js';
import './css/style.css';
import SideMenu from './components/SideMenu.js';
import Itineraries from './views/Itineraries.js';
import Activities from './components/Activities';
import SignUp from './views/SignUp.js';
import LogIn from './views/LogIn';
import { registerUser } from './store/actions/usersActions.js';
import { connect } from 'react-redux';


class App extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      userToken: null
    };
   //this.registerUser = this.registerUser.bind(this);
  }
  /*
  componentDidMount(){
    if (localStorage.getItem('userToken')) {  // IS AUTENTICATE
      let userToken = localStorage.getItem('userToken')
      this.props.registerUser(userToken);
    }
  }
  */
  render(){
    return (
      <BrowserRouter>
        <div className="App">
          <SideMenu />
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route exact path='/cities' component={Cities} />
            <Route exact path='/itineraries/:city_id' component={Itineraries} />
            <Route exact path='/activities/:itinerary_id' component={Activities} />
            <Route exact path='/login' component={LogIn} />
            <Route exact path='/signup' component={SignUp} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }

}

const mapStateToProps = state => ({
  token: state.logIn.token
})



export default connect(mapStateToProps, { registerUser })(App)
