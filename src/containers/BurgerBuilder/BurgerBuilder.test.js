import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { BurgerBuilder } from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

configure({ adapter: new Adapter() });

describe('<BurgerBuilder />', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = shallow(
			<BurgerBuilder
				error={false}
				totalPrice={4}
				authenticated={false}
				addIngredient={() => {}}
				removeIngredient={() => {}}
				fetchIngredients={() => {}}
				purchaseInit={() => {}}
				authenticateRedirectPath={() => {}}
			/>
		);
	});

	it('should render build controls when receiving ingredients', () => {
		wrapper.setProps({ ingredients: { salad: 0, bacon: 1, cheese: 2, meat: 1 }});

		expect(wrapper.find(BuildControls)).toHaveLength(1);
	});
});
