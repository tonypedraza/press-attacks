import React, { Component } from 'react';
import YearPane from './YearPane';

export default class JournalistNames extends Component {

  static defaultProps = {
    pressAttacksYearSorted: [],
    country: ''
  }

  render() {
    const {
      pressAttacksYearSorted,
      country
    } = this.props

    var currentYear = 0
    var results = []
    pressAttacksYearSorted.forEach((entry, i) => {
      if (entry.location === country) {
        if (entry.year === currentYear) {
          results.push(<button key={i}>{entry.name}</button>)
        }
        else {
          currentYear = entry.year
          results.push(<h1>{currentYear}</h1>)
          results.push(<button key={i}>{entry.name}</button>)
        }
      }
    })

    return (
      <div className="test">
        {results}
      </div>
    )
  }
}
