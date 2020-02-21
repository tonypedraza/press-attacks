import React, { Component, FunctionComponent } from "react";
import * as d3 from "d3";

interface LineProps {
  margin: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  height: number;
  width: number;
  yDomain: number[];
  locationFrequency: any[];
}

const Line: FunctionComponent<LineProps> = (props: LineProps) => {
  //Sizing settings:
  var margin = props.margin;
  var height = props.height - margin.top - margin.bottom;
  var width = props.width - margin.left - margin.right;

  //Array with frequency of attacks in location per year:
  var locationFrequency = props.locationFrequency;
  //y-axis domain:
  var yDomain = props.yDomain;

  // D3 Line:
  const x = d3.scaleTime().range([0, width]);

  const y = d3.scaleLinear().range([height, 0]);

  const line = d3
    .line()
    .x(function(d: any) {
      return x(d.year);
    })
    .y(function(d: any) {
      return y(d.Freq);
    });

  locationFrequency.forEach(d => {
    x.domain(
      d3.extent(locationFrequency, function(d: any) {
        return d.year;
      })
    );
    y.domain(yDomain);
  });

  var newline = line(locationFrequency);

  return (
    <div>
      <path className="line" d={newline}></path>
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

export default Line;
