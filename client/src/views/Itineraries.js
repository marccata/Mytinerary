import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getItineraries } from '../store/actions/itinerariesActions';
import { favItinerary } from '../store/actions/usersActions';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Activities from '../components/Activities';
import {Link} from 'react-router-dom';
import FavoriteIcon from '@material-ui/icons/Favorite';


const styles = theme => ({
    root: {
      maxWidth: 345,
      border: '#E8E6DC solid 1px',
      boxShadow: 'none',
      borderRadius: '12px',
      marginBottom: '20px'
    },
    media: {
      height: 0,
      paddingTop: '42%', // 16:9 56.25%
      marginRight: '16px',
      marginLeft: '16px',
      borderRadius: '8px',
      backgroundColor: '#E8E6DC'
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: '#E8E6DC',
      color: '#000000',
      backgroundPosition: 'center',
      backgroundSize: 'cover'
    },
    content: {
      marginRight: '16px',
      marginLeft: '16px',
    },
    description: {
        fontSize: '0.875rem'
    },
    tilesContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
        display: 'flex',
        overflowY: 'auto',
        listStyle: 'none',
        paddingInlineStart: '0px !important'
    },
    activitiesTiles: {
        width: '150px',
        height: '150px',
        marginRight: '14px',
    },
    button: {
        backgroundColor: '#014FEC',
        borderRadius: '20px',
        padding: '0px',
        marginBottom: '16px'
    },
    buttonInner: {
        fontSize: '16px !important;',
        textAlign: 'center',
        lineHeight: '20px',
        fontWeight: 300,
        color: 'white',
        textTransform: 'none !important',
        padding: '10px 16px'
    },
    favIcon: {
        marginTop: '0px !important',
        marginRight: '0px !important'      
    },
    favIconMarked: {
        color: 'red'
    }  
  });
  
class Itineraries extends Component {

    constructor(props) {
        super(props);
        this.state = {
            itineraries: [],
            selectedItineraryId: "",
            name:""
        };
    }

    componentDidMount(){
        this.props.getItineraries(this.props.match.params.city_id)
    }
    
    UNSAFE_componentWillReceiveProps(nextProps){
        if(nextProps.itineraries !== this.props.itineraries){
            this.setState({
                itineraries: nextProps.itineraries
            })
        }
    }

    handleExpandClick = (itineraryId) => {
        itineraryId === this.state.selectedItineraryId ? 
        this.setState({selectedItineraryId : ""}) :
        this.setState({selectedItineraryId : itineraryId})
    };

    render() {        
        let itineraries = this.props.itineraries;
        const { classes } = this.props;
       
        const itineraryCard = this.props.itineraries.map((itinerary, i) => {
            return(
                <Card className={classes.root} key={itinerary._id}>
                <CardHeader
                    avatar={
                    <Avatar aria-label="recipe" className={classes.avatar} style={{ backgroundImage: `url(${itinerary.user_img === "" ? null : itinerary.user_img})` }}>
                        {itinerary.user_img === "" ? itinerary.user.charAt(0).toUpperCase() : ' '}
                    </Avatar>
                    }
                    title={itinerary.title}
                    subheader={'By ' + itinerary.user}
                    action={
                        <IconButton aria-label="add to favorites" onClick={()=>this.props.favItinerary(itinerary._id)} className={classes.favIcon}>
                            <FavoriteIcon 
                            /* 
                            className={
                                if(active){classes.favIconMarked}
                            }
                            */
                            />
                        </IconButton>
                    }
                />
                <CardMedia
                    className={classes.media}
                    image={itinerary.img}
                    title="Route image"
                />
                <CardContent>
                    
                </CardContent>
                <CardActions disableSpacing>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {itinerary.likes + " Likes"} | {itinerary.hours + " Hours"} | {"Price " + itinerary.price}
                    </Typography>
                    <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: this.state.selectedItineraryId === itinerary._id,
                    })}
                    onClick={()=>this.handleExpandClick(itinerary._id)}
                    aria-expanded={this.state.selectedItineraryId === itinerary._id}
                    aria-label="show more"
                    >
                    <ExpandMoreIcon />
                    </IconButton>
                </CardActions>
                <Collapse in={this.state.selectedItineraryId === itinerary._id} timeout="auto" unmountOnExit >
                    <CardContent className={classes.content}>
                    <Typography className={classes.description} paragraph>
                        {itinerary.description}
                    </Typography>
                    <div className={classes.tilesContainer} id="hideScrollBar">
                        <ul className={classes.gridList}>
                            <Activities itinerary_id={itinerary._id}/>
                        </ul>
                    </div>
                    <Button className={classes.button} disableElevation>
                        <Link  to={"/itinerariescomments/" + itinerary._id} className={classes.buttonInner}>See comments</Link>
                    </Button>
                    </CardContent>
                </Collapse>
                </Card>
            )
        });
        
        return (
        <div id="itinerariesPage">
            <div id="itineraryCityImg" style={{ backgroundImage: `url(${itineraries.length > 0 ? itineraries[0].city_id.img : null})` }} > 
                <h3 className="cardTitle">
                    {itineraries.length > 0 ? itineraries[0].city_id.name : null}
                </h3>
            </div>
            <div id="cityCardsBox" className="container">
                {itineraryCard}
            </div>
        </div>
        )
    }

} 

const mapStateToProps = state => ({
    itineraries: state.itineraries.itineraries
})

const mapDispatchToProps = { getItineraries, favItinerary }

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Itineraries))