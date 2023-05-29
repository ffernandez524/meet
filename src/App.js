import React, { Component } from 'react';
import './App.css';

import CitySearch from './CitySearch';
import EventList from './EventList';
import NumberOfEvents from './NumberOfEvents';
import { extractLocations, getEvents } from './api';

class App extends Component {
  state = {
    events: [],
    locations: []
  }

  async componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if(this.mounted) {
        this.setState({ events: events, locations: extractLocations(events) });
      }      
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  updateEvents = (location) => {
    getEvents().then((events) => {
      const locationEvents = (location === 'all') ?
        events :
        events.filter((event) => event.location === location);
      this.setState({
        events: locationEvents
      });
    });
  }  

  render() {
    return (
      <div className="App">
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
        <EventList events={this.state.events}/>
        <NumberOfEvents />
      </div>
    );
  }
}

export default App;
