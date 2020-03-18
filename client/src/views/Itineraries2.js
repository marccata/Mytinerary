import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getItineraries } from '../store/actions/itinerariesActions';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Grid from '@material-ui/core/Grid';
import Itineraries2 from '../components/Itineraries2.js';

class Itineraries extends Component {

    constructor(props) {
        super(props);
        this.state = {
            itineraries: [{}]
        };
    }

    componentDidMount(){
        this.props.getItineraries(this.props.match.params.city_id)
    }
    
    UNSAFE_componentWillReceiveProps(nextProps){
        if(nextProps.itineraries !== this.props.itineraries){
            this.setState({
                itineraries: nextProps.itineraries
                //TODO REVIEW THIS NEXT PROPS AND SEE WHY IS PROPS ON CARD RENDER AND NOT STATE.
            })
        }
    }

    render() {        
        console.log(this.props.match.params.city_id);
        console.log(this.props.itineraries);

        let itineraries = this.props.itineraries;

        if (itineraries.length > 0){
            console.log('Current city is ' + this.props.itineraries[0].city_id.name);
        }

        const itineraryCard = this.props.itineraries.map((itinerary, i) => {
            return(
                <Grid container item xs={12}  className="cityCard" key={itinerary._id}>
                    <Card className="cityCardInner" >
                        <CardActionArea>
                        <h3 className="cardTitle">{itinerary.title}</h3>
                        </CardActionArea>
                    </Card>
                    <Itineraries2 itineraries={this.props.itineraries}/>
                </Grid>
            )
        });
        
        return (
        <div>
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

const mapDispatchToProps = { getItineraries }

export default connect(mapStateToProps, mapDispatchToProps)(Itineraries)