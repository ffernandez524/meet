import React from 'react';
import { shallow } from 'enzyme';

import NumberOfEvents from '../NumberOfEvents';

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
});