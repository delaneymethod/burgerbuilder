import React, { Component } from 'react';
import { connect } from 'react-redux';

import axiosInstance from '../../axiosInstance';
import Order from '../../components/Order/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { fetchOrders } from '../../store/actions';
import Spinner from '../../components/UI/Spinner/Spinner';
import Aux from '../../hoc/Aux/Aux';

class Orders extends Component {
	componentDidMount = () => {
		this.props.fetchOrders(this.props.idToken);
	};

	/**
	 * @returns {JSX.Element}
	 */
	render() {
		let loading = <Spinner/>;

		if (!this.props.loading) {
			loading = (
				<Aux>
					{this.props.orders.map(order => (
						<Order
							key={order.id}
							ingredients={order.ingredients}
							totalPrice={order.totalPrice}
						/>
					))}
				</Aux>
			);
		}

		return loading;
	};
}

// FIXME
Orders.propTypes = {

};

/**
 * @param state
 * @returns {{idToken: (null|*), orders: ([]|*[]|*), loading}}
 */
const mapStateToProps = state => {
	return {
		orders: state.order.orders,
		loading: state.order.loading,
		idToken: state.authenticate.idToken
	};
};

/**
 * @param dispatch
 * @returns {{fetchOrders: (function(): *)}}
 */
const mapDispatchToProps = dispatch => {
	return {
		fetchOrders: idToken => dispatch(fetchOrders(idToken))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axiosInstance));
