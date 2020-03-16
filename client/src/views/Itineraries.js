import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getItineraries } from '../store/actions/itinerariesActions';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Grid from '@material-ui/core/Grid';

class Itineraries extends Component {

    constructor(props) {
        super(props);
        this.state = {
            itineraries: [],
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

        const itineraryCard = this.props.itineraries.map((itinerary, i) => {
            return(
                <Grid container item xs={12}  className="cityCard">
                    <Card className="cityCardInner" >
                        <CardActionArea>
                        <h3 className="cardTitle">{itinerary.title}</h3>
                        </CardActionArea>
                    </Card>
                </Grid>
            )
        });
        
        return (
            <div  className="container">
                <div id="itineraryCityImg">
                    
                </div>
                <div id="cityCardsBox">
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