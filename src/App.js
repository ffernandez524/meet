import React, { Component } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './App.css';

import { InfoAlert } from './Alert';
import WelcomeScreen from './WelcomeScreen';
import CitySearch from './CitySearch';
import EventList from './EventList';
import NumberOfEvents from './NumberOfEvents';
import EventGenre from './EventGenre';
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
    const accessToken = localStorage.getItem('access_token');
    const isTokenValid = (await checkToken(accessToken)).error ? false : true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    
    if(!navigator.onLine || window.location.href.startsWith('http://localhost')) {
      this.setState({ 
        infoText: 'App is currently offline, loading events from cache',
        showWelcomeScreen: false,
      });       
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

  getData = () => {
    const {locations, events} = this.state;
    const data = locations.map((location)=>{
      const number = events.filter((event) => event.location === location).length
      const city = location.split(', ').shift()
      return {city, number};
    })
    return data;
  };

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
        <div className='data-vis-wrapper'>
          <EventGenre events={this.state.events} />
          <ResponsiveContainer height={400}>        
            <ScatterChart
              width={400}
              height={250}
              margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
            > 
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="city" type="category" name="city" />
              <YAxis dataKey="number" type="number" name="number of events" />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter data={this.getData()} fill="#8884d8" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>                
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
