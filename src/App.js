import React, { Component } from 'react';
import './App.css';

import { InfoAlert } from './Alert';
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
    infoText: '',
    showWelcomeScreen: undefined
  }

  async componentDidMount() {
    this.mounted = true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');
    var isTokenValid;
    
    if(!navigator.onLine || window.location.href.startsWith('http://localhost')) {
      getEvents().then((events) => {
        this.setState({ 
          infoText: 'App is currently offline, loading events from cache',
          showWelcomeScreen: false,
          locations: extractLocations(events)
        });
      });      
    } else {
      const accessToken = localStorage.getItem('access_token');
      isTokenValid = (await checkToken(accessToken)).error ? false : true;
      this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    }    
    
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
    if (this.state.showWelcomeScreen === undefined) {
      return <div className='App' />;
    }

    return (
      <div className="App">
        <InfoAlert text={this.state.infoText}></InfoAlert>
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
        <NumberOfEvents updateNumberOfEvents={this.updateNumberOfEvents } />
        <EventList events={this.state.events}/>
        <WelcomeScreen 
          showWelcomeScreen={ this.state.showWelcomeScreen }
          getAccessToken={ () => { getAccessToken() } } 
        />
      </div>
    );
  }
}

export default App;
