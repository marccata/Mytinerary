import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getItinerariesComments, postItineraryComment } from '../store/actions/itinerariesActions';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';


const styles = theme => ({
    commentsParent: {
        paddingTop: '80px',
        marginLeft: '20px',
        marginRight: '20px'
    },
    root: {
        width: '100%',
    },
    inline: {
        display: 'inline',
    },
    divider: {
        margin: '0px'
    },
    comment: {
       paddingLeft: '0px',
       paddingRight: '0px' 
    },
    avatar: {
        backgroundColor: '#E8E6DC',
        color: '#000000',
        backgroundPosition: 'center',
        backgroundSize: 'cover'
    },
    inputField: {
        width: '100%',  
        marginTop: '30px'
    },
    button: {
        backgroundColor: '#014FEC',
        borderRadius: '20px',
        marginBottom: '40px',
        color: 'white',
        marginTop: '25px',
        width: '100%',
        textTransform: 'none',
        fontSize: '16px !important;',
        lineHeight: '20px',
        fontWeight: 300,
        padding: '8px 16px',
        "&:hover": {
            backgroundColor: 'black'
        }
    },
    buttonLogIn: {
        backgroundColor: 'grey',
        borderRadius: '20px',
        marginBottom: '40px',
        color: 'white',
        marginTop: '25px',
        textTransform: 'none',
        fontSize: '16px !important;',
        lineHeight: '20px',
        fontWeight: 300,
        padding: '8px 16px',
        textAlign: 'center',
        "&:hover": {
            backgroundColor: 'black'
        }
    },
    buttonLogInInner: {
        color: 'white',
        textDecoration: 'none'
    }
})
  
class ItinerariesComments extends Component {

    constructor(props) {
        super(props);
        this.state = {
            itinerariesComments: [],
            newComment: "",
            itineraryId: "",
            isAuthenticated: true //TODO OJO
        };
        this.updateComment = this.updateComment.bind(this);
    }

    componentDidMount(){
        var itineraryId = this.props.match.params.itinerary_id;
        this.props.getItinerariesComments(itineraryId);
        this.setState({ itineraryId: itineraryId })
        //this.setState({ isAuthenticated: isAuthenticated })
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        if(nextProps.itinerariesComments !== this.props.itinerariesComments){
            this.setState({
                itinerariesComments: nextProps.itinerariesComments,
                currentItinerary: nextProps.currentItinerary
            })
        }
    }

    // ONCHANGE EVENTS FOR INPUT FIELD - UPDATES STATE
    updateComment(event) { this.setState({newComment: event.target.value}); console.log(this.state.itineraryId, this.props.userInfo.user_id, this.state.newComment, 'today') }

    submitComment(itineraryId, userId, newComment, time) {
        console.log(itineraryId, userId, newComment, time);
        this.props.postItineraryComment(itineraryId, userId, newComment, time);
        this.setState({ newComment: "" })
    }

    render() {        
        const { classes } = this.props;
        console.log(this.props);
        var commentInput = "";

        if (this.state.itinerariesComments.length > 0) {
            var comments = this.state.itinerariesComments.map((itineraryComment, i) => {
                return(
                    <Fragment key={i}>
                        <ListItem alignItems="flex-start" key={i} className={classes.comment}>
                            <ListItemAvatar>
                                <Avatar aria-label="recipe" className={classes.avatar} style={{ backgroundImage: `url(${itineraryComment.user_id.user_img === "" ? null : itineraryComment.user_id.user_img})` }}>
                                    {itineraryComment.user_id.user_img === "" ? itineraryComment.user_id.email.charAt(0).toUpperCase() : ' '}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={itineraryComment.user_id.name}
                                secondary={
                                <React.Fragment>
                                    {itineraryComment.comment}
                                </React.Fragment>
                                }
                            />
                        </ListItem>
                        <Divider variant="inset" component="li" key={'divider' + i} className={classes.divider}/>
                    </Fragment>
                )
            })
        } else {var comments = null}

        if (this.props.isAuthenticated === true){
            var commentInput = (
                <Fragment>
                    <TextField
                    id="outlined-multiline-static"
                    label="Leave your comment"
                    multiline
                    rows="4"
                    variant="outlined"
                    className={classes.inputField}
                    value={this.state.newComment} 
                    onChange={this.updateComment}
                    />
                    <Button 
                    className={classes.button} 
                    disableElevation     
                    onClick={() => { this.submitComment(this.state.itineraryId, this.props.userInfo._id, this.state.newComment, 'today') }}
                    >
                        Submit comment
                    </Button>
                </Fragment>
            )
        } else {
            var commentInput = (
                <div className={classes.buttonLogIn}>
                    <Link to="/login" className={classes.buttonLogInInner}>
                    Log In to leave a comment
                    </Link>
                </div>
            )
        }

        return (
            <div className={classes.commentsParent}>
                <h2 className={classes.itineraryTitle}>{this.state.itinerariesComments[0] ? this.state.itinerariesComments[0].itinerary_id.title : null}</h2>
                <List className={classes.root}>
                    <Divider variant="inset" component="li" key={'divider'} className={classes.divider}/>
                    {comments == null ? 
                    <p className={classes.itineraryTitle}>This itinerary has no comments.<br/> You can make the first one!</p> 
                    : comments}
                </List>
                {commentInput}
            </div>
        )
    }

} 

const mapStateToProps = state => ({
    itinerariesComments: state.itineraries.itinerariesComments,
    userInfo: state.users.user,
    isAuthenticated: state.users.isAuthenticated
})

const mapDispatchToProps = { getItinerariesComments, postItineraryComment }

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ItinerariesComments))