import React, { Component, useRef } from "react";

// Components
import CountryList from "./CountryList";
import CountryInfo from "./graph/CountryInfo";
import CountryGraph from "./graph/CountryGraph";
import JournalistNames from "./journalistspanel/JournalistNames";

//Import json
import locationfrequencydata from "../data/location_frequency.json";
import pressattacksdata from "../data/press_attacks_data.json";
import countriesdata from "../data/countries.json";
import sortedyeardata from "../data/attacks_sorted_by_year.json";

export default class App extends Component {
  chart = useRef<HTMLDivElement>(null);
  info = useRef<HTMLDivElement>(null);

  state = {
    country: "",
    journalist: "",
    paneIsOpen: false,
    graphWidth: 0,
    graphHeight: 0,
    resetScrollPosition: false
  };

  // Lifecycle functions
  componentWillMount() {
    window.addEventListener("resize", this.measure, false);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.measure, false);
  }

  componentDidMount() {
    this.measure();
  }

  // Measures the size of the graph
  measure = () => {
    if (this.chart.current && this.info.current) {
      let chartRect = this.chart.current.getBoundingClientRect();
      let infoRect = this.info.current.getBoundingClientRect();
      if (window.innerWidth > 700) {
        if (
          this.state.graphWidth !== chartRect.width ||
          this.state.graphHeight !== chartRect.height - infoRect.height
        ) {
          this.setState({
            graphWidth: chartRect.width,
            //offset for the margins and info text
            graphHeight: chartRect.height - infoRect.height
          });
        }
      }
    } else {
      this.setState({
        graphWidth: window.innerWidth - 25,
        graphHeight: 300
      });
    }
  };

  // Button functions
  handleShowCountry = (country: String) => {
    if (country === this.state.country) {
      this.setState(prevState => ({
        country: "",
        paneIsOpen: false,
        resetScrollPosition: true
      }));
    } else {
      this.setState(prevState => ({
        country: country,
        paneIsOpen: false,
        resetScrollPosition: true
      }));
    }
  };

  handleClosePane = () => {
    this.setState(prevState => ({
      paneIsOpen: false,
      resetScrollPosition: false
    }));
  };

  handleOpenPane = () => {
    this.setState(prevState => ({
      paneIsOpen: true
    }));
  };

  render() {
    // All of the attacks that happened in the country
    var country = this.state.country;
    var pressAttacks = [];
    var numAttacks = 0;

    pressattacksdata.forEach((entry, i) => {
      if (entry.location === country) {
        pressAttacks.push(entry);
        numAttacks += 1;
      }
    });

    return (
      <div className="app">
        <div className="left-side">
          <header className="header">
            <h1 className="title">Attacks on Journalists</h1>
            <h2 className="subtitle">from 1992 to 2018</h2>
          </header>
          <div className="container">
            <CountryList
              countriesData={countriesdata}
              country={this.state.country}
              onHandleShowCountry={this.handleShowCountry}
            />
            <div className="graph-info">
              <div ref={this.info} className="info-container">
                <CountryInfo
                  country={this.state.country}
                  numAttacks={numAttacks}
                />
              </div>
              <div ref={this.chart} className="graph-container">
                <CountryGraph
                  country={this.state.country}
                  locationFrequencyData={locationfrequencydata}
                  graphWidth={this.state.graphWidth}
                  graphHeight={this.state.graphHeight}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="right-side">
          <JournalistNames
            pressAttacksYearSorted={sortedyeardata}
            country={this.state.country}
            onHandleClosePane={this.handleClosePane}
            paneIsOpen={this.state.paneIsOpen}
            resetScrollPosition={this.state.resetScrollPosition}
          />
        </div>
        <style jsx>{`
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

          .hide {
            display: none;
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

          .left-side {
            width: 80%;
            min-width: 120px;
            max-width: 100%;
            display: flex;
            flex-direction: column;
            height: 100%;
            display: flex;
          }

          .graph-info {
            width: 80%;
          }

          .container {
            margin-top: 15px;
            display: flex;
            height: 78%;
          }

          /* Graph Container */

          .graph-info {
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

          .default-text {
            margin: 18px;
            font-size: 1.25em;
            color: #747474;
            font-weight: 700;
          }

          .default-text a {
            text-decoration: underline;
            color: #747474;
          }

          .default-text a:visited {
            text-decoration: none;
            color: #747474;
          }

          .default-text a:hover {
            color: black;
          }

          .info-text {
            max-width: 960px;
            margin: 0;
            font-size: 1.25em;
            color: #747474;
            font-weight: 700;
          }

          .info-name {
            font-size: 2.5em;
            color: #e10000;
            font-weight: 400;
            padding-right: 5px;
          }

          .CountryList {
            list-style: none;
            min-width: 120px;
            max-width: 200px;
            width: 15%;
            overflow: scroll;
            font-size: 1.5em;
          }

          .CountryList-links {
            list-style-type: none;
            margin: 0;
            padding: 0;
          }

          .location-button {
            text-align: left;
            background-color: #ffffff;
            border: none;
            outline: none;
            cursor: pointer;
            font-weight: 700;
            font-size: 0.75em;
          }

          .location-button:hover {
            color: #747474;
          }

          .location-selected {
            background-color: #ffffff;
            text-align: left;
            border: none;
            outline: none;
            cursor: pointer;
            font-weight: 700;
            font-size: 0.75em;
            color: #e10000;
          }

          .info-text {
            margin-left: 20px;
          }

          .domain {
            fill: none;
            stroke: none;
          }

          /* Journalist Container */

          .right-side {
            min-width: 100px;
            width: 20%;
            margin-right: 20px;
            display: flex;
          }

          .names {
            padding-right: 15px;
            overflow: scroll;
          }

          .name-section {
          }

          .names-year {
            margin: 0;
            flex-shrink: 0;
            flex-grow: 0;
            display: inline;
            font-size: 3.33em;
          }

          .name-button {
            background-color: #ffffff;
            display: flex;
            align-items: left;
            text-align: left;
            justify: left;
            color: #747474;
            padding: 3px;
            border: none;
            outline: none;
            cursor: pointer;
            font-size: 1.5em;
          }

          .name-button:hover {
            color: #e10000;
          }

          /* Journalist Pane */
          .journalist-container {
            overflow: scroll;
          }

          .journalistPane {
            min-width: 100px;
            right: none;
            text-align: justify;
          }

          .journalistPane p {
            margin: 5px;
          }

          .closePaneButton {
            margin-top: 15px;
            margin-bottom: 25px;
            background-color: #ffffff;
            /* margin-left: -7px; */
            border: none;
            outline: none;
            font-size: 1.5em;
            cursor: pointer;
          }

          .closePaneButton:hover {
            color: #e10000;
          }

          .journalist-name {
            font-size: 3em;
            text-align: left;
            font-weight: 700;
          }

          .journalist-date {
            padding-top: 20px;
            font-size: 2em;
            text-align: left;
          }

          .journalist-location {
            font-size: 2em;
            text-align: left;
          }

          .journalist-organization {
            padding-top: 20px;
            font-size: 2em;
            text-align: left;
          }

          .description {
            padding-top: 20px;
            padding-right: 15px;
            text-justify: inter-word;
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

            .CountryList {
              max-width: 100%;
              width: 100%;
            }

            .CountryList-links {
              display: flex;
              flex-direction: row;
            }

            .info-name {
              font-size: 2em;
            }

            .info-text {
              font-size: 1em;
            }

            .graph-info {
              width: 100%;
            }

            .names {
              display: flex;
              flex-direction: row;
              align-items: baseline;
              height: 100%;
            }
            .name-section {
              display: flex;
              flex-direction: row;
              align-items: baseline;
            }

            .journalist-name {
              font-size: 2em;
            }

            .journalist-date {
              font-size: 1em;
            }

            .journalist-location {
              font-size: 1em;
            }

            .journalist-organization {
              font-size: 1em;
            }
          }
        `}</style>
      </div>
    );
  }
}
