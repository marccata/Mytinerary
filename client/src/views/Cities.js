import React, { Component, Fragment } from 'react';
import CityCardRoute from '../components/CityCardRoute';
import SearchBar from '../components/SearchBar.js';
import NoSearchResult from '../components/NoSearchResult';
import { connect } from 'react-redux';
import { getCities } from '../store/actions/cityActions.js';

class Cities extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cities: [],
            searchValue: ""
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
        console.log(this.props)
        
        const cityCard = this.state.cities.filter(city => city.name.toLowerCase().startsWith(this.state.searchValue.toLowerCase()) || this.state.searchValue === "").map((city, i) => {
            return(
                <CityCardRoute city={city} key={i} />
            )
        });
        
        return (
            <Fragment>
                <SearchBar searchFilter={this.searchFilter}/>
                <div  className="container">
                    <div id="cityCardsBox">
                        {cityCard}
                    </div>
                    <div id="emptyMessage">
                        <NoSearchResult />
                    </div>
                </div>
            </Fragment>
        )
    }

}

const mapStateToProps = state => ({
    cities: state.cities.cities
})

const mapDispatchToProps = { getCities }

export default connect(mapStateToProps, mapDispatchToProps)(Cities)