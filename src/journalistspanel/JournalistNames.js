import React, { Component } from 'react';

export default class JournalistNames extends Component {

  static defaultProps = {
    pressAttacksYearSorted: [],
    country: ''
  }

  // TODO: IF NEXT YEAR IS NOT CURRENT YEAR WRAP IN DIV AND RESET
  // if (pressAttacksYearsSorted[i+1].year !== currentYear) {
  //   resultDivs.push(<div className="name-section">{result}</div>)
  //   result = []
  // }

  //CURRENT WAY IS INCORRECT

  render() {
    const {
      pressAttacksYearSorted,
      country
    } = this.props

    var currentYear = 0
    var resultDivs = []
    var result = []
    pressAttacksYearSorted.forEach((entry, i) => {
      if (entry.location === country) {
        if (entry.year === currentYear) {
          result.push(<button className="name-button" key={i}>{entry.name}</button>)
        }
        else {
          // Wrap in div
          if (currentYear !== 0) {
            resultDivs.push(<div className="name-section">{result}</div>);
            result = []
          }
          currentYear = entry.year
          result.push(<p className="names-year">{currentYear}</p>)
          result.push(<button className="name-button" key={i}>{entry.name}</button>)
        }
      }
    })

    //One last wrap for the end cases:
    resultDivs.push(<div className="name-section">{result}</div>)

    return (
      <div className="names">
        {resultDivs}
      </div>
    )
  }
}
