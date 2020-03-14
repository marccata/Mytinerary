import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getItineraries } from '../store/actions/itinerariesActions';

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
                <p>{itinerary.title}</p>
            )
        });
        
        return (
            <div  className="container">
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