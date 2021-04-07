import React, { Component } from 'react';

import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
	/**
	 * @returns {JSX.Element}
	 */
	render() {
		return (
			<Aux>
				<h3>Your Order</h3>
				<p>A delicious burger with the following ingredients:</p>
				<ul>
					{this.props.orderSummary}
				</ul>
				<p><strong>Total Price: {this.props.totalPrice.toFixed(2)}</strong></p>
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

export default OrderSummary;
