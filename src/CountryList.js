import React, { Component } from 'react';
import './css/CountryList.css';

export default class CountryList extends Component {
  static defaultProps = {
    data: [],
    country: '',
    onHandleShowCountry: {}
  }

  handleShowCountryChange = (e) => {
    this.props.onHandleShowCountry(e.target.value);
  }


  render() {
    const {
      data
    } = this.props

    var buttons = [];
    data.forEach((entry, i) => {
      var button = <li key={i}>
                      <button value={entry.location}
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
