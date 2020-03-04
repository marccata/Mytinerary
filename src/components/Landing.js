import React, { Component } from 'react'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import PopularItineraries from './PopularItineraries.js'
import logo from './img/MYtineraryLogo.png'

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
                <a className="landing-arrow" href="">
                    <ArrowForwardIcon />
                </a>
                <div>
                    <a href="https://google.cat">Want to build your own Mytinerary?</a>
                </div>
                <PopularItineraries />
            </div>
        )
    }
}
