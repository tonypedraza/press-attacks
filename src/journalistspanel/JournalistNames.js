import React, { Component } from 'react';

import JournalistPane from './JournalistPane'
import pressattacksdata from '../data/press_attacks_data.json'

export default class JournalistNames extends Component {

  static defaultProps = {
    pressAttacksYearSorted: [],
    country: ''
  }

  state = {
    journalist: '',
    namesScrollPositionTop: 0,
    namesScrollPositionLeft: 0
  }

  componentDidUpdate() {
    // Maintain scroll position
    if (this.names && this.props.resetScrollPosition) {
      this.names.scrollTop = 0
      this.names.scrollLeft = 0
    }
    else if (this.names) {
      this.names.scrollTop = this.state.namesScrollPositionTop
      this.names.scrollLeft = this.state.namesScrollPositionLeft
    }
    else {
      this.journalistcontainer.scrollTop = 0
      this.journalistcontainer.scrollLeft = 0
    }
  }

  handleChangeJournalist = (e) => {
    var journalist = e.target.value
    this.setState(prevState => ({
      journalist: journalist,
      namesScrollPositionTop: this.names.scrollTop,
      namesScrollPositionLeft: this.names.scrollLeft,
    }));
    this.props.onHandleOpenPane();
  }

  handleClosePane = () => {
    this.props.onHandleClosePane();
  }

  render() {
    const {
      pressAttacksYearSorted,
      country,
      paneIsOpen
    } = this.props

    var currentYear = 0
    var resultDivs = []
    var result = []
    pressAttacksYearSorted.forEach((entry, i) => {
      if (entry.location === country) {
        if (entry.year === currentYear) {
          result.push(<button className="name-button"
                              key={i}
                              value={entry.name}
                              onClick={this.handleChangeJournalist}>
                              {entry.name}
                              </button>)
        }
        else {
          // Wrap in div
          if (currentYear !== 0) {
            resultDivs.push(<div className="name-section" key={currentYear}>{result}</div>);
            result = []
          }
          currentYear = entry.year
          result.push(<p className="names-year" key={currentYear}>{currentYear}</p>)
          result.push(<button className="name-button"
                              key={i}
                              value={entry.name}
                              onClick={this.handleChangeJournalist}>
                              {entry.name}
                              </button>)
        }
      }
    })

    //One last wrap for the end cases:
    resultDivs.push(<div className="name-section" key={currentYear}>{result}</div>)

    //Most recent year to last
    resultDivs.reverse()

    if (paneIsOpen) {
      return (
          <div ref={(journalistcontainer)=>{this.journalistcontainer=journalistcontainer}}
               className="journalist-container">
            <JournalistPane journalist={this.state.journalist}
                            journalistData={pressattacksdata}
                            onHandleClosePane={this.handleClosePane} />
          </div>
      )
    }
    else {
      return (
        <div ref={(names)=>{this.names=names}} className="names">
          {resultDivs}
        </div>
      )
    }
  }
}
