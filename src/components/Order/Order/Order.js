import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

		const ingredientsList = ingredients.map(ingredient => {
			return (
				<span
					key={ingredient.name}
					style={{
						textTransform: 'capitalize',
						display: 'inline-block',
						margin: '0 8px',
						padding: '5px',
						border: '1px solid #cccccc'
					}}
				>
					{ingredient.name} ({ingredient.amount})
				</span>
			);
		});

		return (
			<div className={classes.Order}>
				<p>Customer Full Name <strong>{this.props.orderData.fullName}</strong></p>
				<p>Ingredients: {ingredientsList}</p>
				<p>Total Price <strong>USD {this.props.totalPrice.toFixed(2)}</strong></p>
			</div>
		);
	};
}

Order.propTypes = {
	localId: PropTypes.string.isRequired,
	totalPrice: PropTypes.number.isRequired,
	ingredients: PropTypes.objectOf((props, propName, component) => {
		if (typeof propName !== 'string' && typeof props[propName] !== 'string') {
			return new Error(`Invalid prop key/value supplied to ${component}. Validation failed.`);
		}
	}).isRequired,
	orderData: PropTypes.shape({
		fullName: PropTypes.string.isRequired,
		email: PropTypes.string.isRequired,
		streetLine1: PropTypes.string.isRequired,
		streetLine2: PropTypes.string,
		city: PropTypes.string.isRequired,
		postalCode: PropTypes.string.isRequired,
		country: PropTypes.string.isRequired,
		deliveryMethod: PropTypes.string.isRequired
	}).isRequired
};

export default Order;
