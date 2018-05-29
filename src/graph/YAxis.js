import React, { Component } from 'react';
import * as d3 from 'd3'

import '../css/CountryGraph.css'

export default class Yaxis extends Component {

  render() {
    //Sizing settings:
    var margin = this.props.margin;
    var height = this.props.height - margin.top - margin.bottom;
    //y-axis domain:
    var yDomain = this.props.yDomain

    // D3 Y-axis:
    const yScale = d3.scaleLinear()
                     .domain(yDomain)
                     .range([height, 0])

    const yAxis = d3.axisLeft(yScale)
                    .tickSize(6, 1)

    d3.select(".yaxis").call(yAxis);

    return(
      <g className="yaxis"></g>
    );
  }
}
