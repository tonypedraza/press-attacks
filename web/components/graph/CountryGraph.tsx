/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FunctionComponent } from "react";
import * as d3 from "d3";

import XAxis from "./XAxis";
import YAxis from "./YAxis";
import Line from "./Line";
import { Country } from "../../types/press-attacks";

interface CountryGraphProps {
  country: Country;
  locationFrequencyData: any;
  graphWidth: number;
  graphHeight: number;
}

/*
This is the CountryGraph component that serves at the parent
for the D3 components (Line, XAxis, and YAxis) as well as the
CountryInfo component
*/

const CountryGraph: FunctionComponent<CountryGraphProps> = (
  props: CountryGraphProps
) => {
  const { locationFrequencyData, country, graphWidth, graphHeight } = props;
  const margin = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 50
  };

  // Row that matches the country prop and contains year data
  // Also finds if maximum number of attacks in a year
  // exceeds five so we can re-render y-axis
  let locationFrequency: [number, number][] = [];
  let maximumAttacks = 0;
  locationFrequencyData.forEach((entry: any) => {
    if (entry.location === country.name) {
      locationFrequency.push(entry);
      if (entry.Freq > maximumAttacks) {
        maximumAttacks = entry.Freq;
      }
    }
  });

  // Dynamic y-axis domain:
  let yDomain = [0, Math.max(maximumAttacks, 5)];

  let rectHeight = graphHeight - margin.top - margin.bottom;
  rectHeight = rectHeight < 0 ? 100 : rectHeight;
  let rectWidth = graphWidth - margin.left - margin.right;
  rectWidth = rectWidth < 0 ? 100 : rectWidth;

  let svg = d3.select(".graph");
  svg.attr("fill", "#F1F1F1");

  return (
    <div id="chart">
      <svg className="graph" height={graphHeight} width={graphWidth}>
        <g transform="translate(30, 20)">
          <rect className="playground" height={rectHeight} width={rectWidth} />
          <XAxis width={graphWidth} height={graphHeight} margin={margin} />
          <YAxis
            width={graphWidth}
            height={graphHeight}
            margin={margin}
            yDomain={yDomain}
          />
          <Line
            width={graphWidth}
            height={graphHeight}
            margin={margin}
            locationFrequency={locationFrequency}
            yDomain={yDomain}
          />
        </g>
      </svg>
    </div>
  );
};

export default CountryGraph;
