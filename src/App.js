import React, { Component } from 'react';
import './css/App.css';

// Components
import CountryList from './CountryList';
import CountryGraph from './graph/CountryGraph';
import JournalistNames from './journalistspanel/JournalistNames'

import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';

//Import json
import locationfrequencydata from './data/location_frequency.json'
import pressattacksdata from './data/press_attacks_data.json'
import countriesdata from './data/countries.json'
import sortedyeardata from './data/attacks_sorted_by_year.json'

Amplify.configure(aws_exports);

export default class App extends Component {
  state = {
    country: '',
    journalist: '',
    paneIsOpen: false
  }

  handleShowCountry = (country) => {
    if (country === this.state.country) {
      this.setState(prevState=> ({
        country: '',
        paneIsOpen: false,
      }))
    }
    else {
      this.setState(prevState => ({
        country: country,
        paneIsOpen: false,
      }));
    }
  }

  handleClosePane = () => {
    this.setState(prevState=> ({
      paneIsOpen: false,
    }));
  }

  handleOpenPane = () => {
    this.setState(prevState=> ({
      paneIsOpen: true,
    }));
  }

  render() {
    // All of the attacks that happened in the country
    var country = this.state.country
    var pressAttacks = [];
    var numAttacks = 0;

    pressattacksdata.forEach((entry, i) => {
      if (entry.location === country) {
        pressAttacks.push(entry)
        numAttacks += 1;
      }
    })
    return (
      <div className="app">
        <div className="left-side">
          <header className="App-header">
            <h1 className="App-title">Attacks on Journalists</h1>
            <h2 className="App-subtitle">from 1992 to 2018</h2>
          </header>
          <div className="App-container">
            <CountryList countriesData={countriesdata}
                         country={this.state.country}
                         onHandleShowCountry={this.handleShowCountry} />
            <CountryGraph country={this.state.country}
                          locationFrequencyData={locationfrequencydata}
                          numAttacks={numAttacks} />
          </div>
        </div>
        <div className="right-side">
          <JournalistNames pressAttacksYearSorted={sortedyeardata}
                           country={this.state.country}
                           onHandleChangeJournalist={this.handleChangeJournalist}
                           onHandleClosePane={this.handleClosePane}
                           onHandleOpenPane={this.handleOpenPane}
                           paneIsOpen={this.state.paneIsOpen}/>
        </div>
      </div>
    );
  }
}
