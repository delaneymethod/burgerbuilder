import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItem from './NavigationItem';

configure({ adapter: new Adapter() });

describe('<NavigationItem />', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = shallow(<NavigationItem to="/">Burger Builder</NavigationItem>);
	});

	it('should contain Burger Builder', () => {
		expect(wrapper.contains('Burger Builder')).toEqual(true);
	});
});
