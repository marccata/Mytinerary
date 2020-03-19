import React, { Fragment } from 'react';
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = {
  root: {
    backgroundColor: 'white',
    height: '38px',
    width: '38px',
    marginLeft: '0px',
    padding: '3px',
    border: '#E8E6DC solid 1px',
    marginLeft: '8px',
    "&:hover": {
      backgroundColor: 'white'
    }
  },
  arrow: {
    fontSize: '1.9rem !important',
    color: 'black'
  }
};

class BackButton extends React.Component {

  render() {

    console.log(this.props)
    const { classes } = this.props;
    const goBack = () => this.props.history.goBack();
    const { pathname } = this.props.location;
    return (
      <Fragment>
        {pathname === '/' ? null :
          <IconButton edge="start" className={classes.root} aria-label="go back" onClick={goBack}>
            <ArrowBackIcon className={classes.arrow}/>
          </IconButton>
          }
      </Fragment>
    );
    
  }

}

export default withStyles(useStyles)(withRouter(BackButton))