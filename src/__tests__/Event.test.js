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
        EventWrapper.setState({ isCollapsed: false });
        expect(EventWrapper.find('p.location').text()).toBe(event.location);
        expect(EventWrapper.find('p.eventStart').text()).toBe('Begins: ' + new Date(event.start.dateTime).toString());
        expect(EventWrapper.find('p.eventEnd').text()).toBe('Ends: ' + new Date(event.end.dateTime).toString());
        expect(EventWrapper.find('.description').text()).toBe(event.description);
        EventWrapper.setState({ isCollapsed: true });
    });

    test('event is collapsed by default', () => {
        expect(EventWrapper.state('isCollapsed')).toBe(true);
    });

    test('when details button is clicked, sets isCollapsed to false', () => {
        EventWrapper.find('.details-btn').simulate('click');
        expect(EventWrapper.state('isCollapsed')).toBe(false);
    });
});