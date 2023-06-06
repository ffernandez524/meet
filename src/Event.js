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
        <p className='location'>{ event.location }</p>
        <p className='eventStart'>Begins: {new Date(event.start.dateTime).toString()}</p>
        <p className='eventEnd'>Ends: {new Date(event.end.dateTime).toString()}</p>
        { this.state.isCollapsed ? (
          <p className='description'>{ event.description }</p>
        ) : "" }
        <button className='details-btn' onClick={() => this.handleCollapse()}>Toggle Details</button>                              
      </div>
    );
  }
}

export default Event;