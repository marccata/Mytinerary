import React, { Component } from 'react';
import PopularItineraries from './PopularItineraries.js';


export default class Landing extends Component {
    render() {
        return (
            <div className="landing">
                <div className="logo-div margins">
                    <h1>Mytinerary</h1>
                    {/*<img src={logo} alt="Logo" className="mylogo"/>*/}
                    <div>
                        <p>Find your perfect trip, designed by insiders who know and love their cities</p>
                    </div>
                </div>
                <div className="d-flex margins spacing center">
                    <a className="button" to="/login">Want to build your own Mytinerary?</a>
                </div>
                <PopularItineraries />
            </div>
        )
    }
}
