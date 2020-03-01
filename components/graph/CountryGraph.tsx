import React, { FunctionComponent, useState, useEffect } from "react";
import * as d3 from "d3";

//Components
import XAxis from "./XAxis";
import YAxis from "./YAxis";
import Line from "./Line";

interface CountryGraphProps {
  country: String;
  locationFrequencyData: any;
  graphWidth: number;
  graphHeight: number;
}

interface CountryGraphState {
  // graph: d3.Selection<d3.BaseType, {}, HTMLElement, any>;
  graph: any;
  margin: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
}

const CountryGraph: FunctionComponent<CountryGraphProps> = (
  props: CountryGraphProps
) => {
  const [graph, setGraph]: any = useState(<svg></svg>);
  const [margin, setMargin] = useState({
    top: 20,
    right: 20,
    bottom: 20,
    left: 50
  });

  useEffect(() => {
    const graph = d3.select("#graph");
    setGraph(graph);

    return () => {};
  }, []);

  // componentDidMount() {
  //   const graph = d3.select("#graph");
  //   const margin = { top: 20, right: 20, bottom: 30, left: 50 };

  //   this.setState({
  //     graph: graph,
  //     margin: margin
  //   });
  // }

  const { locationFrequencyData, country, graphWidth, graphHeight } = props;

  // Row that matches the country prop and contains year data
  // Also finds if maximum number of attacks in a year
  // exceeds five so we can re-render y-axis
  let locationFrequency: [number, number][] = [];
  let maximum_attacks = 0;
  locationFrequencyData.forEach((entry: any) => {
    if (entry.location === country) {
      locationFrequency.push(entry);
      if (entry.Freq > maximum_attacks) {
        maximum_attacks = entry.Freq;
      }
    }
  });

  // Dynamic y-axis domain:
  let yDomain = [0, Math.max(maximum_attacks, 5)];

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
