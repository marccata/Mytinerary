import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getActivities } from '../store/actions/activitiesActions';
import { withStyles } from '@material-ui/core/styles';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

const styles = theme => ({
    activitiesTiles: {
        width: '150px',
        height: '150px',
        marginRight: '14px',
    }
});
  
class Activities extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activities: []
        };
    }

    componentDidMount(){
        this.props.getActivities(this.props.itinerary_id)
    }

    render() {    
        const { classes } = this.props;

        const activityCard = this.props.activities.map((activity, i) => {
            return(
                <GridListTile className={classes.activitiesTiles} key={i}>
                    <img src={activity.img} alt={activity.title}/>
                    <GridListTileBar title={activity.title} />
                </GridListTile>
            )
        });
        
        return (
        <Fragment>
            {activityCard}
        </Fragment>
        )
    }
} 

const mapStateToProps = state => ({
    activities: state.activities.activities
})

const mapDispatchToProps = { getActivities }

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Activities))