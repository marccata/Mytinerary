import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Link} from 'react-router-dom';
import BackButton from './BackButton';


const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  header: {
    position: 'fixed',
    padding: '20px'
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

  }
});

export default function TemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
          <ListItem button key='Landing'>
            <Link to="/" className={classes.link}>
              Landing
            </Link>        
          </ListItem>
          <ListItem button key='Cities'>
            <Link to="/cities" className={classes.link}>
              Cities
            </Link>           
          </ListItem>
          <ListItem button key='Login'>
            <Link to="/login" className={classes.link}>
              Log In
            </Link>           
          </ListItem>
      </List>
    </div>
  );

  return (
    <div className={classes.header}>
      <IconButton onClick={toggleDrawer('left', true)} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
        <MenuIcon className={classes.menuIcon}/>
      </IconButton>
      <BackButton />
      <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
        {sideList('left')}
      </Drawer>
    </div>
  );
}