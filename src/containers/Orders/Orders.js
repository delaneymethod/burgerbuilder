import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import axiosInstance from '../../axiosInstance';
import Order from '../../components/Order/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { fetchOrders } from '../../store/actions';
import Spinner from '../../components/UI/Spinner/Spinner';
import Aux from '../../hoc/Aux/Aux';

class Orders extends Component {
	componentDidMount = () => {
		this.props.fetchOrders(this.props.idToken, this.props.localId);
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
							localId={order.localId}
							orderData={order.orderData}
						/>
					))}
				</Aux>
			);
		}

		return loading;
	};
}

Orders.propTypes = {
	orders: PropTypes
		.arrayOf(PropTypes.shape({
			id: PropTypes.string.isRequired,
			localId: PropTypes.string.isRequired,
			totalPrice: PropTypes.number.isRequired,
			ingredients: PropTypes.objectOf((props, propName, component) => {
				if (typeof propName !== 'string' && typeof props[propName] !== 'number') {
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
		}))
		.isRequired,
	loading: PropTypes.bool.isRequired,
	idToken: PropTypes.string.isRequired,
	localId: PropTypes.string.isRequired,
	fetchOrders: PropTypes.func.isRequired
};

/**
 * @param state
 * @returns {{idToken: (null|*), orders: ([]|*[]|*), loading}}
 */
const mapStateToProps = state => {
	return {
		orders: state.order.orders,
		loading: state.order.loading,
		idToken: state.authenticate.idToken,
		localId: state.authenticate.localId
	};
};

/**
 * @param dispatch
 * @returns {{fetchOrders: (function(): *)}}
 */
const mapDispatchToProps = dispatch => {
	return {
		fetchOrders: (idToken, localId) => dispatch(fetchOrders(idToken, localId))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axiosInstance));
