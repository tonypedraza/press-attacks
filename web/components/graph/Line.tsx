import React, { Fragment, FunctionComponent } from "react";
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
  locationFrequency: [number, number][];
}

/*
This is the Line component that renders the line used in the
D3 graph.
*/

const Line: FunctionComponent<LineProps> = (props: LineProps) => {
  //Sizing settings:
  const margin = props.margin;
  const height = props.height - margin.top - margin.bottom;
  const width = props.width - margin.left - margin.right;

  //Array with frequency of attacks in location per year:
  const locationFrequency = props.locationFrequency;
  //y-axis domain:
  const yDomain = props.yDomain;

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

  locationFrequency.forEach(() => {
    x.domain(
      d3.extent(locationFrequency, function(d: any) {
        return d.year;
      }) as [any, any]
    );
    y.domain(yDomain);
  });

  const newline = line(locationFrequency) as string;

  return (
    <Fragment>
      <path className="line" d={newline}></path>
    </Fragment>
  );
};

export default Line;
