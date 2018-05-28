import React, { Component } from 'react';
import './css/App.css';

// Components
import CountryList from './CountryList';
import CountryGraph from './CountryGraph';

import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';

//Import json
import locationfrequency from './data/location_frequency.json'
import pressattacksdata from './data/press_attacks_data.json'

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
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Attacks on Journalists</h1>
          <h2 className="App-subtitle">from 1992 to 2018</h2>
        </header>
        <div className="App-graphcontainer">
          <CountryList
            data={locationfrequency}
            country={this.state.country}
            onHandleShowCountry={this.handleShowCountry} />
          <CountryGraph
          country={this.state.country}
          data={pressattacksdata} />
        </div>
      </div>
    );
  }
}
