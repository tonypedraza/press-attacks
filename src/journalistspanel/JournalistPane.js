import React, { Component } from 'react';

export default class JournalistPane extends Component {

  handleClosePane = () => {
    this.props.onHandleClosePane();
  }

  render() {
    const {
      journalist,
      journalistData
    } = this.props

    var result = []
    journalistData.forEach((entry) => {
      if (entry.name === journalist) {
        result = entry;
        return entry.name === journalist
      }
    })

    return (
      <div className="journalistPane">
        <button className="closePaneButton"
                onClick={this.handleClosePane}>
                Back
        </button>
        <p className="journalist-name">{result.name}</p>
        <p className="journalist-date">{result.date}</p>
        <p className="journalist-location">{result.specificlocation}, {result.location}</p>
        <p className="journalist-organization">{result.organization}</p>
        <p className="description">{result.description}</p>
      </div>
    )
  }
}
