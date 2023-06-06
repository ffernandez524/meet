import React from 'react';
import App from '../App';
import NumberOfEvents from '../NumberOfEvents';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { mount } from 'enzyme';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
    test('When user has not specified a number of events, 32 is the default number', ({ given, when, then }) => {
        given('a user has not specified a number of events to view at once', () => {
        });

        let AppWrapper;
        when('the page loads', async () => {
            AppWrapper = await mount(<App />);
        });

        then('the default number of events shown is 32', () => {
            const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
            expect(NumberOfEventsWrapper.state('query')).toBe(32);
        });
    });

    test('User can change the number of events they want to see', ({ given, when, then }) => {
        let AppWrapper;
        let NumberOfEventsWrapper;

        given('the page is loaded', async () => {
            AppWrapper = await mount(<App />);
            NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
        });

        when('the user changes the number of events', () => {
            NumberOfEventsWrapper.find('.numberOfEventsInput').simulate('change', { target: { value: 16 }});
        });

        then('the page updates to show that number of events', () => {
            expect(NumberOfEventsWrapper.state('query')).toBe(16);
        });
    });
});