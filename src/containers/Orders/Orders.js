import React, { Component } from 'react';

import axiosInstance from '../../axiosIntance';
import Order from '../../components/Order/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
	/**
	 * @type {{showError: boolean, orders: [], loading: boolean, error: null}}
	 */
	state = {
		orders: [],
		loading: true,
		error: null,
		showError: false
	};

	componentDidMount = () => {
		axiosInstance
			.get('/orders.json')
			.then(response => {
				const orders = [];

				for (const orderKey in response.data) {
					if (response.data.hasOwnProperty(orderKey)) {
						orders.push({
							id: orderKey,
							...response.data[orderKey]
						});
					}
				}

				this.setState({
					orders,
					loading: false
				});
			})
			.catch(error => {
				this.setState({
					error,
					showError: true
				});
			});
	};

	/**
	 * @returns {JSX.Element}
	 */
	render() {
		return (
			<div>
				{this.state.orders.map(order => (
					<Order
						key={order.id}
						ingredients={order.ingredients}
						totalPrice={order.totalPrice}
					/>
				))}
			</div>
		);
	};
}

export default withErrorHandler(Orders, axiosInstance);
