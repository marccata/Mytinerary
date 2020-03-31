import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getItinerariesComments } from '../store/actions/itinerariesActions';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
    root: {
        width: '100%',
        paddingTop: '80px'
    },
    inline: {
        display: 'inline',
    },
  });
  
class ItinerariesComments extends Component {

    constructor(props) {
        super(props);
        this.state = {
            itinerariesComments: []
        };
        //this.itinerariesComments = this.itinerariesComments.bind(this);
    }

    componentDidMount(){
        this.props.getItinerariesComments('5e70b7335f26b31a130f71c7');
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        if(nextProps.itinerariesComments !== this.props.itinerariesComments){
            this.setState({
                itinerariesComments: nextProps.itinerariesComments
            })
        }
    }

    render() {        
        const { classes } = this.props;
        console.log(this.props)
        console.log(this.state.itinerariesComments)

        if (this.state.itinerariesComments) {
            var comments = this.state.itinerariesComments.map((itineraryComment, i) => {
                return(
                    <Fragment>
                        <ListItem alignItems="flex-start" key={i}>
                            <ListItemAvatar>
                                <Avatar alt="Avatar" src={"fake-url"/* TODO USER ID IMG URL */} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={itineraryComment.user_id}
                                secondary={
                                <React.Fragment>
                                    {itineraryComment.comment}
                                </React.Fragment>
                                }
                            />
                        </ListItem>
                        <Divider variant="inset" component="li" key={'divider' + i}/>
                    </Fragment>
                )
            })
        } else {
            var comments = "";
        }
       

        return (
            <List className={classes.root}>
                {this.state.itinerariesComments.length !== 0 ? comments : ""}
            </List>
        )
    }

} 

const mapStateToProps = state => ({
    itinerariesComments: state.itineraries.itinerariesComments
})

const mapDispatchToProps = { getItinerariesComments }

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ItinerariesComments))