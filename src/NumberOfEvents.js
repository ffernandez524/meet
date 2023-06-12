import React, { Component } from "react";
import { ErrorAlert } from "./Alert";
class NumberOfEvents extends Component {
    state = {
        query: 32,
        errorText: ''        
    }

    handleInputChanged = (event) => {
        const value = event.target.value;        
        if(value < 1 || value > 32) {
            this.setState({ 
                query: '',
                errorText: 'Please enter a number between 1 and 32',
                
              });
        } else {
            this.setState({ 
                query: value,
                errorText: ''
             });
            this.props.updateNumberOfEvents(value);
        }
    };
    
    render() {
        return (
            <div className='numberOfEvents'>
                <input 
                    className='numberOfEventsInput'
                    type='number'
                    min={0}
                    max={32}
                    value={this.state.query}
                    onChange={this.handleInputChanged}
                />
                <ErrorAlert text={this.state.errorText}></ErrorAlert>
            </div>
        );
    }
}

export default NumberOfEvents;