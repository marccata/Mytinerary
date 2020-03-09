import React, { Component, Fragment } from 'react';

export default class SearchBar extends Component {

  render() {

    return (
      <Fragment>
          <input className="form-control mr-sm-2 col-12" type="search" placeholder="Search your city" aria-label="Search" id="searchBar" onChange={this.props.searchFilter}/>
      </Fragment>
    )

  }

}
