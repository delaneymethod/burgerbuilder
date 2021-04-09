import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import ContactData from './ContactData/ContactData';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
	/**
	 * @type {{totalPrice: number, ingredients: {}}}
	 */
	state = {
		totalPrice: 0,
		ingredients: {}
	};

	componentWillMount = () => {
		const query = new URLSearchParams(this.props.location.search);

		let totalPrice = 0;
		const ingredients = {};

		for (const param of query.entries()) {
			if (param[0] === 'totalPrice') {
				totalPrice = param[1];
			} else {
				// ["bacon", "1"] with + used to convert value to numeric
				ingredients[param[0]] = +param[1];
			}
		}

		this.setState({ ingredients, totalPrice });
	};

	checkoutContinue = () => this.props.history.replace('/checkout/contact-data');

	checkoutCancel = () => this.props.history.goBack();

	/**
	 * @returns {JSX.Element}
	 */
	render() {
		return (
			<div>
				<CheckoutSummary
					ingredients={this.state.ingredients}
					onClickCancelButton={this.checkoutCancel}
					onClickContinueButton={this.checkoutContinue}
				/>
				<Route
					path={this.props.match.path + '/contact-data'}
					render={props => (
						<ContactData
							totalPrice={this.state.totalPrice}
							ingredients={this.state.ingredients}
							{...props}
						/>
					)}
				/>
			</div>
		);
	};
}

export default Checkout;
