import React, { Fragment, FunctionComponent } from "react";
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

/*
This is the YAxis component that renders the y axis used in the
D3 graph.
*/

const YAxis: FunctionComponent<YAxisProps> = (props: YAxisProps) => {
  //Sizing settings:
  const margin = props.margin;
  const height = props.height - margin.top - margin.bottom;
  const width = props.width - margin.left - margin.right;

  //y-axis domain:
  const yDomain = props.yDomain;

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
    <Fragment>
      <g className="yaxis"></g>
    </Fragment>
  );
};

export default YAxis;
