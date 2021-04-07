import React, { Component } from 'react';
import * as PropTypes from 'prop-types';

import classes from './Burger.module.css';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

class Burger extends Component {
	/**
	 * @returns {JSX.Element}
	 */
	render() {
		return (
			<div className={classes.Burger}>
				<BurgerIngredient type={'bread-top'}/>
				{this.props.burgerIngredients}
				<BurgerIngredient type={'bread-bottom'}/>
			</div>
		);
	};
}

Burger.propTypes = {
	burgerIngredients: PropTypes.oneOfType([
		PropTypes.element,
		PropTypes.arrayOf(PropTypes.shape({
			key: PropTypes.string.isRequired,
			type: PropTypes.elementType.isRequired,
			props: PropTypes.objectOf((props, propName, component) => {
				if (typeof propName !== 'string' && typeof props[propName] !== 'string') {
					return new Error(`Invalid prop key/value supplied to ${component}. Validation failed.`);
				}
			}).isRequired
		}))
	]).isRequired
};

export default Burger;
