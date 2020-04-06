import React, { Fragment } from 'react';
import { withStyles } from "@material-ui/core/styles";
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Link} from 'react-router-dom';
import BackButton from './BackButton';
import { connect } from 'react-redux';
import { authenticateUser } from '../store/actions/usersActions.js';
import { logOutUser } from '../store/actions/usersActions.js';
import PersonIcon from '@material-ui/icons/Person';
import Divider from '@material-ui/core/Divider';


const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  header: {
    position: 'fixed',
    padding: '20px',
    width: 'calc(100% - 40px)',
    display: 'flex',
    flexGrow: '0'
  },
  menuButton: {
    backgroundColor: 'white',
    height: '38px',
    width: '38px',
    marginLeft: '0px',
    padding: '3px',
    border: '#E8E6DC solid 1px'
  },
  menuIcon: {
    fontSize: '2rem !important'
  },
  link: {
    padding: '10px 16px',
    backgroundColor: '#014FEC',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '20px',

  },
  userButton: {
    backgroundColor: 'white',
    height: '38px',
    width: '38px',
    marginLeft: 'auto',
    padding: '3px',
    border: '#E8E6DC solid 1px',
    fontSize: '2rem !important',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    '&:hover': {
      backgroundColor: 'white',
    }
  },
  logInBox: {
    margin: '16px'
  },
  divider: {
    marginTop: '10px',
    marginBottom: '10px'
  }
};

class SideMenu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      top: false,
      left: false,
      bottom: false,
      right: false,
      isAuthenticated: 'false',
      userInfo: null
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps){
    if(nextProps.userInfo !== this.props.userInfo){
        this.setState({
            userInfo: nextProps.userInfo
        })
    }
}
  
  toggleDrawer = (side, open) => event => {

    console.log('clicked menu');

    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    this.setState({ ...this.state, [side]: open });

  };

  render(){
    authenticateUser()
    console.log('USER AUTHENTICATED? ' + this.props.isAuthenticated)
    if(this.props.userInfo){
      console.log(this.props.userInfo.name)}
    const { classes } = this.props;

    // Show login+signup buttons if any user logged, or signout if logged
    if (this.props.isAuthenticated === false){
      var optionalLinks = (
        <Fragment>
          <ListItem button key='SignUpInner'>
            <Link to="/signup" className={classes.link}>
              Sign Up
            </Link>           
          </ListItem>
          <ListItem button  key='LogInInner'>
            <Link to="/login" className={classes.link}>
              Log In
            </Link>           
          </ListItem>
        </Fragment>
      )
    } else {
      var optionalLinks = (
        <Fragment>
          <div className={classes.logInBox}>
            <p>You are logged in as</p>
            <p>{this.props.userInfo.name}</p>
            <IconButton className={classes.userButton} color="inherit" aria-label="menu"  style={{ backgroundImage: `url(${this.props.userInfo && this.props.userInfo.user_img !== '' ? this.props.userInfo.user_img : null})` }}>
            {this.props.userInfo && this.props.userInfo.user_img == '' || this.props.isAuthenticated === false? <PersonIcon className={classes.menuIcon}/> : null}
            </IconButton>
          </div>
          <Divider className={classes.divider}/>
          <ListItem button key='Log Out' onClick={()=>this.props.logOutUser()}>
            <Link to="/" className={classes.link}>
              Log Out
            </Link>           
          </ListItem>
        </Fragment>
      )
    }

    const sideList = side => (
      <div
        className={classes.list}
        role="presentation"
        onClick={this.toggleDrawer(side, false)}
        onKeyDown={this.toggleDrawer(side, false)}
        key="box"
      >
        <List key="list">
            <ListItem button key='Landing'>
              <Link to="/" className={classes.link} key='LandingInner'>
                Landing
              </Link>        
            </ListItem>
            <ListItem button key='Cities'>
              <Link to="/cities" className={classes.link} key='CitiesInner'>
                Cities
              </Link>           
            </ListItem>
            <Divider className={classes.divider}/>
            {optionalLinks}
        </List>
      </div>
    );
    
    return (
      <div className={classes.header} key="main">
        <IconButton onClick={this.toggleDrawer('left', true)} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon className={classes.menuIcon}/>
        </IconButton>
        <BackButton />
        <IconButton onClick={this.toggleDrawer('left', true)} edge="start" className={classes.userButton} color="inherit" aria-label="menu"  style={{ backgroundImage: `url(${this.props.userInfo && this.props.userInfo.user_img !== '' ? this.props.userInfo.user_img : null})` }}>
          {this.props.userInfo && this.props.userInfo.user_img == '' || this.props.isAuthenticated === false? <PersonIcon className={classes.menuIcon}/> : null}
        </IconButton>
        <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)} >
          {sideList('left')}
        </Drawer>
      </div>
    )
  }
  
}

const mapStateToProps = state => ({
  isAuthenticated: state.users.isAuthenticated,
  userInfo: state.users.user
})

const mapDispatchToProps = { authenticateUser, logOutUser }

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SideMenu))