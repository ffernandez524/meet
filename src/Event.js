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
        <h2 
          className='summary'
          onClick={() => this.handleCollapse()}
          >{ event.summary }</h2>
        { this.state.isCollapsed ? (
          <ul className='eventDetails'>            
            <li className='location'>{ event.location }</li>
            <li className='dateTime'>{ event.start.dateTime } to {event.end.dateTime}</li>
            <li className='description'>{ event.description }</li>
          </ul>
        ) : "" }                              
      </div>
    );
  }
}

export default Event;