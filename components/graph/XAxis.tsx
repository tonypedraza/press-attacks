import React, { Component, FunctionComponent } from "react";
import * as d3 from "d3";

interface XAxisProps {
  margin: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  height: number;
  width: number;
}

const XAxis: FunctionComponent<XAxisProps> = (props: XAxisProps) => {
  // Sizing settings:
  var margin = props.margin;
  var height = props.height - margin.top - margin.bottom;
  var width = props.width - margin.left - margin.right;

  // D3 X-axis, fixed from 1992 to 2018
  const xScale = d3
    .scaleTime()
    .domain([new Date(1992, 0, 1, 0), new Date(2018, 0, 1, 0)])
    .range([0, width]);

  var xAxis = d3
    .axisBottom(xScale)
    .tickFormat(d3.timeFormat("%Y"))
    .tickSize(-height);
  if (window.innerWidth < 700) {
    xAxis = xAxis.ticks(d3.timeYear.every(4));
  }

  d3.select(".xaxis")
    .attr("transform", "translate(0," + (height + 7) + ")")
    .style("stroke-dasharray", "2 2")
    .call(xAxis);

  return (
    <div>
      <g className="xaxis"></g>
      <style jsx>{`
        .axis path,
        .axis line {
          fill: none;
          stroke: #000;
          shape-rendering: crispEdges;
        }
        .x.axis path {
          display: none;
        }

        .line {
          fill: none;
          stroke: #e10000;
          stroke-width: 2px;
        }
      `}</style>
    </div>
  );
};

export default XAxis;
