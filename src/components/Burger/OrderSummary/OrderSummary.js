import React, { Component } from 'react';
import * as PropTypes from 'prop-types';

import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

// MAYBE - This could be a functional component
class OrderSummary extends Component {
	/**
	 * @returns {JSX.Element}
	 */
	render() {
		const ingredientsSummary = Object
			.keys(this.props.ingredients)
			.map(ingredientKey => {
				return (
					<li key={ingredientKey}>
						<span style={{ textTransform: 'capitalize' }}>{ingredientKey}</span>: {this.props.ingredients[ingredientKey]}
					</li>
				);
			});

		return (
			<Aux>
				<h3>Your Order</h3>
				<p>A delicious burger with the following ingredients:</p>
				<ul>
					{ingredientsSummary}
				</ul>
				<p>
					<strong>
						Total Price: {this.props.totalPrice.toFixed(2)}
					</strong>
				</p>
				<p>Continue to Checkout?</p>
				<Button
					type={'Danger'}
					onClick={this.props.onClickCancelButton}
				>
					Cancel
				</Button>
				<Button
					type={'Success'}
					onClick={this.props.onClickContinueButton}
				>
					Continue
				</Button>
			</Aux>
		);
	};
}

OrderSummary.propTypes = {
	totalPrice: PropTypes.number.isRequired,
	onClickCancelButton: PropTypes.func.isRequired,
	onClickContinueButton: PropTypes.func.isRequired,
	ingredients: PropTypes.objectOf((props, propName, component) => {
		if (typeof propName !== 'string' && typeof props[propName] !== 'string') {
			return new Error(`Invalid prop key/value supplied to ${component}. Validation failed.`);
		}
	}).isRequired
};

export default OrderSummary;
