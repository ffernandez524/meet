import React from 'react';
import { shallow } from 'enzyme';

import Event from '../Event';
import { mockData } from '../mock-data';

describe('<Event /> component', () => {
    let event, EventWrapper;
    
    beforeAll(() => {
        event = mockData[0];
        EventWrapper = shallow(<Event event={event} />);
    }); 

    test('render event summary', () => {
        expect(EventWrapper.find('h2.summary').text()).toBe(event.summary);
    });

    test('details rendered', () => {
        expect(EventWrapper.find('li.location').text()).toBe(event.location);
        expect(EventWrapper.find('li.dateTime').text()).toBe(event.start.dateTime + ' to ' + event.end.dateTime);
        expect(EventWrapper.find('li.description').text()).toBe(event.description);
    });

    test('event is collapsed by default', () => {
        expect(EventWrapper.state('isCollapsed')).toBe(true);
    });

    test('when summary is clicked, sets isCollapsed to false', () => {
        EventWrapper.find('h2.summary').simulate('click');
        expect(EventWrapper.state('isCollapsed')).toBe(false);
    });
});