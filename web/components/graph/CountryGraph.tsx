/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FunctionComponent } from "react";
import * as d3 from "d3";

import XAxis from "./XAxis";
import YAxis from "./YAxis";
import Line from "./Line";
import { Country, Journalist } from "../../types/press-attacks";

interface CountryGraphProps {
  country: Country;
  journalists: Journalist[];
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
  const { country, journalists, graphWidth, graphHeight } = props;
  const margin = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 50
  };

  const reverseJournalists = journalists.slice(0).reverse();
  let frequencies: any[] = [];
  const fillYears = (l: number, h: number) => {
    for (let idx = l + 1; idx < h; idx++) {
      frequencies.push({ year: idx, Freq: 0 });
    }
  };
  let year = 1992;
  let count = 0;
  reverseJournalists.forEach(entry => {
    let journalistYear = Number.parseInt(entry.year.slice(0, 4));
    if (year === journalistYear) count++;
    else {
      frequencies.push({ year: year, Freq: count });
      if (journalistYear - year > 0) {
        fillYears(year, journalistYear);
      }
      count = 1;
      year = journalistYear;
    }
  });
  frequencies.push({ year: year, Freq: count }); //fence post case
  const currentYear = new Date().getFullYear();
  if (year < currentYear) fillYears(year, currentYear + 1); // filling in remaining years if any

  let maximumAttacks = 0;
  frequencies.forEach((entry: any) => {
    if (entry.Freq > maximumAttacks) {
      maximumAttacks = entry.Freq;
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
          {country.id ? (
            <Line
              width={graphWidth}
              height={graphHeight}
              margin={margin}
              locationFrequency={frequencies}
              yDomain={yDomain}
            />
          ) : null}
        </g>
      </svg>
    </div>
  );
};

export default CountryGraph;
