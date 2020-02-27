import React, { Fragment, FunctionComponent } from "react";
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
  const margin = props.margin;
  const height = props.height - margin.top - margin.bottom;
  const width = props.width - margin.left - margin.right;

  // D3 X-axis, fixed from 1992 to 2018
  const xScale = d3
    .scaleTime()
    .domain([new Date(1992, 0, 1, 0), new Date(2018, 0, 1, 0)])
    .range([0, width]);

  let xAxis = d3
    .axisBottom(xScale)
    .tickFormat(d3.timeFormat("%Y") as any)
    .tickSize(-height);
  if (window.innerWidth < 700) {
    xAxis = xAxis.ticks(d3.timeYear.every(4));
  }

  d3.select(".xaxis")
    .attr("transform", "translate(0," + (height + 7) + ")")
    .style("stroke-dasharray", "2 2")
    .call(xAxis as any);

  return (
    <Fragment>
      <g className="xaxis"></g>
    </Fragment>
  );
};

export default XAxis;
