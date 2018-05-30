import React, { Component } from 'react'

export default class CountryInfo extends Component {

  render() {
    var country = this.props.country

    country.charAt(0).toUpperCase()

    if (country) {
      return (
        <div className="CountryInfo">
          <p>{country}</p>
        </div>
      )
    }
    else {
      return null
    }
  }
}
