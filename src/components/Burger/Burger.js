import React, { Component } from 'react';
import * as PropTypes from 'prop-types';

import classes from './Burger.module.css';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

// MAYBE - This could be a functional component
class Burger extends Component {
	/**
	 * @returns {JSX.Element}
	 */
	render() {
		let burgerIngredients = Object
			.keys(this.props.ingredients)
			.map(ingredientKey => {
				return [...Array(this.props.ingredients[ingredientKey])].map((_, index) => {
					return (
						<BurgerIngredient
							key={ingredientKey + index}
							type={ingredientKey}
						/>
					);
				});
			})
			.reduce((array, element) => {
				return array.concat(element);
			}, []);

		if (burgerIngredients.length === 0) {
			burgerIngredients = <p>Please start adding ingredients</p>;
		}

		return (
			<div className={classes.Burger}>
				<BurgerIngredient type={'bread-top'}/>
				{burgerIngredients}
				<BurgerIngredient type={'bread-bottom'}/>
			</div>
		);
	};
}

Burger.propTypes = {
	ingredients: PropTypes.objectOf((props, propName, component) => {
		if (typeof propName !== 'string' && typeof props[propName] !== 'string') {
			return new Error(`Invalid prop key/value supplied to ${component}. Validation failed.`);
		}
	}).isRequired
};

export default Burger;
