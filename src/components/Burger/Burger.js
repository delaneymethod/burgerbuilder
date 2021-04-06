import React, { Component } from 'react';

import classes from './Burger.module.css';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

class Burger extends Component {
	render() {
		let transformedIngredients = Object
			.keys(this.props.ingredients)
			.map(ingredientKey => {
				return [...Array(this.props.ingredients[ingredientKey])].map((_, index) => {
					return <BurgerIngredient key={ingredientKey + index} type={ingredientKey} />;
				});
			})
			.reduce((array, element) => {
				return array.concat(element);
			}, []);

		if (transformedIngredients.length === 0) {
			transformedIngredients = <p>Please start adding ingredients</p>
		}

		console.log('[Burger.js] transformedIngredients', transformedIngredients);

		return (
			<div className={classes.Burger}>
				<BurgerIngredient type={'bread-top'} />
				{transformedIngredients}
				<BurgerIngredient type={'bread-bottom'} />
			</div>
		);
	};
}

export default Burger;
