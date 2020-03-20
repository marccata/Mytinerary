import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { getCities } from '../store/actions/cityActions.js';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';



const styles = theme => ({
    parent: {
        marginTop: '40px'
    },
    cityCard: {
        width: '200px',
        height: '180px',
        marginRight: '14px',
        backgroundSize: 'cover',
        borderRadius: '8px'
    },
    tilesContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
        marginLeft: '20px'
    },
    gridList: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
        display: 'flex',
        overflowY: 'auto',
        listStyle: 'none',
        paddingInlineStart: '0px !important'
    },
    TileBar: {
        background: 'transparent !important'
    }
});

class Popularit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cities: []
        };
    }

    componentDidMount(){
        this.props.getCities()
    }
    
    UNSAFE_componentWillReceiveProps(nextProps){
        if(nextProps.cities !== this.props.cities){
            this.setState({
                cities: nextProps.cities
            })
        }
    }

    render() {
        const { classes } = this.props;
        console.log(this.state.cities)

        const cityCard = this.state.cities.map((city, i) => {
            return(
                <Link to={"/itineraries/" + city._id}>                       
                    <GridListTile className={classes.cityCard} key={i} style={{ backgroundImage: `url(${city.img})` }} id="landingCityTiles">
                            <GridListTileBar title={city.name} className={classes.TileBar}/>
                    </GridListTile>
                </Link>
            )
        });

        return (
            <div className={classes.parent}>
                <h3>Most popular cities</h3>
                <div className={classes.tilesContainer} id="hideScrollBar">
                    <ul className={classes.gridList}>
                        {cityCard}
                    </ul>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => ({
    cities: state.cities.cities
})

const mapDispatchToProps = { getCities }

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Popularit))
