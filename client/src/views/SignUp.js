import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import { postUser } from '../store/actions/usersActions';

const styles = theme => ({
  main: {
    paddingTop: '90px'
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class SignUp extends Component {

  constructor(props) {
      super(props);
      this.state = {
          userEmail: '',
          userPassword: '',
          userImg: ''
      };
      this.changeEmail = this.changeEmail.bind(this);
      this.changePassword = this.changePassword.bind(this);
      this.changeImg = this.changeImg.bind(this);
  }

  // ON SUBMIT ACTIONS
  submitUser(userEmail, userPassword, userImg) {
    this.props.postUser(userEmail, userPassword, userImg);
    this.props.history.push('/login')
  }

  // ONCHANGE EVENTS FOR INPUT FIELDS
  changeEmail(event) {
    this.setState({userEmail: event.target.value});
  }
  changePassword(event) {
    this.setState({userPassword: event.target.value});
  }
  changeImg(event) {
    this.setState({userImg: event.target.value});
  }

  render() {
    const { classes } = this.props;

    return (
      <Container component="main" maxWidth="xs" className={classes.main}>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2} key="email">
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={this.state.userEmail} 
                  onChange={this.changeEmail}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} key="password">
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={this.state.userPassword} 
                  onChange={this.changePassword}
                />
              </Grid>
              <Grid item xs={12} sm={6} key="userimg">
                <TextField
                  autoComplete="fname"
                  name="userimg"
                  variant="outlined"
                  fullWidth
                  id="userimg"
                  label="Image URL"
                  value={this.state.userImg} 
                  onChange={this.changeImg}
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => { this.submitUser(this.state.userEmail, this.state.userPassword, this.state.userImg) }}
            >
              Sign Up
            </Button>
          </form>
        </div>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
})

const mapDispatchToProps = { postUser }

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SignUp))