import React, {
  useRef,
  FunctionComponent,
  useCallback,
  useState,
  useEffect,
  useReducer
} from "react";
import { useLazyQuery } from "@apollo/react-hooks";

import { AppContext } from "./appContext";
import appStyles from "../styles/app";
import CountryList from "./CountryList";
import CountryInfo from "./graph/CountryInfo";
import CountryGraph from "./graph/CountryGraph";
import JournalistNames from "./journalistspanel/JournalistNames";

// Data used throughout the application
import locationfrequencydata from "../data/location_frequency.json";
import { Country } from "../types/press-attacks";
import { GetJournalistsByCountryDocument } from "../graphql/queries/getJournalistsByCountry.generated";

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

interface AppProps {
  countries: Country[];
}

const App: FunctionComponent<AppProps> = (props: AppProps) => {
  const { countries } = props;
  const chart = useRef<HTMLDivElement>(null);
  const info = useRef<HTMLDivElement>(null);
  // const [journalists, setJournalists] = useState([]);
  const [getJournalists, { data }] = useLazyQuery(
    GetJournalistsByCountryDocument
  );
  const [country, setCountry] = useState({
    id: "",
    name: "",
    numJournalists: 0
  });
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
        return action.journalist;
      case "DESELECT":
        return { id: "" };
      default:
        return { id: "" };
    }
  };
  const [scrollTop, dispatchScrollTop] = useReducer(scrollReducer, 0);
  const [scrollLeft, dispatchScrollLeft] = useReducer(scrollReducer, 0);
  const [journalist, dispatchJournalist] = useReducer(journalistReducer, {
    id: ""
  });

  /* Calculates the size of the d3 chart */
  const handleResize = useCallback(() => {
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
  }, [graphHeight, graphWidth]);

  /* When the component mounts, add a resize event listener 
  and call the handleResize function */
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  /* When the user selects a new country,
  if the country is the same, reset country state to empty string
  else set country state to new country string
  */
  const handleShowCountry = async (newCountry: Country) => {
    if (newCountry.name === country.name) {
      setCountry({ id: "", name: "", numJournalists: 0 });
    } else {
      setCountry(newCountry);
    }
    dispatchScrollTop({ type: "SELECTED_COUNTRY" });
    dispatchScrollLeft({ type: "SELECTED_COUNTRY" });
    dispatchJournalist({ type: "DESELECT" });
    getJournalists({
      variables: {
        country: {
          id: newCountry.id
        }
      }
    });
  };

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
                country={country}
                countries={countries}
                onHandleShowCountry={handleShowCountry}
              />
              <div className="graph-info">
                <div ref={info} className="info-container">
                  <CountryInfo country={country} />
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
            {data && data.journalists ? (
              <JournalistNames journalists={data.journalists} />
            ) : null}
          </div>
          <style jsx global>
            {appStyles}
          </style>
        </div>
      ) : null}
      ;
    </AppContext.Provider>
  );
};

export default App;
