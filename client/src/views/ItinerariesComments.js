import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getItinerariesComments, setCurrentItinerary } from '../store/actions/itinerariesActions';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';


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
    }
})
  
class ItinerariesComments extends Component {

    constructor(props) {
        super(props);
        this.state = {
            itinerariesComments: []
        };
    }

    componentDidMount(){
        var path = window.location.pathname;
        var itineraryId = path.split("/").pop();
        this.props.getItinerariesComments(itineraryId);
        //this.props.getItinerariesComments(this.props.match.params.itinerary_id);
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        if(nextProps.itinerariesComments !== this.props.itinerariesComments){
            this.setState({
                itinerariesComments: nextProps.itinerariesComments,
                currentItinerary: nextProps.currentItinerary
            })
        }
    }

    render() {        
        const { classes } = this.props;
        console.log(this.state.itinerariesComments)

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
        } else {
            var comments = null
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
                <TextField
                    id="outlined-multiline-static"
                    label="Leave your comment"
                    multiline
                    rows="4"
                    defaultValue=" "
                    variant="outlined"
                    className={classes.inputField}
                />
                <Button className={classes.button} disableElevation>
                    Send comment
                </Button>
            </div>
        )
    }

} 

const mapStateToProps = state => ({
    itinerariesComments: state.itineraries.itinerariesComments,
})

const mapDispatchToProps = { getItinerariesComments }

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ItinerariesComments))