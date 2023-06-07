import React, { Component } from 'react';
import './App.css';

import CitySearch from './CitySearch';
import EventList from './EventList';
import NumberOfEvents from './NumberOfEvents';
import { extractLocations, getEvents } from './api';

class App extends Component {
  state = {
    events: [],
    locations: [],
    selectedLocation: 'all',
    numberOfEvents: 32
  }

  async componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if(this.mounted) {
        this.setState({ events: events.slice(0, this.state.numberOfEvents), locations: extractLocations(events) });
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
        events: locationEvents.slice(0, this.state.numberOfEvents),
        selectedLocation: location
      });
    });
  }  

  updateNumberOfEvents = (numEvents) =>{
    this.setState({
      numberOfEvents: numEvents
    });
    this.updateEvents(this.state.selectedLocation);
  }
  
  render() {
    return (
      <div className="App">
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
        <NumberOfEvents updateNumberOfEvents={this.updateNumberOfEvents } />
        <EventList events={this.state.events}/>        
      </div>
    );
  }
}

export default App;