import React, { Component } from 'react';

export default class CountryList extends Component {

  static defaultProps = {
    countriesData: [],
    country: '',
    onHandleShowCountry: {}
  }

  handleShowCountryChange = (e) => {
    this.props.onHandleShowCountry(e.target.value);
  }


  render() {
    const {
      countriesData,
      country
    } = this.props

    // Create an array of buttons, one for each country:
    var buttons = [];
    countriesData.forEach((entry, i) => {
      var className = entry.location === country ? 'location-selected' : 'location-button';
      var button = <li key={i}>
                      <button className={className}
                              value={entry.location}
                              onClick={this.handleShowCountryChange}>
                              {entry.location}
                      </button>
                    </li>
      buttons.push(button)
    })

    return (
      <div className="CountryList">
        <ul className="CountryList-links">
          {buttons}
        </ul>
      </div>
    );
  }
}
