import React from 'react';
import { shallow } from 'enzyme';

import NumberOfEvents from '../numberOfEvents';

describe('<Event /> component', () => {
    let NumberOfEventsWrapper;
    

    beforeAll(() => {
        NumberOfEventsWrapper = shallow(<NumberOfEvents />);
    }); 

    test('render text box for NumberOfEvents', () => {
        expect(NumberOfEventsWrapper.find('.numberOfEventsInput')).toHaveLength(1);
    });

    test('renders text input correctly', () => {
        const query = NumberOfEventsWrapper.state('query');
        expect(NumberOfEventsWrapper.find('.numberOfEventsInput').prop('value')).toBe(query);
    });

    test('change state when text input changes', () => {
        NumberOfEventsWrapper.setState({
            query: '16'
        });
        const eventObject = { target: {value: '20' }};
        NumberOfEventsWrapper.find('.numberOfEventsInput').simulate('change', eventObject);
        expect(NumberOfEventsWrapper.state('query')).toBe('20');
    });
});