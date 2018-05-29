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

Amplify.configure(aws_exports);

export default class App extends Component {
  state = {
    country: ''
  }

  handleShowCountry = (country) => {
    this.setState(prevState => ({
      country: country,
    }));
  }

  render() {
    // All of the attacks that happened in the country
    var country = this.state.country
    var pressAttacks = [];
    pressattacksdata.forEach((entry, i) => {
      if (entry.location === country) {
        pressAttacks.push(entry)
      }
    })
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Attacks on Journalists</h1>
          <h2 className="App-subtitle">from 1992 to 2018</h2>
        </header>
        <div className="App-container">
          <CountryList countriesData={countriesdata}
                       country={this.state.country}
                       onHandleShowCountry={this.handleShowCountry} />
          <CountryGraph country={this.state.country}
                        locationFrequencyData={locationfrequencydata} />
          <JournalistNames pressAttacks={pressAttacks}/>

        </div>
      </div>
    );
  }
}
