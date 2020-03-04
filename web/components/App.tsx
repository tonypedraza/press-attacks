import React, {
  useRef,
  FunctionComponent,
  useState,
  useEffect,
  useReducer
} from "react";

import { AppContext } from "./appContext";
import CountryList from "./CountryList";
import CountryInfo from "./graph/CountryInfo";
import CountryGraph from "./graph/CountryGraph";
import JournalistNames from "./journalistspanel/JournalistNames";

// Data used throughout the application
import locationfrequencydata from "../data/location_frequency.json";
import pressattacksdata from "../data/press_attacks_data.json";
import countriesdata from "../data/countries.json";
import sortedyeardata from "../data/attacks_sorted_by_year.json";

/*
This is the main parent component of the entire Press Attacks app.

State Variables:
- country: Keeps track of the current country being displayed
- graphWidth: Maintains the width of the graph for responsiveness
- graphHeight: Maintains the height of the graph for responsiveness

Functions:
- handleResize(): Gets the boundingClientRect of the chart and info divs and calculates
the correct size of the chart. Runs on both the component mount and when the window
size is changed
- handleShowCountry(): Attached to the Country buttons and triggers the display of the
country in the chart and JournalistNames. Or removes the country if selected again.
*/

const App: FunctionComponent = () => {
  const chart = useRef<HTMLDivElement>(null);
  const info = useRef<HTMLDivElement>(null);
  const [country, setCountry] = useState("");
  const [graphWidth, setGraphWidth] = useState(0);
  const [graphHeight, setGraphHeight] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const scrollReducer = (_state: any, action: any) => {
    switch (action.type) {
      case "SELECTED_COUNTRY":
        return 0;
      case "SELECTED_JOURNALIST":
        return action.scrollValue;
      default:
        return 0;
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const journalistReducer = (_state: any, action: any) => {
    switch (action.type) {
      case "SELECT":
        return action.name;
      case "DESELECT":
        return "";
      default:
        return "";
    }
  };
  const [scrollTop, dispatchScrollTop] = useReducer(scrollReducer, 0);
  const [scrollLeft, dispatchScrollLeft] = useReducer(scrollReducer, 0);
  const [journalist, dispatchJournalist] = useReducer(journalistReducer, 0);

  /* Calculates the size of the d3 chart */
  const handleResize = () => {
    if (chart.current && info.current) {
      let chartRect = chart.current.getBoundingClientRect();
      let infoRect = info.current.getBoundingClientRect();
      if (window.innerWidth > 700) {
        if (
          graphWidth !== chartRect.width ||
          graphHeight !== chartRect.height - infoRect.height
        ) {
          setGraphWidth(chartRect.width);
          setGraphHeight(chartRect.height - infoRect.height);
        }
      }
    } else {
      setGraphWidth(window.innerWidth - 25);
      setGraphHeight(300);
    }
  };

  /* When the component mounts, add a resize event listener 
  and call the handleResize function */
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", () => handleResize);
    };
  }, [handleResize]);

  /* When the user selects a new country,
  if the country is the same, reset country state to empty string
  else set country state to new country string
  */
  const handleShowCountry = (newCountry: string) => {
    if (newCountry === country) {
      setCountry("");
    } else {
      setCountry(newCountry);
    }
    dispatchScrollTop({ type: "SELECTED_COUNTRY" });
    dispatchScrollLeft({ type: "SELECTED_COUNTRY" });
    dispatchJournalist({ type: "DESELECT" });
  };

  // All of the attacks that happened in the country
  let pressAttacks = [];
  let numAttacks = 0;
  pressattacksdata.forEach(entry => {
    if (entry.location === country) {
      pressAttacks.push(entry);
      numAttacks += 1;
    }
  });

  return (
    <AppContext.Provider
      value={{
        scrollTop,
        dispatchScrollTop,
        scrollLeft,
        dispatchScrollLeft,
        journalist,
        dispatchJournalist
      }}
    >
      {" "}
      {process.browser ? (
        <div className="app">
          <div className="left-side">
            <header className="header">
              <h1 className="title">Attacks on Journalists</h1>
              <h2 className="subtitle">from 1992 to 2018</h2>
            </header>
            <div className="container">
              <CountryList
                countriesData={countriesdata}
                country={country}
                onHandleShowCountry={handleShowCountry}
              />
              <div className="graph-info">
                <div ref={info} className="info-container">
                  <CountryInfo country={country} numAttacks={numAttacks} />
                </div>
                <div ref={chart} className="graph-container">
                  <CountryGraph
                    country={country}
                    locationFrequencyData={locationfrequencydata}
                    graphWidth={graphWidth}
                    graphHeight={graphHeight}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="right-side">
            <JournalistNames
              pressAttacksYearSorted={sortedyeardata}
              country={country}
            />
          </div>
          <style jsx global>{`
            html,
            body,
            #__next {
              margin: 0;
              padding: 0;
              height: 100%;
              width: 100%;
              font-family: "Roboto", sans-serif;
            }

            .app {
              height: 100%;
              display: flex;
              justify-content: space-between;
              flex-direction: row;
              flex-wrap: nowrap;
              justify-content: space-between;
              margin-left: 10px;
              margin-right: 10px;
            }

            .title {
              margin-top: 0;
              margin-bottom: 0;
              font-size: 5em;
              font-weight: 700;
              height: 50%;
            }

            .subtitle {
              margin-top: 0;
              margin-bottom: 0;
              font-size: 3.33em;
              color: #747474;
              font-weight: 400;
            }

            .container {
              margin-top: 15px;
              display: flex;
              height: 78%;
            }

            .left-side {
              width: 80%;
              min-width: 120px;
              max-width: 100%;
              display: flex;
              flex-direction: column;
              height: 100%;
              display: flex;
            }

            .right-side {
              min-width: 100px;
              width: 20%;
              margin-right: 20px;
              display: flex;
            }

            /* Graph Container */

            .graph-info {
              width: 80%;
              display: flex;
              flex-direction: column;
              justify-content: flex-start;
            }

            .graph-container {
              min-width: 350px;
              max-width: 2000px;
              flex-shrink: 1;
              width: 100%;
              height: 100%;
            }

            .domain {
              fill: none;
              stroke: none;
            }

            @media (max-width: 700px) {
              .app {
                height: auto;
                flex-direction: column;
                justify-content: flex-start;
              }

              .left-side {
                width: 100%;
                height: 70%;
              }

              .right-side {
                width: 100%;
                height: 30%;
              }

              .title {
                font-size: 3em;
              }
              .subtitle {
                font-size: 2em;
              }

              .container {
                flex-direction: column;
              }

              .graph-info {
                width: 100%;
              }
            }

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
      ) : null}
      ;
    </AppContext.Provider>
  );
};

export default App;
