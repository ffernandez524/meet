import React from 'react';
import Event from '../Event'; 
import { loadFeature, defineFeature } from 'jest-cucumber';
import { shallow } from 'enzyme';
import { mockData } from '../mock-data';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {  
    let event, EventWrapper;    
    beforeAll(() => {
        event = mockData[0];
        EventWrapper = shallow(<Event event={event} />);
    }); 
    
    test('When the app loads, the event\'s details are collapsed by default', ({ given, when, then }) => {
        given('a user has not expanded any events', () => {            
        });

        when('the page loads', () => {   
        });

        then('events should load collapsed by default', () => {
            expect(EventWrapper.state('isCollapsed')).toBe(true);
        });
    });

    test('User can expand an event to see details', ({ given, when, then }) => {
        given('an event is collapsed', () => {
        });

        when('the user clicks on the expand button', () => {
            EventWrapper.find('button.details-btn').simulate('click');
        });

        then('the event expands to show more details', () => {
            expect(EventWrapper.state('isCollapsed')).toBe(false);
        });
    });

    test('User can collapse an event to hide its details', ({ given, when, then }) => {
        given('an event is expanded', () => {
            EventWrapper.setState({ isCollapsed: false });
        });

        when('the user clicks the collapse button', () => {
            EventWrapper.find('button.details-btn').simulate('click');
        });

        then('the event collapses and hides details', () => {
            expect(EventWrapper.state('isCollapsed')).toBe(true);
        });
    });
});

