import React, { Component } from 'react';
import * as d3 from 'd3'

import '../css/CountryGraph.css'

export default class Yaxis extends Component {

  render() {
    //Sizing settings:
    var margin = this.props.margin;
    var height = this.props.height - margin.top - margin.bottom;
    var width = this.props.width - margin.left - margin.right;

    //y-axis domain:
    var yDomain = this.props.yDomain

    //number of ticks
    var numTicks = yDomain[1] > 25 ? 6: yDomain[1];

    // D3 Y-axis:
    const yScale = d3.scaleLinear()
                     .domain(yDomain)
                     .range([height, 0])

    const yAxis = d3.axisLeft(yScale)
                    .tickSize(-width)
                    .ticks(5)
                    .tickFormat(String)

    d3.select(".yaxis").style("stroke-dasharray", "2 2").call(yAxis);

    return(
      <g className="yaxis"></g>
    );
  }
}
