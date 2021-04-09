import React, { Component } from 'react';

import classes from './Order.module.css';

class Order extends Component {
	/**
	 * @returns {JSX.Element}
	 */
	render() {
		const ingredients = [];

		for (const ingredient in this.props.ingredients) {
			if (this.props.ingredients.hasOwnProperty(ingredient)) {
				ingredients.push({
					name: ingredient,
					amount: this.props.ingredients[ingredient]
				});
			}
		}

		const ingredientsList = ingredients.map(ig => {
			return (
				<span
					key={ig.name}
					style={{
						textTransform: 'capitalize',
						display: 'inline-block',
						margin: '0 8px',
						padding: '5px',
						border: '1px solid #cccccc'
					}}
				>
					{ig.name} ({ig.amount})
				</span>
			);
		});

		return (
			<div className={classes.Order}>
				<p>Ingredients: {ingredientsList}</p>
				<p>Total Price <strong>USD {Number.parseFloat(this.props.totalPrice).toFixed(2)}</strong></p>
			</div>
		);
	};
}

export default Order;
