import React, { Component } from "react";

class Event extends Component {
  state = {
    isCollapsed: true
  };

  handleCollapse = () => {
    this.setState((prevState) => ({
      isCollapsed: !prevState.isCollapsed
    }));
  };

  render() {
    const { event } = this.props;
    
    return (
      <div className='event'>
        <h2 className='summary'>{ event.summary }</h2>
        <p className='location'><b>Location: </b>{ event.location }</p>
        <p className='eventStart'><b>Begins: </b>{new Date(event.start.dateTime).toLocaleString()}</p>
        <p className='eventEnd'><b>Ends: </b>{new Date(event.end.dateTime).toLocaleString()}</p>
        { this.state.isCollapsed ? ( "" ) 
        : <p className='description'>{ event.description }</p> }
        <button className='details-btn' onClick={() => this.handleCollapse()}>Toggle Details</button>                              
      </div>
    );
  }
}

export default Event;