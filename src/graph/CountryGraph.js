import React, { Component } from 'react';
import * as d3 from 'd3'

//Components
import XAxis from './XAxis';
import YAxis from './YAxis';
import Line from './Line';

export default class CountryGraph extends Component {

  static defaultProps = {
    country: ''
  }

  state = {
    graph: "",
    container: "",
    graphWidth: 0,
    graphHeight: 0,
    margin: {}
  }

  componentDidMount() {
    const graph = d3.select("#graph");
    const container = d3.select("#graphic");
    const margin = {top: 20, right: 20, bottom: 30, left: 50};
    const graphWidth = 600;
    const graphHeight = 500;


    this.setState ({
      graph: graph,
      container: container,
      graphWidth: graphWidth,
      graphHeight: graphHeight,
      margin: margin
    });
  }

  render() {
    const {
      locationFrequencyData
    } = this.props

    // Row that matches the country prop and contains year data
    // Also finds if maximum number of attacks in a year
    // exceeds five so we can re-render y-axis
    var locationFrequency = [];
    var maximum_attacks = 0;
    locationFrequencyData.forEach((entry) => {
      if (entry.location === this.props.country) {
        locationFrequency.push(entry)
        if (entry.Freq > maximum_attacks) {
          maximum_attacks = entry.Freq
        }
      }
    })
    // Dynamic y-axis domain:
    var yDomain = [0, Math.max(maximum_attacks, 5)]


    var width = this.state.graphWidth;
    var height = this.state.graphHeight;
    var margin = this.state.margin;

    return (
      <div className="CountryGraph">
        <div id="chart">
          <svg height={height} width={width}>
            <g transform="translate(50,20)">
              <XAxis width={width}
                     height={height}
                     margin={margin}/>
              <YAxis width={width}
                     height={height}
                     margin={margin}
                     yDomain={yDomain}/>
              <Line width={width}
                    height={height}
                    margin={margin}
                    locationFrequency={locationFrequency}
                    yDomain={yDomain}/>
            </g>
          </svg>
        </div>
      </div>
    );
  }
}
