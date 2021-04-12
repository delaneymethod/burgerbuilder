import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

import Aux from '../../hoc/Aux/Aux';
import ContactData from './ContactData/ContactData';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
	checkoutContinue = () => this.props.history.replace('/checkout/contact-data');

	checkoutCancel = () => this.props.history.goBack();

	/**
	 * @returns {JSX.Element}
	 */
	render() {
		let summary = <Redirect to={'/'}/>;

		if (this.props.ingredients) {
			const purchasedRedirect = this.props.purchased ? <Redirect to={'/'}/> : null;

			summary = (
				<Aux>
					{purchasedRedirect}
					<CheckoutSummary
						ingredients={this.props.ingredients}
						onClickCancelButton={this.checkoutCancel}
						onClickContinueButton={this.checkoutContinue}
					/>
					<Route
						path={this.props.match.path + '/contact-data'}
						component={ContactData}
					/>
				</Aux>
			);
		}

		return summary;
	};
}

/**
 * @param state
 * @returns {{totalPrice: (number|number|*), ingredients: (null|{bacon: number, salad: number, meat: number, cheese: number}|*)}}
 */
const mapStateToProps = state => {
	return {
		purchased: state.order.purchased,
		totalPrice: state.burgerBuilder.totalPrice,
		ingredients: state.burgerBuilder.ingredients
	};
};

export default connect(mapStateToProps)(Checkout);
