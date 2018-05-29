import React, { Component } from 'react';
import YearPane from './YearPane';

export default class JournalistNames extends Component {

  static defaultProps = {
    pressAttacksData: [],
    country: ''
  }

  render() {
    const {
      pressAttacks,
      country
    } = this.props

/*
TODO:
Should probably make a new json file with the attacks
sorted by year, so we can iterate the attacks and simply
make a new YearPane every time the year changes

pseudocode:

var currentYear = 1992
var results = [<h1>1992</h1>]
sortedAtttacksByYear.forEach((entry {
  if (entry.year === currentYear) {
    results.push(<p>{entry.name}</p>)
  }
  else {
    currentYear = entry.year
    results.push(<h1>{currentYear}</h1>)
    results.push(<p>{entry.name}</p>)
  }
}))

*/

    return (
      <div className="test">
      </div>
    )
  }
}
