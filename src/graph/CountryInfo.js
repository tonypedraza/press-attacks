import React, { Component } from 'react'

export default class CountryInfo extends Component {

  render() {
    var country = this.props.country
    var numAttacks = this.props.numAttacks

    country.charAt(0).toUpperCase()

    var pluralOrSingular = numAttacks > 1 ? "journalists" : "journalist";

    if (country) {
      return (
        <div className="CountryInfo">
          <p className="info-text"><span className="info-name">{country}</span>
          has {numAttacks} {pluralOrSingular} killed since 1992.</p>
        </div>
      )
    }
    else {
      return (
        <div className="CountryInfo">
          <p className="default-text">
          Select any of the countries on the left to see data.
          Then select any of the journalists to see their biography.
          Data is sourced from the <a target="_blank" rel="noopener noreferrer"
          href="https://cpj.org/">
          Committee to Protect Journalists</a>.</p>
        </div>
      )
    }
  }
}
