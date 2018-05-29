import React, { Component } from 'react';
import * as d3 from 'd3'

import '../css/CountryGraph.css'

export default class Yaxis extends Component {

  render() {
    //Sizing settings:
    var margin = this.props.margin;
    var height = this.props.height - margin.top - margin.bottom;
    var width = this.props.width - margin.left - margin.right;

    //Array with frequency of attacks in location per year:
    var locationFrequency = this.props.locationFrequency;
    //y-axis domain:
    var yDomain = this.props.yDomain

    // D3 Line:
    const x = d3.scaleTime()
                .range([0, width])

    const y = d3.scaleLinear()
                .range([height, 0])

    const line = d3.line()
                   .x(function(d) { return x(d.year) })
                   .y(function(d) { return y(d.Freq) })

    locationFrequency.forEach((d) => {
      x.domain(d3.extent(locationFrequency, function(d) { return d.year; }));
      y.domain(yDomain);
    })

    var newline = line(locationFrequency)

    return(
      <path className="line" d={newline}></path>
    );
  }
}
