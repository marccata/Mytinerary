import React, { Component } from 'react';
import PopularItineraries from '../components/PopularItineraries.js';
import { withStyles } from "@material-ui/core/styles";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import {Link} from 'react-router-dom';



const styles = {
    logoDiv: {
        backgroundColor: '#E8E6DE',
        paddingTop: '90px',
        paddingBottom: '80px',
        paddingLeft: '16px',
        paddingRight: '16px'
    },
    arrow: {
        fontSize: '1.5rem !important',
        marginBottom: '-5px'
    },
    button: {
        backgroundColor: '#014FEC',
        padding: '14px 22px 14px 22px',
        color: 'white',
        borderRadius: '40px',
        textDecoration: 'none',
    },
    findSection: {
        marginBottom: '40px'
    }
}

class Landing extends Component {
    render() {
        const { classes } = this.props;
        console.log(this.props)
        return (
            <div className="landing">
                <div className={classes.logoDiv} >
                    <h1>Mytinerary</h1>
                    <p className={classes.findSection}>Find your perfect trip, designed by insiders who know and love their cities</p>
                    <Link className={classes.button} to="/cities">Browse all cities <ArrowForwardIcon className={classes.arrow}/></Link>
                </div>
                <PopularItineraries />
            </div>
        )
    }
}

export default withStyles(styles)(Landing)