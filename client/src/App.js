import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Landing from './views/Landing.js';
import Cities from './views/Cities.js';
import './css/style.css';
import SideMenu from './components/SideMenu.js';
import Itineraries from './views/Itineraries.js';
import ItinerariesComments from './views/ItinerariesComments.js';
import Activities from './components/Activities';
import SignUp from './views/SignUp.js';
import LogIn from './views/LogIn';
import { authenticateUser } from './store/actions/usersActions.js';
import { connect } from 'react-redux';

class App extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      token: null,
      userInfo: null
    };
  }
  
  componentDidMount(){
    let token = localStorage.getItem('userToken');
    if (token) {
      this.props.authenticateUser(token);     
    }
  }
  
  render(){
    console.log(this.props.userInfo)
    return ( // TODO OJO ADD ITINERARY ID ALS COMMENTS!
      <BrowserRouter>
        <div className="App">
          <SideMenu />
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route exact path='/cities' component={Cities} />
            <Route exact path='/itineraries/:city_id' component={Itineraries} />
            <Route exact path='/itinerariescomments/:itinerary_id' component={ItinerariesComments} /> 
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
  userInfo: state.users.user
})

export default connect(mapStateToProps, { authenticateUser })(App)
