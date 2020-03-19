import React, { Component } from 'react';

export default class SearchBar extends Component {

  render() {

    return (
      <div className="searchBarHeader">
          <input className="form-control mr-sm-2 col-12" type="search" placeholder="Search your city" aria-label="Search" id="searchBar" onChange={this.props.searchFilter}/>
      </div>
    )

  }

}
