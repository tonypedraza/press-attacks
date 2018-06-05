import React, { Component } from 'react';
import * as d3 from 'd3'

import '../css/CountryGraph.css'

export default class XAxis extends Component {

  render() {
    // Sizing settings:
    var margin = this.props.margin;
    var height = this.props.height - margin.top - margin.bottom;
    var width = this.props.width - margin.left - margin.right;

    // D3 X-axis, fixed from 1992 to 2018
    const xScale = d3.scaleTime()
                     .domain([new Date(1992, 0, 1, 0), new Date(2018, 0, 1, 0)])
                     .range([0, width])

    const xAxis = d3.axisBottom(xScale)
                    .tickFormat(d3.timeFormat("%Y"))
                    .tickSize(-height)

    d3.select(".xaxis")
      .attr("transform", "translate(0," + (height + 7) +")")
      .style("stroke-dasharray", "2 2")
      .call(xAxis);

    return(
      <g className="xaxis"></g>
    );
  }
}
