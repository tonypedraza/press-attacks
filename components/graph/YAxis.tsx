import React, { Component, FunctionComponent } from "react";
import * as d3 from "d3";

interface YAxisProps {
  margin: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  height: number;
  width: number;
  yDomain: number[];
}

const YAxis: FunctionComponent<YAxisProps> = (props: YAxisProps) => {
  //Sizing settings:
  var margin = props.margin;
  var height = props.height - margin.top - margin.bottom;
  var width = props.width - margin.left - margin.right;

  //y-axis domain:
  var yDomain = props.yDomain;

  // D3 Y-axis:
  const yScale = d3
    .scaleLinear()
    .domain(yDomain)
    .range([height, 0]);

  const yAxis = d3
    .axisLeft(yScale)
    .tickSize(-width)
    .ticks(5)
    .tickFormat(String);

  d3.select(".yaxis")
    .style("stroke-dasharray", "2 2")
    .call(yAxis as any);

  return (
    <div>
      <g className="yaxis"></g>
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

export default YAxis;
