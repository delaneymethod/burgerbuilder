import { updateObject } from '../../shared/utility';
import {
	FETCH_ORDERS_FAIL,
	FETCH_ORDERS_START,
	FETCH_ORDERS_SUCCESS,
	PURCHASE_BURGER_FAIL,
	PURCHASE_BURGER_START,
	PURCHASE_BURGER_SUCCESS,
	PURCHASE_INIT
} from '../actions/actionTypes';

/**
 * @type {{purchased: boolean, orders: *[], error: boolean, loading: boolean}}
 */
const initialState = {
	orders: [],
	error: false,
	loading: false,
	purchased: false
};

/**
 * @param state
 * @returns {*}
 */
const purchaseInit = state => {
	const updatedValues = {
		purchase: initialState.purchased
	};

	return updateObject(state, updatedValues);
};

/**
 * @param state
 * @returns {*}
 */
const purchaseBurgerStart = state => {
	const updatedValues = {
		loading: true
	};

	return updateObject(state, updatedValues);
};

/**
 * @param state
 * @param action
 * @returns {*}
 */
const purchaseBurgerSuccess = (state, action) => {
	const newOrder = {
		...action.orderData,
		orderId: action.orderId
	};

	const updatedValues = {
		purchased: true,
		loading: initialState.loading,
		orders: state.orders.concat(newOrder)
	};

	return updateObject(state, updatedValues);
};

/**
 * @param state
 * @returns {*}
 */
const purchaseBurgerFailed = state => {
	const updatedValues = {
		loading: initialState.loading,
		purchased: initialState.purchased
	};

	return updateObject(state, updatedValues);
};

/**
 * @param state
 * @returns {*}
 */
const fetchOrdersStart = state => {
	const updatedValues = {
		loading: true
	};

	return updateObject(state, updatedValues);
};

/**
 * @param state
 * @param action
 * @returns {*}
 */
const fetchOrdersSuccess = (state, action) => {
	const updatedValues = {
		orders: action.orders,
		loading: initialState.loading
	};

	return updateObject(state, updatedValues);
};

/**
 * @param state
 * @returns {*}
 */
const fetchOrdersFailed = state => {
	const updatedValues = {
		loading: initialState.loading
	};

	return updateObject(state, updatedValues);
};

/**
 * @param state
 * @param action
 * @returns {{purchased: boolean, orders: *[], error: boolean, loading: boolean}|*}
 */
const order = (state = initialState, action) => {
	switch (action.type) {
		case PURCHASE_INIT:
			return purchaseInit(state, action);
		case PURCHASE_BURGER_START:
			return purchaseBurgerStart(state, action);
		case PURCHASE_BURGER_SUCCESS:
			return purchaseBurgerSuccess(state, action);
		case PURCHASE_BURGER_FAIL:
			return purchaseBurgerFailed(state, action);
		case FETCH_ORDERS_START:
			return fetchOrdersStart(state, action);
		case FETCH_ORDERS_SUCCESS:
			return fetchOrdersSuccess(state, action);
		case FETCH_ORDERS_FAIL:
			return fetchOrdersFailed(state, action);
		default:
			return state;
	}
};

export default order;
