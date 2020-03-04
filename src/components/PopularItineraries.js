import React, { Component } from 'react'
import CityCard from './CityCard'
import Grid from '@material-ui/core/Grid';

export default class Popularit extends Component {
    render() {
        return (
            <div className="margins">
                <h3>Popular MYtineraries</h3>
                <Grid container spacing={1}>
                    <CityCard />
                    <CityCard />
                    <CityCard />
                    <CityCard />
                </Grid>
            </div>
        )
    }
}
