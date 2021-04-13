import axiosInstance from '../../axiosInstance';
import {
	FETCH_ORDERS_FAIL,
	FETCH_ORDERS_START,
	FETCH_ORDERS_SUCCESS,
	PURCHASE_BURGER_FAIL,
	PURCHASE_BURGER_START,
	PURCHASE_BURGER_SUCCESS,
	PURCHASE_INIT
} from './actionTypes';

/**
 * @param orderId
 * @param orderData
 * @returns {{orderId, orderData, type: string}}
 */
export const purchaseBurgerSuccess = (orderId, orderData) => {
	return {
		type: PURCHASE_BURGER_SUCCESS,
		orderId,
		orderData
	};
};

/**
 * @param error
 * @returns {{type: string, error}}
 */
export const purchaseBurgerFailed = error => {
	return {
		type: PURCHASE_BURGER_FAIL,
		error
	};
};

/**
 * @returns {{type: string}}
 */
export const purchaseBurgerStart = () => {
	return {
		type: PURCHASE_BURGER_START
	};
};

/**
 * @param orderData
 * @param idToken
 * @returns {(function(*): void)|*}
 */
export const purchaseBurger = (orderData, idToken) => {
	return dispatch => {
		dispatch(purchaseBurgerStart());

		axiosInstance
			.post('/orders.json?auth=' + idToken, orderData)
			.then(response => {
				dispatch(purchaseBurgerSuccess(response.data.name, orderData));
			})
			.catch(error => {
				dispatch(purchaseBurgerFailed(error));
			});
	};
};

/**
 * @returns {{type: string}}
 */
export const purchaseInit = () => {
	return {
		type: PURCHASE_INIT
	};
};

/**
 * @param orders
 * @returns {{orders, type: string}}
 */
export const fetchOrdersSuccess = orders => {
	return {
		type: FETCH_ORDERS_SUCCESS,
		orders
	};
};

/**
 * @param error
 * @returns {{type: string, error}}
 */
export const fetchOrdersFailed = error => {
	return {
		type: FETCH_ORDERS_FAIL,
		error
	};
};

/**
 * @returns {{type: string}}
 */
export const fetchOrdersStart = () => {
	return {
		type: FETCH_ORDERS_START
	};
};

/**
 * @param idToken
 * @param localId
 * @returns {(function(*): void)|*}
 */
export const fetchOrders = (idToken, localId) => {
	return dispatch => {
		dispatch(fetchOrdersStart());

		axiosInstance
			.get('/orders.json?auth=' + idToken + '&orderBy="localId"&equalTo="' + localId + '"')
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

				dispatch(fetchOrdersSuccess(orders));
			})
			.catch(error => {
				dispatch(fetchOrdersFailed(error));
			});
	};
};
