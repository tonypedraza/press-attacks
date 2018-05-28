import React, { Component } from 'react';
import './css/CountryList.css';

export default class CountryGraph extends Component {

  static defaultProps = {
    data: [],
    country: ''
  }

  render() {
    const {
      data
    } = this.props

    var attacks = [];
    data.forEach((entry, i) => {
      if (entry.location === this.props.country) {
        attacks.push(<p key={i}>{entry.name}</p>)
      }
    })

    return (
      <div className="CountryGraph">
        {attacks}
      </div>
    );
  }
}
