import React, { Component } from 'react';
import CityCardRoute from './CityCardRoute';
import SearchBar from './SearchBar.js';

export default class Cities extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cities: [],
            searchValue: ""
        };
    }

    componentDidMount() {
        fetch(`http://localhost:5000/api/cities/all`)
        .then(response => response.json())
        .then(data => {
            console.log(data)  
            this.setState({
            cities: data
            })
        })
        .catch(error => this.setState({ error, isLoading: false }));
    }
    
    /* SEARCH FILTER - SET SEARCH VALUE*/
    searchFilter = (e) => {
        this.setState({
            searchValue: e.target.value
        }, () => {
            console.log(this.state.searchValue);
            this.checkIfEmpty();
        });
    }

    checkIfEmpty() {
        if(document.getElementById('cityCardsBox').innerHTML === "") {
            document.getElementById('emptyMessage').style.visibility = 'visible';
        } else {
            document.getElementById('emptyMessage').style.visibility = 'hidden';
        }
    }

    render() {
        
        const cityCard = this.state.cities.filter(city => city.name.toLowerCase().includes(this.state.searchValue.toLowerCase()) || this.state.searchValue === "").map((city, i) => {
            return(
                <CityCardRoute city={city} key={i} />
            )
        });
        
        return (
            <div  className="container">
                <SearchBar searchFilter={this.searchFilter}/>
                <div id="cityCardsBox">
                    {cityCard}
                </div>
                <div id="emptyMessage">
                    <h2>Your search has no matches...</h2>
                </div>
            </div>
        )
    }

}
