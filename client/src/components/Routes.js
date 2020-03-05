import React, { Component } from 'react'

export default class Routes extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cities: []
        };
    }

    componentDidMount() {
        fetch(`../server/api/cities/all`)
        .then(response => response.json())
        .then(data =>
        this.setState({
            cities: data
        })
        )
        .catch(error => this.setState({ error, isLoading: false }));
        console.log(this.state.cities)
    }

    render() {
        const cityCard = this.state.cities.map((city, i) =>
            <li>{city.name}</li>
        );
        const test = 'paqui test';
        console.log('works');
        
        return (
            <div>
                {cityCard}
                {test}
            </div>
        )
    }

}
