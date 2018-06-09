import React, { Component } from 'react';

export default class JournalistPane extends Component {

  static defaultProps = {
  }

  handleClosePane = () => {
    this.props.onHandleClosePane();
  }

  render() {

    const {
      journalist,
      journalistData,
      isOpen
    } = this.props

    var result = []
    journalistData.some((entry) => {
      if (entry.name === journalist) {
        result = entry;
        return entry.name === journalist
      }
    })
    return (
      <div className="journalistPane">
        <button className="closePaneButton"
                onClick={this.handleClosePane}>
        </button>
        <p><strong>Name:</strong> {result.name}</p>
        <p><strong>Date:</strong> {result.date}</p>
        <p><strong>Organization:</strong> {result.organization}</p>
        <p><strong>City:</strong> {result.specificlocation}</p>
        <p className="description">{result.description}</p>
      </div>
    )
  }
}
