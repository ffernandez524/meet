import React, { Component } from 'react';
import './App.css';

import WelcomeScreen from './WelcomeScreen';
import CitySearch from './CitySearch';
import EventList from './EventList';
import NumberOfEvents from './NumberOfEvents';
import { extractLocations, getEvents, checkToken, getAccessToken } from './api';

class App extends Component {
  state = {
    events: [],
    locations: [],
    selectedLocation: 'all',
    numberOfEvents: 32,
    showWelcomeScreen: undefined
  }

  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem('access_token');
    const isTokenValid = (await checkToken(accessToken)).error ? false : true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    
    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
        if(this.mounted) {
          this.setState({ events: events.slice(0, this.state.numberOfEvents), locations: extractLocations(events) });
        }      
      });
    }    
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
    //Show welcome screen
    if (this.state.showWelcomeScreen === undefined) return <div className='App' />;

    return (
      <div className="App">
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
        <NumberOfEvents updateNumberOfEvents={this.updateNumberOfEvents } />
        <EventList events={this.state.events}/>
        <WelcomeScreen 
          showWelcomeScreen={this.state.showWelcomeScreen}
          getAccessToken={() => { getAccessToken() }} 
        />

      </div>
    );
  }
}

export default App;
