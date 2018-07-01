import React, { Component } from 'react';
import * as d3 from 'd3'

//Components
import XAxis from './XAxis';
import YAxis from './YAxis';
import Line from './Line';

export default class CountryGraph extends Component {

  state = {
    graph: "",
    container: "",
    margin: {top: 20, right: 20, bottom: 30, left: 50}
  }

  componentDidMount() {
    const graph = d3.select("#graph");
    const container = d3.select("#graphic");
    const margin = {top: 20, right: 20, bottom: 30, left: 50};

    this.setState ({
      graph: graph,
      container: container,
      margin: margin
    });
  }

  render() {
    const {
      locationFrequencyData,
      country,
      graphWidth,
      graphHeight
    } = this.props

    // Row that matches the country prop and contains year data
    // Also finds if maximum number of attacks in a year
    // exceeds five so we can re-render y-axis
    var locationFrequency = [];
    var maximum_attacks = 0;
    locationFrequencyData.forEach((entry) => {
      if (entry.location === country) {
        locationFrequency.push(entry)
        if (entry.Freq > maximum_attacks) {
          maximum_attacks = entry.Freq
        }
      }
    })

    // Dynamic y-axis domain:
    var yDomain = [0, Math.max(maximum_attacks, 5)]

    var margin = this.state.margin;
    var rectHeight = graphHeight - margin.top - margin.bottom;
    rectHeight = rectHeight < 0 ? 100 : rectHeight
    var rectWidth = graphWidth - margin.left - margin.right;
    rectWidth = rectWidth < 0 ? 100 : rectWidth

    var svg = d3.select(".graph");
    svg.attr("fill", "#F1F1F1");

    return (
        <div id="chart">
          <svg className="graph" height={graphHeight} width={graphWidth}>
            <g transform="translate(30, 20)">
              <rect className="playground" height={rectHeight} width={rectWidth}/>
              <XAxis width={graphWidth}
                     height={graphHeight}
                     margin={margin}/>
              <YAxis width={graphWidth}
                     height={graphHeight}
                     margin={margin}
                     yDomain={yDomain}/>
              <Line width={graphWidth}
                    height={graphHeight}
                    margin={margin}
                    locationFrequency={locationFrequency}
                    yDomain={yDomain}/>
            </g>
          </svg>
        </div>
    );
  }
}
